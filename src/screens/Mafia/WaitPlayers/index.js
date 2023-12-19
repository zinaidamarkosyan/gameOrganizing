import React, { useEffect } from 'react'
import { View } from 'react-native'
import MafiaLoader from '../PlayMafia/components/MafiaLoader'
import { RH, RW } from '@/theme/utils'
import ScreenMask from '@/components/wrappers/screen'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearAllDatas,
  participateToGame,
  setLoader,
  setParticipateSuccess,
} from '@/store/Slices/MafiaSlice'
import { useNavigation } from '@react-navigation/native'
import { setPending } from '@/store/Slices/AuthSlice'
import FastImage from 'react-native-fast-image'

const WaitPlayers = ({ route }) => {
  const propsGameId = route.params?.id
  const { participateSuccess } = useSelector(({ mafia }) => mafia)

  const dispatch = useDispatch()
  const navigation = useNavigation()

  useEffect(() => {
    if (propsGameId) {
      dispatch(clearAllDatas())
      dispatch(participateToGame(propsGameId))
    }
  }, [propsGameId])

  useEffect(() => {
    if (participateSuccess === false) {
      alert('Что-то пошло не так')
      navigation.navigate('Home')
      dispatch(setParticipateSuccess(null))
    }
    dispatch(setPending(false))
    dispatch(setLoader(true))
  }, [participateSuccess])
  return (
    <ScreenMask>
      <View
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <FastImage
        resizeMode='contain'
          style={{ width: '80%',position: 'absolute' }}
          source={require('./assets/bgLogo.png')}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          width: RW(448),
          height: RH(946),
          left: RW(-20),
          right: RW(-20),
          top: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
        }}
      >
        <MafiaLoader background={false} />
      </View>
    </ScreenMask>
  )
}
export default WaitPlayers
