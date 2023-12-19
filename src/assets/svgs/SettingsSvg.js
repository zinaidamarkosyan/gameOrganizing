import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props) => (
    <Svg
        width={12}
        height={11}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M4.714 5.147a.638.638 0 0 1 .168.432v4.7a.32.32 0 0 0 .544.228l1.311-1.503c.176-.21.273-.314.273-.523V5.58c0-.16.06-.314.168-.432l3.763-4.083a.479.479 0 0 0-.353-.803H1.303a.479.479 0 0 0-.352.803l3.763 4.082Z"
            fill="#A3A3A3"
        />
    </Svg>
)

export default SvgComponent
