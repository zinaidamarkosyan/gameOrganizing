import { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import ScreenMask from '@/components/wrappers/screen'
import Button from '@/components/buttons/Button'
import { font, RW, RH } from '@/theme/utils'
import { BACKGROUND, ICON, RED, WHITE } from '@/theme/colors'
import { searchTeam } from '@/store/Slices/TeamSlice'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

function SearchTeam() {
  const dispatch = useDispatch()
  const [value, setValue] = useState('')
  const [findedTeamEmpty, setFindedTeamEmpty] = useState(false)
  const navigation = useNavigation()

  //test team id ---> 640b2c8d9f063da9a3cf6b7e
  const handleSeach = () => {
    dispatch(searchTeam(value, setFindedTeamEmpty, navigation, 'TeamSearchRes', null))
  }

  return (
    <ScreenMask style={{ paddingHorizontal: RW(32) }}>
      <Text style={styles.title}>Поиск команды</Text>
      <Text style={{ ...font('regular', 16, ICON, 24), marginVertical: RH(20) }}>
        Поиск команды
      </Text>
      <TextInput
        style={styles.input}
        placeholderTextColor={ICON}
        value={value}
        onChangeText={(e) => setValue(e)}
        placeholder={'ID карточка/По названию команды'}
      />
      <View style={{ alignItems: 'center', paddingRight: RW(10), width: '100%' }}>
        <Button size={styles.btn} label={'Поиск'} onPress={handleSeach} />
      </View>
      {findedTeamEmpty && (
        <Text
          style={{ ...font('regular', 20, RED, 24), marginVertical: RH(20), alignSelf: 'center' }}
        >
          Не найдено
        </Text>
      )}
    </ScreenMask>
  )
}
const styles = StyleSheet.create({
  btn: {
    width: RW(397),
    height: RH(48),
  },
  input: {
    backgroundColor: BACKGROUND,
    marginBottom: RH(49),
    borderRadius: RW(10),
    width: RW(363),
    height: RH(48),
    marginLeft: 'auto',
    marginRight: 'auto',
    color: ICON,
    paddingLeft: RW(24),
  },
  title: {
    ...font('bold', 24, WHITE),
    textAlign: 'center',
    marginTop: RH(20),
    marginBottom: RH(30),
  },
})

export default SearchTeam
