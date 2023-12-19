import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { memo } from 'react'
const StarSvg = ({ fill, width = 25, height = 24 }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMinYMin slice"
    // viewBox={`0 0 ${width} ${height}`}
    viewBox={`0 0 25 24`}
    width={width}
    height={height}
    fill="none"
  >
    <Path
      stroke="#74C472"
      fill={fill ? '#74C472' : 'none'}
      d="m12.514 2.61 2.271 6.988.113.345h7.711l-5.945 4.32-.294.213.113.346 2.27 6.989-5.945-4.32-.293-.213-.294.213-5.945 4.32 2.27-6.99.113-.345-.294-.213-5.945-4.32h7.711l.113-.345 2.27-6.989Z"
    />
  </Svg>
)
export default memo(StarSvg)
