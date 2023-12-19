import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import ScreenMask from '@/components/wrappers/screen'
import Button from '@/components/buttons/Button'
import { RH, RW, font } from '@/theme/utils'
import Slider from '@/components/range'
import ToggleSwitch from '@/components/ToggleSwitch'
import { WHITE } from '@/theme/colors'
import Row from '@/components/wrappers/row'
import { useDispatch, useSelector } from 'react-redux'
import { postSettings, setMafiaSocketOn, setOrganizer } from '@/store/Slices/MafiaSlice'
import { useNavigation } from '@react-navigation/native'
import ModalRules from '../QrCode/ModalRules'
import Modal from '@/components/modal'

function Index() {
  // const [spyDon, setSpyDon] = useState(false)
  const [valWord, setValWord] = useState(5)
  const [modalRules, setModalRules] = useState(true)
  const { qrLink } = useSelector(({ mafia }) => mafia)

  const dispatch = useDispatch()
  const navigation = useNavigation()
  useEffect(() => {
    if (qrLink) {
      navigation.navigate('QrCode')
      dispatch(setMafiaSocketOn(true))
    }
  }, [qrLink])


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
          <Text style={styles.timeTitle}>Время до голосования</Text>
          <Text style={styles.timeSubtitle}>продолжительность в менутах</Text>
        </View>

        <Text style={styles.time}>{valWord}</Text>
      </Row>
      <Slider
        step={1}
        count={5}
        maxValue={20}
        minValue={5}
        setValue={setValWord}
        value={valWord}
        style={{ marginHorizontal: RW(85), left: RW(3) }}
      />
      {/* <Text style={styles.playersDescription}>Дополнительные персoнажы участвующие в игре</Text> */}

      {/* <Row
        wrapper={{
          justifyContent: 'space-between',
          marginTop: RH(30),
        }}
      >
        <View>
          <Text style={styles.timeTitle}>Шпион и Дон</Text>
          <Text style={styles.timeSubtitle}>
            (Количество игроков должно быть не менее {'\n'}7 человек)
          </Text>
        </View>
        <View
          style={{
            top: '-4%',
          }}
        >
          <ToggleSwitch isOn={spyDon} setIsOn={setSpyDon} />
        </View>
      </Row> */}
      <View style={styles.btnContainer}>
        <Button
          onPress={() => {
            dispatch(
              postSettings({
                vote_time: valWord,
                // spy_and_don: spyDon,
              }),
            )
            dispatch(setOrganizer(true))
          }}
          size={styles.btn}
          label={'Продолжить'}
        />
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
})

export default Index
