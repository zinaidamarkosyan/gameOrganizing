import * as React from 'react'
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg'

function DotSvg(props) {
  return (
    <Svg
      width={26}
      height={26}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={13.0161} cy={12.6686} r={12.5} fill="url(#paint0_linear_422_3273)" />
      <Defs>
        <LinearGradient
          id="paint0_linear_422_3273"
          x1={0.516113}
          y1={14.752}
          x2={25.5162}
          y2={14.7617}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#7DCE8A" />
          <Stop offset={1} stopColor="#4D7CFE" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default DotSvg
