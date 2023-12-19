import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function SvgComponent(props) {
  return (
    <Svg
      width={65}
      height={74}
      viewBox="0 0 65 74"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        opacity={0.25}
        d="M2.156 73.438S1.116 41.906.718 26.83C.63 23.48.571 18.898.53 15.547-.052 7.943 5.612 1.223 13.344.97c.568-.03 1.424 0 2 0 15.092.243 48.975 0 48.975 0C49.042 3.247 43.523 3.14 25.185 5.656c-3.221.442-13.956 1.87-15.281 2.755a7.167 7.167 0 00-3.15 5.459c-.058 3.926-.095 9.016-.21 12.978-.398 15.076-1.106 30.141-2.913 45.128l-1.475 1.462z"
        fill="#fff"
      />
    </Svg>
  )
}

export default SvgComponent
