import React from 'react'
import { Svg, Path } from 'react-native-svg'

import { RW } from '@/theme/utils'

const ChatIcon = ({ color = '#7190FF', size = 30 }) => {

  return (
      <Svg
          width={RW(size)}
          height={RW(size)}
          viewBox="0 0 28 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
      >
        <Path
            d="M15.639 22.83h0c-2.948.449-5.715.004-8.323-1.283a1.57 1.57 0 00-1.263-.091c-.916.3-1.828.596-2.743.891-.615.2-1.231.398-1.85.6h-.001a.697.697 0 01-.3.047c-.034-.005-.071-.015-.128-.067a.408.408 0 01-.021-.02.585.585 0 01.034-.104l.001-.002.695-1.693c.325-.796.649-1.587.98-2.381a1.392 1.392 0 00-.122-1.367c-3.806-6.03-.537-13.699 7.19-15.854h0C16.92-.484 24.373 3.581 25.747 9.84v.001c.107.487.164.95.226 1.463.03.24.06.491.098.761-.092 5.232-4.379 9.847-10.432 10.767z"
            stroke="#657AC5"
            strokeWidth={2}
        />
      </Svg>
  )
}

export default ChatIcon
