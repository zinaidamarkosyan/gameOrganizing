import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { Platform } from 'react-native'

const baseURL = Platform.OS == 'ios' ? 'https://to-play.ru/' : 'http://to-play.ru/'
// const baseURL = 'https://2dff-37-252-82-211.eu.ngrok.io'

const axiosInstance = axios.create()
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token')
    if (typeof token == 'string') {
      config.headers.Authorization = 'Bearer ' + token
    }
    config.headers.Accept = '*/*'
    config.headers['Content-Type'] = 'application/json; charset=utf-8'
    config.baseURL = baseURL
    return config
  },
  (error) => {
    console.log('axiosInstance error', error)
    return Promise.reject(error)
  },
)
export default axiosInstance
