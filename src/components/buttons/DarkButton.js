import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text, Dimensions } from 'react-native'
import { Svg, Defs, LinearGradient, Stop, Rect } from 'react-native-svg'
import { font, RH, RW } from '@/theme/utils'
import { WHITE } from '@/theme/colors'

const DarkButton = ({ onPress, label, labelStyle, wrapper, size, containerStyle = {} }) => {
  const width = RW(size?.width) || RW(172)
  let height = RH(size?.height) || RH(36)
  if (Dimensions.get('screen').height < 670) {
    height = height * 1.5
  }

  return (
    <TouchableOpacity activeOpacity={0.7} style={containerStyle} onPress={onPress && onPress}>
      <Svg
        width={width}
        height={height}
        viewBox={'0 0 ' + width + ' ' + height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Rect
          x={1.41113}
          y={0.5}
          width={width - RW(2)}
          height={height - RH(1)}
          rx={10}
          fill="#142A5C"
          stroke="url(#paint0_linear_3124_10044)"
        />
        <Rect
          x={9.98022}
          y={6.5}
          width={width - RW(20)}
          height={height - RH(13)}
          rx={9.5}
          stroke="url(#paint1_linear_3124_10044)"
          strokeWidth={5}
        />
        <Rect
          x={7.98022}
          y={4.5}
          width={width - RW(16)}
          height={height - RH(9)}
          rx={11.5}
          stroke="url(#paint2_linear_3124_10044)"
        />
        <View style={[styles.root, wrapper]}>
          <Text style={[styles.labelStyle, labelStyle]}>{label}</Text>
        </View>
        <Defs>
          <LinearGradient
            id="paint0_linear_3124_10044"
            x1={0.911134}
            y1={28}
            x2={238.912}
            y2={28.4574}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#7DCE8A" />
            <Stop offset={1} stopColor="#4D7CFE" />
          </LinearGradient>
          <LinearGradient
            id="paint1_linear_3124_10044"
            x1={118.105}
            y1={-6.90769}
            x2={119.271}
            y2={21.5195}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#fff" />
            <Stop offset={1} stopColor="#fff" stopOpacity={0} />
          </LinearGradient>
          <LinearGradient
            id="paint2_linear_3124_10044"
            x1={119.911}
            y1={44}
            x2={119.852}
            y2={36.1313}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#fff" />
            <Stop offset={1} stopColor="#fff" stopOpacity={0} />
          </LinearGradient>
        </Defs>
      </Svg>
    </TouchableOpacity>
  )
}

export default DarkButton

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelStyle: {
    ...font('bold', 16, WHITE),
  },
})
