import * as React from 'react'
import Svg, { Rect, Defs, LinearGradient, Stop } from 'react-native-svg'

function UserBorderSvg(props) {
  return (
    <Svg
      width={'100%'}
      height={'100%'}
      viewBox="0 0 107 154"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect
        x={1.04102}
        y={1.05664}
        width={104.73}
        height={151.374}
        rx={9}
        stroke="url(#paint0_linear_2436_24387)"
        strokeWidth={2}
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_2436_24387"
          x1={0.0410161}
          y1={89.5252}
          x2={106.771}
          y2={89.554}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#7DCE8A" />
          <Stop offset={1} stopColor="#4D7CFE" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default UserBorderSvg
