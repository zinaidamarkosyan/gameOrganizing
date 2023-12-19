import { Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import { RH, RW } from '@/theme/utils'
import { LIGHT_LABEL } from '@/theme/colors'
import FastImage from 'react-native-fast-image'
import Video from 'react-native-video'
import { _storageUrl } from '@/constants'
import CloseSvg from '@/assets/svgs/closeSvg'
import { useDispatch } from 'react-redux'
import { setModalVisible } from '@/store/Slices/AppSlice'

const GaleryOpenPhoto = ({ body }) => {
  const { video_path, image_path } = body
  const dispatch = useDispatch()
  return (
    <View style={styles.modal}>
      <Pressable onPress={() => dispatch(setModalVisible(false))} style={styles.deleteBtn}>
        <CloseSvg color="#fff" />
      </Pressable>
      {image_path ? (
        <FastImage
          resizeMode="contain"
          source={{ uri: _storageUrl + image_path }}
          style={styles.image}
        />
      ) : video_path ? (
        <Video
          style={styles.image}
          resizeMode="contain"
          paused
          controls
          source={{ uri: _storageUrl + video_path }}
        />
      ) : null}
    </View>
  )
}

export default GaleryOpenPhoto

const styles = StyleSheet.create({
  modal: {
    width: RW(370),
    backgroundColor: LIGHT_LABEL,
    borderRadius: RW(20),
    padding: RW(20),
    paddingTop: RW(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: RW(220),
    width: '100%',
  },
  deleteBtn: {
    alignSelf: 'flex-end',
    marginBottom: RH(15),
  },
})
