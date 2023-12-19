import * as React from 'react'
import Svg, { Rect, Defs, LinearGradient, Stop } from 'react-native-svg'

function BorderGradient({ height = 144, width = 95, opacity = 1 }) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 95 144"
      fill="none"
      opacity={opacity}
      xmlns="http://www.w3.org/2000/svg"
    >
      <Rect
        x={1.60254}
        y={1.54297}
        width={91.6652}
        height={141.351}
        rx={9}
        stroke="url(#paint0_linear_949_7601)"
        strokeWidth={2}
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_949_7601"
          x1={0.60254}
          y1={84.1643}
          x2={94.2682}
          y2={84.188}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#7DCE8A" />
          <Stop offset={1} stopColor="#4D7CFE" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default BorderGradient
