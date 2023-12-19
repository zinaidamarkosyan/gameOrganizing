import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RH, RW, font } from '@/theme/utils'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { BACKGROUND, ICON, RED } from '@/theme/colors'
import { useNavigation } from '@react-navigation/native'
import SearchAddresses from '@/screens/Map/SearchAddresses'
import DateComponent from '@/components/DateComponent'
import ScreenMask from '@/components/wrappers/screen'
import RadioBlock from '@/components/RadioBlock'
import LightButton from '@/components/buttons/Button'
import GameType from '@/screens/Game/gameType'
import { searchTourney } from '@/store/Slices/TournamentSlice'

const JoinTournament = ({ route }) => {
  const { nameOfGames } = useSelector((gameSlice) => gameSlice.games)
  //states
  const [startDate, setStartDate] = useState(new Date())
  const [list, setList] = useState([
    { id: 1, text: 'Игры из Ваших предпочтений', checked: true },
    { id: 2, text: 'Все игры', checked: false },
    { id: 3, text: 'Выбрать игру', checked: false },
  ])
  const [gameTypes, setGameTypes] = useState(nameOfGames)
  const [showGameTypes, setShowGameTypes] = useState(false)
  const [tournamentFormat, setTournamentFormat] = useState([
    { id: 1, text: 'Индивидуальный', checked: true },
    { id: 2, text: 'Командный', checked: false },
  ])
  const [addressName, setAddressName] = useState(route?.params?.address_name)
  //errors
  const [addressError, setAddressError] = useState(false)
  const [notFoundError, setNotFoundError] = useState(false)

  const props = route.params
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const handleSubmit = () => {
    if (
      (props?.fromMap && (!props?.latitude || !props?.longitude || !props?.address_name)) ||
      (!props?.fromMap && (!addressName?.lat || !addressName?.lng || !addressName?.address_name))
    ) {
      setAddressError(true)
    } else {
      setAddressError(false)
      let ids = gameTypes?.filter((el) => el?.checked).map((el) => el?.id)
      const formData = {
        latitude: props?.fromMap ? props?.latitude : addressName?.lat,
        longitude: props?.fromMap ? props.longitude : addressName?.lng,
        address_name: props?.fromMap ? props?.address_name : addressName?.address_name,
        teamTourney: !tournamentFormat[0].checked,
        game_of_your_choice: !list[1].checked,
        // date_from: startDate.toISOString().substring(0, 10),
        games: ids,
      }
      dispatch(searchTourney(formData, navigation, setNotFoundError))
    }
  }
  return (
    <ScreenMask>
      <View style={styles.mainContainer}>
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
        <View style={styles.tournamentFormatContainer}>
          <RadioBlock
            list={tournamentFormat}
            left={0}
            title="Формат турнира"
            titleStyle={styles.radioTitle}
            onChange={setTournamentFormat}
          />
          <DateComponent
            title={'Дата турнира'}
            showTime={true}
            containerStyle={
              Platform.OS == 'ios' ? styles.dateContainerIOS : styles.dateContainerANDROID
            }
            dateValue={startDate}
            setDate={setStartDate}
            titleStyle={Platform.OS == 'ios' ? { left: '15%' } : ''}
          />
        </View>
        <View style={styles.mapBox}>
          <SearchAddresses
            navigateTo="JoinTournament"
            setAddressName={setAddressName}
            addressName={addressName}
            command={null}
          />
        </View>
        {addressError ? <Text style={styles.error}>Выберите аддрес</Text> : null}
      </View>
      {notFoundError ? <Text style={styles.error}>Турниров не найдено</Text> : null}

      <View style={styles.bottomBox}>
        <LightButton label={'Готово'} onPress={handleSubmit} />
      </View>
    </ScreenMask>
  )
}

export default JoinTournament

const styles = StyleSheet.create({
  mainContainer: {
    flex: 0.7,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  gameTypesContainer: {
    left: RW(18),
    backgroundColor: 'transparent',
  },
  tournamentFormatContainer: {
    left: RW(18),
    backgroundColor: 'transparent',
  },
  radioTitle: {
    color: ICON,
  },
  error: {
    ...font('regular', 18, RED),
    left: '6%',
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
  dateContainerIOS: {
    left: '-4%',
    width: '50%',
    justifyContent: 'space-evenly',
  },
  dateContainerANDROID: {
    width: '88%',
    justifyContent: 'space-evenly',
  },

  bottomBox: {
    position: 'absolute',
    bottom: RH(20),
    right: RW(20),
  },
})
