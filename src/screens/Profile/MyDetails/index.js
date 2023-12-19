import React, { useState } from 'react'
import ScreenMask from '@/components/wrappers/screen'
import {
  ImageBackground,
  StyleSheet,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native'
import TickSvg from '@/assets/svgs/tickSvg'
import InputBlock from '@/screens/Profile/MyDetails/inputBlock'
import RadioBlock from '@/components/RadioBlock'
import UserEditSvg from '@/assets/svgs/userEdit'
import Modal from '@/components/modal'
import { RW, RH, font } from '@/theme/utils'
import Button from '@/components/buttons/Button'
import DarkButton from '@/components/buttons/DarkButton'
import UploadIcon from '@/assets/svgs/uploadPhotoIcon'
import { launchImageLibrary } from 'react-native-image-picker'
import { useDispatch, useSelector } from 'react-redux'
import {
  connectVK,
  editProfile,
  setExpiredToken,
  setImage,
  setPending,
  setToken,
  setUser,
} from '@/store/Slices/AuthSlice'
import InAppBrowser from 'react-native-inappbrowser-reborn'
import { _storageUrl } from '@/constants'
import { clearAsyncStorage } from '../../../helpers/asyncStore'
import { LIGHT_LABEL, WHITE } from '@/theme/colors'
import { io } from 'socket.io-client'
import DateComponent from '@/components/DateComponent'
import VKIcon from '@/assets/imgs/VKIcon'
import { requestUserPermission } from '@/helpers/NotificationServices'

function Index() {
  const [isVisible, setIsVisible] = useState(false)
  const { avatar, name, surname, email, gender, phone_number, vk_uri, dob } = useSelector(
    ({ auth }) => auth.user,
  )
  const user = useSelector(({ auth }) => auth.user)
  const dispatch = useDispatch()

  const [editable, setEditable] = useState(false)
  const [nameState, setNameState] = useState(name)
  const [surNameState, setSurNameState] = useState(surname)
  const [emailState, setEmailState] = useState(email)
  const [phoneState, setPhoneState] = useState(phone_number)
  const [vkUriState, setVkUriState] = useState(vk_uri)
  const [dateState, setDateState] = useState(dob ? new Date(dob) : new Date())

  const [genderState, setGenderState] = useState([
    { text: 'М', checked: gender == 'male', label: 'male' },
    { text: 'Ж', checked: gender == 'female', label: 'female' },
  ])
  const { token } = useSelector(({ auth }) => auth)
  const socket = io.connect('http://to-play.ru/vk/authorize', {
    transports: ['websocket'],
  })

  const openLink = async (url) => {
    try {
      socket.on('message', (data) => {
        if (data.vkAuthInfo && data.token == token) {
          InAppBrowser.close()
          const vkAuthInfo = JSON.parse(data.vkAuthInfo)
          dispatch(
            connectVK({
              id: vkAuthInfo.id,
            }),
          )
        }
      })
      const canOpenURL = await Linking.canOpenURL(url)
      if ((await InAppBrowser?.isAvailable()) && canOpenURL) {
        await InAppBrowser.open(url, {
          //iOS Properties
          animated: true,
          readerMode: true,
          modalEnabled: true,
          enableBarCollapsing: false,
          dismissButtonStyle: 'cancel',
          preferredControlTintColor: 'rgba(101, 122, 197, 1)',
          preferredBarTintColor: '#001034',
          modalPresentationStyle: 'formSheet',
          modalTransitionStyle: 'coverVertical',
          //Android Properties
          showTitle: true,
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          navigationBarColor: '#001034',
          showInRecents: true,
          forceCloseOnRedirection: false,
          navigationBarDividerColor: '#001034',
          toolbarColor: '#001034',

          animations: {
            startEnter: 'slide_in_top',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_bottom',
            endExit: 'slide_out_right',
          },
        }).then(() => {
          socket.off('message')
        })
      }
    } catch (err) {
      socket.off('message')
      console.log('err', err)
    }
  }
  const uploadPhoto = async () => {
    const result = await launchImageLibrary({
      mediaType: 'mixed',
      quality: 1,
      includeBase64: true,
    })
    dispatch(setPending(true))
    setEditable(false)
    let myHeaders = new Headers()
    myHeaders.append('Content-Type', 'multipart/form-data')
    myHeaders.append('Authorization', `Bearer ${token}`)
    myHeaders.append('Accept', 'application/json')

    let formdata = new FormData()
    formdata.append('avatar', {
      name: 'uresPhoto',
      type: result?.assets?.[0]?.type,
      uri: result?.assets?.[0]?.uri,
    })

    let requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    }
    fetch(
      Platform.OS == 'ios'
        ? 'https://to-play.ru/api/profile/avatar'
        : 'http://to-play.ru/api/profile/avatar',
      requestOptions,
    )
      .then((response) => response.text())
      .then((result) => {
        dispatch(setImage(JSON.parse(result).avatar))
      })
      .catch((error) => console.log('error', error))
      .finally(() => dispatch(setPending(false)), setEditable(false))
  }

  const postEditUserFunc = () => {
    dispatch(
      setUser({
        ...user,
        ...{
          name: nameState,
          surname: surNameState,
          gender: genderState?.find((elem) => elem?.checked).label,
          dob: dateState,
          phone_number: phoneState,
          email: emailState,
          vk_uri: vkUriState,
        },
      }),
    )
    dispatch(
      editProfile({
        name: nameState,
        surname: surNameState,
        gender: genderState?.find((elem) => elem?.checked).label,
        dob: dateState,
        phone_number: phoneState?.toString(),
        email: emailState,
        vk_uri: vkUriState,
      }),
    )
  }
  return (
    <ScreenMask>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        <Text style={styles.title}>Мои данные</Text>
        <View style={styles.imgBlock}>
          <ImageBackground
            style={[styles.image, editable ? { opacity: 0.6 } : null]}
            imageStyle={styles.image}
            source={
              !avatar
                ? require('../../../assets/defualtUser.png')
                : avatar.startsWith('https://')
                ? { uri: avatar }
                : {
                    uri: _storageUrl + avatar,
                  }
            }
          >
            {editable && (
              <Pressable style={styles.uploadBtn} onPress={uploadPhoto}>
                <UploadIcon />
              </Pressable>
            )}
          </ImageBackground>
          <Pressable
            onPress={() => {
              if (editable) {
                postEditUserFunc()
              }
              setEditable(!editable)
            }}
          >
            {editable ? <TickSvg style={styles.tickSvg} /> : <UserEditSvg style={styles.tickSvg} />}
          </Pressable>
        </View>
        <View style={styles.formBlock}>
          <InputBlock text={'Имя:'} value={nameState} setValue={setNameState} editable={editable} />
          <InputBlock
            text={'Фамилия:'}
            value={surNameState}
            setValue={setSurNameState}
            editable={editable}
          />
          <RadioBlock
            list={genderState}
            title={'Пол:'}
            onChange={setGenderState}
            editable={editable}
          />

          <DateComponent
            title="Дата рождения:"
            titleStyle={{ color: '#fff' }}
            containerStyle={{ marginBottom: 14 }}
            editable={editable}
            dateValue={dateState}
            setDate={setDateState}
            showTime={false}
          />
          <InputBlock
            text={'Контактный тел.:'}
            placeholder={'Tел.'}
            value={phoneState}
            setValue={setPhoneState}
            editable={editable}
          />
          <InputBlock
            text={'E-mail:'}
            placeholder={'E-mail'}
            setValue={setEmailState}
            value={emailState}
            editable={editable}
          />
          {user.vk_uri ? (
            <InputBlock
              text={'VK:'}
              placeholder={'Ссылка на профиль'}
              value={vkUriState}
              setValue={setVkUriState}
              editable={editable}
            />
          ) : (
            <Pressable
              style={{ paddingTop: RH(10) }}
              onPress={() => openLink(`https://to-play.ru/vk/auth.html?${token}`)}
            >
              <VKIcon />
            </Pressable>
          )}
          <TouchableOpacity onPress={() => setIsVisible(true)} style={styles.logOut}>
            <Text style={styles.logOutText}>Выход из аккаунта</Text>
          </TouchableOpacity>
          <View style={{ position: 'absolute' }}>
            <Modal
              modalVisible={isVisible}
              setIsVisible={setIsVisible}
              btnClose={false}
              item={
                <View style={styles.topBlock}>
                  <Text style={styles.text}>Вы точно хотите выйти из аккаунта?</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: RW(220),
                    }}
                  >
                    <Button
                      onPress={async () => {
                        dispatch(setToken(null))
                        dispatch(setExpiredToken(null))
                        await clearAsyncStorage()
                        requestUserPermission()
                      }}
                      light={true}
                      size={{ width: 100, height: 36 }}
                      label={'Да'}
                    />
                    <DarkButton
                      onPress={() => setIsVisible(false)}
                      light={false}
                      size={{ width: 100, height: 36 }}
                      label={'Нет'}
                    />
                  </View>
                </View>
              }
            />
          </View>
        </View>
      </ScrollView>
    </ScreenMask>
  )
}
const styles = StyleSheet.create({
  container: {
    paddingTop: RW(43),
    alignItems: 'center',
  },
  title: {
    ...font('bold', 24, WHITE, 24),
    marginBottom: RW(32),
  },
  imgBlock: {
    flexDirection: 'row',
    width: '100%',
    paddingLeft: RW(120),
  },
  uploadBtn: {
    alignSelf: 'center',
    zIndex: 93,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: RW(84),
  },
  image: {
    width: RW(168),
    height: RW(168),
    borderRadius: RW(84),
    justifyContent: 'center',
    alignItems: 'center',
  },
  tickSvg: {
    marginLeft: RW(60),
  },
  logOut: {
    marginVertical: RH(46),
  },
  logOutText: {
    ...font('regular', 16, WHITE, 19),
    textDecorationLine: 'underline',
  },

  topBlock: {
    width: RW(306),
    paddingBottom: RH(25),
    alignItems: 'center',
    backgroundColor: LIGHT_LABEL,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 20,
  },
  text: {
    ...font('regular', 16, WHITE, 25),
    width: RW(200),
    textAlign: 'center',
    marginTop: RH(49),
    marginBottom: RH(31),
  },
})

export default Index
