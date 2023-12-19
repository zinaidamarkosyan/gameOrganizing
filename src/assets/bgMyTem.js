import * as React from 'react'
import Svg, { Rect, Defs, LinearGradient, Stop } from 'react-native-svg'
import { RH, RW } from '@/theme/utils'
import { Text } from 'react-native'

function SvgComponent({ children = null }) {
  return (
    <Svg
      width={RW(395)}
      height={RH(111)}
      viewBox={'0 0 ' + RW(395) + ' ' + RH(111)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Rect
        opacity={0.6}
        x={0.29187}
        y={0.738281}
        width={RW(394.619)}
        height={RH(109.472)}
        rx={10}
        fill="url(#paint0_linear_915_11905)"
      ></Rect>
      <Defs>
        <LinearGradient
          id="paint0_linear_915_11905"
          x1={0.291872}
          y1={64.5969}
          x2={394.912}
          y2={65.1483}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#7DCE8A" />
          <Stop offset={1} stopColor="#4D7CFE" />
        </LinearGradient>
        {children}
      </Defs>
    </Svg>
  )
}

export default SvgComponent
