import { WHITE } from '@/theme/colors'
import { RH, RW } from '@/theme/utils'
import { useSelector } from 'react-redux'
import { _storageUrl } from '@/constants'
import { useNavigation } from '@react-navigation/native'
import { Text, View, StyleSheet } from 'react-native'
import Button from '@/components/buttons/Button'
import ScreenMask from '@/components/wrappers/screen'
import FastImage from 'react-native-fast-image'

function Index() {
  const { qrGameImg } = useSelector(({ alias }) => alias)
  const navigation = useNavigation()
  return (
    <ScreenMask>
      <View>
        <View style={styles.body}>
          <Text style={styles.title}>Пригласить игроков</Text>
          <View style={styles.qrBlock}>
            <FastImage
              resizeMode="contain"
              style={styles.qr}
              source={{ uri: _storageUrl + qrGameImg }}
            />
          </View>
          <Button
            onPress={() => navigation.navigate('InviteTeamPlayers')}
            size={styles.btn}
            label={'Продолжить'}
          />
        </View>
      </View>
    </ScreenMask>
  )
}
const styles = StyleSheet.create({
  title: {
    color: WHITE,
    textAlign: 'center',
    fontSize: 24,
  },
  body: {
    marginTop: RW(125),
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
  },
  qrBlock: {
    width: RW(281),
    height: RH(280),
    marginTop: RH(127),
    marginBottom: RH(90),
  },
  qr: {
    width: '100%',
    height: '100%',
  },
  btn: {
    width: 281,
    height: 48,
  },
})

export default Index
