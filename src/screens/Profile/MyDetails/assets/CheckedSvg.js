import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { memo } from 'react'

const SvgComponent = (props) => (
  <Svg width={25} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      d="M16.939 9.06c-.188 0 .132-.136 0 0-.133.137 0 .808 0 1v7c0 .194-.868-.136-1 0-.133.137.187 1 0 1h-13c-.188 0 .132-.863 0-1-.133-.136-1 .194-1 0v-15c0-.192.867.137 1 0 .132-.136-.188-1 0-1h9c-.133.137.187 0 0 0 0 .194.132-.136 0 0 0-.193.132-.863 0-1-.133-.136.187 0 0 0h-9c-.562 0-.603.59-1 1-.398.41-1 .421-1 1v15c0 .58.602.59 1 1 .397.41.438 1 1 1h13c.561 0 .602-.59 1-1 .396-.41 1-.42 1-1v-7c0-.192.132-.863 0-1-.133-.136-.813 0-1 0Z"
      fill="#657AC5"
    />
    <Path
      d="m5.39 7.647 5.797 5.796L22.779 1.85"
      stroke="#657AC5"
      strokeWidth={3}
      strokeLinecap="round"
    />
  </Svg>
)

export default memo(SvgComponent)
