import React, { memo, useEffect, useState } from 'react'
import ScreenMask from '@/components/wrappers/screen'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RH, RW, font } from '@/theme/utils'
import { ACTIVE, INACTIVE, LIGHT_LABEL, WHITE } from '@/theme/colors'
import { getGamesOnlyNames, setNames } from '@/store/Slices/GamesSlice'
import { useDispatch, useSelector } from 'react-redux'
import { changeUserPreferences } from '@/store/Slices/AuthSlice'
import LightButton from '@/components/buttons/Button'
import Modal from '@/components/modal'
import { useIsFocused } from '@react-navigation/native'
function Index() {
  const dispatch = useDispatch()
  const { nameOfGames } = useSelector((gameSlice) => gameSlice.games)
  const { preferences } = useSelector(({ auth }) => auth.user)
  const { token } = useSelector(({ auth }) => auth)

  const [modalVisible, setModalVisible] = useState(false)

  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      dispatch(getGamesOnlyNames())
    }
  }, [isFocused])

  const checkItem = (id) => {
    dispatch(
      setNames([
        ...nameOfGames.map((elm) => (elm.id == id ? { ...elm, checked: !elm.checked } : elm)),
      ]),
    )
  }

  const savePreferences = () => {
    dispatch(
      changeUserPreferences(
        nameOfGames.filter((elm) => elm.checked).map((el) => el.id),
        token,
      ),
      setModalVisible(true),
    )
  }
  return (
    <ScreenMask>
      <View style={styles.container}>
        <Text style={styles.title}>Мои предпочтения</Text>
        <View style={styles.gameNamesBlock}>
          <Text style={styles.gameNamesTitle}>Предпочтения в играх</Text>
          <Text style={styles.gameNamesTitle}>Настольные игры</Text>
          <View style={styles.gamesBox}>
            {nameOfGames?.slice(7, nameOfGames.length).map((elm, i) => {
              return (
                <TouchableOpacity
                  key={elm?.id}
                  onPress={() => checkItem(elm?.id, 'board')}
                  style={[
                    styles.gameBtn,
                    {
                      backgroundColor: elm.checked || preferences[i] == elm.id ? ACTIVE : INACTIVE,
                    },
                  ]}
                >
                  <Text style={styles.linkText}>{elm?.name}</Text>
                </TouchableOpacity>
              )
            })}
          </View>
          <Text style={styles.gameNamesTitle}>Активные игры</Text>
          <View style={styles.gamesBox}>
            {nameOfGames?.slice(0, 7).map((elm, i) => {
              return (
                <TouchableOpacity
                  key={elm.id}
                  onPress={() => checkItem(elm.id, 'active')}
                  style={[
                    styles.gameBtn,
                    {
                      backgroundColor: elm.checked || preferences[i] == elm.id ? ACTIVE : INACTIVE,
                    },
                  ]}
                >
                  <Text style={styles.linkText}>{elm?.name}</Text>
                </TouchableOpacity>
              )
            })}
          </View>
          <View style={styles.flatListBlock}></View>
          {/* <Text style={{ ...styles.gameNamesTitle, marginBottom: RH(23) }}>
            Мои подписки на организаторов
          </Text> */}
          {/* здесь будут подписки пользавательей */}
        </View>
      </View>
      <LightButton
        label={token ? 'Сохранить' : 'Продолжить'}
        onPress={savePreferences}
        style={styles.submitBtn}
      />
      <Modal
        item={
          <View style={styles.modal}>
            <Text style={styles.successTeam}>Успешно сохранено</Text>
          </View>
        }
        modalVisible={modalVisible}
        setIsVisible={setModalVisible}
        navigationText={'Profile'}
      />
      {/* <View><User user={user} size={80} onPressImg={false} /></View> */}
    </ScreenMask>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: RW(43),
    paddingHorizontal: RW(8),
    alignItems: 'center',
  },
  gameNamesBlock: {
    width: '100%',
  },
  gameNamesTitle: {
    ...font('medium', 18, WHITE, 28),
    marginTop: RH(15),
  },
  gameBtn: {
    alignSelf: 'center',
    marginHorizontal: RW(4),
    borderRadius: RW(10),
    marginTop: RW(23),
  },

  flatListBlock: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '95%',
    alignSelf: 'center',
  },
  gamesBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '95%',
    alignSelf: 'center',
  },
  modal: {
    width: RW(306),
    backgroundColor: LIGHT_LABEL,
    borderRadius: RW(20),
    padding: RW(50),
    marginHorizontal: RW(30.5),
  },
  successTeam: {
    ...font('inter', 16, WHITE, 20),
    textAlign: 'center',
  },

  submitBtn: {
    position: 'absolute',
    bottom: RH(45),
    zIndex: 11,
    right: RW(5),
  },
  title: {
    ...font('bold', 24, WHITE, 24),
    marginBottom: RW(15),
  },

  linkText: {
    ...font('regular', 16, WHITE, 19),
    paddingHorizontal: RW(12),
    paddingVertical: RH(10),
  },
})
export default memo(Index)
