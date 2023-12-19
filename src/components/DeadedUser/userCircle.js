import * as React from 'react'
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg'
import { Text, View } from 'react-native'
import { font, RH, RW } from '@/theme/utils'
import { BLACK } from '@/theme/colors'

function SvgComponent({ count, status, size }) {
  const width = size / RW(12)
  const height = size / RW(20)
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 23 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Circle cx={11.4639} cy={11.9869} r={10.6298} fill="url(#bronze)" stroke="url(#bronze)" />
      <View
        style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}
      >
        <Text
          style={{
            ...font('exo_bold', size > 150 ? 11 : 2, BLACK),
            fontWeight: '600',
            textAlign: 'center',
          }}
        >
          {count}
        </Text>
      </View>
      <Defs>
        <LinearGradient id="bronze" x1={0} y1={0} x2={width} y2={0} gradientUnits="userSpaceOnUse">
          <Stop stopColor="rgb(173,173,173)" />
          <Stop offset={0.058} stopColor="rgb(173,173,173)" />
          <Stop offset={0.276} stopColor="rgb(223,223,223)" />
          <Stop offset={0.485} stopColor="rgb(172,172,172)" />
          <Stop offset={0.708} stopColor="rgb(205,205,205)" />
          <Stop offset={1} stopColor="rgb(139,139,139)" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
