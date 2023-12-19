import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RW, font } from '@/theme/utils'
import { LIGHT_LABEL } from '@/theme/colors'
import { _storageUrl } from '@/constants'
import { useDispatch } from 'react-redux'
import User from '@/components/User/user'

const BestPlayer = ({ body }) => {
  const best_players = body.best_players
  const dispatch = useDispatch()
  return (
    <View style={styles.modal}>
      <Text style={styles.text}>По итогам игры Вас признали</Text>
      <Text style={styles.text2}>Лучшим игроком</Text>
      <User user={best_players[0]} size={370} />
      {/* <Text style={[styles.text, { marginTop: RW(14) }]}>Поздравляем!</Text> */}
    </View>
  )
}

export default BestPlayer

const styles = StyleSheet.create({
  modal: {
    width: RW(380),
    backgroundColor: LIGHT_LABEL,
    borderRadius: RW(20),
    paddingVertical: RW(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: font('regular', 16, '#fff', 25),
  text2: {
    ...font('bold', 20, '#fff', 31),
    marginBottom: RW(50),
  },
})
