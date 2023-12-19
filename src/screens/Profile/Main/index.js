import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ScreenMask from '@/components/wrappers/screen'
import { useNavigation } from '@react-navigation/native'
import { _storageUrl } from '@/constants'
import { useSelector } from 'react-redux'
import FastImage from 'react-native-fast-image'
import { RH, RW, font } from '@/theme/utils'
import { DARK_BLUE, ICON, WHITE } from '@/theme/colors'

const index = () => {
  const navigation = useNavigation()
  const { avatar, name, surname, _id } = useSelector(({ auth }) => auth.user)
  const list = [
    { id: 1, text: 'Мои данные', navigateTo: 'MyDetails' },
    { id: 2, text: 'Моя галерея', navigateTo: 'Gallery', params: { isMe: true } },
    { id: 3, text: 'Мои предпочтения', navigateTo: 'Preference' },
    { id: 5, text: 'Условия использования' },
    { id: 6, text: 'Обратная связь', navigateTo: 'Feedback' },
  ]
  const forNavigate = (item) => {
    if (item.id !== 5) {
      navigation.navigate('ProfileNavigator', { screen: item.navigateTo, params: item?.params })
    }
  }

  const LinkItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => forNavigate(item)}
      style={
        item.id === 6 ? { ...styles.linkBlock, borderBottomWidth: 0 } : { ...styles.linkBlock }
      }
    >
      <Text style={styles.linkText}>{item.text}</Text>
    </TouchableOpacity>
  )
  const renderItem = ({ item }) => <LinkItem item={item} />

  return (
    <ScreenMask style={{ paddingHorizontal: 0 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Мой кабинет</Text>
        <View style={styles.infoBlock}>
          <View style={styles.imageBlock}>
            <FastImage
              style={[styles.image]}
              resizeMode="cover"
              source={
                !avatar
                  ? require('../../../assets/defualtUser.png')
                  : avatar.startsWith('https://')
                  ? { uri: avatar }
                  : {
                      uri: _storageUrl + avatar,
                    }
              }
            />
          </View>
          <View>
            <Text style={styles.name}>{name + ' ' + surname}</Text>
            <Text style={styles.id}>{`Номер ID: ${_id}`}</Text>
          </View>
        </View>
      </View>
      <FlatList data={list} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </ScreenMask>
  )
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: RW(27),
    alignItems: 'center',
  },
  title: {
    ...font('bold', 24, WHITE, 24),
    marginBottom: RW(15),
  },
  imageBlock: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 87,
    height: 87,
    borderRadius: 43.5,
    marginRight: RW(18),
    alignSelf: 'center',
  },

  infoBlock: {
    flexDirection: 'row',
    width: '100%',
    paddingLeft: RW(31),
    marginBottom: RH(30),
    marginTop: RH(15),
  },

  name: {
    ...font('bold', 24, ICON, 28),
    width: '88%',
  },
  id: {
    ...font('regular', 16, ICON, 19),
    marginTop: RH(8),
    width: '87%',
  },
  linkText: {
    ...font('regular', 16, WHITE, 19),
    paddingHorizontal: RW(12),
    paddingVertical: RH(10),
  },
  linkBlock: {
    width: '100%',
    paddingVertical: RH(17),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: DARK_BLUE,
    paddingLeft: RW(44),
  },
})

export default index
