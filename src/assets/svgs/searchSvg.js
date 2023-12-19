import * as React from "react"
import Svg, { Path } from "react-native-svg"
import {RH, RW} from "@/theme/utils";

function SearchSvg(props) {
    return (
        <Svg
            width={RW(34)}
            height={RH(33)}
            viewBox="0 0 34 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M30.596 15.798c-.776 5.126-5.785 8.733-11.308 7.898-5.524-.835-9.243-5.762-8.468-10.888.776-5.127 5.785-8.734 11.308-7.898 5.524.835 9.243 5.762 8.468 10.888z"
                stroke="#657AC5"
                strokeWidth={3}
            />
            <Path
                d="M12.28 21.186L2.037 28.739"
                stroke="#657AC5"
                strokeWidth={3}
                strokeLinecap="round"
            />
        </Svg>
    )
}

export default SearchSvg
