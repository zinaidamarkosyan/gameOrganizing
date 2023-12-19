import { Dimensions, Platform, PixelRatio } from 'react-native'
import { SHADOW } from './colors'

import {
  FONT_INTER_THIN,
  FONT_INTER_BOLD,
  FONT_INTER_LIGHT,
  FONT_INTER_MEDIUM,
  FONT_INTER_REGULAR,
  FONT_EXO_BOLD,
  FONT_OPEN_SANS,
  FONT_OPEN_SANS_MEDIUM,
} from './fonts'

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window')

export const RatioH = SCREEN_HEIGHT / 926
export const RatioW = SCREEN_WIDTH / 428

export const normalizePixel = (size) => {
  const newSize = size * RatioW

  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  }

  if (size > 12) return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2

  return Math.round(PixelRatio.roundToNearestPixel(newSize))
}

const getFontFamily = (fontFamily) => {
  switch (fontFamily) {
    // Roboto fonts
    case 'bold':
      return FONT_INTER_BOLD
    case 'light':
      return FONT_INTER_LIGHT
    case 'medium':
      return FONT_INTER_MEDIUM
    case 'regular':
      return FONT_INTER_REGULAR
    case 'thin':
      return FONT_INTER_THIN
    case 'exo_bold':
      return FONT_EXO_BOLD
    case 'openSans':
      return FONT_OPEN_SANS
    case 'openSans_medium':
      return FONT_OPEN_SANS_MEDIUM
  }
}
/**
 * Get font style object
 * @param {*} fontWeight: black | bold | heavy | light | medium | regular | semiBold | thin | ultraLight
 * @param {*} fontSize: number
 * @param {*} color: color constant
 * @param {*} lineHeight: number | string | undefined
 * @returns font style object
 */
export const font = (
  fontFamily,
  fontSize = undefined,
  color = undefined,
  lineHeight = undefined,
) => {
  const fontStyle = {
    fontFamily: getFontFamily(fontFamily),
  }
  if (fontSize !== undefined) {
    fontStyle.fontSize = normalizePixel(fontSize)
  }
  if (color !== undefined) {
    fontStyle.color = color
  }
  if (lineHeight !== undefined) {
    fontStyle.lineHeight = normalizePixel(lineHeight)
  }

  return fontStyle
}

export const shadow = {
  elevation: 5,
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowRadius: 5,
  shadowOpacity: 0.5,
  shadowColor: SHADOW,
}

export const RW = (value) => RatioW * value
export const RH = (value) => RatioH * value
