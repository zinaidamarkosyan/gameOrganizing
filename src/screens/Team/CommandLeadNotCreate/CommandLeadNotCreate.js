import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BACKGROUND, ICON } from '@/theme/colors'
import { font, RH, RW } from '@/theme/utils'
import { useDispatch, useSelector } from 'react-redux'
import SearchSvg from '@/assets/svgs/searchSvg'
import RadioBlock from '@/components/RadioBlock'
import DateComponent from '@/components/DateComponent'
import ScreenMask from '@/components/wrappers/screen'
import SearchAddresses from '@/screens/Map/SearchAddresses'
import LightButton from '@/components/buttons/Button'
import { useNavigation } from '@react-navigation/native'
import { getMembersList, searchTeam, setFindedTeam } from '@/store/Slices/TeamSlice'

const CommandLeadNotCreate = ({ route }) => {
  const item = route.params
  const choosedTeamGame = useSelector(({ teams }) => teams.choosedTeamGame)
  const { betweenPlayers, findedTeam, savedTeam } = useSelector(({ teams }) => teams)
  const dispatch = useDispatch()
  const navigation = useNavigation()
  //states ===================================
  const [gameId, setGameId] = useState(null)
  const [enemyTeam, setEnemyTeam] = useState('')
  const [startDate, setStartDate] = useState({ date: new Date(), time: new Date() })
  const [addresName, setAddressName] = useState('')
  // const [price, setPrice] = useState('')
  const [formats, setFormats] = useState(
    choosedTeamGame?.formats?.map((elm, i) => {
      return { id: i, text: elm, checked: false }
    }),
  )
  // const [priceList, setPriceList] = useState([
  //   { id: 1, text: 'Бесплатно', checked: true },
  //   { id: 2, text: 'Платно', checked: false },
  // ])
  // states end ================================
  // error states =============================
  const [enemyTeamError, setEnemyTeamError] = useState(false)
  // const [formatError, setFormatError] = useState(false)
  const [mapError, setMapError] = useState(false)
  // const [priceError, setPriceError] = useState(false)
  // error states end =========================
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

  let sendingData = {
    address_name: item?.fromMap ? item?.address_name : addresName?.address_name,
    latitude: item?.fromMap ? item?.latitude : addresName?.lat,
    longitude: item?.fromMap ? item?.longitude : addresName?.lng,
    between_players: betweenPlayers,
    all_players: false,
    ticket_price: 0, //price ? price : 0
    team: savedTeam?._id,
    // gtac team i id
    //  enemy_team: findedTeam?._id
    // enemy_team_name: enemyTeam,
    game: gameId?.id,
    // players id
    players: ['64219136e3a868ee5e71a799'],
    // savedTeam?.players?.map(elm => elm?._id),
    start_date: changedStartDate,
    // svoya igra i jamanaka drvum
    name: '',
    description: '',
  }
  const handleSubmit = () => {
    if (!enemyTeam?.length) {
      setEnemyTeamError(true)
    } else {
      setEnemyTeamError(false)
    }
    if (addresName?.address_name && !item?.latitude) {
      setMapError(false)
    } else {
      setMapError(true)
    }
    if (item?.latitude) {
      setMapError(false)
    }
    // if (priceList?.find((elm) => elm?.checked)?.text == 'Платно' && !price?.length) {
    //   setPriceError(true)
    // } else {
    //   setPriceError(false)
    // }
    if (
      Boolean(
        addresName?.address_name || item?.latitude,
        0, //price
        enemyTeam,
        formats?.filter((elm) => elm?.checked)?.length,
      )
    ) {
      sendingData.enemy_team_name = enemyTeam
      navigation.navigate('TeamInfo', { sendingData, gameId })
    }
  }
  useEffect(() => {
    if (item?._id && item?.img) {
      setGameId({ id: item?._id, img: item?.img })
    }
  }, [item])
  useEffect(() => {
    if (savedTeam?._id) {
      dispatch(getMembersList(savedTeam?._id))
    }
  }, [savedTeam])

  useEffect(() => {
    if (findedTeam) {
      setEnemyTeam(findedTeam?.name)
      sendingData.enemy_team = findedTeam?._id
      delete sendingData.enemy_team_name
    }
  }, [findedTeam])

  return (
    <ScreenMask>
      <ScrollView style={{ flex: 1.1 }}>
        <Text style={styles.searchTitle}>Название команды соперника</Text>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder={'Поиск'}
            placeholderTextColor={ICON}
            value={enemyTeam}
            onChangeText={(e) => {
              setEnemyTeam(e)
              dispatch(setFindedTeam(''))
              delete sendingData.enemy_team
            }}
          />
          <TouchableOpacity
            style={styles.searchIcon}
            onPress={() => {
              dispatch(searchTeam(enemyTeam, () => {}, navigation, 'SearchTeamInvite', sendingData))
            }}
          >
            <SearchSvg />
          </TouchableOpacity>
        </View>
        {!!enemyTeamError && <Text style={styles.errorText}>Обязательное поле</Text>}
        <View>
          {formats?.length ? (
            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
              <RadioBlock
                list={formats}
                onChange={setFormats}
                title={'Формат игры'}
                titleStyle={{ color: ICON, left: '3%' }}
              />
            </View>
          ) : null}
        </View>
        <View style={styles.dateBox}>
          <DateComponent
            showTime={true}
            title="Дата и время начала игры"
            dateValue={startDate.date}
            timeValue={startDate.time}
            setDate={(date) => setStartDate({ ...startDate, date })}
            setTime={(time) => setStartDate({ ...startDate, time })}
          />
        </View>
        <View style={styles.mapBox}>
          <SearchAddresses
            size={380}
            navigateTo="CommandLeadNotCreate"
            setAddressName={setAddressName}
            addressName={addresName}
            show={false}
          />
          {!!mapError && <Text style={styles.errorText}>Обязательное поле</Text>}
        </View>
        {/* {priceList?.length ? (
          <RadioBlock
            title={'Стоимость входного билета в игру'}
            list={priceList}
            onChange={setPriceList}
            titleStyle={styles.searchTitle}
          />
        ) : null}

        {!!priceList[1]?.checked && (
          <View style={styles.priceInput}>
            <TextInput value={price} onChangeText={(e) => setPrice(e)} style={styles.price} />
          </View>
        )}
        {!!priceError && !!priceList[1].checked && (
          <Text style={styles.errorText}>Заполните поле</Text>
        )} */}
      </ScrollView>
      <View style={{ right: RW(10), bottom: RH(20), position: 'absolute' }}>
        <LightButton label={'Готово'} onPress={handleSubmit} />
      </View>
    </ScreenMask>
  )
}

