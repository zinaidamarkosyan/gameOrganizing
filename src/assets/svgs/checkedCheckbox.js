import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function CheckedCheckbox(props) {
  return (
    <Svg width={21} height={17} viewBox="0 0 21 17" fill="none" {...props}>
      <Path fill="#001034" stroke="#657AC5" d="M1.25 1.4707H16.25V16.4707H1.25z" />
      <Path
        d="M3.989 8.536l4.317 4.317L19.264 1.895"
        stroke="#657AC5"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  )
}

export default CheckedCheckbox
