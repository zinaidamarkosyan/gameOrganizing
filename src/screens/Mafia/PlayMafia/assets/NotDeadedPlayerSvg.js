import * as React from 'react'
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg'

function NotDeadedPlayerSvg(props) {
  return (
    <Svg
      width={83}
      height={83}
      viewBox="0 0 83 83"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M41.335 81.928a8.423 8.423 0 100-16.846 8.423 8.423 0 000 16.846z"
        fill="url(#paint0_linear_2436_25313)"
      />
      <Path
        d="M52.567 11.736c0 6.203-5.029 47.731-11.23 47.731-6.203 0-11.232-41.528-11.232-47.73a11.23 11.23 0 1122.462 0z"
        fill="url(#paint1_linear_2436_25313)"
      />
      <Path
        d="M15.974 81.803a7.3 7.3 0 10-1.229-14.548 7.3 7.3 0 001.229 14.548z"
        fill="url(#paint2_linear_2436_25313)"
      />
      <Path
        d="M20.55 20.365c.453 5.356-.86 41.587-6.216 42.039-5.356.452-12.728-35.044-13.18-40.4a9.734 9.734 0 0119.397-1.64z"
        fill="url(#paint3_linear_2436_25313)"
      />
      <Path
        d="M66.892 81.819a7.3 7.3 0 101.15-14.555 7.3 7.3 0 00-1.15 14.555z"
        fill="url(#paint4_linear_2436_25313)"
      />
      <Path
        d="M81.382 21.94c-.423 5.359-7.6 40.896-12.959 40.473-5.358-.423-6.87-36.646-6.447-42.005a9.733 9.733 0 1119.406 1.532z"
        fill="url(#paint5_linear_2436_25313)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_2436_25313"
          x1={32.9121}
          y1={74.9089}
          x2={49.7582}
          y2={74.9154}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#7DCE8A" />
          <Stop offset={1} stopColor="#4D7CFE" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_2436_25313"
          x1={30.1055}
          y1={34.8999}
          x2={52.567}
          y2={34.9032}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#7DCE8A" />
          <Stop offset={1} stopColor="#4D7CFE" />
        </LinearGradient>
        <LinearGradient
          id="paint2_linear_2436_25313"
          x1={8.18762}
          y1={76.3556}
          x2={22.7364}
          y2={75.1322}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#7DCE8A" />
          <Stop offset={1} stopColor="#4D7CFE" />
        </LinearGradient>
        <LinearGradient
          id="paint3_linear_2436_25313"
          x1={2.84318}
          y1={42.0073}
          x2={22.2411}
          y2={40.3715}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#7DCE8A" />
          <Stop offset={1} stopColor="#4D7CFE" />
        </LinearGradient>
        <LinearGradient
          id="paint4_linear_2436_25313"
          x1={60.0933}
          y1={75.1797}
          x2={74.6477}
          y2={76.3345}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#7DCE8A" />
          <Stop offset={1} stopColor="#4D7CFE" />
        </LinearGradient>
        <LinearGradient
          id="paint5_linear_2436_25313"
          x1={60.3959}
          y1={40.421}
          x2={79.8021}
          y2={41.9561}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#7DCE8A" />
          <Stop offset={1} stopColor="#4D7CFE" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default NotDeadedPlayerSvg
