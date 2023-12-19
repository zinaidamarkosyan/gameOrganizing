import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Count from '@/components/inputs/count'
import { RH, RW, font } from '@/theme/utils'
import { ICON } from '@/theme/colors'

const SecondBlock = ({ title, type, from, to }) => {
  return (
    <View>
      <Text style={styles.titles}>{title}</Text>
      <View style={styles.countBlock}>
        <Count type={type} countType={'from'} value={from} placeholder={'От'} />
        <View style={styles.dash}></View>
        <Count type={type} countType={'to'} value={to} placeholder={'До'} />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  titles: {
    ...font('regular', 16, ICON, 24),
    marginTop: RH(24),
    marginLeft: RW(20),
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
})
export default SecondBlock
