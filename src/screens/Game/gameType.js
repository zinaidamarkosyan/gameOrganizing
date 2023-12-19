import React, { useEffect, useState } from 'react'
import { View, Text, Pressable, TouchableOpacity, StyleSheet } from 'react-native'
import ArrowDown from '@/assets/svgs/arrowDown'
import CheckboxNotChecked from '@/assets/svgs/checkboxNotChecked'
import CheckedCheckbox from '@/assets/svgs/checkedCheckbox'
import { RH, RW } from '@/theme/utils'
import { BACKGROUND, ICON, RADIO_TEXT } from '@/theme/colors'

function GameType({ setShowGameTypes, gameTypes, setGameTypes, errorMessage }) {
  const [showDropDown, setShowDropDown] = useState(false)
  const [selected, setSelected] = useState('Выбрать игру')
  const checkElem = (elm) => {
    setGameTypes([
      ...gameTypes.map((elem) => {
        if (elem.id === elm.id) {
          return { ...elm, checked: !elm.checked }
        } else {
          return elem
        }
      }),
    ])
  }
  const gameTypeBtns = [
    { id: 1, name: 'Активные игры' },
    { id: 2, name: 'Настольные игры' },
  ]
  useEffect(() => {
    selected !== 'Выбрать игру'
      ? setGameTypes([...gameTypes.map((elm) => ({ ...elm, checked: false }))])
      : null
  }, [selected])

  return (
    <View style={styles.gameTypeContainer}>
      <Pressable
        style={showDropDown ? styles.gameTypeBtn : styles.openedGameBtn}
        onPress={() => {
          setShowDropDown(!showDropDown)
          if (selected === 'Активные игры') {
            setSelected('Активные игры')
          }
        }}
      >
        <Text style={styles.gameTypeBtnText}>{selected}</Text>
        <View style={styles.arrowDown}>
          {!showDropDown ? (
            <ArrowDown />
          ) : (
            <View style={{ transform: [{ rotate: '180deg' }] }}>
              <ArrowDown />
            </View>
          )}
        </View>
      </Pressable>
      {showDropDown
        ? gameTypeBtns.map((elm) => {
            return (
              <Pressable
                key={elm.id}
                style={styles.gameTypeLastBtn}
                onPress={() => {
                  // setGameTypes(types)
                  setSelected(elm.name)
                  setShowGameTypes(showDropDown)
                  setShowDropDown(!showDropDown)
                  // setGameKindOf(elm.name)
                }}
              >
                <Text style={styles.gameTypeBtnText}>{elm.name}</Text>
              </Pressable>
            )
          })
        : null}
      <View>
        {selected !== 'Выбрать игру' ? (
          <>
            {selected == 'Активные игры'
              ? gameTypes.slice(0, 7)?.map((elm) => {
                  return (
                    <TouchableOpacity
                      onPress={() => checkElem(elm)}
                      style={styles.checkCheckbox}
                      key={elm.id}
                    >
                      {!elm.checked ? <CheckboxNotChecked /> : <CheckedCheckbox />}
                      <Text style={styles.typeText}>{elm.name}</Text>
                    </TouchableOpacity>
                  )
                })
              : gameTypes?.slice(7, gameTypes?.length)?.map((elm) => {
                  return (
                    <TouchableOpacity
                      onPress={() => checkElem(elm)}
                      style={styles.checkCheckbox}
                      key={elm.id}
                    >
                      {!elm.checked ? <CheckboxNotChecked /> : <CheckedCheckbox />}
                      <Text style={styles.typeText}>{elm.name}</Text>
                    </TouchableOpacity>
                  )
                })}
          </>
        ) : null}
      </View>
      {errorMessage && !showDropDown && <Text style={styles.errorText}>Обязательное поле</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  gameTypeContainer: {
    alignSelf: 'center',
  },
  checkCheckbox: {
    padding: RW(10),
    flexDirection: 'row',
  },
  openedGameBtn: {
    borderRadius: RW(10),
    backgroundColor: BACKGROUND,
    width: RW(380),
    alignSelf: 'center',
    height: RH(48),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: RW(16),
  },

  typeText: {
    color: RADIO_TEXT,
    fontSize: RW(16),
    paddingHorizontal: RW(10),
  },
  gameTypeBtn: {
    backgroundColor: BACKGROUND,
    width: RW(380),
    alignSelf: 'center',
    height: RH(48),
    borderTopLeftRadius: RW(10),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopRightRadius: RW(10),
    borderBottomWidth: RH(2),
    borderBottomColor: ICON,
  },
  gameTypeLastBtn: {
    borderRadius: RW(0),
    backgroundColor: BACKGROUND,
    width: RW(380),
    height: RH(48),
    justifyContent: 'center',
  },
  gameTypeBtnText: {
    color: ICON,
    fontSize: RH(16),
    paddingHorizontal: RW(15),
  },
  arrowDown: {
    paddingHorizontal: RW(15),
  },
})

export default GameType
