import * as React from 'react'
import Svg, { Rect, Defs, Stop, LinearGradient } from 'react-native-svg'
import { Text, View } from 'react-native'
import { font, RW } from '@/theme/utils'
import { BLACK } from '@/theme/colors'
function SvgComponent({ status, size }) {
  const width = size * RW(0.5)
  const height = size * RW(0.07)

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 165 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Rect
        x={1.11194}
        y={0.795227}
        width={163.387}
        height={19}
        rx={4.5}
        fill="url(#bronze)"
        stroke="url(#bronze)"
      />
      <View
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          flexDirection: 'row',
          // justifyContent: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: RW(10),
        }}
      >
        <Text
          style={{
            ...font('bold', size > 220 ? 8 : 2, BLACK),
            // width: '42%',
            // left: size / -RW(100),
          }}
        >
          ОРГАНИЗАТОР
        </Text>
        <Text
          style={{
            ...font('bold', size > 220 ? 9 : 4, BLACK),
            // width: '3%',
            // alignSelf: 'center',
            // right: size / RW(100),
            // position: 'absolute',
          }}
        >
          |
        </Text>
        <Text
          style={{
            ...font('bold', size > 220 ? 8.5 : 2, BLACK),
            // width: '35%', left: '23%'
          }}
        >
          УЧАСТНИК
        </Text>
      </View>
      <Defs>
        <LinearGradient
          id="bronze"
          x1={0}
          y1={0}
          x2={width}
          y2={height}
          gradientUnits="userSpaceOnUse"
        >
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
