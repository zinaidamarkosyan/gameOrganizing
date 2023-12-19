import { RH, font } from '@/theme/utils'
import { useEffect, useRef } from 'react'
import { Pressable, StyleSheet, Animated, Dimensions, TouchableWithoutFeedback } from 'react-native'
import { ICON, WHITE } from '@/theme/colors'
import QrModal from './modals/QrModal'
import { useDispatch, useSelector } from 'react-redux'
import { setModalVisible } from '@/store/Slices/AppSlice'
import MessageModal from './modals/MessageModal'
import ErrorModal from './modals/ErrorModal'
import RatePlayerModal from './modals/RatePlayerModal'
import PhotoAfterFinishGameModal from './modals/PhotoAfterFinishGameModal'
import GaleryOpenPhoto from './modals/GaleryOpenPhoto'
import BestPlayer from './modals/BestPlayer'
import RateOrganizerModal from './modals/RateOrganizerModal'

const CustomModal = () => {
  const modalOptions = useSelector(({ app }) => app.modalOptions)
  const height = Dimensions.get('window').height
  const animatedValue = useRef(new Animated.Value(height)).current
  const dispatch = useDispatch()

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: modalOptions?.visible ? 0 : height,
      duration: 200,
      useNativeDriver: true,
    }).start()
  }, [modalOptions?.visible])

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (modalOptions?.type !== 'RateOrganizerModal') dispatch(setModalVisible(false))
      }}
    >
      <Animated.View
        style={{
          flex: 1,
          transform: [{ translateY: animatedValue }],
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 99999,
          backgroundColor: modalOptions?.type ? 'rgba(0,0,0,0.4)' : 'transparent',
          position: 'absolute',
        }}
      >
        <Pressable>
          {() => {
            switch (modalOptions?.type) {
              case 'QrModal':
                return <QrModal qrLink={modalOptions.body} />
              case 'message':
                return <MessageModal message={modalOptions.body} />
              case 'error':
                return <ErrorModal message={modalOptions.body} />
              case 'RatePlayerModal':
                return <RatePlayerModal body={modalOptions.body} />
              case 'RateOrganizerModal':
                return <RateOrganizerModal body={modalOptions.body} />
              case 'PhotoAfterFinishGameModal':
                return <PhotoAfterFinishGameModal body={modalOptions.body} />
              case 'GaleryOpenPhoto':
                return <GaleryOpenPhoto body={modalOptions.body} />
              case 'BestPlayer':
                return <BestPlayer body={modalOptions.body} />
              default:
                break
            }
          }}
        </Pressable>
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  instruction: {
    ...font('regular', 18, WHITE),
  },
  modalBox: {
    width: '95%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userModalBox: {
    height: '95%',
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  instructionTextBox: {
    height: '60%',
    width: '70%',
    justifyContent: 'space-around',
    alignSelf: 'center',
  },
  answersBox: {
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 999,
  },
  bottomBox: {
    width: '97%',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  commandName: {
    ...font('medium', 26, ICON),
  },
  countOfTrueAnswer: {
    ...font('regular', 24, WHITE),
    paddingVertical: RH(5),
  },
})
export default CustomModal
