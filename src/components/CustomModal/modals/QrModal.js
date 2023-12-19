import { Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import { RH, RW } from '@/theme/utils'
import { LIGHT_LABEL } from '@/theme/colors'
import FastImage from 'react-native-fast-image'
import { _storageUrl } from '@/constants'
import CloseSvg from '@/assets/svgs/closeSvg'
import { setModalVisible } from '@/store/Slices/AppSlice'
import { useDispatch } from 'react-redux'

const QrModal = ({qrLink}) => {
  const dispatch = useDispatch()
  return (
    <View style={styles.modal}>
      <Pressable onPress={() => dispatch(setModalVisible(false))} style={styles.modalHeader}>
        <CloseSvg width={24} height={24} />
      </Pressable>
  
      <FastImage style={styles.qrImg} source={{uri: _storageUrl + qrLink}} resizeMode='contain'/>
    </View>
  )
}

export default QrModal

const styles = StyleSheet.create({
  modal: {
    padding: RW(20),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: LIGHT_LABEL,
    borderRadius: RW(20),
    marginHorizontal: RW(30.5),
  },
  modalHeader: {
    width: "100%",
    paddingBottom: RW(20),
    alignItems: "flex-end",
  },
  qrImg: {
    height:RW(320),
    width: RW(320)
  }
})