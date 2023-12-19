import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import GameType from '../gameType'
import { BACKGROUND, ICON, RED, WHITE } from '@/theme/colors'
import { font, RH, RW } from '@/theme/utils'
import ScreenMask from '@/components/wrappers/screen'
import RadioBlock from '@/components/RadioBlock'
import DateComponent from '@/components/DateComponent'
import SearchAddresses from '@/screens/Map/SearchAddresses'
import LightButton from '@/components/buttons/Button'
import { useDispatch, useSelector } from 'react-redux'
import { getGamesOnlyNames } from '@/store/Slices/GamesSlice'
import { searchGame, setFindedGames } from '@/store/Slices/TeamSlice'

const JoinGame = ({ route }) => {
  const props = route?.params
  const dispatch = useDispatch()
  const { nameOfGames } = useSelector((gameSlice) => gameSlice.games)

  // const freeOrPaid = [
  //   { id: 4, text: 'Бесплатно', checked: true },
  //   { id: 5, text: 'Платно', checked: false },
  // ]
  const chooseGameType = [
    { id: 1, text: 'Игры из Ваших предпочтений', checked: true },
    { id: 2, text: 'Все игры', checked: false },
    { id: 3, text: 'Выбрать игру', checked: false },
  ]
  const navigation = useNavigation()

  //states
  const [showGameTypes, setShowGameTypes] = useState(false)
  const [addressName, setAddressName] = useState(route?.params?.address_name)
  const [addressError, setAddressError] = useState()

  const [gameTypes, setGameTypes] = useState(nameOfGames)
  const [list, setList] = useState(chooseGameType)
  //datesState
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  //errors
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
  const checkChecks = gameTypes.some((elm) => elm.checked === true)

  const showHideError = () => {
    if (!checkChecks && list[2].checked) {
      setErrorMessage(true)
    } else {
      setErrorMessage(false)
    }
    if (!addressName.address_name) {
      setAddressError('Обязательное поле для заполнения')
    } else {
      setAddressError(null)
    }
    if (addressName.address_name && startDate <= endDate) {
      let ids = gameTypes?.filter((el) => el?.checked).map((el) => el?.id)
      const formData = {
        latitude: addressName?.latitude,
        longitude: addressName?.longitude,
        address_name: addressName?.address_name,
        game_of_your_choice: !list[1].checked,
        date_from: startDate.toISOString().substring(0, 10),
        data_to: endDate.toISOString().substring(0, 10),
        games: ids,
      }
      dispatch(searchGame(formData, navigation, setError))
    } else {
      console.log('error')
    }
  }
  useEffect(() => {
    if (route.params?.fromMap) {
      setAddressName(route.params)
      route.params = {}
    }
  }, [route.params?.fromMap])
  useEffect(() => {
    !nameOfGames.length && dispatch(getGamesOnlyNames())
    dispatch(setFindedGames([]))
  }, [])

  useEffect(() => {
    setGameTypes(nameOfGames)
  }, [nameOfGames])
  return (
    <ScreenMask>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.gameTypesContainer}>
          <RadioBlock
            list={list}
            left={0}
            title="Игра"
            titleStyle={styles.radioTitle}
            onChange={setList}
          />
        </View>

        {list.find((el) => el.checked).text === 'Выбрать игру' ? (
          <GameType
            showGameTypes={showGameTypes}
            setShowGameTypes={setShowGameTypes}
            gameTypes={gameTypes}
            setGameTypes={setGameTypes}
            errorMessage={errorMessage}
          />
        ) : null}
        <View>
          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.someTitle}>Дата игры</Text>
            <View style={styles.datesContainer}>
              <DateComponent
                showTime={false}
                dateAndroidStyle={{ width: RW(170) }}
                dateValue={startDate}
                setDate={setStartDate}
              />
              <View style={styles.dash}></View>
              <DateComponent
                showTime={false}
                dateAndroidStyle={{ width: RW(170) }}
                dateValue={endDate}
                setDate={setEndDate}
                minDate={startDate}
              />
            </View>
          </View>

          <SearchAddresses
            navigateTo="Join"
            setAddressName={setAddressName}
            addressName={addressName}
            show={false}
          />
          {addressError && <Text style={styles.errorText}>{addressError}</Text>}
        </View>
      </ScrollView>
      {error ? <Text style={styles.errorText}>Не найденно</Text> : null}
      <View
        style={[
          styles.bottomButton,
          {
            bottom: RH(35),
            height: RH(36),
            width: '100%',
            alignItems: 'flex-end',
            backgroundColor: 'transparent',
          },
        ]}
      >
        <LightButton
          label={'Готово'}
          onPress={() => {
            showHideError()
          }}
          size={{ width: RW(144), height: '100%' }}
        />
      </View>
    </ScreenMask>
  )
}

export default JoinGame

const styles = StyleSheet.create({
  gameTypesContainer: {
    marginTop: '10%',
    left: RW(18),
    backgroundColor: 'transparent',
  },
  radioTitle: {
    color: ICON,
  },
  errorText: {
    ...font('medium', 18, RED),
    top: RH(15),
    left: RW(20),
  },
  openedGameBtn: {
    borderRadius: RW(10),
    backgroundColor: BACKGROUND,
    width: RW(380),
    height: RH(48),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceInput: {
    backgroundColor: BACKGROUND,
    width: RW(190),
    height: RH(50),
    flexDirection: 'row',
    borderRadius: RW(10),
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: RW(13),
  },
  priceInputText: {
    color: ICON,
    width: '80%',
    marginLeft: RW(15),
    fontSize: RW(16),
  },
  someTitle: {
    color: ICON,
    marginLeft: RW(10),
    alignSelf: 'flex-start',
    top: '15%',
    // marginVertical: RH(10),
  },
  datesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: RH(20),
    width: RW(380),
    alignSelf: 'center',
    // marginBottom: RH(30),
  },
  dash: {
    width: RW(10),
    height: 0,
    top: '4%',
    borderColor: ICON,
    borderWidth: RW(2),
    borderRadius: RW(2),
  },
  bottomButton: {
    marginLeft: 'auto',
    marginRight: RW(10),
    backgroundColor: 'transparent',
  },
  loading: {
    ...font('regular', 15, WHITE),
    left: '-4%',
  },
})
