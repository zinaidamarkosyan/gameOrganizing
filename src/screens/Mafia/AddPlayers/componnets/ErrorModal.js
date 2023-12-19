import { Text, View, Image, ImageBackground } from 'react-native'
import React from 'react'
import Modal from '@/components/modal'
import { font, RH, RW } from '@/theme/utils'
import { WHITE } from '@/theme/colors'
import { useDispatch, useSelector } from 'react-redux'
import { _storageUrl } from '@/constants'
import { SCREEN_BACKGROUND } from '@/theme/colors'
import ErrorSvg from '../assets/ErrorSvg'
import { setAddPlayersError } from '@/store/Slices/MafiaSlice'

const ErrorModal = ({ modalVisible, setModalVisible }) => {
  const dispatch = useDispatch()
  return (
    <View>
      <Modal
        modalVisible={modalVisible}
        setIsVisible={(e) => {
          dispatch(setAddPlayersError(null))
          setModalVisible(e)
        }}
        item={
          <View
            style={{
              backgroundColor: SCREEN_BACKGROUND,
              width: RW(300),
              height: RH(350),
              alignSelf: 'center',
              borderRadius: RW(20),
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ErrorSvg />
            <Text
              style={{
                ...font('regular', 16, '#fff', 25),
                textAlign: 'center',
                marginTop: RH(20),
              }}
            >
              Не возможно начать игру. Количество игроков не соответствуют минимальному числу
              игроков для начала игры
            </Text>
          </View>
        }
      />
    </View>
  )
}

export default ErrorModal
