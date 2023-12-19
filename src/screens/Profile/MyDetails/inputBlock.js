import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { BACKGROUND, ICON, WHITE } from '@/theme/colors'
import { RH, RW, font } from '@/theme/utils'

function InputBlock(props) {
  const { text, placeholder, editable, value, setValue } = props
  return (
    <View style={styles.inputBlock}>
      <Text style={styles.inputTitle}>{text}</Text>
      <TextInput
        style={styles.input}
        editable={editable}
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        placeholderTextColor={ICON}
        maxLength={20}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  inputTitle: {
    ...font('regular', 16, WHITE, 19),
    marginBottom: RH(14),
  },
  input: {
    width: RW(354),
    height: RH(48),
    backgroundColor: BACKGROUND,
    borderRadius: RW(10),
    paddingLeft: RW(20),
    color: ICON,
  },
  inputBlock: {
    marginBottom: RH(14),
  },
})

export default InputBlock
