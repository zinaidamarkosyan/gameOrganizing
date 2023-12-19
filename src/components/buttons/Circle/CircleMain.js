import React from 'react'
import { View } from 'react-native'
import {
  Svg,
  Defs,
  Path,
  LinearGradient,
  Stop,
  G,
  RadialGradient,
  ClipPath,
} from 'react-native-svg'
import { RW } from '@/theme/utils'

const CircleMain = ({ size = 207, onPress, label, isAdd = false }) => {
  return (
    <Svg
      width={RW(size)}
      height={RW(size)}
      viewBox="0 0 207 207"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G clipPath="url(#clip0_3172_10177)">
        <Path
          d="M0 103.162c0 20.402 6.045 40.345 17.372 57.309a103.11 103.11 0 0046.262 37.996 103.035 103.035 0 0059.562 5.879 103.083 103.083 0 0052.79-28.219 103.185 103.185 0 0028.228-52.808 103.226 103.226 0 00-5.847-59.6 103.152 103.152 0 00-37.951-46.309A103.056 103.056 0 0063.68 7.84a103.098 103.098 0 00-33.465 22.359A103.167 103.167 0 007.853 63.672 103.216 103.216 0 000 103.162z"
          fill="url(#paint0_linear_3172_10177)"
        />
        <Path
          style={{
            mixBlendMode: 'multiply',
          }}
          d="M0 103.162c0 20.402 6.045 40.345 17.372 57.309a103.11 103.11 0 0046.262 37.996 103.035 103.035 0 0059.562 5.879 103.083 103.083 0 0052.79-28.219 103.185 103.185 0 0028.228-52.808 103.226 103.226 0 00-5.847-59.6 103.152 103.152 0 00-37.951-46.309A103.056 103.056 0 0063.68 7.84a103.098 103.098 0 00-33.465 22.359A103.167 103.167 0 007.853 63.672 103.216 103.216 0 000 103.162z"
          fill="url(#paint1_radial_3172_10177)"
          fillOpacity={0.2}
        />
        <G opacity={0.8}>
          <Path
            d="M0 103.162c0 20.402 6.045 40.345 17.372 57.309a103.11 103.11 0 0046.262 37.996 103.035 103.035 0 0059.562 5.879 103.083 103.083 0 0052.79-28.219 103.185 103.185 0 0028.228-52.808 103.226 103.226 0 00-5.847-59.6 103.152 103.152 0 00-37.951-46.309A103.056 103.056 0 0063.68 7.84a103.098 103.098 0 00-33.465 22.359A103.167 103.167 0 007.853 63.672 103.216 103.216 0 000 103.162z"
            fill="url(#paint2_radial_3172_10177)"
          />
          <Path
            d="M0 103.162c0 20.402 6.045 40.345 17.372 57.309a103.11 103.11 0 0046.262 37.996 103.035 103.035 0 0059.562 5.879 103.083 103.083 0 0052.79-28.219 103.185 103.185 0 0028.228-52.808 103.226 103.226 0 00-5.847-59.6 103.152 103.152 0 00-37.951-46.309A103.056 103.056 0 0063.68 7.84a103.098 103.098 0 00-33.465 22.359A103.167 103.167 0 007.853 63.672 103.216 103.216 0 000 103.162z"
            fill="url(#paint3_radial_3172_10177)"
          />
        </G>
        <Path
          opacity={0.6}
          d="M146.179 178.362a175.557 175.557 0 01-85.368 0c-15.928-4.125-29.703-10.487-40.051-18.389a103.122 103.122 0 0036.439 30.628 103.052 103.052 0 0092.609 0 103.123 103.123 0 0036.439-30.628c-10.348 7.902-24.124 14.264-40.068 18.389z"
          fill="#50DFFF"
        />
        <Path
          style={{
            mixBlendMode: 'screen',
          }}
          d="M169.99 103.205a153.778 153.778 0 00-1.076-18.075 142.197 142.197 0 00-5.928-27.5 154.249 154.249 0 00-3.311-9.179C147.721 19.492 126.561.225 102.52.225c-24.04 0-45.25 19.267-57.204 48.226a110.101 110.101 0 00-3.312 9.178 142.166 142.166 0 00-5.927 27.501 153.628 153.628 0 00-1.076 18.075v.182a150.845 150.845 0 005.265 39.993 111.41 111.41 0 0019.57 39.926c11.59 14.513 26.491 23.194 42.684 23.194 16.193 0 31.061-8.714 42.701-23.194a111.371 111.371 0 0019.57-39.943 150.592 150.592 0 005.265-39.976l-.066-.182z"
          fill="url(#paint4_linear_3172_10177)"
          fillOpacity={0.4}
        />
        <Path
          style={{
            mixBlendMode: 'screen',
          }}
          d="M168.732 50.123c0 25.464-28.693 46.106-64.108 46.106-35.416 0-64.109-20.642-64.109-46.106 0-25.463 28.71-46.105 64.158-46.105 35.449 0 64.059 20.642 64.059 46.105z"
          fill="url(#paint5_linear_3172_10177)"
          opacity={0.5}
        />
        <Path
          opacity={0.95}
          d="M145.738 30.148c-.651 4.017-5.621 6.42-11.105 5.503-5.484-.917-9.408-5.08-8.757-9.171.651-4.09 5.621-6.42 11.105-5.393 5.484 1.028 9.391 5.063 8.757 9.061z"
          fill="#fff"
        />
      </G>

      <View
        style={{
          backgroundColor: 'rgba(255, 0, 0, 0)',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {label}
      </View>
      <Defs>
        <LinearGradient
          id="paint0_linear_3172_10177"
          x1={9.6764e-7}
          y1={120.356}
          x2={206.202}
          y2={120.436}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#43D351" />
          <Stop offset={1} stopColor="#0445F4" />
        </LinearGradient>
        <RadialGradient
          id="paint1_radial_3172_10177"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(-151.248 0 0 -151.339 102.62 -.646)"
        >
          <Stop offset={0.23} stopColor="#3B97D9" />
          <Stop offset={0.24} stopColor="#3D98D9" />
          <Stop offset={0.52} stopColor="#0AC3EB" />
          <Stop offset={0.74} stopColor="#E6FAFF" />
          <Stop offset={0.91} stopColor="#30C5F2" />
          <Stop offset={1} stopColor="#054FF0" />
        </RadialGradient>
        <RadialGradient
          id="paint2_radial_3172_10177"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(-269.96424 -36.18878 24.70978 -184.3322 85.514 62.086)"
        >
          <Stop stopColor="#37F1FF" />
          <Stop offset={0.198881} stopColor="#37DBFF" />
          <Stop offset={0.333238} stopColor="#37D1FF" stopOpacity={0.724868} />
          <Stop offset={0.5} stopColor="#37B7FF" stopOpacity={0} />
        </RadialGradient>
        <RadialGradient
          id="paint3_radial_3172_10177"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(-269.96424 -36.18878 24.70978 -184.3322 85.514 62.086)"
        >
          <Stop stopColor="#37F1FF" />
          <Stop offset={0.198881} stopColor="#37DBFF" />
          <Stop offset={0.333238} stopColor="#37D1FF" stopOpacity={0.724868} />
          <Stop offset={0.5} stopColor="#37B7FF" stopOpacity={0} />
        </RadialGradient>
        <LinearGradient
          id="paint4_linear_3172_10177"
          x1={102.47}
          y1={202.309}
          x2={102.47}
          y2={-70.3331}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#fff" />
          <Stop offset={0.401042} stopColor="#fff" stopOpacity={0} />
          <Stop offset={1} stopColor="#fff" stopOpacity={0} />
        </LinearGradient>
        <LinearGradient
          id="paint5_linear_3172_10177"
          x1={82.0502}
          y1={101.635}
          x2={130.915}
          y2={-17.9802}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#fff" stopOpacity={0} />
          <Stop offset={0.759703} stopColor="#fff" />
        </LinearGradient>
        <ClipPath id="clip0_3172_10177">
          <Path fill="#fff" d="M0 0H207V207H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default CircleMain
