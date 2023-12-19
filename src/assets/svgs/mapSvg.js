import React from 'react'
import Svg, { Path } from 'react-native-svg'

function MapSvg(props) {
  return (
    <Svg
      width={19}
      height={28}
      viewBox="0 0 19 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M10.68.733C5.71.733.977 5.177.977 10.436c0 6.527 7.973 16.23 8.316 16.634.323.38 1.065.38 1.387 0 .343-.405 8.316-10.107 8.316-16.634 0-5.259-3.348-9.703-8.316-9.703zm0 13.862c-2.5 0-5.545-1.513-5.545-4.159S8.18 4.892 10.68 4.892c2.499 0 4.158 2.898 4.158 5.544 0 2.646-1.659 4.159-4.158 4.159z"
        fill="#657AC5"
      />
    </Svg>
  )
}

export default MapSvg
