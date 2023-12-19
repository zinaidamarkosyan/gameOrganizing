import { BLACK, LIGHT_LABEL, WHITE } from '@/theme/colors'
import { useState } from 'react'
import { joinInTeam } from '@/store/Slices/TeamSlice'
import { _storageUrl } from '@/constants'
import { useDispatch, useSelector } from 'react-redux'
import { font, RH, RW } from '@/theme/utils'
import { StyleSheet, Text, View } from 'react-native'
import ScreenMask from '@/components/wrappers/screen'
import Button from '@/components/buttons/Button'
import User from '@/components/User/user'
import Modal from '@/components/modal'
import FastImage from 'react-native-fast-image'

function Index({ route }) {
  const item = route.params

  const [modalVisible, setModalVisible] = useState(false)
  const userId = useSelector(({ auth }) => auth?.user?._id)

  const dispatch = useDispatch()
  const handleJoin = () => {
    dispatch(joinInTeam(item?._id, setModalVisible))
  }

  return (
    <ScreenMask>
      <Text style={styles.team}>{item?.name}</Text>
      <View style={styles.imageBlock}>
        <FastImage
          resizeMode="contain"
          style={styles.image}
          source={{ uri: _storageUrl + item?.img }}
        />
      </View>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.text}>Адрес нахождения команды</Text>
        <Text style={styles.textLined}>{item?.address_name}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: RH(15) }}>
        <Text style={{ ...styles.text, marginLeft: RW(15) }}>Организатор команды:</Text>
        <View style={{ marginLeft: RW(15) }}>
          <User
            size={40}
            onPressItem={{
              item: <User size={390} />,
              modalClose: false,
            }}
          />
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: RH(15) }}>
        <Text style={{ ...styles.text, marginLeft: RW(15) }}>Администратор команды:</Text>
        <View style={{ marginLeft: RW(15) }}>
          <User
            size={40}
            onPressItem={{
              item: <User size={390} />,
              modalClose: false,
            }}
          />
        </View>
      </View>
      {userId !== item.user && !item.invited_players?.includes(userId) ? (
        <View style={styles.btn}>
          <Button
            onPress={handleJoin}
            size={{ width: RW(360), height: RH(48) }}
            label={'Присоединиться к команде'}
            labelStyle={font('bold', 18, BLACK)}
          />
          {modalVisible && (
            <Modal
              navigationText={'Home'}
              item={
                <View style={styles.modal}>
                  <Text style={styles.successTeam}>{modalVisible}</Text>
                </View>
              }
              modalVisible={modalVisible}
              setIsVisible={setModalVisible}
            />
          )}
        </View>
      ) : null}
    </ScreenMask>
  )
}
const styles = StyleSheet.create({
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
  team: {
    textAlign: 'center',
    ...font('bold', 22, WHITE, 27),
    marginTop: RH(39),
    marginBottom: RH(57),
  },
  textLined: {
    ...font('bold', 14, WHITE, 19),
    marginVertical: RH(10),
    textDecorationLine: 'underline',
  },
  imageBlock: {
    width: RW(240),
    height: RW(240),
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: RH(33),
    borderWidth: 1,
    borderRadius: RW(150),
    borderColor: WHITE,
  },
  image: {
    borderWidth: 1,
    borderRadius: RW(150),
    width: '100%',
    height: '100%',
  },
  text: {
    ...font('bold', 14, WHITE, 20),
    marginTop: RH(5),
  },

  btn: {
    marginTop: 'auto',
    width: '100%',
    alignItems: 'center',
    marginBottom: RH(64),
  },
})

export default Index
