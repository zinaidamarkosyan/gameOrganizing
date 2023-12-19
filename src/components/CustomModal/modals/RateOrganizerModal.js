import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RH, RW, font } from '@/theme/utils'
import { LIGHT_LABEL, WHITE } from '@/theme/colors'
import StarSvg from '@/assets/svgs/StarSvg'
import User from '@/components/User/user'
import Row from '@/components/wrappers/row'
import AddSvg from '@/assets/svgs/addSvg'
import CircleMain from '@/components/buttons/Circle/CircleMain'
import CheckSvg from '@/assets/svgs/CheckSvg'
import LightButton from '@/components/buttons/Button'
import { useDispatch } from 'react-redux'
import { followUser, rateOrganizerAfterFinishGame } from '@/store/Slices/GamesSlice'
import { setModalVisible } from '@/store/Slices/AppSlice'

const RateOrganizerModal = ({ body }) => {
  const [userRating, setUserRating] = useState(1)
  const [follow, setFollow] = useState(false)
  const dispatch = useDispatch()
  const { organizer } = body

  return (
    <View style={styles.modal}>
      <Text style={styles.title}>Оцените организатора игры!</Text>
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((elm, key) => (
          <Pressable
            key={key}
            onPress={() => {
              setUserRating(elm)
            }}
          >
            <StarSvg fill={elm <= userRating} />
          </Pressable>
        ))}
      </View>

      <User size={250} user={organizer} />
      <Row wrapper={styles.row}>
        <Text style={styles.text}>Хотите подписаться на организатора игры?</Text>
        <Pressable onPress={() => setFollow(!follow)}>
          <CircleMain
            size={32}
            label={follow ? <CheckSvg /> : <AddSvg plusColor={'#fff'} strokeWidth={3} />}
          />
        </Pressable>
      </Row>
      <LightButton
        onPress={() => {
          if (follow) {
            dispatch(
              followUser({
                user_id: organizer?._id,
              }),
            )
          }
          dispatch(
            rateOrganizerAfterFinishGame({
              user_id: organizer?._id,
              rating: userRating / 100,
            }),
          )
          dispatch(setModalVisible(false))
        }}
        style={styles.btn}
        label={'Оценить'}
      />
    </View>
  )
}

export default RateOrganizerModal

const styles = StyleSheet.create({
  modal: {
    width: RW(306),
    backgroundColor: LIGHT_LABEL,
    borderRadius: RW(20),
    padding: RW(20),
    marginHorizontal: RW(30.5),
  },
  title: {
    ...font('inter', 16, WHITE),
    alignSelf: 'center',
    textAlign: 'center',
    marginVertical: RH(20),
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: RH(30),
  },
  row: {
    marginTop: RH(20),
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
  },
  text: {
    ...font('inter', 16, WHITE),
    width: '80%',
  },
  btn: { alignSelf: 'center', marginTop: RH(30) },
})
