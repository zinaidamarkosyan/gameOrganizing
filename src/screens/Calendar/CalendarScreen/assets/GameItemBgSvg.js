import * as React from 'react'
import Svg, { Rect, Defs, LinearGradient, Stop } from 'react-native-svg'

function GameItemBgSvg(props) {
  return (
    <Svg
      width={'100%'}
      height={'100%'}
      viewBox="0 0 340 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect
        x={0.857178}
        y={0.716309}
        width={338.285}
        height={56.3807}
        rx={5}
        fill="url(#paint0_linear_0_127)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_0_127"
          x1={0.857179}
          y1={33.6051}
          x2={339.142}
          y2={34.3918}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#7DCE8A" />
          <Stop offset={1} stopColor="#4D7CFE" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default GameItemBgSvg
