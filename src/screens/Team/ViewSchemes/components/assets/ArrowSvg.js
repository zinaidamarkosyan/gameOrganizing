import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function ArrowSvg(props) {
  return (
    <Svg width={26} height={26} viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path d="M11 1l-9 9.5 9 9.5" stroke="#657AC5" strokeWidth={3} strokeLinecap="round" />
    </Svg>
  )
}

export default ArrowSvg
