import { Dimensions, Platform } from 'react-native'
import { RH } from '@/theme/utils'

export const IS_IOS = Platform.OS == 'ios'

export const NAV_HEADER_OPTION = {
  headerShown: false,
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  headerStatusBarHeight: IS_IOS ? undefined : 0,
}

export const TAB_BAR_HEIGHT = RH(65)

export const SCREEN_HEIGHT = Dimensions.get('window').height
export const SCREEN_WIDTH = Dimensions.get('window').width

export const _storageUrl =
  Platform.OS == 'ios' ? 'https://to-play.ru/storage/' : 'http://to-play.ru/storage/'
