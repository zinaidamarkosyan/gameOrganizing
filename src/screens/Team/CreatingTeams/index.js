import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { RH } from '@/theme/utils'
import { setFindedTeam } from '@/store/Slices/TeamSlice'
import { useDispatch } from 'react-redux'
import ScreenMask from '@/components/wrappers/screen'
import LightButton from '@/components/buttons/Button'

const CreatingTeams = ({ navigation }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setFindedTeam([]))
  }, [])
  return (
    <ScreenMask>
      <View style={styles.common}>
        <View style={styles.btn}>
          <LightButton
            label={'Создать команду'}
            size={{ width: 270, height: 48 }}
            onPress={() => navigation.navigate('CreateTeamTitle')}
          />
        </View>
        <View style={styles.btn}>
          <LightButton
            label={'Мои команды'}
            size={{ width: 270, height: 48 }}
            onPress={() => navigation.navigate('MyTeam')}
          />
        </View>
        <View style={styles.btn}>
          <LightButton
            label={'Поиск команды'}
            size={{ width: 270, height: 48 }}
            onPress={() => navigation.navigate('SearchTeam')}
          />
        </View>
      </View>
    </ScreenMask>
  )
}
const styles = StyleSheet.create({
  common: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    marginVertical: RH(28),
  },
})
export default CreatingTeams
