

import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props) => (
    <Svg
        width={11}
        height={5}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path d="M5.396 4.363.783.061h9.226L5.396 4.363Z" fill="#A3A3A3" />
    </Svg>
)

export default SvgComponent
