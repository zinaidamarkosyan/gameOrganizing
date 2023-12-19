import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ScreenMask from '@/components/wrappers/screen'

import Button from '@/components/buttons/Button'
import { BLACK, LIGHT_LABEL, WHITE } from '@/theme/colors'
import { font, RH, RW } from '@/theme/utils'
import User from '@/components/User/user'
import { _storageUrl } from '@/constants'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import Modal from '@/components/modal'
import { setFindedTeam } from '@/store/Slices/TeamSlice'
import { useNavigation } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'

function SearchedTeamSubmit({ route }) {
  const item = route.params
  const [modalVisible, setModalVisible] = useState(false)
  const navigation = useNavigation()
  const dispatch = useDispatch()
  //640b2c8d9f063da9a3cf6b7e
  const handleJoin = () => {
    dispatch(setFindedTeam(item))
    navigation.navigate('CommandLeadNotCreate', item)
  }
  return (
    <ScreenMask>
      <Text style={style.team}>{item?.name}</Text>
      <View style={style.imageBlock}>
        <FastImage
          style={style.image}
          resizeMode="contain"
          source={{ uri: _storageUrl + item?.img }}
        />
      </View>
      <View style={{ alignItems: 'center' }}>
        <Text style={style.text}>Адрес нахождения команды</Text>
        <Text style={style.textLined}>{item?.address_name}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: RH(15) }}>
        <Text style={{ ...style.text, marginLeft: RW(15) }}>Организатор команды:</Text>
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
        <Text style={{ ...style.text, marginLeft: RW(15) }}>Администратор команды:</Text>
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
      <View style={style.btn}>
        <Button
          onPress={handleJoin}
          size={{ width: RW(360), height: RH(48) }}
          label={'Подтвердить'}
          labelStyle={font('bold', 18, BLACK)}
        />
      </View>
      {modalVisible && (
        <Modal
          item={
            <View style={style.modal}>
              <Text style={style.successTeam}>Вы успешно присоединились к команду!</Text>
            </View>
          }
          modalVisible={modalVisible}
          setIsVisible={setModalVisible}
        />
      )}
    </ScreenMask>
  )
}

export default SearchedTeamSubmit
const style = StyleSheet.create({
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
    ...font('bold', 14, WHITE, 20),
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

  line: {
    width: RW(130),
    height: RH(1),
    backgroundColor: 'white',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: RH(45),
  },
  btns: {
    marginTop: RH(150),
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  btn: {
    marginTop: 'auto',
    width: '100%',
    alignItems: 'center',
    marginBottom: RH(64),
  },
})
