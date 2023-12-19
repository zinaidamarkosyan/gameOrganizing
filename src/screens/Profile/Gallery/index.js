import React, { useEffect } from 'react'
import ScreenMask from '@/components/wrappers/screen'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { RH, RW, font } from '@/theme/utils'
import { useDispatch, useSelector } from 'react-redux'
import { getGalleries, getOtherUserGalleries } from '@/store/Slices/AppSlice'
import { LIGHT_LABEL, WHITE } from '@/theme/colors'
import { _storageUrl } from '@/constants'
import GalleryItem from './GalleryItem'

function Index({ route }) {
  const { userGalleries, otherUserGalleries } = useSelector(({ app }) => app)
  const dispatch = useDispatch()
  const isMe = route.params?.isMe
  useEffect(() => {
    dispatch(getGalleries())
  }, [])
  useEffect(() => {
    if (!isMe && route.params?.userId) dispatch(getOtherUserGalleries(route.params?.userId))
  }, [isMe])

  return (
    <ScreenMask>
      <View style={{ ...styles.container, marginTop: RH(16) }}>
        <Text style={styles.title}>Моя галерея</Text>
        {(isMe && userGalleries.length) || otherUserGalleries.length ? (
          <FlatList
            data={isMe ? userGalleries : otherUserGalleries}
            style={styles.flatList}
            contentContainerStyle={styles.flatListContent}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({ index, item }) => <GalleryItem item={item} isMe={isMe} />}
          />
        ) : (
          <View style={styles.galleryTextBlock}>
            <Text style={styles.GalleryTitle}>Галерея пуста.</Text>
            <Text style={styles.galleryText}>
              Фото/Видео добавляются после вашего подтверждения по окончанию проведенной игры.
            </Text>
          </View>
        )}
      </View>
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
  galleryText: {
    ...font('regular', 18, WHITE, 25),
    textAlign: 'center',
    marginTop: RH(40),
  },
  GalleryTitle: {
    ...font('regular', 24, WHITE, 26),
  },
  galleryTextBlock: {
    marginTop: RH(208),
    paddingTop: RH(23),
    paddingBottom: RH(40),
    borderRadius: RW(20),
    backgroundColor: LIGHT_LABEL,
    width: RW(325),
    alignItems: 'center',
    justifyContent: 'center',
  },
})
export default Index
