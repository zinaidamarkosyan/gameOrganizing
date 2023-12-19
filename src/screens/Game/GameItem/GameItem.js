import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { RH, RW, font } from '@/theme/utils'
import { useNavigation } from '@react-navigation/native'
import { _storageUrl } from '@/constants'
import { useDispatch } from 'react-redux'
import { joinGame } from '@/store/Slices/TeamSlice'
import ScreenMask from '@/components/wrappers/screen'
import User from '@/components/User/user'
import Button from '@/components/buttons/Button'
import Modal from '@/components/modal'
import FastImage from 'react-native-fast-image'
import { ICON, LIGHT_RED, WHITE } from '@/theme/colors'
import dateFormater from '@/helpers/dateFormater'

function GameItem({ route }) {
  const { item } = route.params
  const [error, setError] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const navigation = useNavigation()
  const dispatch = useDispatch()
  useEffect(() => {
    setError(false)
    setModalVisible(false)
  }, [])

  return (
    <ScreenMask>
      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.itemWrapper}>
          <View style={styles.bigIcon}>
            <FastImage
              resizeMode="contain"
              style={{ width: RW(260), height: RW(260) }}
              source={{ uri: _storageUrl + item?.game?.img }}
            />
          </View>
          <View>
            <Text style={styles.eachInfo}>Тип игры:</Text>
            <Text style={styles.eachInfoTwo}>{item?.game?.name}</Text>
            <Text style={styles.eachInfo}>Дата и время игры:</Text>
            <Text style={styles.eachInfoTwo}>{dateFormater(item?.start_date)}</Text>
            <Text style={styles.eachInfo}>Кол. игроков:</Text>
            <Text style={styles.eachInfoTwo}>
              от {item?.number_of_players_from} до {item?.number_of_players_to}
            </Text>
            <Text style={styles.eachInfo}>Возраст игроков:</Text>
            <Text style={styles.eachInfoTwo}>
              {item?.age_restrictions_from}-{item?.age_restrictions_to}
            </Text>
            <Text style={styles.eachInfo}>Половой признак игроков:</Text>
            <Text style={styles.eachInfoTwo}>
              {item?.players_gender == 'm'
                ? 'М'
                : item?.players_gender == 'f'
                ? 'Ж'
                : 'Без ограничений'}
            </Text>
            <Text style={styles.eachInfo}>Адрес проведения игры:</Text>
            <Text style={styles.eachInfoTwo}>{item?.address_name}</Text>
            <Text style={styles.eachInfo}>
              Дата и время подтверждения заявки на игру (не позднее):
            </Text>
            <Text style={styles.eachInfoTwo}>{dateFormater(item?.end_date)}</Text>
            {/* <Text style={styles.eachInfo}>Стоимость входного билета на игру: Бесплатно</Text>
          <Text style={styles.eachInfoTwo}>
            {item?.ticket_price ? `${item?.ticket_price} руб.` : 'Бесплатно'}
          </Text> */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.eachInfo}>Организатор игры:</Text>
              <View style={{ width: RW(60), paddingBottom: RH(20) }}>
                <User
                  size={40}
                  user={item?.user}
                  onPressItem={{
                    item: <User size={390} user={item?.user} />,
                    modalClose: false,
                  }}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 'auto',
              marginBottom: RH(30),
            }}
          >
            <Button
              label={'Присоединиться'}
              size={{ width: 313, height: 48 }}
              onPress={() => {
                dispatch(joinGame(item?.id, navigation, setError, setModalVisible))
              }}
            />
          </View>

          <Modal
            item={
              <View style={styles.modal}>
                <Text style={styles.errMessage}>{error}</Text>
              </View>
            }
            modalVisible={modalVisible}
            setIsVisible={setModalVisible}
          />
        </ScrollView>
      </View>
    </ScreenMask>
  )
}
const styles = StyleSheet.create({
  bigIcon: {
    width: '100%',
    alignItems: 'center',
    marginTop: RH(42),
    marginBottom: RH(33),
  },
  eachInfo: {
    ...font('regular', 14, WHITE, 20),
    marginLeft: RW(11),
    marginBottom: RH(6),
  },
  eachInfoTwo: {
    ...font('bold', 16, ICON, 20),
    marginLeft: RW(11),
    marginBottom: RH(24),
  },
  itemWrapper: {
    height: '85%',
    flexDirection: 'column',
  },
  modal: {
    width: RW(306),
    backgroundColor: LIGHT_RED,
    borderRadius: RW(20),
    padding: RW(30),
    marginHorizontal: RW(30.5),
  },
  errMessage: {
    ...font('inter', 18, WHITE, 20),
    textAlign: 'center',
  },
})

export default GameItem
