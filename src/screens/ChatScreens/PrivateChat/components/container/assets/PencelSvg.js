import { ICON } from '@/theme/colors'
import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

const PencelSvg = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={17} height={17} fill="none" {...props}>
    <Path
      d="M15.765 1.099c-.521-.521-1.263-1-2-1-.737 0-1.479.479-2 1l-9 9c-.08.08-.964.893-1 1l-1 4c-.036.108-.017-.114 0 0 .018.113-.067.907 0 1 .067.093-.102-.053 0 0 .102.052.885 0 1 0 .078 0-.074.024 0 0l4-1c.107-.037.92-.92 1-1l9-9c.52-.521 1-1.265 1-2 0-.736-.48-1.48-1-2Z"
      fill={ICON}
    />
  </Svg>
)

export default PencelSvg
