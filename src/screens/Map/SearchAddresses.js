import MapSvg from '@/assets/svgs/mapSvg'
import { useDebounce } from '@/helpers/useDebounce'
import { setLatitude, setLongitude, setPlaceName } from '@/store/Slices/GameCreatingSlice'
import { BACKGROUND, ICON } from '@/theme/colors'
import { RH, RW } from '@/theme/utils'
import { useNavigation } from '@react-navigation/native'
import { useEffect, useRef, useState } from 'react'
import {
  Alert,
  PermissionsAndroid,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAddress } from './fetchAddress'

const GOOGLE_API_KEY = 'AIzaSyBEfoq_jSo1AZwtYmNikfuqLBrgVclc8Qc'

const SearchAddresses = ({
  game,
  setAddressName = () => {},
  addressName = '',
  navigateTo = '',
  command = null,
  size = 380,
  props = {},
}) => {
  const inp = useRef()
  const [state, setState] = useState('')
  const [addresses, setAddresses] = useState(null)
  const debouncedValue = useDebounce(state, 500)
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const initialState = useSelector((state) => state.game)

  const checkPermissionAndNavigate = async function requestLocationPermission() {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          navigation.navigate('Map', { game: game, navigateTo: navigateTo, command: command })
        } else {
          Alert.alert('Доступ к местоположению запрещен')
        }
      } catch (err) {
        console.warn(err)
      }
    } else {
      let geo = await Geolocation.requestAuthorization('always')
      if (geo === 'granted') {
        navigation.navigate('Map', { game: game, navigateTo: navigateTo, command: command })
      } else {
        alert('Доступ к местоположению запрещен')
      }
    }
  }
  useEffect(() => {
    setAddresses('')
    dispatch(setPlaceName(''))
    setState(!command ? '' : command?.address_name)
  }, [])
  useEffect(() => {
    setState(command ? command?.address_name : initialState?.address_name)
  }, [initialState.address_name])
  const makeURL = async (state) => {
    try {
      const res = fetchAddress(false, null, null, state).then(async (e) => {
        await fetch(e.url)
          .then((r) => {
            return r?.json()
          })
          .then((s) => {
            if (s.results?.length) {
              let response = s.results[0]?.formatted_address
              setAddresses(response)
              setAddressName({
                address_name: response,
                lat: s.results[0]?.geometry.bounds?.northeast.lat,
                lng: s.results[0]?.geometry.bounds?.northeast?.lng,
              })

              dispatch(setLatitude(s.results[0]?.geometry.bounds?.northeast.lat))
              dispatch(setLongitude(s.results[0]?.geometry.bounds?.northeast?.lng))
              // dispatch(setPlaceName(response))
            } else {
              setAddresses('Не найденно')
            }
          })
      })
      return res
    } catch (err) {
      return console.log('err', err)
    }
  }
  const chooseAddress = () => {
    console.log(addresses.length)
    if (addresses?.length >= 35) {
      setState(addresses.split().reverse().join().substring(0, 32) + '...')
    } else {
      setState(addressName)
    }
    setAddresses(null)
    dispatch(setPlaceName(addressName.address_name))
  }
  const inputHandler = (e) => {
    setState(e)
  }
  useEffect(() => {
    if (state?.length >= 4 && state?.length <= 35) {
      makeURL(state)
    } else {
      setAddresses(null)
      setAddressName('')
    }
  }, [debouncedValue])

  return (
    <View style={{ flexDirection: 'column' }}>
      <View
        style={[
          styles.container,
          { width: RW(size) },
          addresses ? { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 } : null,
        ]}
      >
        <TextInput
          style={styles.input}
          ref={inp}
          placeholder={'Адрес проведения игры'}
          placeholderTextColor={ICON}
          value={state?.length > 35 ? state.substring(0, 33) + '...' : state}
          onChangeText={inputHandler}
        ></TextInput>
        <TouchableOpacity onPress={checkPermissionAndNavigate} style={styles.mapIcon}>
          <MapSvg />
        </TouchableOpacity>
      </View>
      {addresses && (
        <Pressable style={styles.responseAddress} onPress={chooseAddress}>
          <Text style={styles.searchedAddress}>{addresses}</Text>
        </Pressable>
      )}
    </View>
  )
}

export default SearchAddresses

const styles = StyleSheet.create({
  searchIcon: {
    width: '15%',
    alignItems: 'center',
  },
  container: {
    backgroundColor: BACKGROUND,
    width: RW(380),
    height: RH(50),
    alignSelf: 'center',
    flexDirection: 'row',
    // top: RH(32),
    zIndex: 89,
    borderRadius: RW(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    color: ICON,
    width: '80%',
    marginLeft: RW(20),
    fontSize: RW(16),
  },
  responseAddress: {
    backgroundColor: BACKGROUND,
    width: RW(380),
    height: RH(55),
    alignSelf: 'center',
    zIndex: 888,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: RW(10),
    borderBottomRightRadius: RW(10),
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },

  searchedAddress: {
    color: ICON,
    fontSize: RW(16),
    marginLeft: RW(20),
  },
  mapIcon: {
    left: '25%',
  },
})
