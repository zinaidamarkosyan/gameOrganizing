import * as React from 'react'
import Svg, { Circle, Rect, Path, Defs, LinearGradient, Stop } from 'react-native-svg'

function PlayingInstructionSVG() {
  return (
    <Svg width={61} height={342} viewBox="0 0 61 342" fill="none">
      <Circle
        opacity={0.9}
        cx={30.7437}
        cy={170.606}
        r={28.1748}
        fill="#fff"
        stroke="#C4C4C4"
        strokeWidth={4}
      />
      <Rect
        opacity={0.9}
        x={16.3252}
        y={91.3379}
        width={28.8369}
        height={45.0928}
        rx={3}
        fill="url(#paint0_linear_2184_22957)"
      />
      <Path
        opacity={0.9}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M33.229 1.53c-1.19-1.76-3.78-1.76-4.97 0L8.139 31.28c-1.348 1.991.08 4.68 2.484 4.68h5.725v38.278a3 3 0 003 3h22.791a3 3 0 003-3V35.96h5.725c2.405 0 3.832-2.689 2.485-4.68L33.229 1.53z"
        fill="#fff"
      />
      <Rect
        opacity={0.9}
        x={45.1621}
        y={249.874}
        width={28.8369}
        height={45.0928}
        rx={3}
        transform="rotate(-180 45.162 249.874)"
        fill="url(#paint1_linear_2184_22957)"
      />
      <Path
        opacity={0.9}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28.259 339.683c1.19 1.759 3.78 1.759 4.97 0l20.12-29.75c1.348-1.992-.08-4.681-2.485-4.681H45.14v-38.278a3 3 0 00-3-3H19.348a3 3 0 00-3 3v38.278h-5.724c-2.406 0-3.833 2.689-2.486 4.681l20.12 29.75z"
        fill="#fff"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_2184_22957"
          x1={30.7437}
          y1={91.3379}
          x2={30.7437}
          y2={126.403}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#fff" />
          <Stop offset={1} stopColor="#fff" stopOpacity={0} />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_2184_22957"
          x1={59.5806}
          y1={249.874}
          x2={59.5806}
          y2={284.939}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#fff" />
          <Stop offset={1} stopColor="#fff" stopOpacity={0} />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default PlayingInstructionSVG
