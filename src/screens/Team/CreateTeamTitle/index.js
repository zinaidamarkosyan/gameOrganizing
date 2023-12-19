import React, { useState, memo, useEffect } from 'react'
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native'
import ScreenMask from '@/components/wrappers/screen'
import { font, RH, RW } from '@/theme/utils'
import { BACKGROUND, ICON, LIGHT_LABEL, RADIO_TEXT, RED, WHITE } from '@/theme/colors'
import DownloadingIcon from '@/assets/svgs/downloadingSvg'
import LightButton from '@/components/buttons/Button'
import { launchImageLibrary } from 'react-native-image-picker'
import Index from '@/components/modal'
import SearchAddresses from '@/screens/Map/SearchAddresses'
import { createTeam } from '@/store/Slices/TeamSlice'
import { useSelector } from 'react-redux'
import FastImage from 'react-native-fast-image'

const CreateTeamTitle = ({ route }) => {
  const [avatar, setAvatar] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [teamName, setTeamName] = useState('')
  const [teamNameError, setTeamNameError] = useState(false)
  const [addressNameError, setAddressNameError] = useState(false)
  const [avatarError, setAvatarError] = useState(false)
  const [addressName, setAddressName] = useState('')
  const response = route?.params?.response
  const { token } = useSelector(({ auth }) => auth)
  const formdata = new FormData()
  const handleCreate = () => {
    if (!addressName) {
      setAddressNameError(true)
    } else {
      setAddressNameError(false)
    }
    if (!teamName) {
      setTeamNameError(true)
    } else {
      setTeamNameError(false)
    }
    if (!avatar?.assets?.[0].uri) {
      setAvatarError(true)
    } else {
      setAvatarError(false)
    }

    if (addressName?.address_name && teamName && avatar?.assets?.[0].uri) {
      formdata.append('name', teamName)
      formdata.append('address_name', addressName?.address_name)
      formdata.append('latitude', addressName?.latitude)
      formdata.append('longitude', addressName?.longitude)
      formdata.append('image', {
        name: avatar?.assets?.[0].fileName,
        type: avatar?.assets?.[0].type,
        uri: avatar?.assets?.[0].uri,
      })
      createTeam(formdata, token, setModalVisible)
    }
  }

  const uploadImageHandle = async () => {
    await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
      includeBase64: true,
      durationLimit: 10,
      selectionLimit: 1,
    }).then((result) => {
      if (result?.assets?.[0].uri) {
        setAvatarError(false)
        setAvatar(result)
      } else {
        setAvatar(null)
      }
    })
  }
  useEffect(() => {
    if (response?.fromMap) {
      setAddressName({
        address_name: response?.address_name,
        latitude: response?.latitude,
        longitude: response?.longitude,
      })
      if (response?.avatar) {
        setAvatar(response.avatar)
      }
      if (response?.teamName) {
        setTeamName(response.teamName)
      }
    }
  }, [response])

  return (
    <ScreenMask>
      <View style={{ height: '100%' }}>
        <View style={styles.inputsView}>
          <View style={styles.colBox}>
            <View style={styles.inputBlock}>
              <TextInput
                placeholder={'Название команды'}
                placeholderTextColor={ICON}
                maxLength={30}
                style={styles.inputs}
                onChangeText={(value) => setTeamName(value)}
              />
            </View>
            {teamNameError && (
              <Text style={styles.errorText}>Обязательное поле для заполнения</Text>
            )}
          </View>
          <View style={styles.colBox}>
            <View style={styles.inputBlock}>
              <SearchAddresses
                setAddressName={setAddressName}
                addressName={addressName}
                navigateTo="CreateTeamTitle"
                props={{
                  avatar,
                  teamName,
                }}
              />
            </View>
            {addressNameError && (
              <Text style={styles.errorText}>Обязательное поле для заполнения</Text>
            )}
          </View>
        </View>
        <View style={styles.uploadBox}>
          <TouchableOpacity style={styles.downloadingImg} onPress={uploadImageHandle}>
            {!avatar?.assets?.[0].uri ? (
              <View style={{ transform: [{ rotate: '180deg' }] }}>
                <DownloadingIcon />
              </View>
            ) : (
              <View style={styles.imgBox}>
                <FastImage
                  source={{ uri: avatar?.assets?.[0].uri }}
                  resizeMode={'cover'}
                  style={styles.img}
                />
              </View>
            )}
          </TouchableOpacity>
          <View>
            <Text style={styles.downloadingIcon}>Загрузите логотип команды</Text>
            <Text style={styles.noMore}>Не более 1МБ, 240x240px</Text>
          </View>
        </View>
        {avatarError && <Text style={styles.errorText}>Обязательное поле для заполнения</Text>}
        <Text style={styles.fileName}>{avatar?.assets?.[0].fileName}</Text>
      </View>

      <View style={styles.nextBtn}>
        <LightButton label={'Готово'} size={{ width: 144, height: 36 }} onPress={handleCreate} />
      </View>
      <Index
        item={
          <View style={styles.modal}>
            <Text style={styles.successTeam}>Вы успешно создали команду!</Text>
          </View>
        }
        modalVisible={modalVisible}
        setIsVisible={setModalVisible}
        navigationText={'Home'}
      />
    </ScreenMask>
  )
}
const styles = StyleSheet.create({
  common: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: '100%',
  },
  inputsView: {
    width: '100%',
    marginTop: RH(60),
  },
  colBox: {
    flexDirection: 'column',
  },
  uploadBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    alignItems: 'center',
  },
  imgBox: { width: RW(85), height: RH(85) },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: RW(44),
    marginHorizontal: RW(20),
  },
  inputs: {
    color: ICON,
    width: '80%',
    marginLeft: RW(20),
    fontSize: RW(16),
  },
  inputBlock: {
    backgroundColor: BACKGROUND,
    width: RW(380),
    height: RH(50),
    alignSelf: 'center',
    flexDirection: 'row',
    zIndex: 89,
    borderRadius: RW(10),
    margin: RH(10),
    alignItems: 'center',
  },
  downloadingImg: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: RH(15),
  },
  downloadingIcon: {
    ...font('inter', 16, RADIO_TEXT, 19),
    fontWeight: '400',
    marginBottom: RH(5),
  },
  noMore: {
    ...font('inter', 12, RADIO_TEXT, 15),
    fontWeight: '400',
  },
  nextBtn: {
    marginBottom: RH(30),
    marginTop: 'auto',
    marginLeft: 'auto',
    marginRight: RW(20),
  },
  fileName: {
    margin: RW(30),
    ...font('inter', 16, WHITE, 20),
  },
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
  errorText: {
    ...font('regular', 16, RED, 24),
    marginLeft: RW(14),
  },
})
export default memo(CreateTeamTitle)
