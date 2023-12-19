import React from 'react'
import { Svg, Path } from 'react-native-svg'

import { RW } from '@/theme/utils'

const ProfileIcon = ({ color = '#7190FF', size = 30 }) => {

  return (
      <Svg
          width={RW(size)}
          height={RW(size)}
          viewBox="0 0 22 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
      >
        <Path
            clipRule="evenodd"
            d="M10.56 26C5.402 26 1 25.198 1 21.984c0-3.213 4.375-6.18 9.56-6.18 5.155 0 9.559 2.938 9.559 6.152 0 3.212-4.376 4.044-9.56 4.044zM10.549 13.254a6.127 6.127 0 10-6.127-6.126 6.105 6.105 0 006.084 6.126h.043z"
            stroke="#657AC5"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
      </Svg>
  )
}

export default ProfileIcon
