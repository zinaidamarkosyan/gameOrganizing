import React from 'react'
import { Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import MaskedView from '@react-native-masked-view/masked-view'

const GradientText = (TextProps) => {
  console.log('TextProps.colors', TextProps.colors)
  return (
    <MaskedView maskElement={<Text {...TextProps} />}>
      <LinearGradient colors={TextProps?.colors || []} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
        <Text {...TextProps} style={[TextProps.style, { opacity: 0 }]} />
      </LinearGradient>
    </MaskedView>
  )
}

export default GradientText
