import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

import { BACKGROUND, BLACK, ICON, WHITE } from '@/theme/colors'
import { font, RH, RW, shadow } from '@/theme/utils'
import SendIcon from '@/assets/imgs/SendIcon'

const Composer = React.forwardRef(
  (
    {
      onSend,
      text,
      setText,
      disabled,
      textStyle,
      containerStyle,
      secure = false,
      placeholder = 'Написать',
    },
    ref,
  ) => {
    React.useImperativeHandle(
      ref,
      () => ({
        text,
        setText,
      }),
      [],
    )

    const send = () => {
      if (text.trim()) {
        onSend?.(text)
      }
    }

    return (
      <View style={[styles.container, containerStyle]}>
        <TextInput
          value={text}
          editable={!disabled}
          onChangeText={setText}
          secureTextEntry={secure}
          placeholderTextColor={ICON}
          placeholder={placeholder || ''}
          style={[styles.textStyle, textStyle, { color: ICON }]}
        />
        <SendIcon onPress={send} />
      </View>
    )
  },
)

export default Composer

const styles = StyleSheet.create({
  container: {
    ...shadow,
    maxHeight: RH(48),
    shadowColor: BLACK,
    paddingLeft: RW(24),
    paddingRight: RW(21),
    flexDirection: 'row',
    borderRadius: RW(10),
    alignItems: 'center',
    paddingVertical: RH(10),
    backgroundColor: BACKGROUND,
    justifyContent: 'space-between',
  },
  textStyle: {
    width: RW(330),
    paddingVertical: 0,
    ...font('regular', 16, WHITE, 18),
  },
})
