import * as React from 'react'
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg'
import { RW, RH } from '@/theme/utils'
import { Pressable, Share } from 'react-native'
import RNFS from 'react-native-fs'

function Consent({ path, name }) {
  const downloadFunc = async () => {
    RNFS.downloadFile({
      fromUrl: `https://to-play.ru/storage/${path}`,
      toFile: `${RNFS.DocumentDirectoryPath}/${name.split(' ').join('-')}.pdf`,
    }).promise.then((link, a) => {
      Share.share({
        url: `${RNFS.DocumentDirectoryPath}/${name.split(' ').join('-')}.pdf`,
      })
    })
  }
  return (
    <Pressable onPress={downloadFunc} style={{ paddingLeft: RW(5) }}>
      <Svg
        width={RW(36)}
        height={RH(37)}
        viewBox="0 0 36 37"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <G clipPath="url(#clip0_4139_25213)" fill="#fff">
          <Path d="M23.197 1.18a.871.871 0 00-.626-.278H8.527c-2.591 0-4.73 2.13-4.73 4.722V32.18c0 2.591 2.139 4.722 4.73 4.722h19.061c2.591 0 4.73-2.13 4.73-4.722V11.093a.936.936 0 00-.252-.609l-8.87-9.304zm.252 2.791l5.94 6.235h-3.862a2.07 2.07 0 01-2.078-2.07V3.972zm4.14 31.192H8.526c-1.626 0-2.991-1.348-2.991-2.983V5.624c0-1.626 1.357-2.983 2.991-2.983H21.71v5.496a3.804 3.804 0 003.817 3.808h5.052V32.18c0 1.635-1.356 2.983-2.99 2.983z" />
          <Path d="M25.214 29.163H10.901a.872.872 0 00-.87.87c0 .478.392.869.87.869h14.322c.478 0 .87-.391.87-.87a.874.874 0 00-.879-.87zM22.493 19.389L18.91 23.24v-9.495a.872.872 0 00-.87-.87.872.872 0 00-.869.87v9.495l-3.583-3.852a.865.865 0 00-1.226-.043.867.867 0 00-.043 1.226l5.095 5.47a.876.876 0 00.635.277c.244 0 .47-.104.635-.278l5.096-5.47a.867.867 0 00-.044-1.226.887.887 0 00-1.243.044z" />
        </G>
        <Defs>
          <ClipPath id="clip0_4139_25213">
            <Path fill="#fff" transform="translate(0 .972)" d="M0 0H36V36H0z" />
          </ClipPath>
        </Defs>
      </Svg>
    </Pressable>
  )
}

export default Consent
