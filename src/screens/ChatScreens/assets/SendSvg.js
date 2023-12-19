import * as React from 'react'
import Svg, { G, Path } from 'react-native-svg'
import { memo } from 'react'

const SendSvg = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={23}
    height={23}
    viewBox="0 0 280 280"
    xmlSpace="preserve"
  >
    <G
      style={{
        stroke: 'none',
        strokeWidth: 0,
        strokeDasharray: 'none',
        strokeLinecap: 'butt',
        strokeLinejoin: 'miter',
        strokeMiterlimit: 10,
        fill: 'none',
        fillRule: 'nonzero',
        opacity: 1,
      }}
    >
      <Path
        d="M89.999 3.075a3.117 3.117 0 0 0-.038-.561c-.007-.041-.009-.081-.018-.122a2.924 2.924 0 0 0-.144-.484c-.018-.046-.041-.089-.061-.134a3.496 3.496 0 0 0-.269-.484 3 3 0 0 0-.341-.417 3.057 3.057 0 0 0-.914-.617c-.039-.017-.076-.037-.116-.053a2.955 2.955 0 0 0-.497-.147c-.031-.006-.063-.008-.094-.014a2.939 2.939 0 0 0-.994 0c-.035.006-.069.008-.104.015a2.982 2.982 0 0 0-.456.129L1.946 31.709a3.001 3.001 0 0 0-.25 5.511l34.455 16.628 16.627 34.455a3.003 3.003 0 0 0 5.513-.249L89.815 4.048c.056-.149.097-.3.128-.453.008-.041.011-.081.017-.122.022-.132.035-.265.039-.398zm-14.913 7.597L37.785 47.973 10.619 34.864l64.467-24.192zm-19.95 68.709L42.027 52.216l37.302-37.302-24.193 64.467z"
        style={{
          stroke: 'none',
          strokeWidth: 1,
          strokeDasharray: 'none',
          strokeLinecap: 'butt',
          strokeLinejoin: 'miter',
          strokeMiterlimit: 10,
          fill: '#657AC5',
          fillRule: 'nonzero',
          opacity: 1,
        }}
        transform="matrix(2.81 0 0 2.81 1.407 1.407)"
      />
    </G>
  </Svg>
)

export default memo(SendSvg)
