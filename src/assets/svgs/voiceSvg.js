import * as React from 'react'
import Svg, { Path, Mask } from 'react-native-svg'

function VoiceSvg(props) {
  return (
    <Svg
      width={19}
      height={28}
      viewBox="0 0 19 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M18.02 14.694c0 4.97-3.306 9-8 9-4.695 0-9-4.03-9-9"
        stroke="#657AC5"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Mask id="a" fill="#fff">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.02 14.194v-7.5H16a6.5 6.5 0 00-12.962 0H3.02v8h.018a6.5 6.5 0 0012.963 0h.018v-.5z"
        />
      </Mask>
      <Path
        d="M16.02 6.694h1.5a1.5 1.5 0 00-1.5-1.5v1.5zm-.02 0l-1.495.114A1.5 1.5 0 0016 8.194v-1.5zm-12.962 0v1.5a1.5 1.5 0 001.496-1.386l-1.496-.114zm-.018 0v-1.5a1.5 1.5 0 00-1.5 1.5h1.5zm0 8h-1.5a1.5 1.5 0 001.5 1.5v-1.5zm.018 0l1.496-.113a1.5 1.5 0 00-1.496-1.387v1.5zm12.963 0v-1.5a1.5 1.5 0 00-1.496 1.387l1.496.113zm.018 0v1.5a1.5 1.5 0 001.5-1.5h-1.5zm-1.5-7.5v7h3v-7h-3zm0-.5v.5h3v-.5h-3zm1.482 1.5h.018v-3h-.018v3zm-6.481-6a5 5 0 014.985 4.614l2.991-.227A8 8 0 009.52-.806v3zM4.534 6.808A5 5 0 019.52 2.194v-3a8 8 0 00-7.977 7.387l2.991.227zM3.02 8.194h.018v-3H3.02v3zm1.5-1v-.5h-3v.5h3zm0 7v-7h-3v7h3zm0 .5v-.5h-3v.5h3zm-1.482-1.5H3.02v3h.018v-3zm6.482 6a5 5 0 01-4.986-4.613l-2.991.227a8 8 0 007.977 7.386v-3zm4.985-4.613a5 5 0 01-4.985 4.613v3a8 8 0 007.976-7.386l-2.991-.227zm1.514-1.387h-.018v3h.018v-3zm-1.5 1v.5h3v-.5h-3z"
        fill="#657AC5"
        mask="url(#a)"
      />
      <Path
        d="M9.52 23.975v2.72"
        stroke="#657AC5"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        stroke="#657AC5"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.26953 26.9443L14.7695 26.9443"
      />
    </Svg>
  )
}

export default VoiceSvg
