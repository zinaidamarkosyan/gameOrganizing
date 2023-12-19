import { StyleSheet, View } from 'react-native'
import React, { memo } from 'react'
import LightButton from '@/components/buttons/Button'
import { useNavigation } from '@react-navigation/native'
import { font, RH, RW } from '@/theme/utils'
import { BACKGROUND, BLACK, ICON, RADIO_TEXT, WHITE } from '@/theme/colors'
import ScreenMask from '@/components/wrappers/screen'

const GameTypeSelect = () => {
  const navigation = useNavigation()

  return (
    <>
      <ScreenMask>
        <View style={styles.btnBlock}>
          <View style={styles.btnActiveGames}>
            <LightButton
              onPress={() => {
                navigation.navigate('CreateGameNavigator', {
                  screen: 'GameListCarousel',
                  params: { list: 'active', fromTournament: true },
                })
              }}
              label={'Активные игры'}
              size={{ width: 281, height: 50 }}
            />
          </View>
          <View>
            <LightButton
              onPress={() => {
                navigation.navigate('CreateGameNavigator', {
                  screen: 'GameListCarousel',
                  params: { list: 'desktop', fromTournament: true },
                })
              }}
              label={'Настольные игры'}
              size={{ width: 281, height: 50 }}
            />
          </View>
        </View>
      </ScreenMask>
    </>
  )
}

export default memo(GameTypeSelect)

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: WHITE,
  },
  btn: {
    width: RW(220),
    marginTop: RH(20),
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  btnBlock: {
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  gameTypeContainer: {
    alignSelf: 'center',
  },
  checkCheckbox: {
    padding: RW(10),
    flexDirection: 'row',
  },
  openedGameBtn: {
    borderRadius: RW(10),
    backgroundColor: BACKGROUND,
    width: RW(380),
    height: RH(48),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: RW(16),
  },

  typeText: {
    color: RADIO_TEXT,
    fontSize: RW(16),
    paddingHorizontal: RW(10),
  },
  gameTypeBtn: {
    backgroundColor: BACKGROUND,
    width: RW(366),
    height: RH(48),
    borderTopLeftRadius: RW(10),
    justifyContent: 'center',
    borderTopRightRadius: RW(10),
  },
  gameTypeLastBtn: {
    borderRadius: RW(0),
    backgroundColor: BACKGROUND,
    width: RW(366),
    height: RH(48),
    justifyContent: 'center',
  },
  gameTypeBtnText: {
    color: ICON,
    fontSize: RH(16),
    paddingHorizontal: RW(15),
  },
  arrowDown: {
    paddingHorizontal: RW(15),
  },
  someTitle: {
    color: ICON,
    marginLeft: RW(10),
    alignSelf: 'flex-start',
    top: '26%',
    // marginVertical: RH(10),
  },
  radioTitle: {
    color: ICON,
  },
  datesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: RH(20),
    width: RW(380),
    alignSelf: 'center',
    // marginBottom: RH(30),
  },

  btnActiveGames: {
    marginBottom: 24,
  },

  title: font('bold', 18, BLACK),
})
