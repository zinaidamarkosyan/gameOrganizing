import React, { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import Modal from 'react-native-modal'
import { useNavigation } from '@react-navigation/native'

function Index({
  item,
  modalClose,
  modalVisible,
  dontClose = false,
  navigationText,
  setIsVisible,
  navigationParam = null,
  onDismiss = () => {},
}) {
  const [isModalVisible, setModalVisible] = useState(true)
  const navigation = useNavigation()
  useMemo(() => {
    setModalVisible(modalVisible)
  }, [modalVisible])

  return (
    <View style={{ flex: 1, position: 'absolute' }}>
      <Modal
        onBackdropPress={() => {
          if (!dontClose) {
            if (modalClose) {
              setIsVisible(true)
              setModalVisible(true)
              navigationText ? navigation.navigate(navigationText, navigationParam) : null
            } else {
              setIsVisible(false)
              setModalVisible(false)
              navigationText ? navigation.navigate(navigationText, navigationParam) : null
            }
          }
        }}
        isVisible={!!isModalVisible}
        onDismiss={onDismiss}
      >
        {item}
      </Modal>
    </View>
  )
}

export default Index
