import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import ScreenMask from '@/components/wrappers/screen'
import Button from '@/components/buttons/Button'
import { RH, RW } from '@/theme/utils'
import { WHITE } from '@/theme/colors'
import { _storageUrl } from '@/constants'
import { useSelector } from 'react-redux'
import FastImage from 'react-native-fast-image'

function Index({ navigation }) {
  const qrLink = useSelector(({ mafia }) => mafia.qrLink)
  if (!qrLink) return null
  return (
    <ScreenMask>
      <View>
        <View style={styles.body}>
          <Text style={styles.title}>Пригласить игроков</Text>
          <View style={styles.qrBlock}>
            <FastImage
              style={styles.qr}
              source={{ uri: _storageUrl + qrLink }}
              resizeMode='contain'
            />
          </View>
          <Button
            onPress={() => navigation.navigate('AddPlayers')}
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
