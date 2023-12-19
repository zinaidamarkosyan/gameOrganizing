import React, { useEffect, useState } from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import ScreenMask from '@/components/wrappers/screen'
import Row from '@/components/wrappers/row'
import FilterSvg from '@/assets/svgs/FilterSvg'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAllNotifications, getNotifications } from '@/store/Slices/AppSlice'
import Modal from '@/components/modal'
import { ICON, LIGHT_LABEL, WHITE } from '@/theme/colors'
import { font, RH, RW } from '@/theme/utils'
import NotificationItem from './NotificationItem'
import FastImage from 'react-native-fast-image'

function NotificationScreen() {
  const [modalVisible, setModalVisible] = useState(false)
  const { notifications } = useSelector(({ app }) => app)

  const navigation = useNavigation()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getNotifications())
  }, [])
  return (
    <ScreenMask>
      <View
        style={{
          flex: 1,
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
        }}
      >
        <FastImage
          resizeMode="contain"
          style={{ width: RW(360), position: 'absolute', height: RW(360) }}
          source={require('@/assets/bgLogo.png')}
        />
        <View
          style={{
            width: RW(360),
            height: RW(360),
            borderRadius: RW(180),
            position: 'absolute',
            backgroundColor: 'rgba(0,0,0,0.7)',
          }}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Уведомления</Text>
        <Row wrapper={styles.row}>
          <Pressable
            style={styles.settings}
            onPress={() => navigation.navigate('NotificationSettings')}
          >
            <Text style={styles.settingsText}>Настройки</Text>
            <FilterSvg />
          </Pressable>
          <Pressable style={styles.deleteAll} onPress={() => dispatch(deleteAllNotifications())}>
            <Text style={styles.deleteAllText}>Очистить все</Text>
          </Pressable>
        </Row>
        {/* {console.log('notifications', JSON.stringify(notifications, null, 4))} */}

        <FlatList
          contentContainerStyle={{ paddingBottom: RH(90) }}
          showsVerticalScrollIndicator={false}
          data={[...notifications].reverse()}
          renderItem={(elm) => (
            <NotificationItem elm={elm?.item} setModalVisible={setModalVisible} />
          )}
        />
      </View>
      {modalVisible ? (
        <Modal
          modalVisible={modalVisible}
          setIsVisible={setModalVisible}
          item={
            <View style={styles.modal}>
              <Text style={styles.successTeam}>{modalVisible}</Text>
            </View>
          }
        />
      ) : null}
    </ScreenMask>
  )
}
const styles = StyleSheet.create({
  container: {
    paddingTop: RH(36),
    alignItems: 'center',
  },
  title: {
    ...font('bold', 24, WHITE, 29),
    marginBottom: RH(32),
  },
  row: {
    justifyContent: 'space-between',
    width: '100%',
    marginHorizontal: RW(13),
    marginBottom: RH(16),
  },
  settings: {
    backgroundColor: '#142A5C',
    borderRadius: 30,
    borderWidth: RW(1),
    borderColor: '#657AC5',
    paddingVertical: RW(5),
    paddingHorizontal: RW(7),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsText: {
    ...font('bold', 14, ICON, 17),
    marginRight: RW(5),
  },
  deleteAll: {},
  deleteAllText: {
    ...font('bold', 14, ICON, 17),
    textDecorationLine: 'underline',
  },
  modal: {
    width: RW(285),
    backgroundColor: LIGHT_LABEL,
    borderRadius: RW(20),
    alignSelf: 'center',
    padding: RW(40),
    marginHorizontal: RW(30.5),
  },
  successTeam: {
    ...font('inter', 17, WHITE, 20),
    textAlign: 'center',
    lineHeight: RH(28),
  },
})

export default NotificationScreen
