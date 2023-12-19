import React, { useState } from 'react'
import ScreenMask from '@/components/wrappers/screen'
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { _storageUrl } from '@/constants'
import { font, RH, RW } from '@/theme/utils'
import { LIGHT_LABEL, WHITE } from '@/theme/colors'
import BorderGradient from '@/assets/svgs/BorderGradiend'
import User from '@/components/User/user'
import LightButton from '@/components/buttons/Button'
import Modal from '@/components/modal'
import { useDispatch } from 'react-redux'
import { createTeamGame } from '@/store/Slices/TeamSlice'
import FastImage from 'react-native-fast-image'
const ChoosePlayers = ({ route }) => {
  const { savedTeam, sendingData } = route.params
  const [modalVisible, setModalVisible] = useState(false)
  const [data, setData] = useState(sendingData)
  const dispatch = useDispatch()
  const UserItem = ({ user }) => {
    //need fetch users in command and show
    const [visible, setVisible] = useState(false)
    const [choosedUsers, setChoosedUsers] = useState([])
    return (
      <>
        <Pressable
          style={styles.eachUser}
          onPress={() => {
            setVisible(!visible)
          }}
        >
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <BorderGradient height={142} width={105} opacity={visible ? 1 : 0} />
            <View style={{ position: 'absolute' }}>
              <User size={110} user={user} />
            </View>
          </View>
        </Pressable>
      </>
    )
  }
  return (
    <ScreenMask>
      <ScrollView showsVerticalScrollIndicator={false} horizontal={false}>
        <View>
          <View style={styles.rowBox}>
            <Text style={styles.topTitle}>{savedTeam?.name}</Text>
            <FastImage
              style={styles.commandImg}
              source={{ uri: _storageUrl + savedTeam?.img }}
              resizeMode="cover"
            />
          </View>
          <View style={styles.playersContainer}>
            {savedTeam?.players.map((elm, i) => {
              console.log(elm.user.name)
              return <UserItem key={i} user={elm.user} />
            })}
          </View>
        </View>
        <View style={{ alignSelf: 'center', paddingTop: RH(130), marginBottom: RH(20) }}>
          <LightButton
            label={'Подтвердить'}
            size={{ width: 265, height: 42 }}
            onPress={() => dispatch(createTeamGame(data, setModalVisible))}
          />
        </View>
        {!!modalVisible && (
          <Modal
            item={
              <View style={styles.modal}>
                <Text style={styles.successTeam}>Вы успешно создали командную игру!</Text>
              </View>
            }
            modalVisible={modalVisible}
            setIsVisible={setModalVisible}
            navigationText={'Home'}
          />
        )}
      </ScrollView>
    </ScreenMask>
  )
}

export default ChoosePlayers

const styles = StyleSheet.create({
  topTitle: {
    textAlign: 'center',
    ...font('bold', 22, WHITE),
    marginVertical: RH(15),
  },
  commandImg: {
    width: RW(40),
    height: RW(40),
    borderRadius: RW(20),
    marginRight: '3%',
    borderWidth: 1,
    borderColor: WHITE,
  },
  rowBox: {
    width: '100%',
    flexDirection: 'row-reverse',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    top: RH(15),
  },
  playersContainer: {
    width: '100%',
    top: '10%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  eachUser: {
    padding: RW(5),
  },
  modal: {
    width: RW(306),
    backgroundColor: LIGHT_LABEL,
    borderRadius: RW(20),
    padding: RW(40),
    marginHorizontal: RW(30.5),
  },
  successTeam: {
    ...font('inter', 17, WHITE, 20),
    textAlign: 'center',
  },
})
