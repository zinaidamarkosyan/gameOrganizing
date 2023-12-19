import React, { useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import ScreenMask from '@/components/wrappers/screen'
import { RH, RW, font } from '@/theme/utils'
import { WHITE } from '@/theme/colors'
import Row from '@/components/wrappers/row'
import Toggle from '@/components/ToggleSwitch'
import { notificationSettings } from '@/store/Slices/AppSlice'
import { useDispatch } from 'react-redux'

function CalendarSettings() {
  const [settings, setSettings] = useState([
    {
      label: 'Индивидуальные игры',
      checked: true,
    },
    {
      label: 'Командные игры',
      checked: true,
    },
    {
      label: 'Турниры',
      checked: true,
    },
  ])

  const dispatch = useDispatch()
  return (
    <ScreenMask>
      <View style={styles.container}>
        <Text style={styles.title}>Настройки</Text>
        <Text style={styles.subTitle}>Отображение</Text>
        {settings.map((item, i) => (
          <Row wrapper={styles.row} key={i}>
            <Text style={styles.rowText}>{item.label}</Text>
            <Toggle
              isOn={item.checked}
              setIsOn={(e) => {
                dispatch(notificationSettings({ checked: e, label: item.label }))
                setSettings((prev) =>
                  prev.map((elem) => {
                    if (elem.label == item.label) {
                      elem.checked = e
                    }
                    return elem
                  }),
                )
              }}
            />
          </Row>
        ))}
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
    maxWidth: '80%',
    ...font('bold', 16, WHITE, 24),
  },
})
export default CalendarSettings
