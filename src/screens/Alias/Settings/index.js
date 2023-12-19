import React, { useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import ScreenMask from '@/components/wrappers/screen'
import Button from '@/components/buttons/Button'
import { RH, RW, font } from '@/theme/utils'
import Slider from '@/components/range'
import ToggleSwitch from '@/components/ToggleSwitch'
import { RED, WHITE } from '@/theme/colors'
import Row from '@/components/wrappers/row'
import Modal from '@/components/modal'
import { useDispatch } from 'react-redux'
import {
  setCountWords,
  setPenalty,
  setStoping,
  setTime,
  setUserIsOrganizer,
} from '@/store/Slices/AliasSlice'
import ModalRules from '../QrCode/ModalRules'

function Index({ navigation }) {
  //===================states=====================
  const [modalRules, setModalRules] = useState(true)
  const [countOfWords, setCountOfWords] = useState(10)
  const [timeOfRounds, setTimeOfRounds] = useState(30)
  const [isOn, setIsOn] = useState(false)
  //==================states end==================
  const [error, setError] = useState(false)

  const dispatch = useDispatch()

  const handleSubmit = () => {
    if (countOfWords == 0 || timeOfRounds == 0) {
      setError(true)
    } else {
      setError(false)
    }
    if (countOfWords !== 0 || timeOfRounds !== 0) {
      dispatch(setCountWords(countOfWords))
      dispatch(setStoping(true))
      dispatch(setTime(timeOfRounds))
      dispatch(setUserIsOrganizer(true))
      dispatch(setPenalty(isOn))
      navigation.navigate('SelectComplexity')
    }
  }
  return (
    <ScreenMask>
      <View style={styles.body}>
        <Modal
          modalVisible={modalRules}
          setIsVisible={setModalRules}
          item={<ModalRules setModalRules={setModalRules} />}
        />
      </View>
      <Text style={styles.title}>Настройки</Text>
      <Row
        wrapper={{
          justifyContent: 'space-between',
          marginBottom: RH(10),
          marginTop: RH(60),
        }}
      >
        <View>
          <Text style={styles.timeTitle}>Количество слов</Text>
          <Text style={styles.timeSubtitle}>для достижения победы</Text>
        </View>

        <Text style={styles.time}>{countOfWords}</Text>
      </Row>

      <Slider
        step={1}
        count={10}
        maxValue={90}
        minValue={10}
        setValue={setCountOfWords}
        value={countOfWords}
      />

      <Row
        wrapper={{
          justifyContent: 'space-between',
          marginBottom: RH(10),
          marginTop: RH(60),
        }}
      >
        <View>
          <Text style={styles.timeTitle}>Время раунда</Text>
          <Text style={styles.timeSubtitle}>продолжительность в секундах</Text>
        </View>

        <Text style={styles.time}>{timeOfRounds}</Text>
      </Row>

      <Slider
        step={10}
        count={40}
        maxValue={180}
        minValue={30}
        setValue={setTimeOfRounds}
        value={timeOfRounds}
      />
      <Row
        wrapper={{
          justifyContent: 'space-between',
          marginTop: RH(80),
        }}
      >
        <View>
          <Text style={styles.timeTitle}>Штраф за пропуск</Text>
          <Text style={styles.timeSubtitle}>Каждое пропущенное слово отнимает одно очко</Text>
        </View>
        <View
          style={{
            top: '-4%',
          }}
        >
          <ToggleSwitch isOn={isOn} setIsOn={setIsOn} />
        </View>
      </Row>
      <View style={styles.btnContainer}>
        {error ? <Text style={styles.errorText}>Заполните все поля</Text> : null}
        <Button onPress={handleSubmit} size={styles.btn} label={'Продолжить'} />
      </View>
    </ScreenMask>
  )
}
const styles = StyleSheet.create({
  title: {
    ...font('bold', 24, WHITE),
    textAlign: 'center',
  },

  timeTitle: {
    ...font('bold', 20, WHITE),
    marginBottom: RH(8),
  },
  timeSubtitle: {
    ...font('regular', 12, WHITE),
  },
  time: {
    ...font('bold', 25, WHITE),
  },
  playersDescription: {
    ...font('bold', 18, '#B3B7C2'),
    marginTop: RH(65),
  },
  btnContainer: {
    position: 'absolute',
    bottom: RH(50),
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  btn: {
    width: 281,
    height: 48,
  },
  errorText: {
    color: RED,
    left: RW(12),
    fontSize: RW(16),
    bottom: '100%',
  },
})

export default Index
