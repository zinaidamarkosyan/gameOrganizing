import { View, StyleSheet, Text } from 'react-native'
import React from 'react'
import Modal from '@/components/modal'
import { font, RH, RW } from '@/theme/utils'
import { useSelector } from 'react-redux'
import { _storageUrl } from '@/constants'

import { SCREEN_BACKGROUND } from '@/theme/colors'
import LightButton from '@/components/buttons/Button'
import { useNavigation } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'

const WinnerModal = ({ modalVisible, setModalVisible }) => {
  const { roles } = useSelector(({ mafia }) => mafia)
  const imgPath = _storageUrl + roles?.find((item) => item.type == modalVisible)?.img
  const navigation = useNavigation()

  return (
    <Modal
      modalVisible={modalVisible}
      setIsVisible={(e) => {
        navigation.navigate('RatingPlayer')
        setModalVisible(e)
      }}
      item={
        <View style={styles.container}>
          <FastImage style={styles.img} resizeMode='contain' source={{ uri: imgPath }} />
          <Text style={styles.text}>
            {modalVisible == 'мафия'
              ? 'Игра окончена. Победила мафия.'
              : 'Игра окончена. Победили мирные жители.'}
          </Text>
          <View style={{ alignSelf: 'center', marginTop: RH(12) }}>
            <LightButton
              size={{ width: RW(281), height: RH(48) }}
              label={'Рейтинги'}
              onPress={() => {
                setModalVisible(false)
                navigation.navigate('RatingPlayer')
              }}
            />
          </View>
        </View>
      }
    />
    // </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: RW(306),
    height: RH(350),
    backgroundColor: SCREEN_BACKGROUND,
    borderRadius: RH(20),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  img: {
    height: RH(170),
  },
  text: {
    ...font('regular', 20, '#fff', 25),
    textAlign: 'center',
    paddingHorizontal: RW(10),
    marginTop: RH(15),
  },
})

export default WinnerModal
