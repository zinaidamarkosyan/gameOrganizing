import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { memo } from 'react'

const PlaySvg = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" height={30} viewBox="0 96 960 960" width={30} {...props}>
    <Path d="M320 853V293l440 280-440 280Zm60-280Zm0 171 269-171-269-171v342Z" />
  </Svg>
)

export default memo(PlaySvg)
