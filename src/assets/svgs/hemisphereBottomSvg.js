import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { RH, RW } from '@/theme/utils'

function SvgComponent(props) {
  return (
    <Svg
      width={RW(429)}
      height={RH(258)}
      viewBox="0 0 429 258"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        opacity={0.3}
        d="M469.134 136.668c0 66.62-115.441 120.625-257.845 120.625-142.403 0-253.848-54.125-257.844-120.625C-60.554-96.308 68.886-3.14 211.29-3.14c142.404 0 257.845-82.139 257.845 139.808z"
        fill="#657AC5"
      />
    </Svg>
  )
}

export default SvgComponent
