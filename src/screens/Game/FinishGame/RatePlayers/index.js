import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenMask from '@/components/wrappers/screen'
import { RH, RW, font } from '@/theme/utils'
import { WHITE } from '@/theme/colors'
import LightButton from '@/components/buttons/Button'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import User from '@/components/User/user'
import { setModalOptions } from '@/store/Slices/AppSlice'
import Row from '@/components/wrappers/row'
import StarSvg from '@/assets/svgs/StarSvg'
import { ratePlayersAfterFinishGame } from '@/store/Slices/GamesSlice'

const RatePlayers = ({ route }) => {
  const navigation = useNavigation()
  const { gameId, users, organizer } = route.params
  const dispatch = useDispatch()
  const user = useSelector(({ auth }) => auth.user)

  const [usersState, setUsersState] = useState([])
  useEffect(() => {
    if (users?.length)
      setUsersState(
        users
          ?.filter((item) => {
            return item?._id !== user?._id
          })
          ?.map((user) => {
            return {
              ...user,
              rating: 1,
            }
          }),
      )
  }, [users])
  useEffect(() => {
    if (organizer && organizer?._id !== user?._id) {
      dispatch(
        setModalOptions({
          visible: true,
          type: 'RateOrganizerModal',
          body: {
            organizer,
          },
        }),
      )
    }
  }, [organizer])

  useEffect(() => {
    if (route.params?.navigateFrom == 'MyTeam') {
      dispatch(
        setModalOptions({
          visible: true,
          type: 'RatePlayerModal',
          body: route.params,
        }),
      )
      route.params.navigateFrom = null
    }
  }, [route.params])

  return (
    <ScreenMask>
      <View style={styles.main}>
        <Text style={styles.title}>Оцените игрока</Text>

        <FlatList
          data={usersState}
          style={styles.flatList}
          contentContainerStyle={styles.flatListContent}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          renderItem={({ index, item }) => (
            <View style={{ margin: RW(8) }}>
              <User
                size={90}
                user={item}
                onPressItem={{
                  onClickFunc: () => {
                    dispatch(
                      setModalOptions({
                        visible: true,
                        type: 'RatePlayerModal',
                        body: {
                          item: item,
                          rating: item.rating,
                          setRating: (newRating) => {
                            setUsersState((prev) => {
                              return prev.map((user, userIndex) => {
                                if (userIndex == index) {
                                  return {
                                    ...user,
                                    rating: newRating,
                                  }
                                }
                                return user
                              })
                            })
                          },
                        },
                      }),
                    )
                  },
                }}
              />
              <Row wrapper={{ marginTop: RH(10) }}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((elm, key) => (
                  <StarSvg key={key} fill={elm <= item.rating} width={10} height={9.5} />
                ))}
              </Row>
            </View>
          )}
        />
      </View>
      <LightButton
        onPress={() => {
          let rating = {}
          usersState.forEach((item) => {
            rating = { ...rating, [item?._id]: item.rating / 100 }
          })
          dispatch(
            ratePlayersAfterFinishGame(
              {
                create_game_id: gameId,
                rating,
              },
              navigation,
            ),
          )
        }}
        style={{ alignSelf: 'center', marginBottom: RH(30) }}
        size={{ width: RW(280), height: RH(48) }}
        label={'Завершить игру'}
      />
    </ScreenMask>
  )
}

export default RatePlayers

const styles = StyleSheet.create({
  main: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...font('bold', 20, WHITE, 30),
    textAlign: 'center',
    marginTop: RH(10),
    marginBottom: RH(20),
  },
  // flatList: {},
  flatListContent: {
    alignItems: 'center',
    paddingBottom: RH(10),
  },
})
