import React, { useCallback, useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ScreenMask from '@/components/wrappers/screen'
import { ACTIVE, ICON, INACTIVE, WHITE } from '@/theme/colors'
import { font, RH, RW } from '@/theme/utils'
import Button from '@/components/buttons/Button'
import { changeUserPreferences, setToken } from '@/store/Slices/AuthSlice'
import { useDispatch, useSelector } from 'react-redux'
import { addAsyncStorage } from '@/helpers/asyncStore'
import { getGamesOnlyNames, setNames } from '@/store/Slices/GamesSlice'

const Preferences = () => {
  const list = [
    { id: 1, text: 'Футбол', checked: false },
    { id: 2, text: 'Навес', checked: false },
    { id: 3, text: 'Триста', checked: false },
    { id: 4, text: 'Баскетбол', checked: false },
    { id: 5, text: 'Волейбол', checked: false },
    { id: 6, text: 'Пионербол', checked: false },
    { id: 7, text: 'Хоккей', checked: false },
    { id: 8, text: 'Элиас', checked: false },
    { id: 9, text: 'Покер', checked: false },
    { id: 10, text: 'Монополия', checked: false },
    { id: 11, text: 'Крокодил', checked: false },
    { id: 12, text: 'Мафия', checked: false },
    { id: 13, text: 'Своя игра', checked: false },
  ]

  const [game, setGame] = useState([])
  const dispatch = useDispatch()
  const { expired_token } = useSelector(({ auth }) => auth)
  const { preferences } = useSelector(({ auth }) => auth.user)
  const { nameOfGames } = useSelector((gameSlice) => gameSlice.games)
  useLayoutEffect(() => {
    !nameOfGames.length && dispatch(getGamesOnlyNames())
  }, [])
  const checkItem = useCallback(
    (id) => {
      dispatch(
        setNames([
          ...nameOfGames.map((elm) => (elm.id == id ? { ...elm, checked: !elm.checked } : elm)),
        ]),
      )
    },
    [nameOfGames],
  )

  const savePreferences = () => {
    dispatch(
      changeUserPreferences(
        nameOfGames.filter((elm) => elm.checked).map((el) => el.id),
        expired_token,
      ),
    )
  }

  return (
    <ScreenMask>
      <Text style={[styles.title, styles.mt60]}>Введите ваши предпочтения</Text>
      <Text style={[styles.subTitle, styles.mt40]}>Выбрать предпочтения</Text>
      <View style={styles.flatListBlock}>
        {nameOfGames?.map((elm) => {
          return (
            <TouchableOpacity
              key={elm.id}
              onPress={() => checkItem(elm.id)}
              style={[
                styles.gameBtn,
                {
                  backgroundColor: elm.checked ? ACTIVE : INACTIVE,
                },
              ]}
            >
              <Text style={styles.linkText}>{elm.name}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
      <View style={styles.next}>
        <Button
          label={'Далее>>'}
          size={{ width: 171, height: 36 }}
          onPress={async () => {
            dispatch(setToken(expired_token))
            savePreferences()
            addAsyncStorage('token', expired_token)
          }}
        />
      </View>
    </ScreenMask>
  )
}

export default Preferences

const styles = StyleSheet.create({
  mt60: {
    marginTop: RH(60),
  },
  mt40: {
    marginTop: RH(40),
    fontStyle: 'normal',
    marginBottom: RH(13),
  },
  title: {
    ...font('medium', 24, ICON, 32),
  },
  subTitle: {
    fontStyle: 'regular',
    ...font('medium', 18, WHITE, 28),
  },
  linkText: {
    ...font('regular', 16, WHITE, 19),
    paddingHorizontal: RW(12),
    paddingVertical: RH(10),
  },
  gameBtn: {
    alignSelf: 'center',
    marginHorizontal: RW(4),
    borderRadius: RW(10),
    marginTop: RW(23),
  },
  next: {
    right: RW(8),
    bottom: RH(44),
    position: 'absolute',
  },
  flatListBlock: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '95%',
    alignSelf: 'center',
  },
})
