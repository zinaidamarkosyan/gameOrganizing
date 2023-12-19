import React, { useEffect, useRef, useState } from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, View, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import ScreenMask from '@/components/wrappers/screen'
import { RH, RW } from '@/theme/utils'
import Message from '../../shared/container/message'
import Composer from '../../shared/composer'
import messageDefault from './messageData'
import {
  forgitPassword,
  forgitPassword3,
  setSignInStep,
  signIn,
  signIn2,
} from '@/store/Slices/AuthSlice'
import Button from '@/components/buttons/Button'
import Row from '@/components/wrappers/row'
import DarkButton from '@/components/buttons/DarkButton'
import { forgitPassword2 } from '../../../../store/Slices/AuthSlice'

const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
let passwordForgotErrorCount = 1

const SignIn = (props) => {
  const [text, setText] = useState('')
  const [password, setPassword] = useState('')

  const [forgetPassword, setForgetPassword] = useState(false)

  const [messagesList, setMessagesList] = useState([messageDefault.hello, messageDefault.email])
  const { signInError, signInStep, expired_token } = useSelector(({ auth }) => auth)
  const emailWithSignUp = props.route.params?.email
  const dispatch = useDispatch()
  const scrollViewRef = useRef(null)

  const handlerMessage = (message) => {
    setMessagesList((messagesList) => [...messagesList, message])
  }

  const nextStape = async () => {
    switch (signInStep) {
      case 'EMAIL':
        if (regEmail.test(text)) {
          dispatch(signIn({ email: text.toLocaleLowerCase().trim() }))
        } else {
          handlerMessage(messageDefault.emailError)
          handlerMessage(messageDefault.email)
        }

        break
      case 'PASSWORD':
        dispatch(signIn2({ expired_token: expired_token, password: text.toLocaleLowerCase() }))
        break
      case 'EMAIL_VERIFY_CODE':
        if (text && text.length == 4) {
          dispatch(forgitPassword2({ expired_token: expired_token, verify_code: text }))
        } else {
          setTimeout(() => {
            handlerMessage(messageDefault.validEmailCode)
          }, 1000)
        }
        break
      case 'CREATE_PASSWORD':
        if (text && text.length >= 6) {
          setPassword(text)
          handlerMessage(messageDefault.ConfirmCreatetPassword)
          dispatch(setSignInStep('CONFIRM_CREATET_PASSWORD'))
        } else {
          handlerMessage(messageDefault.validPassword)
        }
        break
      case 'CONFIRM_CREATET_PASSWORD':
        if (text && text.length >= 6) {
          if (text == password) {
            dispatch(forgitPassword3({ expired_token: expired_token, password: text }))
            handlerMessage(messageDefault.forgotPasswordSuccess)
          } else {
            handlerMessage(messageDefault.validVerifyPassword)
          }
        } else {
          handlerMessage(messageDefault.validPassword)
        }
        break
      default:
        return
    }
    setText('')
  }
  useEffect(() => {
    if (signInStep == 'EMAIL_SUCCESS') {
      handlerMessage(messageDefault.password)
      dispatch(setSignInStep('PASSWORD'))
    } else if (signInStep == 'FORGOT_PASSWORD_SUCCESS') {
      handlerMessage(messageDefault.createPassword)
      dispatch(setSignInStep('CREATE_PASSWORD'))
    }
  }, [signInStep])

  const memoRenderItem = ({ item, index }) => <Message message={item} id={index} />

  useEffect(() => {
    if (signInError?.length) {
      if (signInError == 'Нет такой электронной почты') {
        handlerMessage({ position: 'left', text: signInError, error: true })
        handlerMessage(messageDefault.email)
      } else if (signInError == 'Неправильный адрес электронной почты или пароль') {
        if (passwordForgotErrorCount == 2) {
          passwordForgotErrorCount = 0
          handlerMessage(messageDefault.forgotPassword)
          setForgetPassword(true)
        } else {
          handlerMessage(messageDefault.passwordError)
          handlerMessage(messageDefault.password)
          passwordForgotErrorCount++
        }
      } else if (signInError == 'Неверный код верификации') {
        handlerMessage({ position: 'left', text: signInError, error: true })
      } else {
        handlerMessage(messageDefault.emailError)
        handlerMessage(messageDefault.email)
      }
    }
  }, [signInError])

  useEffect(() => {
    if (emailWithSignUp) {
      handlerMessage({ id: Math.random(), text: emailWithSignUp })
      if (regEmail.test(emailWithSignUp)) {
        dispatch(signIn({ email: emailWithSignUp.toLocaleLowerCase() }))
      } else {
        handlerMessage(messageDefault.emailError)
        handlerMessage(messageDefault.email)
      }
    }
  }, [emailWithSignUp])

  useEffect(() => {
    dispatch(setSignInStep('EMAIL'))
    setMessagesList([messageDefault.hello, messageDefault.email])
    return () => {
      dispatch(setSignInStep('EMAIL'))
      setMessagesList([messageDefault.hello, messageDefault.email])
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
        {forgetPassword ? (
          <Row wrapper={styles.btnsContainer}>
            <Button
              size={{ width: 100, height: 36 }}
              label="Да"
              onPress={() => {
                setForgetPassword(false)
                handlerMessage({ id: Math.random(), text: 'Да' })
                handlerMessage(messageDefault.emailCode)
                dispatch(forgitPassword({ expired_token: expired_token }))
                dispatch(setSignInStep('EMAIL_VERIFY_CODE'))
              }}
            />
            <DarkButton
              size={{ width: 100, height: 36 }}
              containerStyle={{ marginLeft: RW(20) }}
              label="Нет"
              onPress={() => {
                setForgetPassword(false)
                handlerMessage({ id: Math.random(), text: 'Нет' })
                handlerMessage(messageDefault.password)
              }}
            />
          </Row>
        ) : (
          <Composer
            text={text}
            setText={setText}
            onSend={(message) => {
              handlerMessage({ id: Math.random(), text: message })
              setTimeout(nextStape, 200)
            }}
          />
        )}
      </View>
      {/* </KeyboardAvoidingView> */}
    </ScreenMask>
  )
}

export default SignIn

const styles = StyleSheet.create({
  bottom: {
    left: 0,
    right: 0,
    bottom: RH(10),
  },
  btnsContainer: {
    justifyContent: 'flex-end',
    height: RH(36),
    marginVertical: RH(19),
  },
})
