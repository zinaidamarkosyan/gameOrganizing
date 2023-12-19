import { addAsyncStorage } from '@/helpers/asyncStore'
import { createSlice } from '@reduxjs/toolkit'
import { getUniqueId } from 'react-native-device-info'
import axiosInstance from '../Api'
import AsyncStorage from '@react-native-async-storage/async-storage'

const initialState = {
  user: {
    name: '',
    surname: '',
    email: '',
    avatar: null,
    preferences: [],
    took_part_games: [],
    vk_uri: '',
  },
  pending: false,
  token: '',
  expired_token: '',
  signUpSuccess: false,
  signInFirstStepSuccess: false,
  signInStep: 'EMAIL',
  signUpStep: 'NAME',
  documentRules: null,
}

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (store, action) => {
      return {
        ...store,
        token: action.payload,
      }
    },
    setExpiredToken: (store, action) => {
      return {
        ...store,
        expired_token: action.payload,
      }
    },

    setPending: (store, action) => {
      return {
        ...store,
        pending: action.payload,
      }
    },
    setUser: (store, action) => {
      return {
        ...store,
        user: action.payload,
      }
    },
    setImage: (store, action) => {
      return {
        ...store,
        user: {
          ...store.user,
          avatar: action.payload,
        },
      }
    },
    setName: (store, action) => {
      return {
        ...store,
        user: {
          ...store.user,
          name: action.payload,
        },
      }
    },
    setSurName: (store, action) => {
      return {
        ...store,
        user: {
          ...store.user,
          surname: action.payload,
        },
      }
    },
    setVkId: (store, action) => {
      return {
        ...store,
        user: {
          ...store.user,
          vk_uri: action.payload,
        },
      }
    },
    setEmail: (store, action) => {
      return {
        ...store,
        user: {
          ...store.user,
          email: action.payload,
        },
      }
    },
    setUserPreferences: (store, action) => {
      return {
        ...store,
        user: {
          ...store.user,
          preferences: action.payload,
        },
      }
    },
    setSignInError: (store, action) => {
      return {
        ...store,
        signInError: action.payload,
      }
    },
    setSignUpError: (store, action) => {
      return {
        ...store,
        signUpError: action.payload,
      }
    },
    setSignUpSuccess: (store, action) => {
      return {
        ...store,
        signUpSuccess: action.payload,
      }
    },
    setSignInStep: (store, action) => {
      return {
        ...store,
        signInStep: action.payload,
      }
    },
    setSignUpStep: (store, action) => {
      return {
        ...store,
        signUpStep: action.payload,
      }
    },
    setDocumentRules: (store, action) => {
      return {
        ...store,
        documentRules: action.payload,
      }
    },
    setTookPartGames: (store, action) => {
      return {
        ...store,
        user: {
          ...store.user,
          took_part_games: action.payload,
        },
      }
    },
  },
})

export const signIn = (data) => (dispatch) => {
  axiosInstance
    .post('api/auth/sign_in', data)

    .then((response) => {
      dispatch(setExpiredToken(response.data.expired_token))
      dispatch(setSignInStep('EMAIL_SUCCESS'))
    })
    .catch((err) => {
      console.error('Error: request', err.request._response)

      dispatch(
        setSignInError(
          typeof err.request._response == 'string'
            ? JSON.parse(err.request._response).message
            : err.request._response.message,
        ),
      )
    })
}
export const signIn2 = (data) => async (dispatch) => {
  const deviceId = await getUniqueId()
  const fcmToken = await AsyncStorage.getItem('fcmToken')
  if (deviceId && fcmToken) {
    data.device_id = deviceId
    data.fcm_token = fcmToken
  }
  axiosInstance
    .post('api/auth/sign_in/second_step', data)
    .then((response) => {
      dispatch(setUser(response.data.user))
      dispatch(setToken(response.data.token.access_token))
      addAsyncStorage('token', response.data.token.access_token)
    })
    .catch((err) => {
      console.error('Error: request', err.request?._response)
      dispatch(
        setSignInError(
          typeof err.request._response == 'string'
            ? JSON.parse(err.request._response).message
            : err.request._response.message,
        ),
      )
    })
}
export const forgitPassword = (data) => (dispatch) => {
  axiosInstance
    .post('api/auth/password_reset', data)
    .then((response) => {})
    .catch((err) => {
      console.error('Error: request forgitPassword', err.request?._response)
    })
}
export const forgitPassword2 = (data) => (dispatch) => {
  axiosInstance
    .post('api/auth/password_reset_second_step', data)
    .then((response) => {
      dispatch(setSignInStep('FORGOT_PASSWORD_SUCCESS'))
    })
    .catch((err) => {
      console.error('Error: request forgitPassword2', err.request?._response)
    })
}

