import React, { useEffect } from 'react'
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import NotificationIcon from '@/assets/imgs/NotificationIcon'
import ScreenMask from '@/components/wrappers/screen'
import CalendarIcon from '@/assets/imgs/CalendarIcon'
import { RH, RW, font } from '@/theme/utils'
import User from '@/components/User/user'
import LogoSvg from '@/assets/LogoSvg'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { participateToGame } from '@/store/Slices/GamesSlice'
import { useDispatch, useSelector } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import { getMessagesCount, getNotificationCount } from '@/store/Slices/AppSlice'
const HomeScreen = ({ route }) => {
  const navigation = useNavigation()
  const propsGameId = route.params?.id
  const notificationCount = useSelector(({ app }) => app.notificationCount)
  const isFocused = useIsFocused()
  const dispatch = useDispatch()
  useEffect(() => {
    if (propsGameId) {
      dispatch(participateToGame(propsGameId))
    }
  }, [propsGameId])
  useEffect(() => {
    if (isFocused) {
      dispatch(getNotificationCount())
      dispatch(getMessagesCount())
    }
  }, [isFocused])

  return (
    <ScreenMask>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CalendarNavigator')
          }}
        >
          <CalendarIcon />
        </TouchableOpacity>
        <Pressable onPress={() => navigation.navigate('NotificationNavigator')}>
          {notificationCount ? (
            <LinearGradient
              style={styles.notificationCount}
              colors={['#7DCE8A', '#4D7CFE']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.notificationCountText}>{notificationCount}</Text>
            </LinearGradient>
          ) : null}

          <NotificationIcon />
        </Pressable>
      </View>
      <View style={styles.logoContainer}>
        <LogoSvg width={196} height={130} />
      </View>

      <View style={styles.detailContainer}>
        <User size={370} />
      </View>
    </ScreenMask>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  detailContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    paddingTop: RH(21),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoContainer: {
    position: 'absolute',
    top: RH(67),
    alignSelf: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    width: RW(12),
    height: RW(12),
    borderRadius: RW(8),
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCountText: font('bold', 8, '#1A2848'),
})
