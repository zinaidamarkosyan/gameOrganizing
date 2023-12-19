import * as React from "react"
import {Svg, Path, Defs, LinearGradient, Stop} from "react-native-svg"
import {RH, RW} from "@/theme/utils";

function DownloadingIcon({size}) {
    return (
        <Svg width={RW(size?.width) || RW(172)} height={RH(size?.height) || RH(36)} viewBox="0 0 17 21" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <Path
                d="M9.16602 1.85937C9.16602 1.30709 8.7183 0.859375 8.16602 0.859375C7.61373 0.859375 7.16602 1.30709 7.16602 1.85938L9.16602 1.85937ZM7.45891 18.5665C7.84943 18.957 8.4826 18.957 8.87312 18.5665L15.2371 12.2025C15.6276 11.812 15.6276 11.1788 15.2371 10.7883C14.8466 10.3978 14.2134 10.3978 13.8229 10.7883L8.16602 16.4452L2.50916 10.7883C2.11864 10.3978 1.48547 10.3978 1.09495 10.7883C0.704424 11.1788 0.704424 11.812 1.09495 12.2025L7.45891 18.5665ZM7.16602 1.85938L7.16602 17.8594L9.16602 17.8594L9.16602 1.85937L7.16602 1.85938Z"
                fill="url(#paint0_linear_259_1525)"/>
            <Path d="M2.16602 19.8594H15.166" stroke="url(#paint1_linear_259_1525)" stroke-width="2"
                  stroke-linecap="round"/>
            <Defs>
                <LinearGradient id="paint0_linear_259_1525" x1="8.16602" y1="11.1927" x2="9.16602" y2="11.1927"
                                gradientUnits="userSpaceOnUse">
                    <Stop stopColor="#7DCE8A"/>
                    <Stop offset="1" stopColor="#4D7CFE"/>
                </LinearGradient>
                <LinearGradient id="paint1_linear_259_1525" x1="2.16602" y1="20.4427" x2="15.1658" y2="20.5082"
                                gradientUnits="userSpaceOnUse">
                    <Stop stopColor="#7DCE8A"/>
                    <Stop offset="1" stopColor="#4D7CFE"/>
                </LinearGradient>
            </Defs>
        </Svg>

    )
}

export default DownloadingIcon
