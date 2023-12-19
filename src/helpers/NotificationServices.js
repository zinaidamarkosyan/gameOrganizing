import AsyncStorage from '@react-native-async-storage/async-storage'
import messaging from '@react-native-firebase/messaging'
import PushNotification from 'react-native-push-notification'

const requestUserPermission = async (openModalFunc) => {
  const authStatus = await messaging().requestPermission()
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL

  if (enabled) {
    // console.log('Authorization status:', authStatus)
    getFcmToken(openModalFunc)
  }
}
const notificationListener = async (openModalFunc, callBack) => {
  messaging().onNotificationOpenedApp((remoteMessage) => {
    console.log('Notification caused app to open from background state:', remoteMessage)
  })
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('Message handled in the background!', remoteMessage)

    PushNotification.setApplicationIconBadgeNumber(
      PushNotification.getApplicationIconBadgeNumber() + 1,
    )
  })

  messaging().onMessage(async (remoteMessage) => {
    console.log('Recived in foreground', remoteMessage)
    callBack()
    if (Platform.OS == 'android') {
      openModalFunc(
        remoteMessage.notification.title + '\n' + remoteMessage.notification.body,
        'message',
      )
    }
  })
  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        console.log('Notification caused app to open from quit state:', remoteMessage.notification)
      }
    })
}
const getFcmToken = async (openModalFunc) => {
  const fcmToken = await AsyncStorage.getItem('fcmToken')
  // console.log('The old generated fcmToken', fcmToken)
  if (!fcmToken) {
    try {
      let fcmToken = await messaging().getToken()
      if (fcmToken) {
        // console.log('The new generated fcmToken', fcmToken)
        await AsyncStorage.setItem('fcmToken', fcmToken)
      }
    } catch (error) {
      console.log('Error rasied in fcmToken', error)
      // alert('Error in notification service')
      openModalFunc('Error in notification service', 'error')
    }
  }
}

export { requestUserPermission, notificationListener, getFcmToken }
