import * as React from 'react'
import Svg, { Circle, Path } from 'react-native-svg'

function SmilesSvg(props) {
  return (
    <Svg
      width={27}
      height={27}
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle
        cx={13.8281}
        cy={13.6943}
        r={12.25}
        fill="#142A5C"
        stroke="#657AC5"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.828 17.694c-.841 1.766-2.764 3-5 3s-4.158-1.234-5-3"
        stroke="#657AC5"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle
        cx={9.32812}
        cy={10.1943}
        r={1}
        fill="#818181"
        stroke="#657AC5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle
        cx={18.3281}
        cy={10.1943}
        r={1}
        fill="#818181"
        stroke="#657AC5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SmilesSvg
