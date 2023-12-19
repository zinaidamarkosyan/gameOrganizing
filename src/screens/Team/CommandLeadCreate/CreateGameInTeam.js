import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { BACKGROUND, ICON, LIGHT_LABEL, RED, WHITE } from '@/theme/colors'
import { font, RH, RW } from '@/theme/utils'
import { useNavigation } from '@react-navigation/native'
import { createTeamGame } from '@/store/Slices/TeamSlice'
import ScreenMask from '@/components/wrappers/screen'
import DateComponent from '@/components/DateComponent'
import SearchAddresses from '@/screens/Map/SearchAddresses'
import RadioBlock from '@/components/RadioBlock'
import LightButton from '@/components/buttons/Button'
import Modal from '@/components/modal'

const CommandLeadCreate = ({ route }) => {
  const props = route.params
  const navigation = useNavigation()
  useEffect(() => {
    setGameId(props?._id)
  }, [])
  const playersChoose = [
    {
      id: 1,
      text: 'Весь состав команды',
      checked: true,
    },
    {
      id: 2,
      text: 'Выбрать игроков',
      checked: false,
    },
  ]
  // states
  const [startDate, setStartDate] = useState({ date: new Date(), time: new Date() })
  // const [radioPrice, setRadioPrice] = useState(priceList)
  const [radioPlayers, setRadioPlayers] = useState(playersChoose)
  const [gameId, setGameId] = useState()
  const [addressName, setAddressName] = useState('')
  const [price, setPrice] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  // states end
  // errors
  const [mapError, setMapError] = useState(false)
  // const [priceError, setPriceError] = useState(false)
  // errors end

  const dispatch = useDispatch()
  const { betweenPlayers, savedTeam } = useSelector(({ teams }) => teams)

  const timeFormat = (date) => {
    if (
      date.time.toLocaleTimeString().split(' ')[1] == 'PM' &&
      +date.time.toLocaleTimeString().slice(0, 2) != 12
    ) {
      return (
        +date.time.toLocaleTimeString().split(' ')[0].split(':')[0] +
        12 +
        ':' +
        date.time.toLocaleTimeString().split(':')[1]
      )
    } else if (date.time.toLocaleTimeString().split(' ')[0].split(':')[0].length == 1) {
      return (
        '0' +
        date.time.toLocaleTimeString().split(' ')[0].split(':')[0] +
        ':' +
        date.time.toLocaleTimeString().split(':')[1]
      )
    } else {
      return (
        date.time.toLocaleTimeString().split(' ')[0].split(':')[0] +
        ':' +
        date.time.toLocaleTimeString().split(':')[1]
      )
    }
  }
  const changedStartDate = startDate.date
    .toISOString()
    .substring(0, 10)
    .concat(' ' + timeFormat(startDate))

  const sendingData = {
    address_name: props?.address_name ? props?.address_name : addressName?.address_name,
    latitude: props?.fromMap ? props?.latitude : addressName.lat,
    longitude: props?.fromMap ? props?.longitude : addressName.lng,
    between_players: betweenPlayers,
    all_players: radioPlayers[0].checked ? true : false,
    ticket_price: price ? +price : 0,
    team: savedTeam?._id,
    game: gameId,
    players: ['64219136e3a868ee5e71a799'],
    start_date: changedStartDate,
  }
  const handleCreate = () => {
    if (radioPlayers[1].checked) {
      navigation.navigate('ChoosePlayers', {
        savedTeam: savedTeam,
        sendingData: sendingData,
      })
    } else {
      if (addressName.address_name && !props.latitude) {
        setMapError(false)
      } else {
        setMapError(true)
      }
      if (props.latitude) {
        setMapError(false)
      }
      // if (priceList.find(elm => elm.checked).text == 'Платно' && !price.length) {
      //   setPriceError(true)
      // } else {
      //   setPriceError(false)
      // }
      if (!mapError) {
        //&& !priceError
        dispatch(createTeamGame(sendingData, setModalVisible))
      } else {
        return null
      }
    }
  }
  return (
    <ScreenMask>
      <View style={styles.mainContainer}>
        <View style={styles.dateBox}>
          <DateComponent showTime={true} title="Дата и время начала игры"></DateComponent>
        </View>
        <View style={styles.mapBox}>
          <SearchAddresses
            navigateTo="CommandLeadCreate"
            setAddressName={setAddressName}
            addressName={addressName}
            show={false}
          />
        </View>
        {!!mapError && <Text style={styles.errorText}>Обязательное поле</Text>}

        {/* <RadioBlock
          list={radioPrice}
          onChange={setRadioPrice}
          titleStyle={{ color: ICON, left: '3%', paddingVertical: RH(10) }}
          title="Стоимость входного билета в игру"
        /> */}
        {/* {!!radioPrice[1].checked && (
          <View style={styles.priceInput}>
            <TextInput value={price} onChangeText={(e) => setPrice(e)} style={styles.price} />
          </View>
        )} */}
        {/* {!!priceError && <Text style={styles.errorText}>Обязательное поле</Text>} */}

        <RadioBlock
          list={radioPlayers}
          titleStyle={{ color: ICON, left: '3%', paddingVertical: RH(10) }}
          onChange={setRadioPlayers}
          title="Участие игроков"
        />
      </View>
      <View style={styles.bottomBtn}>
        <LightButton
          label={radioPlayers[0].checked ? 'Подтвердить' : 'Далее'}
          onPress={handleCreate}
        />
        {modalVisible[1] == 'ok' && (
          <Modal
            modalVisible={modalVisible[0]}
            setIsVisible={setModalVisible}
            navigationText="Home"
            item={
              <View style={styles.modal}>
                <Text style={styles.successTeam}>Вы успешно создали командную игру!</Text>
              </View>
            }
          />
        )}
      </View>
    </ScreenMask>
  )
}

export default CommandLeadCreate

const styles = StyleSheet.create({
  mainContainer: {
    width: '96%',
    top: '2%',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
  },
  dateBox: {
    width: '100%',
    alignSelf: 'center',
  },
  bottomBtn: {
    position: 'absolute',
    bottom: RH(40),
    right: RW(10),
  },
  mapBox: {
    paddingVertical: RH(20),
  },
  price: {
    color: ICON,
    width: '100%',
    textAlign: 'center',
    paddingHorizontal: RW(9),
    fontSize: RW(16),
  },
  priceInput: {
    backgroundColor: BACKGROUND,
    width: RW(100),
    height: RH(50),
    alignSelf: 'flex-start',
    flexDirection: 'row',
    marginLeft: RW(20),
    zIndex: 89,
    marginBottom: 20,
    borderRadius: RW(10),
    flexDirection: 'row',
    alignItems: 'center',
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
  errorText: {
    color: RED,
    top: RH(-4),
    left: RW(12),
    fontSize: RW(16),
  },
})
