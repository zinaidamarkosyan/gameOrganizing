import { useLayoutEffect, useRef, useState } from 'react'
import { StyleSheet, View, Pressable, Image, Text, Platform } from 'react-native'
import { DARK_BLUE } from '@/theme/colors'
import { RH, RW } from '@/theme/utils'
import Geolocation from '@react-native-community/geolocation'
import GeolocationIcon from '@/assets/svgs/GeoloactionIcon'
import MapView, { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps'
import { setLatitude, setLongitude, setPlaceName } from '@/store/Slices/GameCreatingSlice'
import { useDispatch } from 'react-redux'
import { fetchAddress } from './fetchAddress'
import { useNavigation } from '@react-navigation/native'

const Map = ({ route }) => {
  const mapRef = useRef()
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const { game, command, navigateTo, props } = route.params
  const [userPosition, setUserPosition] = useState({
    latitude: 55.751244,
    longitude: 37.618423,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  })
  const [markers, setMarkers] = useState([])
  const getPosition = () => {
    Geolocation.getCurrentPosition((position) => {
      const currentLatitude = position.coords.latitude
      const currentLongitude = position.coords.longitude
      setUserPosition({
        latitude: currentLatitude,
        longitude: currentLongitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }),
        mapRef.current.animateToRegion(userPosition, 1000)
      ;(error) => alert(error.message),
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000,
        }
    })
  }
  useLayoutEffect(() => {
    getPosition()
    setMarkers([])
  }, [])

  return (
    <>
      <MapView
        ref={mapRef}
        style={styles.map}
        liteMode={true}
        initialRegion={userPosition}
        showsBuildings={true}
        provider={Platform.OS == 'ios' ? PROVIDER_DEFAULT : PROVIDER_GOOGLE}
        showsUserLocation={false}
        onPress={(e) => {
          dispatch(setLatitude(e.nativeEvent.coordinate.latitude)),
            dispatch(setLongitude(e.nativeEvent.coordinate.longitude))
          setMarkers([
            {
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            },
          ])
          // dispatch(setLatitude(e.nativeEvent.coordinate.latitude))
          // dispatch(setLongitude(e.nativeEvent.coordinate.longitude))
          fetchAddress(
            true,
            e.nativeEvent.coordinate.latitude,
            e.nativeEvent.coordinate.longitude,
            null,
          ).then(async (e) => {
            await fetch(e.url)
              .then((r) => {
                return r.json()
              })
              .then((s) => {
                let response = s.results[0]?.formatted_address
                dispatch(setPlaceName(response))
                game
                  ? navigation.navigate('GameCreating', {
                      game: game,
                      response: response,
                      fromMap: true,
                    })
                  : null
                navigateTo == 'CreateTeamTitle'
                  ? navigation.navigate('CreateTeamTitle', {
                      response: {
                        address_name: response,
                        latitude: s.results[0].geometry.location.lat,
                        longitude: s.results[0].geometry.location.lng,
                        fromMap: true,
                        ...props,
                      },
                    })
                  : null
                navigateTo == 'EditTeam'
                  ? navigation.navigate('EditTeamInfo', {
                      ...command,
                      address_name: response,
                    })
                  : null
                navigateTo == 'Join'
                  ? navigation.navigate('JoinGame', {
                      address_name: response,
                      latitude: s.results[0].geometry.location.lat,
                      longitude: s.results[0].geometry.location.lng,
                      fromMap: true,
                    })
                  : null
                navigateTo == 'CommandLeadCreate'
                  ? navigation.navigate(navigateTo, {
                      address_name: response,
                      latitude: s.results[0].geometry.location.lat,
                      longitude: s.results[0].geometry.location.lng,
                      fromMap: true,
                    })
                  : null
                navigateTo == 'JoinTournament'
                  ? navigation.navigate('TournamentNavigator', {
                      screen: navigateTo,
                      params: {
                        address_name: response,
                        latitude: s.results[0].geometry.location.lat,
                        longitude: s.results[0].geometry.location.lng,
                        fromMap: true,
                      },
                    })
                  : null
                navigateTo == 'CreateTournamentInfo'
                  ? navigation.navigate('TournamentNavigator', {
                      screen: 'CreateTournamentInfo',
                      params: {
                        address_name: response,
                        latitude: s.results[0].geometry.location.lat,
                        longitude: s.results[0].geometry.location.lng,
                        fromMap: true,
                      },
                    })
                  : null

                navigateTo == 'CommandLeadNotCreate'
                  ? navigation.navigate(navigateTo, {
                      address_name: response,
                      latitude: s.results[0].geometry.location.lat,
                      longitude: s.results[0].geometry.location.lng,
                      fromMap: true,
                    })
                  : null
              })
          })
        }}
      >
        <Marker
          coordinate={{ latitude: userPosition.latitude, longitude: userPosition.longitude }}
          title={'Ваше место'}
          pinColor={'#00b7ff'}
        />
        {markers?.map((marker) => {
          return (
            <Marker
              tooltip={true}
              pinColor="random"
              // onPress={() => {
              //   setMarkers(markers.filter(mark => mark.latitude !== marker.latitude))
              // }}
              tracksViewChanges={false}
              key={Math.random().toString()}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.latitude.toString()}
            ></Marker>
          )
        })}
      </MapView>
      {/* <View style={{ width: '100%', position: 'absolute' }}><SearchAddresses /></View> */}
      <Pressable onPress={getPosition} style={styles.geoBtn}>
        <GeolocationIcon />
      </Pressable>
    </>
  )
}
export default Map

const styles = StyleSheet.create({
  map: {
    zIndex: 1,
    height: '100%',
    width: '100%',
    position: 'absolute',
  },

  geoBtn: {
    height: RH(64),
    width: RW(64),
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
    backgroundColor: DARK_BLUE,
    alignSelf: 'center',
    position: 'absolute',
    bottom: RH(40),
    right: RW(24),
    zIndex: 88,
  },
})
