import * as React from "react"
import Svg, { Path } from "react-native-svg"
import {RH, RW} from '@/theme/utils'

function SvgComponent(props) {
    return (
        <Svg
            width={RH(20)}
            height={RW(23)}
            viewBox="0 0 20 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M9.798 1.133h0a.324.324 0 01.192-.072.323.323 0 01.212.072h0l7.896 6.347s0 0 0 0a3.785 3.785 0 011.402 2.949v10.82c0 .506-.417.917-.889.917h-5.555c-.472 0-.89-.411-.89-.917V15.58c0-.2-.07-.4-.22-.554a.774.774 0 00-.557-.23H8.61a.774.774 0 00-.557.23.786.786 0 00-.22.554v5.668c0 .506-.418.917-.89.917H1.39c-.472 0-.889-.411-.889-.917v-10.82c0-1.152.52-2.24 1.402-2.95 0 0 0 0 0 0l7.896-6.346z"
                fill="#001034"
                stroke="#001034"
            />
        </Svg>
    )
}

export default SvgComponent
