import * as React from 'react'
import Svg, { Rect, Path } from 'react-native-svg'

function timeSvg(props) {
  return (
    <Svg
      width={16}
      height={17}
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.98 16.979c4.328 0 7.837-3.582 7.837-8 0-4.419-3.509-8-7.837-8-4.328 0-7.836 3.581-7.836 8 0 4.418 3.508 8 7.836 8zm.6-12.438a.6.6 0 00-1.2 0v5.535l.142.167 2.487 2.935a.6.6 0 00.916-.775L8.58 9.636V4.54z"
        fill="#657AC5"
      />
    </Svg>
  )
}

export default timeSvg
