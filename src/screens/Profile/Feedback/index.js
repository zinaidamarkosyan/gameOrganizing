import React from 'react'
import ScreenMask from '@/components/wrappers/screen'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  View,
} from 'react-native'
import { RH, RW, font } from '@/theme/utils'
import { BACKGROUND, ICON, LIGHT_LABEL, RED, WHITE } from '@/theme/colors'
import Button from '@/components/buttons/Button'
import { useState } from 'react'
import Modal from '@/components/modal'

function Index(props) {
  const { navigation } = props
  const [isVisible, setIsVisible] = useState(false)
  const [value, setValue] = useState('')
  const [secondValue, setSecondValue] = useState('')
  const [errorText, setErrorText] = useState(false)
  const handleClick = () => {
    if (value && secondValue) {
      setIsVisible(true)
      setTimeout(() => {
        navigation.navigate('Home')
      }, 3000)
    } else {
      setErrorText(true)
    }
  }

  return (
    <ScreenMask>
      {/* <KeyboardAvoidingView
        style={{ flex: 1 }}
        {...(Platform.OS === 'ios'
          ? {
              behavior: 'padding',
              keyboardVerticalOffset: RH(10),
              enabled: true,
            }
          : {})}
      >
        <TouchableNativeFeedback onPress={() => Keyboard.dismiss()}> */}
      <View style={styles.container}>
        <Text style={{ ...styles.title, marginTop: RH(53), marginBottom: RH(83) }}>
          Обратная связь
        </Text>
        <View style={styles.inputBlock}>
          <TextInput
            onChangeText={(ev) => setValue(ev)}
            placeholderTextColor={ICON}
            placeholder={'Тема'}
            style={[styles.input, Platform.OS == 'ios' && { fontSize: 16, height: 51 }]}
          />
          {errorText && !value ? (
            <Text style={styles.errorText}>Обязательное поле для заполнения</Text>
          ) : null}
        </View>
        <View style={styles.inputBlock}>
          <TextInput
            onChangeText={(ev) => setSecondValue(ev)}
            placeholderTextColor={ICON}
            multiline={true}
            numberOfLines={20}
            textAlignVertical={'top'}
            placeholder={'Сообщение'}
            style={[{ ...styles.input, height: RH(405) }, Platform.OS == 'ios' && { fontSize: 16 }]}
          />
          {errorText && !secondValue ? (
            <Text style={styles.errorText}>Обязательное поле для заполнения</Text>
          ) : null}
        </View>

        <View style={styles.buttonBlock}>
          <Button onPress={handleClick} size={{ width: 356, height: 48 }} label={'Отправить'} />
        </View>
        <Modal
          modalVisible={isVisible}
          setIsVisible={setIsVisible}
          item={
            <View style={styles.feedbackModal}>
              <Text style={styles.modalText}>
                Спасибо за ваше сообщение. В ближайшее время с вами свяжется менеджер приложения
                «Играем».
              </Text>
            </View>
          }
        />
      </View>
      {/* </TouchableNativeFeedback>
      </KeyboardAvoidingView> */}
    </ScreenMask>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    ...font('bold', 24, WHITE, 24),
  },
  input: {
    width: RW(354),
    backgroundColor: BACKGROUND,
    color: ICON,
    borderRadius: RW(10),
    paddingHorizontal: RW(20),
  },
  buttonBlock: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: RH(55),
  },
  feedbackModal: {
    width: RW(289),
    height: RH(199),
    paddingHorizontal: RW(26),
    paddingTop: RH(48),
    backgroundColor: LIGHT_LABEL,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: RW(20),
    alignItems: 'center',
  },
  modalText: {
    ...font('regular', 16, WHITE, 24),
    textAlign: 'center',
    width: RW(235),
  },
  errorText: {
    ...font('regular', 16, RED, 24),
  },
  inputBlock: {
    marginBottom: RH(23),
  },
})

export default Index