export const forgitPassword3 = (data) => (dispatch) => {
  axiosInstance
    .post('api/auth/password_reset_third_step', data)
    .then((response) => {
      setTimeout(() => {
        dispatch(setToken(response.data?.expired_token?.access_token))
        addAsyncStorage('token', response.data?.expired_token?.access_token)
      }, 1500)
    })
    .catch((err) => {
      console.error('Error: request forgitPassword3', err.request?._response)
    })
}
export const signUp = (data) => (dispatch) => {
  axiosInstance
    .post('api/auth/signup/first_step', data)
    .then((response) => {
      dispatch(setExpiredToken(response.data?.expired_token))
      dispatch(setSignUpStep('EMAIL_CODE'))
    })

    .catch((err) => {
      console.error('Error: request response', err.request._response)
      dispatch(
        setSignUpError(
          typeof err.request._response == 'string'
            ? JSON.parse(err.request._response).message[0]
            : err.request._response.message[0],
        ),
      )
    })
}

export const signUp2 = (data) => (dispatch) => {
  axiosInstance
    .post('api/auth/signup/second_step', data)
    .then((response) => {
      dispatch(setExpiredToken(response.data?.expired_token))
      dispatch(setSignUpStep('EMAIL_CODE_SUCCESS'))
    })
    .catch((err) => {
      console.error('Error: request response', err.request._response)
      dispatch(
        setSignUpError(
          typeof err.request._response == 'string'
            ? JSON.parse(err.request._response).message[0]
            : err.request._response.message[0],
        ),
      )
    })
}
export const signUp3 = (data) => (dispatch) => {
  axiosInstance
    .post('api/auth/signup/third_step', data)

    .then(() => {
      dispatch(getDocumentRules())
    })
    .catch((err) => {
      console.error('Error: request response', err.request._response)
      dispatch(
        setSignUpError(
          typeof err.request._response == 'string'
            ? JSON.parse(err.request._response).message[0]
            : err.request._response.message[0],
        ),
      )
    })
}
export const signUp4 = (data) => async (dispatch) => {
  const deviceId = await getUniqueId()
  const fcmToken = await AsyncStorage.getItem('fcmToken')
  if (deviceId && fcmToken) {
    data.device_id = deviceId
    data.fcm_token = fcmToken
  }
  axiosInstance
    .post('api/auth/signup/fourth_step', data)
    .then((response) => {
      setUser(response.data.user)
      dispatch(setSignUpStep('SIGN_UP_SUCCESSFULED'))
      dispatch(setExpiredToken(response.data.token.access_token))
    })
    .catch((err) => {
      console.error('Error: request response', err.request._response)
      dispatch(
        setSignUpError(
          typeof err.request._response == 'string'
            ? JSON.parse(err.request._response).message[0]
            : err.request._response.message[0],
        ),
      )
    })
}
export const changeUserPreferences = (data, token) => async (dispatch) => {
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Accept', 'application/json')
  const formdata = new FormData()
  data.forEach((elm) => {
    formdata.append('preferences[]', elm)
  })
  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow',
  }
  fetch(
    Platform.OS == 'ios'
      ? 'https://to-play.ru/api/user/preferences'
      : 'http://to-play.ru/api/user/preferences',
    requestOptions,
  )
    .then((response) => {
      dispatch(setUserPreferences(data))
      return response.json()
    })

    .catch((err) => {
      console.error('Error:or changing preferences : ', err)
    })
}
export const getDocumentRules = () => (dispatch) => {
  axiosInstance
    .get('api/document-rules')
    .then((response) => {
      dispatch(setDocumentRules(response.data?.datas))
    })
    .catch((err) => {
      console.error('Error: request response', err.request._response)
    })
}

export const vkAuth = (data) => async (dispatch) => {
  const deviceId = await getUniqueId()
  const fcmToken = await AsyncStorage.getItem('fcmToken')
  if (deviceId && fcmToken) {
    data.device_id = deviceId
    data.fcm_token = fcmToken
  }
  axiosInstance
    .post('api/auth/vk', data)
    .then((response) => {
      dispatch(setUser(response.data?.user))
      dispatch(setToken(response.data?.token))
      addAsyncStorage('token', response.data?.token)
    })
    .catch((err) => {
      console.error('Error: Vk auth error request response - ', err.request?._response)
    })
}
export const editProfile = (data) => (dispatch) => {
  axiosInstance
    .put('api/profile', data)

    .catch((err) => {
      console.error('Error: request _response', err.request._response)
    })
}
export const getProfileInfo = () => (dispatch) => {
  axiosInstance
    .get('api/profile')
    .then((response) => {
      dispatch(setUser(response.data?.user))
    })
    .catch((err) => {
      console.error('Error: request _response', err.request._response)
    })
}
export const {
  setToken,
  setExpiredToken,
  setPending,
  setName,
  setSurName,
  setEmail,
  setUserPreferences,
  setUser,
  setImage,
  setVkId,
  setSignInFirstStepSuccess,
  setSignInError,
  setSignUpError,
  setSignUpSuccess,
  setSignInStep,
  setSignUpStep,
  setDocumentRules,
  setTookPartGames,
} = AuthSlice.actions
export default AuthSlice.reducer
