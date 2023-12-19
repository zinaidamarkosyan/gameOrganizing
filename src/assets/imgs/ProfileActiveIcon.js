import React from 'react'
import { Svg, Path } from 'react-native-svg'

import { RW } from '@/theme/utils'

const ProfileActiveIcon = ({ color = '#657AC5', size = 30 }) => {
  return (
    <Svg
      width={RW(size)}
      height={RW(size)}
      viewBox="0 0 21 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5541 25.7368C5.39807 25.7368 0.994873 24.9344 0.994873 21.7211C0.994873 18.5078 5.37014 15.5414 10.5541 15.5414C15.7103 15.5414 20.1135 18.4791 20.1135 21.6924C20.1135 24.9044 15.7383 25.7368 10.5541 25.7368Z"
        fill={color}
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5439 12.9903C13.9276 12.9903 16.6701 10.2479 16.6701 6.86423C16.6701 3.48057 13.9276 0.736816 10.5439 0.736816C7.16028 0.736816 4.41654 3.48057 4.41654 6.86423C4.40512 10.2365 7.12855 12.979 10.5007 12.9903C10.5159 12.9903 10.5299 12.9903 10.5439 12.9903Z"
        fill={color}
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default ProfileActiveIcon
