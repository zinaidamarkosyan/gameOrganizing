import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAvoidingView, Platform, ScrollView, Text, View, StyleSheet } from 'react-native'
import { RH, RW, font } from '@/theme/utils'
//components
import Button from '@/components/buttons/Button'
import Modal from '@/components/modal'
import SecondBlock from './components/SecondBlock'
import ScreenMask from '@/components/wrappers/screen'
import SearchAddresses from '../../Map/SearchAddresses'
import { ICON, LIGHT_LABEL, LIGHT_RED, WHITE } from '@/theme/colors'

// redux
import { useDispatch, useSelector } from 'react-redux'
import {
  setGame,
  setOrganizer_in_the_game,
  setPlayers_gender,
} from '@/store/Slices/GameCreatingSlice'
import RadioBlock from '@/components/RadioBlock'
import DateComponent from '@/components/DateComponent'

const GameCreating = ({ route }) => {
  let { game, response, editGame, name } = route?.params
  const navigation = useNavigation()

  //states
  const initialState = useSelector((state) => state.game)

  const [modalOpen, setModalOpen] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const [addressName, setAddressName] = useState()

  // error messages
  const [startDateError, setStartDateError] = useState(false)
  const [endDateError, setEndDateError] = useState(false)
  const [playersCuntError, setPlayersCuntError] = useState(false)
  const [ageError, setAgeError] = useState(false)
  const [addressError, setAddressError] = useState(false)

  //redux
  const dispatch = useDispatch()
  const [startDate, setStartDate] = useState({
    date: new Date(),
    time: new Date(),
  })
  const [endDate, setEndDate] = useState({
    date: new Date(new Date().setDate(startDate.date.getDate())),
    time: new Date(new Date().setTime(startDate.date.getTime())),
  })
  const [organizer_in_the_game, setOrganizer_in_the_gameState] = useState([
    { id: 1, text: 'Участвует', checked: true },
    { id: 2, text: 'Не участвует', checked: false },
  ])
  const [genderList, setGenderList] = useState([
    { id: 1, text: 'М', checked: false, label: 'm' },
    { id: 2, text: 'Ж', checled: false, label: 'f' },
    { id: 3, text: 'Без ограничений', checked: true, label: 'm/f' },
  ])

  const handleClick = () => {
    if (!startDate) {
      setStartDateError('Обязательное поле для заполнения')
    } else {
      setStartDateError(null)
    }
    if (!endDate) {
      setEndDateError('Обязательное поле для заполнения')
    } else if (
      startDate.date < endDate.date ||
      !(
        (startDate.date.getDate() == endDate.date.getDate() &&
          startDate.time.getTime() >= endDate.time.getTime()) ||
        startDate.date.getDate() != endDate.date.getDate()
      )
    ) {
      setEndDateError('Введите корректную дату')
    } else {
      setEndDateError(null)
    }
    if (!initialState.age_restrictions_from || !initialState?.age_restrictions_to) {
      setAgeError('Обязательное поле для заполнения')
    } else if (
      +initialState?.age_restrictions_from < 0 ||
      +initialState?.age_restrictions_from > +initialState?.age_restrictions_to
    ) {
      setAgeError('Введите корректную возраст')
    } else {
      setAgeError(null)
    }
    if (!initialState.number_of_players_from || !initialState?.number_of_players_to) {
      setPlayersCuntError('Обязательное поле для заполнения')
    } else if (
      +initialState?.number_of_players_from < 0 ||
      +initialState?.number_of_players_from > +initialState?.number_of_players_to
    ) {
      setPlayersCuntError('Введите корректную число')
    } else {
      setPlayersCuntError(null)
    }
    if (!initialState?.latitude || !initialState?.longitude || !initialState.address_name) {
      setAddressError('Обязательное поле для заполнения')
    } else {
      setAddressError(null)
    }
    if (
      startDate &&
      endDate &&
      startDate.date >= endDate.date &&
      ((startDate.date.getDate() == endDate.date.getDate() &&
        startDate.time.getTime() >= endDate.time.getTime()) ||
        startDate.date.getDate() != endDate.date.getDate()) &&
      initialState.age_restrictions_from &&
      initialState?.age_restrictions_to &&
      +initialState?.number_of_players_from > 0 &&
      +initialState?.number_of_players_from < +initialState?.number_of_players_to &&
      ((initialState?.latitude && initialState?.longitude) || initialState.address_name)
    ) {
      let start_date = startDate.date
      start_date.setTime(startDate.time)
      let end_date = endDate.date
      end_date.setTime(endDate.time)

      navigation.navigate('GameTicket', {
        params: {
          initialState,
          game,
          name: game?.name || name,
          dates: [start_date, end_date],
        },
      })
    }
  }
  useEffect(() => {
    if (game?._id) {
      dispatch(setGame(game?._id))
      setIsVisible(true)
    }
  }, [])

  return (
    <ScreenMask>
      {/* <KeyboardAvoidingView
        {...(Platform.OS === 'ios'
          ? {
              behavior: 'padding',
              keyboardVerticalOffset: RH(10),
              enabled: true,
              style: { flex: 1 },
            }
          : {})}
      > */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <DateComponent
          title="Дата и время начала игры"
          containerStyle={{
            width: RW(380),
            marginTop: RH(24),
            alignSelf: 'center',
          }}
          rowStyle={{
            justifyContent: 'flex-start',
          }}
          dateValue={startDate.date}
          timeValue={startDate.time}
          setDate={(date) => {
            setStartDate({ ...startDate, date })
          }}
          setTime={(time) => setStartDate({ ...startDate, time })}
        />
        {startDateError && <Text style={styles.errorText}>{startDateError}</Text>}
        <SecondBlock
          from={editGame?.number_of_players_from}
          to={editGame?.number_of_players_to}
          type={'player'}
          title={'Количество игроков'}
        />
        {playersCuntError && <Text style={styles.errorText}>{playersCuntError}</Text>}

        <SecondBlock
          from={editGame?.age_restrictions_from}
          to={editGame?.age_restrictions_to}
          type={'age'}
          title={'Возрастные ограничения'}
        />
        {ageError ? <Text style={styles.errorText}>{ageError}</Text> : null}

        <RadioBlock
          onChange={(list) => {
            setGenderList(list)
            dispatch(setPlayers_gender(list.find((e) => e.checked).label))
          }}
          title="Половой признак игрока"
          list={genderList}
          titleStyle={{ ...styles.titles, marginBottom: RW(10) }}
        />
        <SearchAddresses
          game={game}
          setAddressName={setAddressName}
          addressName={addressName}
          command={null}
        />
        {addressError && <Text style={styles.errorText}>{addressError}</Text>}

        <DateComponent
          title="Дата и время окончания поиска игроков"
          containerStyle={{
            width: RW(380),
            marginTop: RH(24),
            alignSelf: 'center',
          }}
          rowStyle={{
            justifyContent: 'flex-start',
          }}
          dateValue={endDate.date}
          timeValue={endDate.time}
          setDate={(date) => setEndDate({ ...endDate, date })}
          setTime={(time) => setEndDate({ ...endDate, time })}
        />
        {endDateError ? <Text style={styles.errorText}>{endDateError}</Text> : null}
        <RadioBlock
          onChange={(list) => {
            setOrganizer_in_the_gameState(list)
            dispatch(setOrganizer_in_the_game(list.find((e) => e.text == 'Участвует').checked))
          }}
          title="Статус организатора в игре"
          list={organizer_in_the_game}
          titleStyle={{ ...styles.titles, marginBottom: RW(23) }}
        />
        <View style={{ position: 'absolute' }}>
          {!response && (
            <Modal
              modalVisible={isVisible}
              setIsVisible={setIsVisible}
              btnClose={false}
              item={
                modalOpen ? (
                  <View style={styles.regulationBlock}>
                    <Text style={styles.title}>Правила</Text>
                    <Text style={styles.textTwo}>{game?.rules}</Text>
                  </View>
                ) : null
              }
            />
          )}
        </View>
        <View style={{ ...styles.submitBlock, marginTop: 20 }}>
          {/* {error && <Text style={styles.errorBoldText}>Ошибка</Text>} */}
          <Button onPress={handleClick} size={{ width: 144, height: 36 }} label={'Готово'} />
        </View>
      </ScrollView>
      {/* </KeyboardAvoidingView> */}
    </ScreenMask>
  )
}
const styles = StyleSheet.create({
  detailImg: {
    width: RW(20),
    height: RH(31),
    marginLeft: RW(20),
  },

  ticketBlock: {
    paddingTop: RH(42),
    paddingBottom: 100,
  },

  titles: {
    ...font('regular', 16, ICON, 24),
    marginTop: RH(24),
    marginLeft: RW(20),
  },
  dateBlock: {
    marginRight: RW(9),
    marginTop: RH(9),
    marginLeft: RW(13),
    marginBottom: RH(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dash: {
    width: RW(10),
    height: 0,
    borderColor: ICON,
    borderWidth: RW(2),
    borderRadius: RW(2),
    marginHorizontal: RW(8),
  },
  countBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: RW(11),
    marginTop: RH(9),
  },
  submitBlock: {
    marginLeft: 'auto',
    marginRight: RW(9),
    marginBottom: RW(23),
    marginTop: RH(70),
  },
  regulationBlock: {
    backgroundColor: LIGHT_LABEL,
    marginRight: 'auto',
    borderRadius: RW(20),
    marginLeft: 'auto',
    width: RW(357),
    padding: RW(35),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    ...font('bold', 24, WHITE, 24),
    marginBottom: RH(15),
  },
  textTwo: {
    ...font('regular', 16, WHITE, 19),
    textAlign: 'center',
  },
  errorText: {
    color: LIGHT_RED,
    fontSize: RW(16),
    marginTop: RH(5),
    marginLeft: RH(10),
  },
  errorBoldText: {
    color: LIGHT_RED,
    fontSize: RW(20),
    alignSelf: 'center',
    marginTop: RH(5),
  },
})
export default GameCreating
