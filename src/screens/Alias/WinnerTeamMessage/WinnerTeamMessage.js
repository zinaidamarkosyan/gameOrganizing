import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenMask from '@/components/wrappers/screen'
import { RH, font } from '@/theme/utils'
import { ICON } from '@/theme/colors'
import LightButton from '@/components/buttons/Button'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { Stop, Svg, TSpan } from 'react-native-svg'

const WinnerTeamMessage = () => {
  const navigation = useNavigation()
  const { allTeams } = useSelector(({ alias }) => alias)

  let maxPoints = Number.NEGATIVE_INFINITY // Initialize maxPoints to negative infinity
  let maxPointsTeam = null // Initialize the team with maxPoints

  for (const team of allTeams) {
    if (team.points > maxPoints) {
      maxPoints = team.points
      maxPointsTeam = team
    }
  }
  const winnerName = maxPointsTeam.value

  return (
    <ScreenMask>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.winnerText}>
          {winnerName} {'\n'}
          {'\n'} выиграла {'\n'}
          {'\n'}Поздравляем!
        </Text>
      </View>
      <View style={{ alignSelf: 'center', bottom: RH(10) }}>
        <LightButton
          label={'Продолжить'}
          size={{ width: 281, height: 50 }}
          onPress={() => {
            navigation.navigate('PlayersRatings')
          }}
        />
      </View>
    </ScreenMask>
  )
}

export default WinnerTeamMessage

const styles = StyleSheet.create({
  winnerText: {
    width: '70%',
    textAlign: 'center',
    ...font('bold', 36, ICON),
  },
})
