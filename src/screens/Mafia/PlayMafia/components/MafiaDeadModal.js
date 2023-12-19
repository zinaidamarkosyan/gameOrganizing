import { Text, View } from 'react-native'
import React from 'react'
import Modal from '@/components/modal'
import { font, RH, RW } from '@/theme/utils'
import { useDispatch, useSelector } from 'react-redux'
import { _storageUrl } from '@/constants'
import { setDeadUser } from '@/store/Slices/MafiaSlice'
import { SCREEN_BACKGROUND } from '@/theme/colors'
import NotDeadedPlayerSvg from '../assets/NotDeadedPlayerSvg'
import Row from '@/components/wrappers/row'
import DeadedUser from '@/components/DeadedUser/user'
const MafiaDeadModal = ({ modalVisible, setModalVisible, onDismiss }) => {
  const { deadUser } = useSelector(({ mafia }) => mafia)
  const dispatch = useDispatch()
  // if (!modalVisible) return null
  return (
    <Modal
      modalVisible={modalVisible}
      setIsVisible={(e) => {
        dispatch(setDeadUser(null))
        setModalVisible(e)
      }}
      onDismiss={onDismiss}
      item={
        modalVisible ? (
          Object.keys(deadUser || {}).length ? (
            <>
              {deadUser?.length == 1 ? (
                <View>
                  <Text
                    style={{
                      ...font('bold', 24, '#fff'),
                      alignSelf: 'center',
                      marginBottom: RH(50),
                    }}
                  >
                    Игрок выбыл
                  </Text>
                  <DeadedUser
                    size={400}
                    user={deadUser[0]}
                    onPressItem={{ onClickFunc: () => {} }}
                  />

                  <Text
                    style={{ ...font('bold', 24, '#fff'), alignSelf: 'center', marginTop: RH(30) }}
                  >
                    {deadUser[0]?.role}
                  </Text>
                </View>
              ) : (
                <View>
                  <Text
                    style={{
                      ...font('bold', 24, '#fff'),
                      alignSelf: 'center',
                      marginBottom: RH(50),
                    }}
                  >
                    Игроки выбыли
                  </Text>
                  <Row>
                    {deadUser.map((item, key) => {
                      return (
                        <View key={key}>
                          <DeadedUser
                            size={200}
                            user={item}
                            onPressItem={{ onClickFunc: () => {} }}
                          />

                          <Text
                            style={{
                              ...font('bold', 24, '#fff'),
                              alignSelf: 'center',
                              marginTop: RH(30),
                            }}
                          >
                            {item?.role}
                          </Text>
                        </View>
                      )
                    })}
                  </Row>
                </View>
              )}
            </>
          ) : (
            <View
              style={{
                alignSelf: 'center',
                backgroundColor: SCREEN_BACKGROUND,
                width: RW(306),
                paddingTop: RH(23),
                paddingBottom: RH(17),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: RW(20),
              }}
            >
              <NotDeadedPlayerSvg />
              <Text
                style={{
                  ...font('regular', 16, '#fff', 25),
                  textAlign: 'center',
                  marginTop: RH(17),
                }}
              >
                Ночью никого “не убили”.{'\n'}Доктор спас игрока.{'\n'}Шериф никого “не арестовал”.
              </Text>
            </View>
          )
        ) : (
          <></>
        )
      }
    />
  )
}

export default MafiaDeadModal
