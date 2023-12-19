import { Animated, Easing, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import LoaderSvg from '../../Mafia/PlayMafia/assets/LoaderSvg'
import { RH } from '@/theme/utils'

const AliasLoader = ({ background = true }) => {
  const { loader } = useSelector(({ alias }) => alias)

  const rotateAnimation = new Animated.Value(0)
  const startImageRotateFunction = () => {
    rotateAnimation.setValue(0)
    Animated.timing(rotateAnimation, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      if (loader) {
        startImageRotateFunction()
      }
    })
  }

  const interpolateRotating = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  const animatedStyle = {
    transform: [
      {
        rotate: interpolateRotating,
      },
    ],
  }
  useEffect(() => {
    startImageRotateFunction()
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
        zIndex: 99999,
        top: 0,
        bottom: 0,
        left: -40,
        right: -40,
        paddingHorizontal: 40,
        backgroundColor: background ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0)',
      }}
    >
      {/* <ActivityIndicator size="large" color={'#fff'} /> */}
      <Animated.View style={animatedStyle}>
        <LoaderSvg />
      </Animated.View>

      <Text style={{ color: '#fff', fontSize: 20, textAlign: 'center', marginTop: RH(20) }}>
        {typeof loader == 'string' ? loader : `Не все игроки готовы к игре. ${'\n'}Ждем!`}
      </Text>
    </View>
  )
}

export default AliasLoader

const styles = StyleSheet.create({})
