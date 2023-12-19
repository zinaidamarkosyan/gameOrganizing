import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RH, RW, font } from '@/theme/utils'
import { LIGHT_LABEL, WHITE } from '@/theme/colors'
import FastImage from 'react-native-fast-image'
import Row from '@/components/wrappers/row'
import { useDispatch } from 'react-redux'
import { confirmPhotoAfterFinishGame } from '@/store/Slices/GamesSlice'
import Video from 'react-native-video'
import { _storageUrl } from '@/constants'
import { setModalVisible } from '@/store/Slices/AppSlice'

const PhotoAfterFinishGameModal = ({ body }) => {
  const dispatch = useDispatch()
  const { _id, video_path, image_path } = body
  return (
    <View style={styles.modal}>
      {console.log(_storageUrl + image_path)}
      <Text style={styles.text}>Подтвердите, что вы изображены на фото/видео!</Text>
      {image_path ? (
        <FastImage
          resizeMode="contain"
          source={{ uri: _storageUrl + image_path }}
          style={styles.image}
        />
      ) : video_path ? (
        <Video
          onVideoLoadStart={(e) => {
            console.log('onVideoLoadStart', e)
          }}
          onVideoLoad={(e) => {
            console.log('onVideoLoad', e)
          }}
          style={styles.image}
          paused
          controls
          source={{ uri: _storageUrl + video_path }}
        />
      ) : null}

      <Row wrapper={styles.row}>
        <Pressable
          onPress={() => {
            dispatch(setModalVisible(false))
          }}
        >
          <FastImage style={styles.btnImage} source={require('./assets/cancel.png')} />
        </Pressable>
        <Pressable
          onPress={() => {
            dispatch(setModalVisible(false))
            dispatch(confirmPhotoAfterFinishGame({ file_id: _id }))
          }}
        >
          <FastImage style={styles.btnImage} source={require('./assets/done.png')} />
        </Pressable>
      </Row>
    </View>
  )
}

export default PhotoAfterFinishGameModal

const styles = StyleSheet.create({
  modal: {
    width: RW(306),
    backgroundColor: LIGHT_LABEL,
    borderRadius: RW(20),
    padding: RW(20),
    marginHorizontal: RW(30.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...font('inter', 16, WHITE, 20),
    textAlign: 'center',
    marginTop: RH(20),
  },
  image: {
    margin: RW(6),
    marginBottom: RH(12),
    height: RH(200),
    width: '100%',
  },
  row: {
    width: '100%',

    justifyContent: 'space-around',
  },
  btnImage: {
    width: RW(55),
    height: RW(55),
    resizeMode: 'contain',
  },
})
