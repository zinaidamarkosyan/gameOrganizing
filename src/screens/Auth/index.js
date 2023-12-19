import React from 'react'
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import ScreenMask from '@/components/wrappers/screen'
import LightButton from '@/components/buttons/Button'
import Row from '@/components/wrappers/row'
import { font, RH, RW } from '@/theme/utils'
import { WHITE } from '@/theme/colors'
import VKIcon from '@/assets/imgs/VKIcon'
import InAppBrowser from 'react-native-inappbrowser-reborn'
import { io } from 'socket.io-client'
import { useDispatch } from 'react-redux'
import { vkAuth } from '@/store/Slices/AuthSlice'
import LogoSvg from '@/assets/LogoSvg'
const socket = io.connect('http://to-play.ru/vk/authorize', {
  transports: ['websocket'],
})
const token = () => {
  return Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2)
}
let expiredToken
const AuthHome = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const openLink = async (url) => {
    try {
      socket.on('message', (data) => {
        if (data.vkAuthInfo && data.token == expiredToken) {
          InAppBrowser.close()
          const vkAuthInfo = JSON.parse(data.vkAuthInfo)
          dispatch(
            vkAuth({
              id: vkAuthInfo.id,
              first_name: vkAuthInfo.first_name,
              last_name: vkAuthInfo?.last_name,
              bdate: vkAuthInfo?.bdate,
              has_photo: vkAuthInfo?.has_photo,
              photo_200: vkAuthInfo?.photo_200,
              has_photo: vkAuthInfo?.has_photo,
              photo_200: vkAuthInfo?.photo_200,
              sex: vkAuthInfo?.sex,
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

  return (
    <ScreenMask>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Добро пожаловать!</Text>
      </View>
      <View style={styles.logoContainer}>
        <LogoSvg />
      </View>
      <View style={styles.bottom}>
        <Row justifyContent={'space-between'}>
          <LightButton
            label={'Вход'}
            onPress={() => {
              navigation.navigate('SignIn')
            }}
          />
          <LightButton
            label={'Регистрация'}
            onPress={() => {
              navigation.navigate('SignUp')
            }}
          />
        </Row>
        <View style={styles.vk}>
          <Text style={styles.vkTitle}>Вход через</Text>
          <Pressable
            style={styles.vkButton}
            onPress={() => {
              expiredToken = token()
              openLink(`https://to-play.ru/vk/auth.html?${expiredToken}`)
            }}
          >
            <VKIcon />
          </Pressable>
        </View>
      </View>
    </ScreenMask>
  )
}

export default AuthHome

const styles = StyleSheet.create({
  bottom: {
    left: 0,
    right: 0,
    bottom: RH(30),
    position: 'absolute',
  },
  vk: {
    alignItems: 'center',
    marginTop: RH(10),
  },
  title: {
    ...font('regular', 32, WHITE),
  },
  vkButton: {
    marginTop: RH(8),
  },
  titleContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: RH(180),
  },
  vkTitle: {
    paddingHorizontal: RW(10),
    ...font('regular', 20, WHITE, 27),
    textAlign: 'center',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
