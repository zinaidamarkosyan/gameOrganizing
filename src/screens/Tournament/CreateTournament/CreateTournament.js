import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenMask from '@/components/wrappers/screen'
import { BACKGROUND, ICON, RED } from '@/theme/colors'
import { RH, RW, font } from '@/theme/utils'
import RadioBlock from '@/components/RadioBlock'
import LightButton from '@/components/buttons/Button'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import {
  clearTournamentData,
  setTournamentDescription,
  setTeamTourney,
  setTournamentName,
} from '@/store/Slices/TournamentSlice'

const CreateTournament = ({ route }) => {
  const [formatList, setFormatList] = useState([
    {
      id: 1,
      text: 'Индивидуальный',
      checked: true,
    },
    {
      id: 2,
      text: 'Командный',
      checked: false,
    },
  ])
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [error, setError] = useState(false)
  const [tourName, setTourName] = useState('')
  const handleClick = () => {
    dispatch(clearTournamentData())
    if (tourName?.length) {
      setError(false)
      dispatch(setTournamentName(tourName))
      if (formatList[0].checked) {
        navigation.navigate('CreateTournamentInfo')
        dispatch(setTeamTourney(false))
      } else {
        dispatch(setTeamTourney(true))
        navigation.navigate('CreateTournamentInfo')
      }
    } else {
      setError(true)
    }
  }
  useEffect(() => {
    dispatch(clearTournamentData())
  }, [])

  return (
    <ScreenMask>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={styles.inputsContainer}>
          <TextInput
            style={styles.input}
            placeholderTextColor={ICON}
            value={tourName}
            onChangeText={(e) => setTourName(e)}
            placeholder={'Название турнира'}
          />
          <TextInput
            style={styles.inputMulti}
            placeholderTextColor={ICON}
            multiline={true}
            // value={description}
            onChangeText={(e) => dispatch(setTournamentDescription(e))}
            placeholder={'Описание турнира (можно использовать ссылку на интернет страничку):'}
          />
        </View>
        {error && <Text style={styles.error}>Заполните поле</Text>}
        <View style={styles.radioBlockBox}>
          <RadioBlock
            title="Формат турнира"
            list={formatList}
            onChange={setFormatList}
            titleStyle={{ left: '4%' }}
          />
        </View>
      </ScrollView>
      <View style={styles.btn}>
        <LightButton label={'Далее'} onPress={handleClick} />
      </View>
    </ScreenMask>
  )
}

export default CreateTournament

const styles = StyleSheet.create({
  input: {
    backgroundColor: BACKGROUND,
    borderRadius: RW(10),
    width: RW(363),
    height: RH(48),
    marginLeft: 'auto',
    marginRight: 'auto',
    color: ICON,
    paddingLeft: RW(24),
  },
  inputMulti: {
    backgroundColor: BACKGROUND,
    borderRadius: RW(10),
    width: RW(363),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: RH(256),
    marginLeft: 'auto',
    marginRight: 'auto',
    color: ICON,
    paddingLeft: RW(24),
    paddingBottom: RH(150),
  },
  inputsContainer: { height: RH(350), justifyContent: 'space-around', marginTop: RH(70) },
  radioBlockBox: { marginTop: RH(30) },
  btn: {
    position: 'absolute',
    bottom: RH(20),
    right: 0,
  },
  error: {
    ...font('regular', 16, RED),
    left: '8%',
  },
})
