import * as React from 'react'
import { Image, ImageBackground, SafeAreaView, View } from 'react-native'
import Background from './background.jpg'

function AliasBackground({ children, style = {} }) {
  return (
    <ImageBackground
      source={Background}
      resizeMode="cover"
      style={{
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <SafeAreaView style={style}>{children}</SafeAreaView>
    </ImageBackground>
  )
}

export default AliasBackground
