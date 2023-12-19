import * as React from 'react'
import Svg, {
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
  RadialGradient,
  ClipPath,
} from 'react-native-svg'
import { memo } from 'react'
const closeSvg2 = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={64}
    height={64}
    viewBox="0 0 64 64"
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="#3EC9F4"
        d="M0 31.513a31.513 31.513 0 1 0 63.026 0 31.513 31.513 0 0 0-63.026 0Z"
      />
      <Path
        fill="url(#b)"
        d="M0 31.513a31.513 31.513 0 1 0 63.026 0 31.513 31.513 0 0 0-63.026 0Z"
        style={{
          mixBlendMode: 'multiply',
        }}
      />
      <Path
        fill="url(#c)"
        d="M0 31.513a31.513 31.513 0 1 0 63.026 0 31.513 31.513 0 0 0-63.026 0Z"
        style={{
          mixBlendMode: 'multiply',
        }}
      />
      <Path
        fill="url(#d)"
        d="M0 31.513a31.513 31.513 0 1 0 63.026 0 31.513 31.513 0 0 0-63.026 0Z"
        style={{
          mixBlendMode: 'hard-light',
        }}
      />
      <Path
        fill="url(#e)"
        d="M51.108 16.549c0 7.778-8.77 14.084-19.595 14.084s-19.595-6.306-19.595-14.084 8.775-14.084 19.61-14.084c10.835 0 19.58 6.306 19.58 14.084Z"
        opacity={0.7}
        style={{
          mixBlendMode: 'screen',
        }}
      />
      <G
        style={{
          mixBlendMode: 'screen',
        }}
      >
        <G
          style={{
            mixBlendMode: 'overlay',
          }}
        >
          <Path
            fill="url(#f)"
            fillOpacity={0.2}
            d="M52.151 31.457a46.909 46.909 0 0 0-.329-5.52 43.406 43.406 0 0 0-1.812-8.402 47.218 47.218 0 0 0-1.012-2.803C45.344 5.886 38.877 0 31.528 0c-7.348 0-13.83 5.886-17.484 14.732a33.584 33.584 0 0 0-1.012 2.803 43.399 43.399 0 0 0-1.812 8.401 46.887 46.887 0 0 0-.33 5.521v.056A46.049 46.049 0 0 0 12.5 43.73a34.023 34.023 0 0 0 5.982 12.196c3.543 4.433 8.097 7.085 13.047 7.085 4.949 0 9.493-2.662 13.051-7.085a34.008 34.008 0 0 0 5.982-12.201 45.982 45.982 0 0 0 1.61-12.212l-.021-.056Z"
            style={{
              mixBlendMode: 'screen',
            }}
          />
        </G>
      </G>
      <Path
        fill="#fff"
        d="M44.039 10.395c-.193 1.108-1.66 1.771-3.28 1.518-1.62-.253-2.778-1.402-2.586-2.53.192-1.129 1.66-1.772 3.28-1.488 1.619.283 2.773 1.397 2.586 2.5Z"
        opacity={0.95}
      />
      <Path
        fill="#3B97D9"
        d="M44.651 54.358a53.687 53.687 0 0 1-26.093 0c-4.868-1.26-9.079-3.204-12.242-5.618a31.512 31.512 0 0 0 50.582 0c-3.163 2.414-7.373 4.357-12.247 5.618Z"
        opacity={0.4}
        style={{
          mixBlendMode: 'screen',
        }}
      />
      <Path
        stroke="#0A0D3A"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={4}
        d="m22 22 18.385 18.385M40.383 22 21.998 40.385"
      />
    </G>
    <Defs>
      <LinearGradient
        id="d"
        x1={0}
        x2={63.027}
        y1={36.765}
        y2={36.79}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#7DCE8A" />
        <Stop offset={1} stopColor="#4D7CFE" />
      </LinearGradient>
      <LinearGradient
        id="e"
        x1={23.694}
        x2={39.534}
        y1={36.837}
        y2={-4.261}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.12} />
        <Stop offset={0.26} stopColor="#343434" />
        <Stop offset={0.57} stopColor="#A0A0A0" />
        <Stop offset={0.79} stopColor="#E4E4E4" />
        <Stop offset={0.88} stopColor="#fff" />
      </LinearGradient>
      <LinearGradient
        id="f"
        x1={31.513}
        x2={31.513}
        y1={63.021}
        y2={-20.263}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#696969" />
        <Stop offset={0.02} stopColor="#898989" />
        <Stop offset={0.07} stopColor="#DADADA" />
        <Stop offset={0.09} stopColor="#fff" />
        <Stop offset={0.12} stopColor="#F3F3F3" />
        <Stop offset={0.17} stopColor="#D4D4D4" />
        <Stop offset={0.24} stopColor="#A2A2A2" />
        <Stop offset={0.32} stopColor="#5B5B5B" />
        <Stop offset={0.41} />
        <Stop offset={0.48} stopColor="#040404" />
        <Stop offset={0.56} stopColor="#101010" />
        <Stop offset={0.63} stopColor="#252525" />
        <Stop offset={0.71} stopColor="#414141" />
        <Stop offset={0.78} stopColor="#666" />
        <Stop offset={0.86} stopColor="#939393" />
        <Stop offset={0.93} stopColor="#C8C8C8" />
        <Stop offset={1} stopColor="#fff" />
      </LinearGradient>
      <RadialGradient
        id="b"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(-55.6427 0 0 -40.6192 31.2 19.373)"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#fff" />
        <Stop offset={0.24} stopColor="#FDFEFE" />
        <Stop offset={0.33} stopColor="#F6F8FA" />
        <Stop offset={0.39} stopColor="#EAEFF2" />
        <Stop offset={0.44} stopColor="#DAE2E8" />
        <Stop offset={0.48} stopColor="#C4D1DA" />
        <Stop offset={0.52} stopColor="#A8BCC9" />
        <Stop offset={0.55} stopColor="#88A2B5" />
        <Stop offset={0.59} stopColor="#62859E" />
        <Stop offset={0.61} stopColor="#396584" />
        <Stop offset={0.63} stopColor="#1D4F73" />
        <Stop offset={0.81} stopColor="#205D7D" />
        <Stop offset={0.91} stopColor="#44A5BA" />
        <Stop offset={1} stopColor="#57D9E8" />
      </RadialGradient>
      <RadialGradient
        id="c"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="rotate(180 15.683 -.099) scale(46.2297)"
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.23} stopColor="#3B97D9" />
        <Stop offset={0.24} stopColor="#3D98D9" />
        <Stop offset={0.52} stopColor="#8FC4E9" />
        <Stop offset={0.74} stopColor="#CBE4F5" />
        <Stop offset={0.91} stopColor="#F1F7FC" />
        <Stop offset={1} stopColor="#fff" />
      </RadialGradient>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h63.016v63.016H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default memo(closeSvg2)
