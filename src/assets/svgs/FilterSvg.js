import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function FilterSvg(props) {
  return (
    <Svg
      width={11}
      height={12}
      viewBox="0 0 11 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M4.159 5.85a.638.638 0 01.168.432v4.7a.32.32 0 00.543.229l1.312-1.503c.175-.21.272-.315.272-.524V6.283c0-.16.06-.314.168-.432l3.763-4.083a.479.479 0 00-.352-.803H.748a.479.479 0 00-.352.803L4.159 5.85z"
        fill="#A3A3A3"
      />
    </Svg>
  )
}

export default FilterSvg
