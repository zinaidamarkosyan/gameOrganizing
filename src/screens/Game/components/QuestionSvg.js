import * as React from 'react'
import Svg, { G, Path, Defs } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: filter */
import { memo } from 'react'
import { View } from 'react-native'
const QuestionSvg = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66 112" width={66} height={112}>
    <Path
      fill="#001034"
      d="M32.839 0C14.767 0 .064 14.702.064 32.773v.409c0 5.73 4.663 10.391 10.392 10.391 1.596 0 3.13-.353 4.559-1.051a10.327 10.327 0 0 0 5.833-9.34v-.409c0-6.61 5.38-11.99 11.99-11.99 6.613 0 11.992 5.38 11.992 11.99 0 6.613-5.38 11.992-11.991 11.992h-1.58c-5.73 0-10.392 4.66-10.392 10.391v17.17c0 5.73 4.661 10.393 10.392 10.393 5.73 0 10.39-4.662 10.39-10.393v-7.98c14.038-3.91 23.963-16.776 23.963-31.573C65.614 14.702 50.911 0 32.84 0Zm-1.75 86.663c-6.986 0-12.668 5.683-12.668 12.669 0 6.984 5.683 12.668 12.668 12.668 6.985 0 12.667-5.684 12.667-12.668 0-6.986-5.682-12.669-12.668-12.669Z"
    />
  </Svg>
)
export default memo(QuestionSvg)
