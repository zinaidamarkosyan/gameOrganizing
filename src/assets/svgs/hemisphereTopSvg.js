import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { RH, RW } from '@/theme/utils'

function SvgComponent(props) {
  return (
    <Svg
      width={RW(429)}
      height={RH(228)}
      viewBox="0 0 429 228"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        opacity={0.3}
        d="M-46.555 121.062C-46.555 54.442 68.886.437 211.29.437c142.404 0 257.845 54.006 257.845 120.625 0 160.198-115.441 129.808-257.845 129.808-142.403 0-257.844 46.384-257.844-129.808z"
        fill="#657AC5"
      />
    </Svg>
  )
}

export default SvgComponent
