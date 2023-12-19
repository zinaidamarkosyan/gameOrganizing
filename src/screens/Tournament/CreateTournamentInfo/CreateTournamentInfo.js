import { Text, View, TextInput, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenMask from '@/components/wrappers/screen'
import { useDispatch, useSelector } from 'react-redux'
import { RH, RW, font } from '@/theme/utils'
import DateComponent from '@/components/DateComponent'
import RadioBlock from '@/components/RadioBlock'
import SearchAddresses from '@/screens/Map/SearchAddresses'
import LightButton from '@/components/buttons/Button'
import { BACKGROUND, ICON, LIGHT_LABEL, RED, WHITE } from '@/theme/colors'
import {
  setAgeRestrictionsFrom,
  setAgeRestrictionsTo,
  setLatitude,
  setLongitude,
  setNumberOfParticipantsFrom,
  setNumberOfParticipantsTo,
  setOrganizerStatus,
  setTourEndDate,
  setAddressNameTour,
  setTourStartDate,
  setTournamentFund,
  setPlayersGender,
} from '@/store/Slices/TournamentSlice'
import { useNavigation } from '@react-navigation/native'

const CreateTournamentInfo = ({ route }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const initialState = useSelector(({ tournament }) => tournament)
  const response = route?.params
  // ================== states ==================

  const [addressName, setAddressName] = useState(null)
  const [startDate, setStartDate] = useState({
    date: new Date(),
    time: new Date(),
  })
  const [endDate, setEndDate] = useState({
    date: new Date(new Date().setDate(startDate.date.getDate() - 1)),
    time: new Date(),
  })
  const [genderList, setGenderList] = useState([
    { id: 1, text: 'М', checked: false, label: 'm' },
    { id: 2, text: 'Ж', checked: false, label: 'f' },
    { id: 3, text: 'Без ограничений', checked: true, label: 'm/f' },
  ])
  const [organizerJoin, setOrganizerJoin] = useState([
    { id: 1, text: 'Участвует', checked: true },
    { id: 2, text: 'Не Участвует', checked: false },
  ])
  const [priceFond, setPriceFond] = useState([
    { id: 1, text: 'Да', checked: false },
    { id: 2, text: 'Нет', checked: true },
  ])

  // ================== states end ==================

  //errors
  const [ageError, setAgeError] = useState(false)
  const [countError, setCountError] = useState(false)
  const [endDateError, setEndDateError] = useState(false)
  const [startDateError, setStartDateError] = useState(false)
  const [addressNameError, setAddressNameError] = useState(false)

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
  const changedEndDate = endDate.date
    .toISOString()
    .substring(0, 10)
    .concat(' ' + timeFormat(endDate))

  const handleSubmit = () => {
    if (!initialState.address_name) {
      setAddressNameError(true)
    } else {
      setAddressNameError(false)
    }
    if (startDate.date <= endDate.date) {
      setEndDateError(true)
    } else {
      setEndDateError(false)
      setStartDateError(false)
    }
    if (startDate && endDate) {
      dispatch(setTourStartDate(changedStartDate))
      dispatch(setTourEndDate(changedEndDate))
    }
    if (organizerJoin[0].checked) {
      dispatch(setOrganizerStatus(true))
    } else {
      dispatch(setOrganizerStatus(false))
    }
    if (!initialState.team_tourney) {
      if (
        initialState.age_restrictions_from == undefined ||
        initialState.age_restrictions_to == undefined ||
        !initialState.age_restrictions_from.length ||
        !initialState.age_restrictions_to
      ) {
        setAgeError('Обязательное поле для заполнения')
      } else if (+initialState.age_restrictions_from > +initialState.age_restrictions_to) {
        setAgeError('Введите корректную возраст')
      } else {
        setAgeError(null)
      }
      dispatch(setPlayersGender(genderList.find((e) => e.checked).label))
    }
    if (
      !initialState.number_of_participants_from?.length ||
      !initialState.number_of_participants_to?.length
    ) {
      setCountError('Обязательное поле для заполнения')
    } else if (
      +initialState.number_of_participants_from > +initialState.number_of_participants_to
    ) {
      setCountError('Введите корректную количество')
    } else {
      setCountError('')
    }

    dispatch(setTournamentFund(priceFond[0].checked ? true : false))
    if (
      +initialState.number_of_participants_from < +initialState.number_of_participants_to &&
      !endDateError &&
      !startDateError &&
      initialState.address_name &&
      ((!initialState.team_tourney &&
        +initialState.age_restrictions_from < +initialState.age_restrictions_to) ||
        initialState.team_tourney)
    ) {
      if (initialState.team_tourney) {
        navigation.navigate('TeamNavigator', {
          screen: 'MyTeam',
          params: { data: initialState, game: response, fromTournament: true },
        })
      } else {
        navigation.navigate('TournamentInfo')
      }
    }
  }
  useEffect(() => {
    dispatch(setLatitude(response?.latitude ? response?.latitude : addressName?.lat))
    dispatch(setLongitude(response?.longitude ? response?.longitude : addressName?.lng))
    dispatch(
      setAddressNameTour(
        response?.address_name ? response?.address_name : addressName?.address_name,
      ),
    )
  }, [response, addressName])
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
          title="Дата и время начала турнира"
          containerStyle={{
            width: RW(380),
            marginTop: RH(24),
            alignSelf: 'center',
          }}
          rowStyle={{
            justifyContent: 'space-around',
          }}
          dateValue={startDate.date}
          timeValue={startDate.time}
          setDate={(date) => setStartDate({ ...startDate, date })}
          setTime={(time) => setStartDate({ ...startDate, time })}
        />
        {!!startDateError && <Text style={styles.error}>Введите корректную дату</Text>}
        <View>
          <Text style={styles.titles}>
            Количество {!initialState.team_tourney ? 'участников' : 'команд'}
          </Text>
          <View style={styles.countBlock}>
            <TextInput
              // value={value}
              onChangeText={(number) => {
                dispatch(setNumberOfParticipantsFrom(number))
              }}
              keyboardType={'numeric'}
              style={styles.countInput}
              placeholder={'От'}
              placeholderTextColor={ICON}
            />
            <View style={styles.dash}></View>
            <TextInput
              // value={value}
              onChangeText={(e) => {
                dispatch(setNumberOfParticipantsTo(e))
              }}
              keyboardType={'numeric'}
              style={styles.countInput}
              placeholder={'До'}
              placeholderTextColor={ICON}
            />
          </View>
        </View>
        {countError ? <Text style={styles.error}>{countError}</Text> : null}
        {!initialState.team_tourney ? (
          <>
            <View>
              <Text style={styles.titles}>Возрастные ограничения</Text>
              <View style={styles.countBlock}>
                <TextInput
                  // value={value}
                  onChangeText={(number) => {
                    dispatch(setAgeRestrictionsFrom(number))
                  }}
                  keyboardType={'numeric'}
                  style={styles.countInput}
                  placeholder={'От'}
                  placeholderTextColor={ICON}
                />
                <View style={styles.dash}></View>
                <TextInput
                  // value={value}
                  onChangeText={(number) => {
                    dispatch(setAgeRestrictionsTo(number))
                  }}
                  keyboardType={'numeric'}
                  style={styles.countInput}
                  placeholder={'До'}
                  placeholderTextColor={ICON}
                />
              </View>
            </View>
            {ageError?.length ? <Text style={styles.error}>{ageError}</Text> : null}
            <RadioBlock
              onChange={(e) => {
                dispatch(setPlayersGender(e))
                setGenderList(e)
              }}
              title="Половой признак участника"
              list={genderList}
              titleStyle={{ ...styles.titles, marginTop: RW(23) }}
            />
          </>
        ) : null}
        <View style={{ marginTop: initialState.team_tourney ? RH(20) : 0 }} />
        <SearchAddresses
          navigateTo="CreateTournamentInfo"
          setAddressName={setAddressName}
          addressName={addressName}
          show={false}
        />
        {addressNameError ? <Text style={styles.error}>Выберите аддрес</Text> : null}
        <DateComponent
          title="Дата и время окончания поиска участников"
          containerStyle={{
            width: RW(380),
            marginTop: RH(24),
            alignSelf: 'center',
          }}
          rowStyle={{
            justifyContent: 'space-around',
          }}
          dateValue={endDate.date}
          timeValue={endDate.time}
          setDate={(date) => setEndDate({ ...endDate, date })}
          setTime={(time) => setEndDate({ ...endDate, time })}
        />
        {endDateError && <Text style={styles.error}>Введите корректную дату</Text>}

        <View style={{ paddingTop: '5%', left: '2%' }}>
          <RadioBlock
            onChange={(priceFond) => {
              setPriceFond(priceFond)
            }}
            title="Призовой фонд"
            list={priceFond}
            containerStyle={{ paddingTop: '4%' }}
            titleStyle={{ ...styles.titles, marginBottom: RW(5) }}
          />
        </View>
        <View style={{ paddingTop: '5%', left: '2%' }}>
          <RadioBlock
            onChange={(organizerJoin) => {
              setOrganizerJoin(organizerJoin)
            }}
            title="Статус организатора в турнире"
            list={organizerJoin}
            containerStyle={{ paddingTop: '4%' }}
            titleStyle={{ ...styles.titles, marginBottom: RW(5) }}
          />
        </View>

        <View style={{ alignItems: 'flex-end', padding: RH(15) }}>
          <LightButton label={'Готово'} onPress={handleSubmit} />
        </View>
      </ScrollView>
      {/* </KeyboardAvoidingView> */}
    </ScreenMask>
  )
}

export default CreateTournamentInfo

const styles = StyleSheet.create({
  modal: {
    width: RW(280),
    height: RH(170),
    alignSelf: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: LIGHT_LABEL,
    borderRadius: RW(20),
    padding: RW(20),
    marginHorizontal: RW(30.5),
  },
  countInput: {
    height: RH(50),
    width: RW(110),
    backgroundColor: BACKGROUND,
    borderRadius: RW(10),
    paddingLeft: RW(24),
    flexDirection: 'row',
    alignItems: 'center',
    color: ICON,
  },
  countBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    left: '35%',
  },
  titles: {
    ...font('regular', 16, ICON, 24),
    marginLeft: RW(20),
    paddingVertical: RH(10),
  },
  dash: {
    width: RW(10),
    height: 0,
    borderColor: ICON,
    borderWidth: RW(2),
    borderRadius: RW(2),
    marginHorizontal: RW(8),
  },
  successTeam: {
    ...font('inter', 16, WHITE, 20),
    textAlign: 'center',
    width: '85%',
    lineHeight: RH(25),
    alignSelf: 'center',
  },
  error: {
    ...font('regular', 18, RED),
    left: '6%',
    marginTop: '4%',
  },
  priceInput: {
    height: '100%',
    width: '100%',
    backgroundColor: BACKGROUND,
    borderRadius: RW(10),
    color: ICON,
    zIndex: 22,
  },
  priceText: {
    ...font('regular', 16, ICON, 19),
  },
  priceBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    height: RH(48),
    width: RW(192),
    backgroundColor: BACKGROUND,
    borderRadius: RW(10),
    paddingLeft: RW(24),
    color: ICON,
  },
})
