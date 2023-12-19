import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import ScreenMask from '@/components/wrappers/screen'
import { RH, RW, font } from '@/theme/utils'
import { WHITE } from '@/theme/colors'
import PickImage from './components/PickImage'
import LightButton from '@/components/buttons/Button'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { setGameFinishPhoto } from '@/store/Slices/GamesSlice'

const AddPhoto = ({ route }) => {
  const { token } = useSelector(({ auth }) => auth)
  const gameFinishPhoto = useSelector(({ games }) => games?.gameFinishPhoto)
  const navigation = useNavigation()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setGameFinishPhoto(null))
  }, [])

  const hundleSubmit = () => {
    let formdata = new FormData()
    formdata.append('file', {
      name: 'file',
      type: gameFinishPhoto?.type,
      uri: gameFinishPhoto?.uri,
    })
    formdata.append('create_game_id', route.params.gameId)

    let myHeaders = new Headers()
    myHeaders.append('Content-Type', 'multipart/form-data')
    myHeaders.append('Authorization', `Bearer ${token}`)
    myHeaders.append('Accept', 'application/json')
    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    }

    fetch(
      Platform.OS == 'ios'
        ? 'https://to-play.ru/api/create/game/add_images'
        : 'http://to-play.ru/api/create/game/add_images',
      requestOptions,
    )
      .then((result) => {
        if (route.params?.users?.length) {
          navigation.navigate('RatePlayers', route.params)
        } else {
          navigation.navigate('Home')
        }
        dispatch(setGameFinishPhoto(null))
      })
      .catch((error) => console.log('error', error))
  }
  return (
    <ScreenMask>
      <Text style={styles.title}>
        Поделитесь впечатлениями от игры. {'\n'}
        Разместите фото/видео с игры
      </Text>
      <View style={styles.imagePickContainer}>
        <PickImage gameFinishPhoto={gameFinishPhoto} />
      </View>
      <LightButton
        onPress={hundleSubmit}
        style={{ alignSelf: 'center', marginBottom: RH(30) }}
        size={{ width: RW(280), height: RH(48) }}
        label={gameFinishPhoto ? 'Далее' : 'Пропустить'}
      />
    </ScreenMask>
  )
}

export default AddPhoto

const styles = StyleSheet.create({
  title: {
    ...font('bold', 20, WHITE, 30),
    textAlign: 'center',
    marginTop: RH(10),
  },
  imagePickContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
