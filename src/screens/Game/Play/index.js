import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import ScreenMask from '@/components/wrappers/screen'
import LightButton from '@/components/buttons/Button'
import { saveTeamDataForCreating } from '@/store/Slices/TeamSlice'
import { useDispatch } from 'react-redux'

function Index() {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  return (
    <ScreenMask>
      <View style={styles.btnBlock}>
        <View style={styles.btnActiveGames}>
          <LightButton
            onPress={() => {
              navigation.navigate('CreateGameNavigator')
            }}
            label={'Создать игру'}
            size={{ width: 281, height: 50 }}
          />
        </View>
        <View>
          <LightButton
            onPress={() => {
              navigation.navigate('JoinGame'), dispatch(saveTeamDataForCreating({}))
            }}
            label={'Принять участие в игре'}
            size={{ width: 281, height: 50 }}
          />
        </View>
      </View>
    </ScreenMask>
  )
}
const styles = StyleSheet.create({
  btnBlock: {
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  btnActiveGames: {
    marginBottom: 24,
  },
})

export default Index
