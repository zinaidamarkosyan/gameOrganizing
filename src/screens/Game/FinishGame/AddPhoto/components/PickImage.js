import { Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AddSvg from '@/assets/svgs/addSvg'
import { RH, RW, font } from '@/theme/utils'
import { BACKGROUND } from '@/theme/colors'
import { SheetManager } from 'react-native-actions-sheet'
import FastImage from 'react-native-fast-image'
import Video from 'react-native-video'
import { useDispatch } from 'react-redux'
import { setGameFinishPhoto } from '@/store/Slices/GamesSlice'
import { BlurView } from '@react-native-community/blur'
import CircleAdd from '@/components/buttons/circleAdd'
import CircleMain from '@/components/buttons/Circle/CircleMain'

const PickImage = ({ gameFinishPhoto }) => {
  const dispatch = useDispatch()
  const CustomBlurView = Platform.OS == 'ios' ? BlurView : View
  return (
    <Pressable
      onPress={() => {
        if (!gameFinishPhoto) {
          SheetManager.show('selectMedia')
        }
      }}
    >
      <CustomBlurView
        style={[
          styles.container,
          {
            justifyContent: gameFinishPhoto ? 'flex-end' : 'center',
            backgroundColor: Platform.OS == 'ios' ? 'transparent' : '#001034',
          },
        ]}
        blurType="light"
        blurAmount={3}
        reducedTransparencyFallbackColor="white"
      >
        {gameFinishPhoto ? (
          <Pressable style={styles.deleteBtn} onPress={() => dispatch(setGameFinishPhoto(null))}>
            <FastImage
              style={styles.deleteBtnImg}
              resizeMode="contain"
              source={require('@/assets/imgs/CloseBtn.png')}
            />
          </Pressable>
        ) : null}

        {gameFinishPhoto?.type?.includes('video') ? (
          <Video style={styles.image} paused controls source={{ uri: gameFinishPhoto.uri }} />
        ) : gameFinishPhoto ? (
          <FastImage style={styles.image} source={{ uri: gameFinishPhoto.uri }} />
        ) : (
          <>
            <CircleMain
              size={50}
              label={
                <AddSvg
                  plusColor={Platform.OS !== 'ios' ? '#657AC5' : BACKGROUND}
                  strokeWidth={3}
                />
              }
            />
            <Text style={[styles.text, { color: Platform.OS !== 'ios' ? '#657AC5' : BACKGROUND }]}>
              Добавить фото/видео
            </Text>
          </>
        )}
      </CustomBlurView>
    </Pressable>
  )
}

export default PickImage

const styles = StyleSheet.create({
  container: {
    width: RW(370),
    minHeight: RH(280),
    alignItems: 'center',
  },
  text: {
    ...font('regular', 20, '#657AC5', 22),
    marginTop: RH(20),
  },
  image: {
    width: RW(350),
    height: RH(230),
    marginBottom: RW(10),
  },
  deleteBtn: {
    zIndex: 99,
    marginRight: RW(10),
    marginVertical: RW(5),
    alignSelf: 'flex-end',
    backgroundColor: 'transparent',
  },
  deleteBtnImg: {
    width: RW(30),
    height: RW(30),
  },
})
