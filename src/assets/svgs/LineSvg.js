import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props) => (
    <Svg
        width={378}
        height={3}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path d="M.44 1.385h377.12" stroke="#657AC5" strokeWidth={2} />
    </Svg>
)

export default SvgComponent
