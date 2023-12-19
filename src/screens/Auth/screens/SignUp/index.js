import React, { useEffect, useRef, useState } from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, View, FlatList } from 'react-native'
import ScreenMask from '@/components/wrappers/screen'
import { font, RH, RW } from '@/theme/utils'
import { WHITE } from '@/theme/colors'
import Message from '../../shared/container/message'
import Composer from '../../shared/composer'
import messageDefault from './messageData'
import { useDispatch, useSelector } from 'react-redux'
import {
  setEmail,
  setName,
  setSignUpError,
  setSignUpStep,
  setSurName,
  signUp,
  signUp2,
  signUp3,
  signUp4,
} from '@/store/Slices/AuthSlice'
import { useNavigation } from '@react-navigation/native'
import Button from '@/components/buttons/Button'
import Row from '@/components/wrappers/row'
import DarkButton from '@/components/buttons/DarkButton'
import Consent from '@/assets/imgs/Consent'

const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const SignUp = () => {
  const ref = useRef()
  const dispatch = useDispatch()
  const [emailUsedBtns, setEmailUsedBtns] = useState(false)
  const [password, setPassword] = useState('')
  const [text, setText] = useState('')

  const [messagesList, setMessagesList] = useState([
    messageDefault.hello,
    messageDefault.hello2,
    messageDefault.name,
  ])
  const [agreeBtn, setAgreeBtn] = useState(false)

  const { signUpError, expired_token, signUpStep, user, documentRules } = useSelector(
    ({ auth }) => auth,
  )
  const scrollViewRef = useRef(null)
  const navigation = useNavigation()

  const handlerMessage = (message) => {
    setMessagesList((messagesList) => [...messagesList, message])
  }

  useEffect(() => {
    if (signUpError?.length) {
      console.log(signUpError, 'signUpError')
      if (signUpError == 'Электронная почта, уже используемая') {
        handlerMessage(messageDefault.usedEmail)
        handlerMessage({
          text: `Хотите авторизоваться с помощью электронной почты '${user.email}'?`,
          type: 'TEXT',
          position: 'left',
        })
        setEmailUsedBtns(true)
      }

      dispatch(setSignUpError(''))
    }
  }, [signUpError])

  const onPress = () => {
    // dispatch(setToken(1234567))
    switch (signUpStep) {
      case 'NAME':
        dispatch(setName(text))
        dispatch(setSignUpStep('SURNAME'))
        handlerMessage(messageDefault.surname)
        break
      case 'SURNAME':
        dispatch(setSurName(text))
        dispatch(setSignUpStep('EMAIL'))
        handlerMessage(messageDefault.email)
        break
      case 'EMAIL':
        if (regEmail.test(text)) {
          dispatch(setEmail(text.toLocaleLowerCase()))
          dispatch(
            signUp({
              name: user?.name,
              surname: user?.surname,
              email: text.toLocaleLowerCase(),
            }),
          )
        } else {
          handlerMessage(messageDefault.validEmail)
          handlerMessage(messageDefault.email)
        }
        break

      case 'EMAIL_VERIFY_CODE':
        if (text && text.length == 4) {
          dispatch(
            signUp2({
              verify_code: text,
              expired_token,
            }),
          )
        } else {
          setTimeout(() => {
            handlerMessage(messageDefault.validEmailPassword)
          }, 1000)
        }
        break

      case 'PASSWORD':
        if (text && text.length >= 6) {
          dispatch(setSignUpStep('PASSWORD_VERIFY'))
          setPassword(text)
          handlerMessage(messageDefault.verifyPassword)
        } else {
          handlerMessage(messageDefault.validPassword)
        }
        break
      case 'PASSWORD_VERIFY':
        if (text === password) {
          dispatch(signUp3({ password, expired_token }))
        } else {
          handlerMessage(messageDefault.validVerifyPassword)
        }
        break

      case 'CONSENT':
        if (text) {
          setTimeout(() => {
            handlerMessage(messageDefault.validConsent)
          }, 1000)
        }
        break
      default:
        return
    }
    setText('')
  }

  const memoRenderItem = ({ item, index }) => <Message message={item} id={index} />

  useEffect(() => {
    if (signUpStep == 'EMAIL_CODE') {
      handlerMessage(messageDefault.emailCode)
      dispatch(setSignUpStep('EMAIL_VERIFY_CODE'))
    } else if (signUpStep == 'EMAIL_CODE_SUCCESS') {
      handlerMessage(messageDefault.createPassword)
      dispatch(setSignUpStep('PASSWORD'))
    } else if (signUpStep == 'SIGN_UP_SUCCESSFULED') {
      navigation.replace('Onboard')
    }
  }, [signUpStep])
  useEffect(() => {
    if (documentRules?.length) {
      documentRules.forEach((item) => {
        handlerMessage({
          text: item.name,
          type: 'FILE',
          svg: <Consent path={item.path} name={item.name} />,
          position: 'left',
        })
      })
      setAgreeBtn(true)
    }
  }, [documentRules])
  useEffect(() => {
    dispatch(setSignUpStep('NAME'))
    setMessagesList([messageDefault.hello, messageDefault.hello2, messageDefault.name])
    return () => {
      dispatch(setSignUpStep('NAME'))
      setMessagesList([messageDefault.hello, messageDefault.hello2, messageDefault.name])
    }
  }, [])
  useEffect(() => {
    scrollViewRef.current.scrollToOffset({ animated: true, offset: 0 })
  }, [messagesList?.length])

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
      > */}
      <FlatList
        data={[...messagesList].reverse()}
        style={{
          marginBottom: RH(25),
        }}
        inverted
        refreshing
        initialNumToRender={4}
        removeClippedSubviews
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
        renderItem={memoRenderItem}
        keyExtractor={(_, index) => `post-${index}`}
      />
      <View style={styles.bottom}>
        {agreeBtn ? (
          <View
            style={{
              alignSelf: 'flex-end',
              width: RW(170),
              height: RH(36),
              marginVertical: RH(19),
            }}
          >
            <Button
              size={{ width: 170, height: 36 }}
              label="Я согласен"
              onPress={() => {
                const documents = documentRules?.map((item) => item._id)
                handlerMessage(messageDefault.iAgree)
                dispatch(signUp4({ expired_token, documents }))
              }}
            />
          </View>
        ) : emailUsedBtns ? (
          <Row wrapper={styles.btnsContainer}>
            <Button
              size={{ width: 100, height: 36 }}
              label="Да"
              onPress={() => {
                setEmailUsedBtns(false)
                handlerMessage({ id: Math.random(), text: 'Да' })
                setTimeout(() => {
                  navigation.navigate('SignIn', { email: user.email })
                }, 500)
              }}
            />
            <DarkButton
              size={{ width: 100, height: 36 }}
              containerStyle={{ marginLeft: RW(20) }}
              label="Нет"
              onPress={() => {
                setEmailUsedBtns(false)
                handlerMessage({ id: Math.random(), text: 'Нет' })
                handlerMessage(messageDefault.email)
              }}
            />
          </Row>
        ) : (
          <Composer
            text={text}
            setText={setText}
            onSend={(message) => {
              handlerMessage({ id: Math.random(), text: message })
              setTimeout(onPress, 200)
            }}
            ref={ref}
          />
        )}
      </View>
      {/* </KeyboardAvoidingView> */}
    </ScreenMask>
  )
}

export default SignUp

const styles = StyleSheet.create({
  bottom: {
    left: 0,
    right: 0,
    bottom: RH(10),
  },
  vk: {
    alignItems: 'center',
  },
  title: {
    marginVertical: RH(12),
    ...font('regular', 18, WHITE, 24),
  },
  btnsContainer: {
    justifyContent: 'flex-end',
    height: RH(36),
    marginVertical: RH(19),
  },
})
