import * as React from 'react'
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg'
import { memo } from 'react'
import { Text, View } from 'react-native'
import { font, RW } from '@/theme/utils'
import { LIGHT_LABEL } from '@/theme/colors'

const CircleSvg = (props) => (
  <Svg width={RW(40)} height={RW(40)} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Circle cx={RW(20)} cy={RW(20)} r={RW(19.5)} fill="url(#a)" />
    <Defs>
      <LinearGradient
        id="a"
        x1={0}
        y1={RW(23.333)}
        x2={RW(40)}
        y2={RW(23.349)}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#7DCE8A" />
        <Stop offset={1} stopColor="#4D7CFE" />
      </LinearGradient>
    </Defs>
    <View
      style={{
        width: RW(40),
        height: RW(40),
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ ...font('medium', 16, LIGHT_LABEL) }}>{props.count}</Text>
    </View>
  </Svg>
)

export default memo(CircleSvg)
