import * as React from "react"
import Svg, {Path, Defs, LinearGradient, Stop, ClipPath, RadialGradient, G} from "react-native-svg"
import {RW} from "@/theme/utils";

function ShareSvg(props) {
  return (
      <Svg
          width={64}
          height={64}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
      >
        <Path
            d="M0 31.936c0 6.315 1.871 12.489 5.378 17.74a31.92 31.92 0 0014.32 11.763 31.898 31.898 0 0034.781-6.916 31.942 31.942 0 006.928-34.798A31.931 31.931 0 0049.66 5.39 31.902 31.902 0 009.353 9.348 31.938 31.938 0 000 31.935z"
            fill="url(#paint0_linear_4184_25136)"
        />
        <Path
            d="M0 31.936c0 6.315 1.871 12.489 5.378 17.74a31.92 31.92 0 0014.32 11.763 31.898 31.898 0 0034.781-6.916 31.942 31.942 0 006.928-34.798A31.931 31.931 0 0049.66 5.39 31.902 31.902 0 009.353 9.348 31.938 31.938 0 000 31.935z"
            fill="url(#paint1_radial_4184_25136)"
            fillOpacity={0.2}
            style={{
              mixBlendMode: "multiply"
            }}
        />
        <Path
            d="M0 31.936c0 6.315 1.871 12.489 5.378 17.74a31.92 31.92 0 0014.32 11.763 31.898 31.898 0 0034.781-6.916 31.942 31.942 0 006.928-34.798A31.931 31.931 0 0049.66 5.39 31.902 31.902 0 009.353 9.348 31.938 31.938 0 000 31.935z"
            fill="url(#paint2_radial_4184_25136)"
            style={{
              mixBlendMode: "multiply"
            }}
            opacity={0.8}
        />
        <Path
            opacity={0.95}
            d="M44.632 10.663c-.195 1.123-1.681 1.795-3.322 1.539-1.64-.257-2.814-1.42-2.619-2.565.195-1.143 1.681-1.795 3.322-1.507 1.64.287 2.808 1.415 2.619 2.533z"
            fill="#fff"
        />
        <Path
            opacity={0.6}
            d="M45.252 55.215a54.346 54.346 0 01-26.427 0c-4.93-1.277-9.195-3.247-12.398-5.693A31.92 31.92 0 0032.04 62.405a31.9 31.9 0 0025.615-12.883c-3.204 2.446-7.468 4.416-12.404 5.693z"
            fill="#50DFFF"
        />
        <Path
            d="M52.181 32.024a47.56 47.56 0 00-.333-5.596 44.01 44.01 0 00-1.835-8.513 47.737 47.737 0 00-1.025-2.841C45.288 6.109 38.738.144 31.295.144c-7.442 0-14.008 5.965-17.708 14.93a34.07 34.07 0 00-1.025 2.841 44.01 44.01 0 00-1.835 8.513 47.538 47.538 0 00-.333 5.596v.056a46.692 46.692 0 001.63 12.38 34.488 34.488 0 006.058 12.36c3.588 4.493 8.2 7.18 13.213 7.18s9.616-2.697 13.219-7.18a34.472 34.472 0 006.058-12.365 46.624 46.624 0 001.63-12.375l-.02-.056z"
            fill="url(#paint3_linear_4184_25136)"
            fillOpacity={0.4}
            style={{
              mixBlendMode: "screen"
            }}
        />
        <Path
            d="M51.792 16.9c0 7.882-8.882 14.272-19.846 14.272-10.963 0-19.845-6.39-19.845-14.273 0-7.882 8.887-14.273 19.86-14.273 10.974 0 19.831 6.39 19.831 14.273z"
            fill="url(#paint4_linear_4184_25136)"
            style={{
              mixBlendMode: "screen"
            }}
            opacity={0.5}
        />
        <G clipPath="url(#clip0_4184_25136)">
          <Path
              d="M32.827 24.639c-3.854.2-7.458 1.804-10.223 4.569-2.96 2.96-4.59 6.882-4.59 11.043V46l2.082-4.8c2.433-4.848 7.365-8.061 12.731-8.36v6.625l13.16-10.749L32.826 18v6.639z"
              fill="#1A2848"
          />
        </G>
        <Defs>
          <LinearGradient
              id="paint0_linear_4184_25136"
              x1={2.99944e-7}
              y1={37.2582}
              x2={63.833}
              y2={37.2829}
              gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#43D351" />
            <Stop offset={1} stopColor="#0445F4" />
          </LinearGradient>
          <RadialGradient
              id="paint1_radial_4184_25136"
              cx={0}
              cy={0}
              r={1}
              gradientUnits="userSpaceOnUse"
              gradientTransform="matrix(-46.8212 0 0 -46.8494 31.768 -.2)"
          >
            <Stop offset={0.23} stopColor="#3B97D9" />
            <Stop offset={0.24} stopColor="#3D98D9" />
            <Stop offset={0.52} stopColor="#0AC3EB" />
            <Stop offset={0.74} stopColor="#E6FAFF" />
            <Stop offset={0.91} stopColor="#30C5F2" />
            <Stop offset={1} stopColor="#054FF0" />
          </RadialGradient>
          <RadialGradient
              id="paint2_radial_4184_25136"
              cx={0}
              cy={0}
              r={1}
              gradientUnits="userSpaceOnUse"
              gradientTransform="rotate(-172.365 13.877 8.727) scale(84.319 57.5733)"
          >
            <Stop stopColor="#37F1FF" />
            <Stop offset={0.198881} stopColor="#37DBFF" />
            <Stop offset={0.333238} stopColor="#37D1FF" stopOpacity={0.724868} />
            <Stop offset={0.5} stopColor="#37B7FF" stopOpacity={0} />
          </RadialGradient>
          <LinearGradient
              id="paint3_linear_4184_25136"
              x1={31.2798}
              y1={64.0104}
              x2={31.2798}
              y2={-20.3902}
              gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#fff" />
            <Stop offset={0.401042} stopColor="#fff" stopOpacity={0} />
            <Stop offset={1} stopColor="#fff" stopOpacity={0} />
          </LinearGradient>
          <LinearGradient
              id="paint4_linear_4184_25136"
              x1={24.9584}
              y1={32.8454}
              x2={40.0852}
              y2={-4.18328}
              gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#fff" stopOpacity={0} />
            <Stop offset={0.759703} stopColor="#fff" />
          </LinearGradient>
          <ClipPath id="clip0_4184_25136">
            <Path fill="#fff" transform="translate(18 18)" d="M0 0H28V28H0z" />
          </ClipPath>
        </Defs>
      </Svg>
  )
}

export default ShareSvg
