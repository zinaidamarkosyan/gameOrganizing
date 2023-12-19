import React, { memo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ICON, MESSAGE_CONTAINER, WHITE } from '@/theme/colors'
import { font, RH, RW } from '@/theme/utils'
import Row from '@/components/wrappers/row'

const Message = ({ message, id }) => {
  if (message.position != 'left') {
    return (
      <View style={[styles.right, { marginTop: RH(25) }]} key={id}>
        <Row>
          <View
            style={[
              styles.container,
              { backgroundColor: ICON, marginLeft: RW(10), width: RW(178) },
            ]}
          >
            <Text style={styles.label}>{message.text}</Text>
          </View>
        </Row>
      </View>
    )
  }

  return (
    <View
      key={id}
      style={[
        styles.container,
        styles.left,

        { backgroundColor: MESSAGE_CONTAINER, marginTop: RH(25) },
        message.type === 'FILE' ? { flexDirection: 'row' } : null,
      ]}
    >
      {message.type === 'FILE' ? message.svg : null}
      <Text
        style={[
          styles.label,
          message.error && { color: 'rgba(214, 0, 0, 1)' },
          message.type === 'FILE' && {
            paddingRight: RW(35),

            maxWidth: '90%',
          },
        ]}
        secureTextEntry={true}
      >
        {message.error && 'Ошибка: '}
        {message.text}
      </Text>
    </View>
  )
}

export default memo(Message)

const styles = StyleSheet.create({
  container: {
    width: RW(270),
    minHeight: RH(42),
    borderRadius: RW(10),
    paddingVertical: RH(10),
  },
  left: {
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 0,
  },
  right: {
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0,
  },
  label: {
    ...font('regular', 16, WHITE, 20),
    paddingLeft: RW(10),
    marginRight: RW(5),
  },
})
