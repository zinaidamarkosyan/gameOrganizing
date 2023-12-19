import { Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import LottieView from 'lottie-react-native'
import { RH, font } from '@/theme/utils'

const CrocodileLoader = ({ background = true }) => {
  // const { loader } = useSelector(({ crocodile }) => crocodile)
  let loader = true
  const animationRef = useRef(null)
  useEffect(() => {
    if (loader) {
      animationRef.current?.play()
    } else {
      animationRef.current?.pause()
    }
  }, [loader])
  if (!loader) {
    return null
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 99999999,
        top: 0,
        bottom: 0,
        left: -40,
        right: -40,
        paddingHorizontal: 40,
        backgroundColor: background ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0)',
      }}
    >
      <View
        style={{
          width: 100,
          height: 100,

          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <LottieView
          ref={animationRef}
          source={require('../../../assets/loader.json')}
          loop
          resizeMode="contain"
          style={{ position: 'absolute', width: 200, height: 200 }}
        />
      </View>

      <Text style={{ textAlign: 'center', ...font('bold', 24, '#fff', 44), marginTop: RH(40) }}>
        {typeof loader == 'string' ? loader : 'Не все игроки готовы.\n Ждем остальных!'}
      </Text>
    </View>
  )
}

export default CrocodileLoader
