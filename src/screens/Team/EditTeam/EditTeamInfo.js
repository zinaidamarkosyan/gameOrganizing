import { ImageBackground, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import ScreenMask from '@/components/wrappers/screen'
import { useNavigation } from '@react-navigation/native'
import { _storageUrl } from '@/constants'
import { font, RH, RW } from '@/theme/utils'
import { BACKGROUND, ICON, WHITE } from '@/theme/colors'
import SearchAddresses from '@/screens/Map/SearchAddresses'
import LightButton from '@/components/buttons/Button'
import { launchImageLibrary } from 'react-native-image-picker'
import UploadIcon from '@/assets/svgs/uploadPhotoIcon'

const EditTeamInfo = ({ route }) => {
  const command = route.params
  const [addresName, setAddressName] = useState('')
  const [name, setName] = useState(command?.name)
  const [photo, setPhoto] = useState(_storageUrl + command?.img)
  const navigation = useNavigation()
  const uploadPhoto = async () => {
    await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
      includeBase64: true,
    }).then((result) => {
      if (result?.assets?.[0]?.uri) {
        setPhoto(result.assets[0].uri)
      } else {
        setPhoto(null)
      }
    })
  }
  return (
    <ScreenMask>
      <View style={styles.row}>
        <ImageBackground
          source={{ uri: photo }}
          resizeMode="cover"
          style={styles.img}
          imageStyle={styles.img}
        >
          <Pressable style={styles.uploadBtn} onPress={uploadPhoto}>
            <UploadIcon />
          </Pressable>
        </ImageBackground>
        <TextInput style={styles.input} value={name} onChangeText={(e) => setName(e)} />
      </View>
      <View style={styles.colBox}>
        <Text style={styles.text}>Адрес нахождения команды:</Text>
        <SearchAddresses
          addressName={addresName}
          setAddressName={setAddressName}
          navigateTo="EditTeam"
          command={command}
          show={true}
        />
      </View>
      <View style={styles.bottomBox}>
        <LightButton
          label={'Сохранить'}
          size={{ width: RW(366), height: RH(50) }}
          // onPress={() => navigation.navigate('MyTeamInfo', command)}
          onPress={() => navigation.goBack()}
        />
      </View>
    </ScreenMask>
  )
}

export default EditTeamInfo

const styles = StyleSheet.create({
  img: {
    width: RW(120),
    height: RW(120),
    borderRadius: RW(60),
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadBtn: {
    zIndex: 93,
    height: '100%',
    width: '100%',
    borderRadius: RW(60),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  input: {
    backgroundColor: BACKGROUND,
    marginBottom: RH(49),
    borderRadius: RW(10),
    width: RW(246),
    height: RH(48),
    color: ICON,
    top: '4%',
    paddingLeft: RW(24),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: RH(40),
  },
  text: {
    marginVertical: RH(15),
    ...font('regular', 16, WHITE),
  },
  colBox: {
    width: '95%',
    alignSelf: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },

  bottomBox: {
    position: 'absolute',
    bottom: RW(30),
    alignSelf: 'center',
  },
})
