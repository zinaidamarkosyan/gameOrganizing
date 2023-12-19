import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function ArrowSvg(props) {
  return (
    <Svg width={12} height={21} viewBox="0 0 12 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path d="M11 1l-9 9.5 9 9.5" stroke="#DADADA" strokeWidth={2} strokeLinecap="round" />
    </Svg>
  )
}

export default ArrowSvg
