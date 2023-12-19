import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { _storageUrl } from '@/constants'
import FastImage from 'react-native-fast-image'
import Video from 'react-native-video'
import { RH, RW } from '@/theme/utils'
import CloseSvg from '@/assets/svgs/closeSvg'
import { deleteGalleryFile, setModalOptions } from '@/store/Slices/AppSlice'
import { useDispatch } from 'react-redux'

const GalleryItem = ({ item, isMe }) => {
  const dispatch = useDispatch()
  return (
    <Pressable
      onPress={() => {
        dispatch(
          setModalOptions({
            visible: true,
            type: 'GaleryOpenPhoto',
            body: {
              image_path: item.image_path,
              video_path: item.video_path,
            },
          }),
        )
      }}
    >
      {isMe ? (
        <Pressable
          onPress={() => dispatch(deleteGalleryFile({ file_id: item?._id }))}
          style={styles.deleteBtn}
        >
          <CloseSvg color="#000" />
        </Pressable>
      ) : null}

      {item.image_path ? (
        <FastImage
          resizeMode="contain"
          source={{ uri: _storageUrl + item.image_path }}
          style={styles.image}
        />
      ) : item.video_path ? (
        <Video
          // onVideoLoadStart={(e) => {
          //   console.log('onVideoLoadStart', e)
          // }}
          // onVideoLoad={(e) => {
          //   console.log('onVideoLoad', e)
          // }}
          style={styles.image}
          paused
          controls={false}
          source={{ uri: _storageUrl + item.video_path }}
        />
      ) : null}
    </Pressable>
  )
}

export default GalleryItem

const styles = StyleSheet.create({
  image: {
    margin: RW(6),
    height: RH(120),
    width: RW(180),
    backgroundColor: '#D9D9D9',
  },
  deleteBtn: {
    position: 'absolute',
    zIndex: 99,
    top: RW(10),
    right: RW(10),
    backgroundColor: 'transparent',
  },
})
