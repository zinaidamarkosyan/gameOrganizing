import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function TriangleSvg(props) {
  return (
    <Svg
      width={11}
      height={5}
      viewBox="0 0 11 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path d="M5.396 4.645L.783.342h9.226L5.396 4.645z" fill="#A3A3A3" />
    </Svg>
  )
}

export default TriangleSvg
