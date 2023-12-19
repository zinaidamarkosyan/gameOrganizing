import * as React from 'react'
import Svg, { Path, Rect, Defs, LinearGradient, Stop } from 'react-native-svg'

function CircleAdd(props) {
  return (
    <Svg width={37} height={37} viewBox="0 0 37 37" fill="none">
      <Path
        d="M18.333 12.973v11.232M23.949 18.59H12.716"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Rect
        x={0.832764}
        y={1.08984}
        width={35}
        height={35}
        rx={17.5}
        stroke="url(#paint0_linear_861_8582)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_861_8582"
          x1={0.332764}
          y1={21.5899}
          x2={36.333}
          y2={21.6038}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#7DCE8A" />
          <Stop offset={1} stopColor="#4D7CFE" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default CircleAdd
