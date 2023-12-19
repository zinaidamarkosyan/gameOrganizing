import React from 'react'
import { Text, Pressable, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { WHITE } from '@/theme/colors'
import { RH } from '@/theme/utils'

function ModalRules({ setModalRules }) {
  const rules = useSelector(({ mafia }) => mafia.rules)
  return (
    <Pressable onPress={() => setModalRules(false)} style={styles.body}>
      <Text style={styles.title}>Правила</Text>
      <Text style={{ ...styles.text, marginBottom: 20 }}>{rules}</Text>
    </Pressable>
  )
}
const styles = StyleSheet.create({
  body: {
    backgroundColor: '#001034',
    borderRadius: 20,
    padding: 25,
  },
  title: {
    color: WHITE,
    textAlign: 'center',
    fontSize: 20,
    marginBottom: RH(10),
  },
  text: {
    color: WHITE,
    textAlign: 'center',
    fontSize: 16,
    marginBottom: RH(6),
  },
})

export default ModalRules
