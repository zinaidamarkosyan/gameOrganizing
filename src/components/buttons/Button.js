import React from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Svg, Defs, LinearGradient, Stop, Rect } from 'react-native-svg'
import { font, RH, RW } from '@/theme/utils'
import { LIGHT_LABEL } from '@/theme/colors'

const LightButton = ({ onPress, label, labelStyle, wrapper, size, style = {} }) => {
  const width = RW(size?.width) || RW(172)
  let height = RH(size?.height) || RH(36)
  if (Dimensions.get('screen').height < 670) {
    height = height * 1.5
  }

  const radius = '10'
  return (
    <TouchableOpacity
      disabled={false}
      activeOpacity={0.5}
      onPress={onPress && onPress}
      style={[
        {
          backgroundColor: 'transparent',
        },
        style,
      ]}
    >
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Rect
          x="0.911133"
          y="0.425781"
          width={width - RW(1)}
          height={height - RH(1)}
          rx={radius}
          fill="url(#paint0_linear_3011_31801)"
        />
        <Rect
          x="9.98022"
          y="6.92578"
          width={width - RW(20)}
          height={height - RH(14)}
          rx="9.5"
          stroke="url(#paint1_linear_3011_31801)"
          strokeWidth="5"
        />
        <Rect
          x="7.98022"
          y="4.92578"
          width={width - RW(16)}
          height={height - RH(10)}
          rx="11.5"
          stroke="url(#paint2_linear_3011_31801)"
        />
        <View style={[styles.root, wrapper]}>
          <Text style={[styles.labelStyle, labelStyle]}>{label}</Text>
        </View>
        <Defs>
          <LinearGradient
            id="paint0_linear_3011_31801"
            x1="0.911134"
            y1="28.4258"
            x2="238.912"
            y2="28.8832"
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#7DCE8A" />
            <Stop offset="1" stopColor="#4D7CFE" />
          </LinearGradient>
          <LinearGradient
            id="paint1_linear_3011_31801"
            x1="118.105"
            y1="-6.48191"
            x2="119.271"
            y2="21.9453"
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="white" />
            <Stop offset="1" stopColor="white" stopOpacity="0" />
          </LinearGradient>
          <LinearGradient
            id="paint2_linear_3011_31801"
            x1="119.911"
            y1="44.4258"
            x2="119.852"
            y2="36.5571"
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="white" />
            <Stop offset="1" stopColor="white" stopOpacity="0" />
          </LinearGradient>
        </Defs>
      </Svg>
      {/* </Shadow> */}
    </TouchableOpacity>
  )
}

export default LightButton

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelStyle: {
    fontWeight: '700',
    ...font('bold', 18, LIGHT_LABEL, 24),
  },
})
