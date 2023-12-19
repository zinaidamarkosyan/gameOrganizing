import React, { useRef } from 'react'
import { Pressable, Animated } from 'react-native'
import { useState } from 'react'
import { RH, RW } from '@/theme/utils'
import LinearGradient from 'react-native-linear-gradient'

const Toggle = ({ isOn, setIsOn }) => {
  // const [isOn, setIsOn] = useState(false)
  const value = useRef(new Animated.Value(isOn ? 37 : 0)).current

  function toggleHandle() {
    setIsOn(!isOn)

    Animated.spring(value, {
      toValue: !isOn ? 37 : 0,
      useNativeDriver: false,
    }).start()
  }
  const toggleAnimated = value.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  })
  return (
    <Pressable onPress={toggleHandle} style={{ width: RW(56), height: RH(25), right: RW(10) }}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={isOn ? ['rgba(125, 206, 138, 1)', 'rgba(77, 124, 254, 1)'] : ['#b3b7c2', '#b3b7c2']}
        style={{ width: RW(65), height: RH(24), borderRadius: RH(12) }}
      ></LinearGradient>
      <Animated.View
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.3,
          shadowRadius: 3.84,
          elevation: 5,
          position: 'absolute',
          top: RH(-3),
          transform: [{ translateX: toggleAnimated }],
        }}
      >
        <LinearGradient
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
          colors={['rgba(125, 206, 138, 1)', 'rgba(77, 124, 254, 1)']}
          style={{
            width: RW(30),
            height: RH(30),
            borderRadius: RH(15),
          }}
        ></LinearGradient>
      </Animated.View>
    </Pressable>
  )
}

export default Toggle
