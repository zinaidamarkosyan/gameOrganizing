import * as React from 'react'
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg'

function Wave() {
  return (
    <Svg width={15} height={8} viewBox="0 0 15 8" fill="none">
      <G clipPath="url(#clip0_890_5136)" fill="#fff">
        <Path d="M0 3.39C.758 1.51 2.962.206 4.975.864c1.661.51 2.812 2.021 4.422 2.516 2.016.589 4.065-.279 5.603-1.72-1.086 1.946-3.495 3.178-5.724 2.693-1.513-.326-2.717-1.53-3.951-2.298C3.495.865 1.277 1.808 0 3.39z" />
        <Path d="M0 6.623C.758 4.74 2.962 3.438 4.975 4.097c1.661.51 2.812 2.02 4.422 2.516 2.016.588 4.065-.28 5.603-1.72-1.086 1.946-3.495 3.177-5.724 2.693-1.513-.327-2.717-1.531-3.951-2.298C3.495 4.097 1.277 5.04 0 6.623z" />
      </G>
      <Defs>
        <ClipPath id="clip0_890_5136">
          <Path fill="#fff" transform="translate(0 .691)" d="M0 0H15V7H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default Wave
