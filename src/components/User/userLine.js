import * as React from 'react'
import Svg, { Rect, Defs, Stop, LinearGradient } from 'react-native-svg'
import { Platform, Text, View } from 'react-native'
import { font, RH, RW } from '@/theme/utils'
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
          justifyContent: 'space-between',
          paddingHorizontal: size > 220 ? RW(10) : RW(3),
        }}
      >
        {size > RW(45) ? (
          <>
            <Text
              style={{
                ...font('bold', size < 50 ? 1 : size > 300 ? 8 : size > 200 ? 6 : 2, BLACK),
                top: size < 100 && Platform.OS == 'ios' ? RH(0.5) : 0,
              }}
            >
              ОРГАНИЗАТОР
            </Text>
            <Text
              style={{
                ...font(
                  'bold',
                  size < 50 ? 1 : size > 300 ? 9 : size > 200 ? 6 : size < 100 ? 2 : 3,
                  BLACK,
                ),
                top: size < 100 && Platform.OS == 'ios' ? RH(0.5) : 0,
              }}
            >
              |
            </Text>
            <Text
              style={{
                ...font('bold', size < 50 ? 1 : size > 300 ? 8.5 : size > 200 ? 6 : 2, BLACK),
                top: size < 100 && Platform.OS == 'ios' ? RH(0.5) : 0,
              }}
            >
              УЧАСТНИК
            </Text>
          </>
        ) : null}
      </View>
      <Defs>
        <LinearGradient
          id="gold"
          x1={0}
          y1={0}
          x2={width}
          y2={height}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#A37A1E" />
          <Stop offset={0.12} stopColor="#D3A84C" />
          <Stop offset={0.276} stopColor="#FFEC95" />
          <Stop offset={0.485} stopColor="#E6BE69" />
          <Stop offset={0.708} stopColor="#FFD67A" />
          <Stop offset={0.859} stopColor="#B58F3E" />
          <Stop offset={1} stopColor="#956E13" />
        </LinearGradient>
        <LinearGradient
          id="silver"
          x1={0}
          y1={0}
          x2={width}
          y2={height}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#A0A0A0" />
          <Stop offset={0.13} stopColor="#E6E6E6" />
          <Stop offset={0.276} stopColor="#BABABA" />
          <Stop offset={0.51} stopColor="#AAA" />
          <Stop offset={0.792} stopColor="#CECECE" />
          <Stop offset={1} stopColor="#797979" />
        </LinearGradient>
        <LinearGradient
          id="bronze"
          x1={0}
          y1={0}
          x2={width}
          y2={height}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#873B23" />
          <Stop offset={0.058} stopColor="#A66842" />
          <Stop offset={0.276} stopColor="#E5BA8C" />
          <Stop offset={0.485} stopColor="#E8D2AE" />
          <Stop offset={0.708} stopColor="#C09067" />
          <Stop offset={1} stopColor="#A05E2E" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
