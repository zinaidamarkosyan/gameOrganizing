import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function CheckboxNotChecked(props) {
  return (
    <Svg
      width={17}
      height={17}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path fill="#001034" stroke="#657AC5" d="M1.25 1.03711H16.25V16.03711H1.25z" />
    </Svg>
  )
}

export default CheckboxNotChecked
