import * as React from 'react'
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg'
import { RW, RH } from '@/theme/utils'
import { WHITE } from '@/theme/colors'

function SvgComponent(props) {
  return (
    <Svg
      width={RW(229.16)}
      height={RH(704)}
      viewBox="20 0 230 709"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        style={{
          opacity: '0.4',
          mixBlendMode: 'screen',
        }}
        d="M229.893.851H38.061C27 .851 14.038-2.206 6.216 6.522c-7.822 8.728-4.917 28.09-4.917 40.434v610.936c0 6.112 1.211 13.564-.562 21.801 2.097 5.647.107 15.685 3.98 20.007 3.873 4.322 9.061 7.66 16.72 7.66 6.26 1.249 11.147 1.249 16.624 1.249h38.18L229.893.851z"
        fill="url(#paint0_linear_663_5837)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_663_5837"
          x1={0}
          y1={360.015}
          x2={200.722}
          y2={365.055}
          gradientUnits="userSpaceOnUse"
        >
          <Stop />
          <Stop offset={0.001} stopColor="black" />
          <Stop offset={0.01} stopColor="#040404" />
          <Stop offset={0.91} stopColor="#ffffff" />
          <Stop offset={1} stopColor="#ffffff" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
