import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import ScreenMask from '@/components/wrappers/screen'
import User from '@/components/User/user'
import LightButton from '@/components/buttons/Button'
import Modal from '@/components/modal'
import { useDispatch } from 'react-redux'
import { SCREEN_BACKGROUND, WHITE } from '@/theme/colors'
import { font, RH, RW } from '@/theme/utils'
import { inviteUserToTeam } from '@/store/Slices/TeamSlice'

const SearchedUserInfo = ({ route }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const { command, member } = route.params
  const dispatch = useDispatch()
  console.log('command', command)
  const handleInvite = () => {
    console.log({
      team_id: command,
      user_id: member._id,
    })
    dispatch(
      inviteUserToTeam(
        {
          team_id: command,
          user_id: member._id,
        },
        setModalVisible,
      ),
    )
  }
  return (
    <ScreenMask>
      <Pressable
        style={{
          alignSelf: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '90%',
          zIndex: 15,
        }}
      >
        <User size={430} user={member} />
      </Pressable>
      <View style={styles.btnBox}>
        <LightButton
          label={'Пригласить в команду'}
          size={{ width: 308, height: 40 }}
          onPress={handleInvite}
        />
      </View>
      {modalVisible && (
        <Modal
          modalVisible={modalVisible}
          setIsVisible={setModalVisible}
          navigationText={'SearchTeamMembers'}
          item={
            <View style={styles.modalContainer}>
              <Text style={styles.playerMessage}>
                Игроку отправлен запрос на участие в команде.{'\n'} Ждем подтверждения!
              </Text>
            </View>
          }
        />
      )}
    </ScreenMask>
  )
}

export default SearchedUserInfo

const styles = StyleSheet.create({
  btnBox: {
    alignSelf: 'center',
  },
  modalContainer: {
    width: '90%',
    borderRadius: RW(20),
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
    // height: '6%',
    backgroundColor: SCREEN_BACKGROUND,
  },
  playerMessage: {
    ...font('regular', 16, WHITE),
    textAlign: 'center',
    width: '90%',
    padding: RH(20),
  },
})
