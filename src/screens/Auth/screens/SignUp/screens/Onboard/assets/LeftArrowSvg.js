import React from 'react'
import { StyleSheet } from 'react-native'
import { Svg, Path } from 'react-native-svg'

import { RH, RW } from '@/theme/utils'

const LeftArrowSvg = ({}) => {
  return (
    <Svg
      width={RW(12)}
      height={RH(24)}
      viewBox="0 0 17 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M14.9999 26.2937L2.99988 14.2937L14.9999 2.2937"
        stroke={'#657AC5'}
        strokeWidth={3}
        strokeLinecap="round"
      />
    </Svg>
  )
}

export default LeftArrowSvg

const styles = StyleSheet.create({
  right: {
    transform: [{ rotate: '180deg' }],
  },
})
