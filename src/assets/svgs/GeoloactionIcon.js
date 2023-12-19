import { DARK_BLUE } from '@/theme/colors'
import * as React from 'react'
import Svg, { Circle, Path } from 'react-native-svg'

function GeolocationIcon() {
  return (
    <Svg width={32} height={33} viewBox="0 0 32 33" fill="none">
      <Circle
        cx={16.2581}
        cy={16.5104}
        r={10.5514}
        fill={DARK_BLUE}
        stroke="#657AC5"
        strokeWidth={1.5}
      />
      <Circle
        cx={16.258}
        cy={16.5119}
        r={5.35759}
        fill="#1A2848"
        stroke="#657AC5"
        strokeWidth={1.5}
      />
      <Path
        d="M26.156 16.453h5.72M.124 16.453h5.72M16 6.298V.578M16 32.33v-5.72"
        stroke="#657AC5"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default GeolocationIcon
