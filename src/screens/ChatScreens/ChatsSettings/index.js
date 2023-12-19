import React, { useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import ScreenMask from '@/components/wrappers/screen'
import { useNavigation } from '@react-navigation/native'
import { RH, RW, font } from '@/theme/utils'
import { WHITE } from '@/theme/colors'
import Row from '@/components/wrappers/row'
import Toggle from '@/components/ToggleSwitch'
import LightButton from '@/components/buttons/Button'

function NotificationScettings() {
  const [individualGames, setIndividualGames] = useState(true)
  const [teamGames, setTeamGames] = useState(true)
  const [turnires, setTurinires] = useState(true)

  const navigation = useNavigation()
  return (
    <ScreenMask>
      <View style={styles.container}>
        <Text style={styles.title}>Уведомления</Text>
        <Text style={styles.subTitle}>Отображение</Text>
        <Row wrapper={styles.row}>
          <Text style={styles.rowText}>Индивидуальные игры</Text>
          <Toggle isOn={individualGames} setIsOn={setIndividualGames} />
        </Row>
        <Row wrapper={styles.row}>
          <Text style={styles.rowText}>Командные игры</Text>
          <Toggle isOn={teamGames} setIsOn={setTeamGames} />
        </Row>
        <Row wrapper={styles.row}>
          <Text style={styles.rowText}>Турниры</Text>
          <Toggle isOn={turnires} setIsOn={setTurinires} />
        </Row>
        <View style={styles.button}>
          <LightButton
            onPress={() => {
              navigation.navigate('NotificationScreen')
            }}
            size={{ width: 281, height: 48 }}
            label="Сохранить"
          />
        </View>
      </View>
    </ScreenMask>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: RW(56),
    paddingHorizontal: RW(16),
    flex: 1,
  },
  title: {
    ...font('bold', 24, WHITE, 29),
    marginBottom: RH(32),
    alignSelf: 'center',
  },
  subTitle: {
    ...font('bold', 16, '#B3B7C2', 24),
  },
  row: {
    justifyContent: 'space-between',
    marginTop: RH(25),
  },
  rowText: {
    ...font('bold', 16, WHITE, 24),
  },
  button: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    bottom: RH(20),
  },
})
export default NotificationScettings
