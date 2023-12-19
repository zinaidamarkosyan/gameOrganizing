import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function TickSvg(props) {
  return (
    <Svg
      width={25}
      height={20}
      viewBox="0 0 25 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M16.939 9.583c-.188 0 .132-.136 0 0-.133.137 0 .807 0 1v7c0 .193-.868-.136-1 0-.133.137.187 1 0 1h-13c-.188 0 .132-.863 0-1-.133-.136-1 .193-1 0v-15c0-.193.867.137 1 0 .132-.136-.188-1 0-1h9c.187 0-.133.137 0 0 .132-.137 0 .193 0 0s.132-.863 0-1c-.133-.137.187 0 0 0h-9c-.562 0-.603.59-1 1-.398.41-1 .42-1 1v15c0 .58.602.59 1 1 .397.41.438 1 1 1h13c.561 0 .602-.59 1-1 .396-.41 1-.42 1-1v-7c0-.193.132-.863 0-1-.133-.136-.813 0-1 0z"
        fill="#657AC5"
      />
      <Path
        d="M5.39 8.17l5.797 5.795L22.779 2.373"
        stroke="#657AC5"
        strokeWidth={3}
        strokeLinecap="round"
      />
    </Svg>
  )
}

export default TickSvg
