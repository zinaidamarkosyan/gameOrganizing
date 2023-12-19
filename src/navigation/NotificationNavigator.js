import React, { useEffect, useRef } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NAV_HEADER_OPTION } from '@/constants'
import { io } from 'socket.io-client'
import { Platform } from 'react-native'
import { useGameSocketHelper } from './helpers'

import NotificationScreen from '@/screens/Notifications/NotificationScreen'
import NotificationSettings from '../screens/Notifications/NotificationSettings'
import { useDispatch, useSelector } from 'react-redux'

const Stack = createNativeStackNavigator()
const NotificationNavigator = () => {
  const socketRef = useRef(null)
  const token = useSelector(({ auth }) => auth.token)
  const callBackFunc = (e) => {
    console.log('notifcation socket ', e)
  }
  const {} = useGameSocketHelper(socketRef.current, callBackFunc)
  const dispatch = useDispatch()

  useEffect(() => {
    if (socketRef.current) return
    socketRef.current = io(`${Platform.OS == 'ios' ? 'wss' : 'ws'}://to-play.ru/notification`, {
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: token,
          },
        },
      },
    })
  }, [token])

  useEffect(() => {
    return () => {
      socketRef.current.disconnect()
      console.log('useEffect clearAllDatas')
      // dispatch(clearAllDatas())
    }
  }, [])

  return (
    <Stack.Navigator screenOptions={NAV_HEADER_OPTION}>
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen name="NotificationSettings" component={NotificationSettings} />
    </Stack.Navigator>
  )
}

export default NotificationNavigator
