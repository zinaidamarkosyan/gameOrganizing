import React from 'react'
import { StyleSheet, View } from 'react-native'

const Row = ({ wrapper, children, justifyContent }) => {
  return <View style={[styles.row, wrapper, justifyContent && { justifyContent }]}>{children}</View>
}

export default Row

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
})
