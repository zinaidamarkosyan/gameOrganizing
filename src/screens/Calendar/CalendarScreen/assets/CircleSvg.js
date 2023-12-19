import * as React from 'react'
import Svg, { Rect, Defs, LinearGradient, Stop } from 'react-native-svg'

function CircleSvg(props) {
  return (
    <Svg
      width={25}
      height={25}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect
        x={0.585693}
        y={0.25}
        width={23.6659}
        height={24}
        rx={11.8329}
        fill="url(#paint0_linear_2_329)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_2_329"
          x1={0.585693}
          y1={14.25}
          x2={24.2517}
          y2={14.2591}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#7DCE8A" />
          <Stop offset={1} stopColor="#4D7CFE" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default CircleSvg
