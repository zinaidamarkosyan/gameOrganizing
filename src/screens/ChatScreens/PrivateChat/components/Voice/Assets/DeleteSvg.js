import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { memo } from 'react'

const DeleteSvg = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" height={27} viewBox="0 96 960 960" width={27} {...props}>
    <Path d="M261 936q-24.75 0-42.375-17.625T201 876V306h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438V306ZM367 790h60V391h-60v399Zm166 0h60V391h-60v399ZM261 306v570-570Z" />
  </Svg>
)

export default memo(DeleteSvg)
