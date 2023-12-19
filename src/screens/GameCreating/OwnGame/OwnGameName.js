import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import ScreenMask from '@/components/wrappers/screen'
import { BACKGROUND, ICON, RED } from '@/theme/colors'
import { RH, RW, font } from '@/theme/utils'
import LightButton from '@/components/buttons/Button'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { setGameDescription, setGameName } from '@/store/Slices/GameCreatingSlice'

const OwnGameName = ({ route }) => {
  const props = route.params
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [error, setError] = useState(false)
  const { game_name, game_description } = useSelector((state) => state.game)
  const handleClick = () => {
    if (game_name?.length) {
      setError(false)
      navigation.navigate('GameCreating', route?.params)
    } else {
      setError(true)
    }
  }
  return (
    <ScreenMask>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={styles.inputsContainer}>
          <TextInput
            style={styles.input}
            placeholderTextColor={ICON}
            value={game_name}
            onChangeText={(e) => dispatch(setGameName(e))}
            placeholder={'Название игры'}
          />
          {error && <Text style={styles.error}>Заполните поле</Text>}
          <TextInput
            style={styles.inputMulti}
            placeholderTextColor={ICON}
            multiline={true}
            value={game_description}
            onChangeText={(e) => dispatch(setGameDescription(e))}
            placeholder={'Описание игры (можно использовать ссылку на интернет страничку):'}
          />
        </View>
      </ScrollView>
      <View style={styles.btn}>
        <LightButton label={'Далее'} onPress={handleClick} />
      </View>
    </ScreenMask>
  )
}

export default OwnGameName

const styles = StyleSheet.create({
  input: {
    backgroundColor: BACKGROUND,
    borderRadius: RW(10),
    width: RW(363),
    height: RH(48),
    marginLeft: 'auto',
    marginRight: 'auto',
    color: ICON,
    paddingLeft: RW(24),
  },
  inputMulti: {
    backgroundColor: BACKGROUND,
    borderRadius: RW(10),
    width: RW(363),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: RH(256),
    marginLeft: 'auto',
    marginRight: 'auto',
    color: ICON,
    paddingHorizontal: RW(24),
    paddingTop: RW(14),
    paddingBottom: RH(150),
  },
  inputsContainer: { height: RH(350), justifyContent: 'space-around', marginTop: RH(70) },
  radioBlockBox: { marginTop: RH(30) },
  btn: {
    position: 'absolute',
    bottom: RH(40),
    right: RW(20),
  },
  error: {
    ...font('regular', 16, RED),
    left: '5%',
  },
})
