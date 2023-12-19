import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function UploadIcon(props) {
  return (
    <Svg width={35} height={40} viewBox="0 0 35 40" fill="none">
      <Path
        d="M18.476.844a1.702 1.702 0 00-2.406 0L5.24 11.674a1.702 1.702 0 002.406 2.408l9.627-9.628 9.627 9.628a1.702 1.702 0 102.407-2.407L18.477.845zm-2.905 27.85a1.702 1.702 0 103.404 0H15.57zm0-26.646v26.645h3.404V2.048H15.57z"
        fill="#fff"
      />
      <Path
        d="M1.897 28.693v9.355H32.65v-9.355"
        stroke="#fff"
        strokeWidth={3.40368}
        strokeLinecap="round"
      />
    </Svg>
  )
}

export default UploadIcon
