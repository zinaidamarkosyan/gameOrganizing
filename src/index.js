import React, { useCallback, useEffect } from 'react'
import { StatusBar } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import NetInfo from '@react-native-community/netinfo'
import AppNavigator from '@/navigation/AppNavigator'
import AuthNavigator from './navigation/AuthNavigator'
import CustomModal from './components/CustomModal'
import { setToken } from '@/store/Slices/AuthSlice'
import { notificationListener, requestUserPermission } from './helpers/NotificationServices'
import { getNotificationCount, getNotifications, setModalOptions } from './store/Slices/AppSlice'
import { getProfileInfo } from './store/Slices/AuthSlice'
import { DARK_BLUE } from '@/theme/colors'

const MyApp = () => {
  const userId = useSelector(({ auth }) => auth?.user?._id)
  const token = useSelector(({ auth }) => auth.token)
  let internetConnectionFailed = false
  const dispatch = useDispatch()
  const myFunc = useCallback(async () => {
    let tokenWithAsync = await AsyncStorage.getItem('token')
    dispatch(setToken(tokenWithAsync))
  }, [])

  useEffect(() => {
    if (!token) myFunc()
  }, [token, myFunc])

  useEffect(() => {
    if (token && !userId) {
      dispatch(getProfileInfo())
    }
  }, [token, userId])

  const unsubscribe = NetInfo.addEventListener((state) => {
    if (!state.isConnected) {
      dispatch(
        setModalOptions({
          visible: true,
          type: 'error',
          body: 'Нет подключения к Интернету',
        }),
      )
      internetConnectionFailed = true
    } else if (internetConnectionFailed) {
      dispatch(
        setModalOptions({
          visible: true,
          type: 'message',
          body: 'Интернет соединение восстановлено',
        }),
      )
    }
  })
  const openModalFunc = (body, type) => {
    dispatch(
      setModalOptions({
        visible: true,
        type: type,
        body,
      }),
    )
  }
  useEffect(() => {
    requestUserPermission(openModalFunc)
    notificationListener(openModalFunc, () => {
      dispatch(getNotifications())
      dispatch(getNotificationCount())
    })
    unsubscribe()
  }, [])

  console.log('Token - ', token)

  return (
    <>
      <StatusBar barStyle={'light-content'} backgroundColor={DARK_BLUE} />
      {token ? <AppNavigator /> : <AuthNavigator />}
      <CustomModal />
    </>
  )
}

export default MyApp
