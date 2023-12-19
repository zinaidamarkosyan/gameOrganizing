import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import ScreenMask from '@/components/wrappers/screen'
import LightButton from '@/components/buttons/Button'

function JoinGameTypes() {
  const navigation = useNavigation()
  return (
    <ScreenMask>
      <View style={styles.btnBlock}>
        <View style={styles.btnActiveGames}></View>
        <View>
          <LightButton
            onPress={() => {
              navigation.navigate('JoinGame')
            }}
            label={'поиск игры'}
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

export default JoinGameTypes
