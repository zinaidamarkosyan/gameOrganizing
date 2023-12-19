import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RH, RW, font } from '@/theme/utils'
import { LIGHT_LABEL, WHITE } from '@/theme/colors'
import ErrorSvg from '@/screens/Mafia/AddPlayers/assets/ErrorSvg'

const ErrorModal = ({message}) => {
  return (
    <View style={styles.modal}>
       <ErrorSvg />
      <Text style={styles.text}>{message}</Text>
    </View>
  )
}

export default ErrorModal

const styles = StyleSheet.create({
  modal: {
    width: RW(306),
    backgroundColor: LIGHT_LABEL,
    borderRadius: RW(20),
    padding: RW(20),
    marginHorizontal: RW(30.5),
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    ...font('inter', 16, WHITE, 20),
    textAlign: 'center',
    marginTop: RH(20)
  },
})