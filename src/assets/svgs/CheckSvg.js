import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { memo } from 'react'
import { RW } from '@/theme/utils'
const CheckSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={16}
    viewBox="0 0 30 22"
    fill="none"
    style={{ left: RW(5) }}
    {...props}
  >
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeWidth={3}
      d="m1.527 11.365 8.22 7.94L28.083 1.593"
    />
  </Svg>
)

export default memo(CheckSvg)
