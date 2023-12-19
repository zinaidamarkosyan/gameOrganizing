import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function CloseSvg({ width = 17, height = 16, color = '#B3B7C2' }) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M1.42 1.006l14 14M15.42 1.006l-14 14"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  )
}

export default CloseSvg