export default CommandLeadNotCreate

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'space-evenly',
    flex: 0.8,
  },
  container: {
    backgroundColor: BACKGROUND,
    width: RW(380),
    height: RH(50),
    alignSelf: 'center',
    flexDirection: 'row',
    marginBottom: RH(10),
    marginTop: RH(20),
    zIndex: 89,
    borderRadius: RW(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    color: ICON,
    width: '80%',
    marginLeft: RW(20),
    fontSize: RW(16),
  },
  errorText: {
    color: 'red',
    left: RW(12),
    fontSize: RW(16),
  },
  mapIcon: {
    left: '25%',
  },
  searchTitle: {
    ...font('regular', 16, ICON),
    top: '2%',
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
  dateBox: {
    width: RW(380),
    alignSelf: 'center',
  },
  formatInputBox: {
    width: RW(70),
    height: RH(45),
    backgroundColor: BACKGROUND,
    borderRadius: RH(10),
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    left: RW(10),
    bottom: RH(10),
    justifyContent: 'center',
  },
  formatInput: {
    height: '100%',
    top: '2%',
    width: '40%',
    backgroundColor: BACKGROUND,
    borderRadius: RH(10),
    textAlign: 'center',
    color: ICON,
  },
  mapBox: {
    marginVertical: RH(20),
  },
})
