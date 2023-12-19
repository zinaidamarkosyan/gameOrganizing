import { RW } from '@/theme/utils'
import * as React from 'react'
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg'

function LoaderSvg(props) {
  return (
    <Svg
      width={RW(48)}
      height={RW(48)}
      viewBox="0 0 54 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M27.445 2.633c13.252 0 24 10.742 24 24s-10.742 24-24 24c-13.257 0-24-10.749-24-24"
        stroke="url(#paint0_linear_821_11281)"
        strokeWidth={5}
        strokeMiterlimit={10}
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_821_11281"
          x1={3.44531}
          y1={30.6329}
          x2={51.4456}
          y2={30.6515}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#7DCE8A" />
          <Stop offset={1} stopColor="#4D7CFE" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default LoaderSvg
