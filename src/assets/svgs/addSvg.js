import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { RH, RW } from '@/theme/utils'

function SvgComponent({ width, height, strokeWidth, plusColor = '#0A0D3A' }) {
  return (
    <Svg
      width={width || RW(26)}
      height={height || RH(26)}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M13.41 3.252v20M23.41 13.252h-20"
        stroke={plusColor}
        strokeWidth={strokeWidth || 5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgComponent
