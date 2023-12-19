import * as React from 'react'
import Svg, { G, Path, Defs, LinearGradient, Stop, ClipPath } from 'react-native-svg'

function InfoSvg(props) {
  return (
    <Svg
      width={38}
      height={38}
      viewBox="0 0 41 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_1517_19554)">
        <Path
          d="M20.501.313c-11.046 0-20 8.954-20 20s8.954 20 20 20 20-8.954 20-20-8.954-20-20-20zm0 10a2.5 2.5 0 110 5 2.5 2.5 0 010-5zm3.75 20h-7.5a1.25 1.25 0 110-2.5h1.25v-7.5h-1.25a1.25 1.25 0 110-2.5h5c.69 0 1.25.56 1.25 1.25v8.75h1.25a1.25 1.25 0 010 2.5z"
          fill="url(#paint0_linear_1517_19554)"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_1517_19554"
          x1={0.500977}
          y1={23.6459}
          x2={40.5012}
          y2={23.6614}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#7DCE8A" />
          <Stop offset={1} stopColor="#4D7CFE" />
        </LinearGradient>
        <ClipPath id="clip0_1517_19554">
          <Path fill="#fff" transform="translate(.501 .313)" d="M0 0H40V40H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default InfoSvg
