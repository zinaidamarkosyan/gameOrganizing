import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { memo } from 'react'

const PouseSvg = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" height={30} viewBox="0 96 960 960" width={30} {...props}>
    <Path d="M565 856V296h155v560H565Zm-325 0V296h155v560H240Z" />
  </Svg>
)

export default memo(PouseSvg)
