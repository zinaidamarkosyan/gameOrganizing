import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenMask from '@/components/wrappers/screen'
import User from '@/components/User/user'
import { useDispatch, useSelector } from 'react-redux'
import LightButton from '@/components/buttons/Button'
import { RH, RW, font } from '@/theme/utils'
import { ICON, WHITE } from '@/theme/colors'
import { useNavigation } from '@react-navigation/native'
import { cleanDataAndPlayAgain, setTeams } from '@/store/Slices/CrocodileSlice'

const PlayersRatings = () => {
  const { user } = useSelector(({ auth }) => auth)
  const { allTeams, userIsOrganizer } = useSelector(({ crocodile }) => crocodile)
  const dispatch = useDispatch()
  const navigation = useNavigation()

  return (
    <ScreenMask>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerBox}>
          <Text style={styles.ratingText}>Рейтинги игроков</Text>
        </View>
        <View>
          {[1, 2, 3, 4, 5, 6, 7, 8].map(() => {
            return (
              <View
                style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: RH(16) }}
                key={Math.random().toString()}
              >
                <View>
                  <User user={user} size={80} />
                </View>
                <View style={styles.infoBox}>
                  <Text style={styles.infoText}>
                    Объяснил слов {'\n'}
                    {'\n'}5
                  </Text>
                </View>
              </View>
            )
          })}
        </View>
        <View
          style={{
            alignSelf: 'center',
            height: userIsOrganizer ? RH(115) : RH(50),
            justifyContent: 'space-between',
          }}
        >
          <LightButton
            label={'Завершить игру'}
            size={{ width: 370, height: 48 }}
            onPress={() => {
              navigation.navigate('TabNavigator', {
                screen: 'Home',
              })
            }}
          />
          {!!userIsOrganizer && (
            <LightButton
              label={'Играть заново'}
              size={{ width: 370, height: 48 }}
              onPress={() => {
                dispatch(cleanDataAndPlayAgain())
                dispatch(setTeams([...allTeams.map((elm) => ({ ...elm, members: [] }))]))
                navigation.navigate('QrCode')
              }}
            />
          )}
        </View>
      </ScrollView>
    </ScreenMask>
  )
}

export default PlayersRatings

const styles = StyleSheet.create({
  infoText: {
    ...font('bold', 16, WHITE),
  },
  infoBox: {
    paddingHorizontal: RW(10),
  },
  ratingText: {
    ...font('bold', 24, ICON),
    paddingVertical: RH(5),
  },
  headerBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
})
