import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { memo } from 'react'
import { font, RH, RW, shadow } from '@/theme/utils'
import { BACKGROUND, BLACK, ICON, WHITE } from '@/theme/colors'
import SendSvg from '@/screens/ChatScreens/assets/SendSvg'
import Voice from '../Voice/Voice'
import InputPlayer from '../Voice/InputPlayer'
import { setPausedMessageId, setPlayMessageId } from '@/store/Slices/ChatsSlice'
import { useDispatch } from 'react-redux'

const index = ({
  onSend,
  disabled,
  textStyle,
  containerStyle,
  secure = false,
  placeholder = 'Написать',
  voiceMessage,
  setVoiceMessage,
}) => {
  const [speak, setSpeak] = React.useState(false)
  const [text, setText] = React.useState('')
  const [stop, setStop] = React.useState(false)

  const dispatch = useDispatch()

  const send = () => {
    setStop(true)
    if (voiceMessage) {
      dispatch(setPlayMessageId(null))
      dispatch(setPausedMessageId(null))
      onSend()
    } else if (text.trim()) {
      onSend?.(text)
    }
    setText('')
  }

  return (
    <View
      style={[styles.container, containerStyle, voiceMessage && { backgroundColor: 'transparent' }]}
    >
      {speak ? (
        <Text style={{ ...font('regular', 16, ICON, 18), paddingLeft: RW(15) }}>Говорите...</Text>
      ) : voiceMessage ? (
        <InputPlayer
          voicePath={voiceMessage}
          onPressDelete={() => {
            setVoiceMessage(null)
          }}
          stop={stop}
          setStop={setStop}
        />
      ) : (
        <TextInput
          value={text}
          editable={!disabled}
          onChangeText={setText}
          secureTextEntry={secure}
          placeholderTextColor={ICON}
          placeholder={placeholder || ''}
          style={[styles.textStyle, textStyle, { color: ICON }]}
        />
      )}

      {text.length || voiceMessage ? (
        <Pressable onPress={send}>
          <SendSvg />
        </Pressable>
      ) : (
        <Voice
          onStartSpeak={() => {
            setSpeak(true)
            dispatch(setPlayMessageId(null))
            setStop(true)
          }}
          voicePath={(path) => {
            setSpeak(false)
            setVoiceMessage(path)
            setStop(true)
          }}
        />
      )}
    </View>
  )
}

export default memo(index)

const styles = StyleSheet.create({
  container: {
    ...shadow,
    maxHeight: RH(48),
    shadowColor: BLACK,
    paddingLeft: RW(12),
    paddingRight: RW(15),
    flexDirection: 'row',
    borderRadius: RW(24),
    alignItems: 'center',
    paddingVertical: RH(10),
    backgroundColor: BACKGROUND,
    justifyContent: 'space-between',
  },
  textStyle: {
    width: RW(330),
    paddingVertical: 0,
    paddingLeft: RW(15),
    ...font('regular', 16, WHITE, 18),
  },
})
