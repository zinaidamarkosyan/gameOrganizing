import React, { useState } from 'react'
import { _storageUrl } from '@/constants'
import { LIGHT_LABEL, WHITE } from '@/theme/colors'
import { font, RH, RW } from '@/theme/utils'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import LightButton from '@/components/buttons/Button'
import User from '@/components/User/user'
import ScreenMask from '@/components/wrappers/screen'
import { useDispatch } from 'react-redux'
import { deletePlayerFromTeam, setPlayerAdmin } from '@/store/Slices/TeamSlice'
import FastImage from 'react-native-fast-image'
import Modal from '@/components/modal'

const EachMember = ({ route }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const command = route?.params?.command
  const user = route?.params.user
  const dispatch = useDispatch()

  const submitAdmin = () => {
    dispatch(
      setPlayerAdmin(
        {
          team_id: command?._id,
          user_id: user?._id,
        },
        setModalVisible,
      ),
    )
  }
  const handleDelete = () => {
    dispatch(
      deletePlayerFromTeam(
        {
          team_id: command?._id,
          user_id: user?._id,
        },
        setModalVisible,
      ),
    )
  }
  return (
    <ScreenMask>
      <Pressable
        style={{
          width: '100%',
          alignSelf: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '95%',
          zIndex: 15,
        }}
      >
        <View style={styles.rowBox}>
          <Text style={styles.topTitle}>{command.name}</Text>
          <FastImage
            source={{ uri: _storageUrl + command.img }}
            resizeMode="cover"
            style={styles.commandImg}
          />
        </View>
        <User user={user} size={390} />
        <View style={styles.btnsBox}>
          <LightButton
            label={'Сделать администратором'}
            size={{ width: 308, height: 45 }}
            onPress={submitAdmin}
          />
          <LightButton
            label={'Удалить из команды'}
            size={{ width: 308, height: 45 }}
            onPress={handleDelete}
          />
        </View>
      </Pressable>
      <Modal
        item={
          <View style={styles.modal}>
            <Text style={styles.modalText}>{modalVisible}</Text>
          </View>
        }
        modalVisible={modalVisible}
        setIsVisible={setModalVisible}
      />
    </ScreenMask>
  )
}
const styles = StyleSheet.create({
  btnsBox: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column',
    alignSelf: 'center',
    height: '12%',
    justifyContent: 'space-between',
  },
  topTitle: {
    textAlign: 'center',
    ...font('bold', 22, WHITE),
    marginVertical: RH(15),
  },
  commandImg: {
    width: RW(40),
    height: RW(40),
    borderRadius: RW(20),
    marginLeft: '3%',
    borderWidth: 1,
    borderColor: WHITE,
  },
  rowBox: {
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    top: RH(15),
  },
  modal: {
    width: RW(306),
    backgroundColor: LIGHT_LABEL,
    borderRadius: RW(20),
    padding: RW(20),
    marginHorizontal: RW(30.5),
  },
  modalText: {
    ...font('inter', 16, WHITE, 20),
    textAlign: 'center',
  },
})
export default EachMember
