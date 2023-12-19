import { RH, RW, font } from '@/theme/utils'
import { BLACK, WHITE } from '@/theme/colors'
import { useDispatch } from 'react-redux'
import { _storageUrl } from '@/constants'
import { saveTeamDataForCreating } from '@/store/Slices/TeamSlice'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import ScreenMask from '@/components/wrappers/screen'
import Button from '@/components/buttons/Button'
import UserEditSvg from '@/assets/svgs/userEdit'
import FastImage from 'react-native-fast-image'

function Index({ route }) {
  const { command } = route.params
  const navigation = useNavigation()
  const dispatch = useDispatch()
  return (
    <ScreenMask>
      <View style={styles.rowBox}>
        <Text style={styles.team}>{command?.name}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('EditTeamInfo', command)}
          style={styles.editBtn}
        >
          <UserEditSvg />
        </TouchableOpacity>
      </View>
      <View style={styles.imageBlock}>
        <FastImage
          style={styles.image}
          source={{ uri: _storageUrl + command?.img }}
          resizeMode="cover"
        />
      </View>

      <Text style={styles.text}>Адрес нахождения команды</Text>
      <Text style={styles.textLined}>{command?.address_name}</Text>
      <View style={styles.btns}>
        <View style={styles.btn}>
          <Button
            onPress={() =>
              command?.invited_players?.length
                ? navigation.navigate('MembersInTeam', command)
                : navigation.navigate('SearchTeamMembers', command)
            }
            size={{ width: 265, height: 48 }}
            label={'Состав'}
            labelStyle={font('bold', 18, BLACK)}
          />
        </View>
        <Button
          onPress={() => {
            navigation.navigate('CreateGameNavigator'), dispatch(saveTeamDataForCreating(command))
          }}
          size={{ width: 265, height: 48 }}
          label={'Создать игру'}
          labelStyle={font('bold', 18, BLACK)}
        />
      </View>
    </ScreenMask>
  )
}

const styles = StyleSheet.create({
  team: {
    textAlign: 'center',
    ...font('bold', 22, WHITE),
    marginVertical: RH(15),
  },
  imageBlock: {
    width: RW(240),
    height: RW(240),
    alignSelf: 'center',
    marginVertical: RH(25),
    borderWidth: 1,
    borderRadius: RW(150),
    borderColor: WHITE,
  },
  rowBox: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  image: {
    borderWidth: 1,
    width: '100%',
    height: '100%',
    borderRadius: RW(150),
  },
  editBtn: {
    left: '40%',
  },
  text: {
    textAlign: 'center',
    marginVertical: RH(5),
    ...font('regular', 18, WHITE),
  },
  textLined: {
    ...font('bold', 16, WHITE, 20),
    marginVertical: RH(10),
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  btns: {
    marginTop: RH(150),
    alignItems: 'center',
  },
  btn: {
    marginBottom: RH(15),
  },
})

export default Index
