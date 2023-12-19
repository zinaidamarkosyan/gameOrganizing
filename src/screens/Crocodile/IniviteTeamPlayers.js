import { useEffect } from 'react'
import { font, RH, RW } from '@/theme/utils'
import { useState } from 'react'
import { BACKGROUND, ICON, RED, WHITE } from '@/theme/colors'
import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import {
  setCountWords,
  setParticipateSuccess,
  setPlayers,
  setReservedUsers,
  setTeams,
} from '@/store/Slices/CrocodileSlice'
import LightButton from '@/components/buttons/Button'
import DarkButton from '@/components/buttons/DarkButton'
import User from '@/components/User/user'
import BorderGradient from '@/assets/svgs/BorderGradiend'
import ScreenMask from '@/components/wrappers/screen'
import { setPending } from '@/store/Slices/AuthSlice'
import Modal from '@/components/modal'
import CloseSVG from './components/CloseSVG'
import { sendCrocodileGameId } from '@/store/Slices/CrocodileSlice'

const IniviteTeamPlayers = ({ route }) => {
  const navigation = useNavigation()
  const props = route.params
  const {
    reservedUsers,
    crocodileGameId,
    allTeams,
    playersInGame,
    countWords,
    participateSuccess,
    userIsOrganizer,
  } = useSelector(({ crocodile }) => crocodile)
  const { user } = useSelector(({ auth }) => auth)
  const [i, setI] = useState(0)
  const [errorModal, setErrorModal] = useState(false)
  const [error, setError] = useState(false)
  const dispatch = useDispatch()
  const isFocused = useIsFocused()
  useEffect(() => {
    setI(0)
    dispatch(setCountWords(countWords))
  }, [isFocused])

  useEffect(() => {
    if (props?.id) {
      dispatch(sendCrocodileGameId(props.id))
      props.id = null
    }
  }, [props])

  useEffect(() => {
    if (participateSuccess === false) {
      alert('Что-то пошло не так')
      // navigation.navigate('Home')
      dispatch(setParticipateSuccess(null))
    }
    dispatch(setPending(false))
  }, [participateSuccess])

  const handleClick = (elm) => {
    if (!reservedUsers?.includes(elm?._id)) {
      if (allTeams?.[i]?.members?.some((item) => item == elm?._id)) {
        dispatch(
          setTeams(
            allTeams?.map((elem) => {
              if (elem.members.includes(elm?._id)) {
                return { ...elem, members: elem.members.filter((item) => item !== elm?._id) }
              } else {
                return elem
              }
            }),
          ),
        )
      } else {
        dispatch(
          setTeams(
            allTeams?.map((item) =>
              item.command - 1 == i ? { ...item, members: [...item.members, elm?._id] } : item,
            ),
          ),
        )
      }
    }
  }

  const handleSubmit = async () => {
    if (playersInGame?.length < 4) {
      setError('Игроки не должны быть менее 4')
      setErrorModal(true)
    } else if (allTeams[i]?.members.length >= 2) {
      setError(false)
      dispatch(setReservedUsers([...new Set([...reservedUsers, ...allTeams[i].members])]))
      dispatch(
        setPlayers({
          crocodile_id: crocodileGameId,
          team_id: allTeams[i]?.id,
          players: allTeams?.[i]?.members,
        }),
      )
      setI((prev) => prev + 1)
      i >= allTeams.length - 1 ? navigation.navigate('PlayNow') : null
    } else {
      setError(`Распределите игроков для команды '${allTeams?.[i]?.value}'`)
    }
  }
  const ErrorModal = () => {
    return (
      <Pressable
        style={styles.errorModalBox}
        onPress={() => {
          setErrorModal(false)
        }}
      >
        <View
          style={{
            height: '90%',
            width: '80%',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <CloseSVG />
          <Text style={styles.errorModalBoxText}>
            Не возможно начать игру. Количество игроков не соответствуют минимальному числу игроков
            для начала игры
          </Text>
        </View>
      </Pressable>
    )
  }

  return (
    <ScreenMask>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ justifyContent: 'center' }}>
          <View style={styles.mainContainer}>
            {userIsOrganizer ? (
              playersInGame.length >= 4 ? (
                <>
                  <Text style={styles.title}>Игроки добавились в игру</Text>
                  <Text style={styles.title}>Распределите игроков</Text>
                </>
              ) : (
                <Text style={styles.title}>Ждем добавление игроков</Text>
              )
            ) : (
              <Text style={styles.title}>Ждете пока организатор распределит команды игроков</Text>
            )}

            <Text style={styles.commandName}>{userIsOrganizer ? allTeams?.[i]?.value : ''}</Text>
            <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
              <View style={styles.gridBox}>
                {playersInGame?.length ? (
                  playersInGame?.map((elm, j) => {
                    return (
                      <View
                        style={{
                          opacity: reservedUsers?.includes(elm?._id) ? 0.5 : 1,
                        }}
                        key={j}
                      >
                        <View
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <BorderGradient
                            height={142}
                            width={105}
                            opacity={
                              allTeams?.[i]?.members?.includes(elm?._id) && userIsOrganizer ? 1 : 0
                            }
                          />
                          <Pressable
                            style={{
                              position: 'absolute',
                              zIndex: 65,
                            }}
                            onPress={() => (userIsOrganizer ? handleClick(elm) : null)}
                          >
                            <User
                              size={90}
                              pressedUser={elm}
                              zoom={true}
                              onPressItem={{
                                item: <User size={150} pressedUser={elm} />,
                                modalClose: false,
                                onClickFunc: () => (userIsOrganizer ? handleClick(elm) : null),
                              }}
                            />
                          </Pressable>
                        </View>
                      </View>
                    )
                  })
                ) : (
                  <View
                    style={{
                      opacity: reservedUsers?.includes(user?._id) ? 0.5 : 1,
                    }}
                  >
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <BorderGradient
                        height={142}
                        width={105}
                        opacity={
                          allTeams?.[i]?.members?.includes(user?._id) && userIsOrganizer ? 1 : 0
                        }
                      />
                      <Pressable
                        style={{
                          position: 'absolute',
                          zIndex: 65,
                        }}
                        onPress={() => (userIsOrganizer ? handleClick(user) : null)}
                      >
                        <User
                          size={90}
                          pressedUser={user}
                          zoom={true}
                          onPressItem={{
                            item: <User size={150} pressedUser={user} />,
                            modalClose: false,
                            onClickFunc: () => (userIsOrganizer ? handleClick(user) : null),
                          }}
                        />
                      </Pressable>
                    </View>
                  </View>
                )}
              </View>
            </ScrollView>
          </View>
        </View>
        <Modal setIsVisible={setErrorModal} modalVisible={errorModal} item={<ErrorModal />} />

        {userIsOrganizer ? (
          <View
            style={{
              width: '100%',
              alignSelf: 'center',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: RH(80),
              marginBottom: RH(20),
            }}
          >
            {!!error && <Text style={styles.errorText}>{error}</Text>}
            <View style={styles.btnBox}>
              <LightButton
                label={'Продолжить'}
                size={{ width: RW(310), height: RH(50) }}
                onPress={handleSubmit}
              />
            </View>
            <View style={styles.btnBox}>
              <DarkButton
                label={'Пригласить игроков'}
                size={{ width: RW(310), height: RH(50) }}
                onPress={() => navigation.goBack()}
              />
            </View>
          </View>
        ) : null}
      </ScrollView>
    </ScreenMask>
  )
}

export default IniviteTeamPlayers

const styles = StyleSheet.create({
  title: {
    ...font('medium', 24, WHITE),
    textAlign: 'center',
    paddingVertical: RH(8),
  },
  errorModalBox: {
    alignSelf: 'center',
    height: RH(350),
    width: RW(300),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BACKGROUND,
    borderRadius: RW(14),
  },
  errorModalBoxText: {
    ...font('medium', 16, WHITE),
    textAlign: 'center',
  },
  commandName: {
    ...font('medium', 24, ICON),
    textAlign: 'center',
    paddingVertical: RH(8),
  },
  mainContainer: {
    width: '90%',
    zIndex: 200,
    overflow: 'visible',
    flex: 1,
    paddingTop: '22%',
    alignSelf: 'center',
  },

  gridBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  btnBox: {
    marginTop: RH(10),
  },
  errorText: {
    ...font('regular', 17, RED, 24),
    maxWidth: '80%',
    textAlign: 'center',
  },
})
