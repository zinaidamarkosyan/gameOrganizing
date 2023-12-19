import AsyncStorage from '@react-native-async-storage/async-storage'
export const getAsyncStorage = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue // != null ? JSON.parse(jsonValue) : null
  } catch (e) {
    console.log('Async Storage get data error')
  }
}

export const addAsyncStorage = async (key, value) => {
  try {
    const jsonValue = typeof value == 'string' ? value : JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (e) {
    console.log('Async Storage set data error')
  }
}
export const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear()
  } catch (e) {
    console.log('Async Storage clear data error')
  }
}
