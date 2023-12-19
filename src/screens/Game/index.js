import React from 'react'
import { StyleSheet, View } from 'react-native'
import ScreenMask from '@/components/wrappers/screen'
import TypeButton from './components/TypeButton'
// import { useDispatch } from 'react-redux'
// import { useIsFocused } from '@react-navigation/native'

const TYPES = [
  {
    title: 'Играть',
    navigateTo: 'Play',
  },
  {
    title: 'Команда',
    navigateTo: 'TeamNavigator',
  },
  {
    title: 'Турнир',
    navigateTo: 'TournamentNavigator',
  },
]

const GameSelectScreen = ({ navigation }) => {
  // const dispatch = useDispatch()
  // const isFocused = useIsFocused()
  // // useEffect(() => {
  // // dispatch(saveTeamDataForCreating(null))
  // // }, [isFocused])
  return (
    <ScreenMask>
      <View style={styles.container}>
        {TYPES.map(type => {
          return (
            <TypeButton
              title={type.title}
              key={type.title}
              onPress={() => navigation.navigate(type.navigateTo)}
            />
          )
        })}
      </View>
    </ScreenMask>
  )
}

export default GameSelectScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
})
