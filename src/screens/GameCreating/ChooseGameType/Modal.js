import { Pressable, Text, View, Modal } from 'react-native'
import React from 'react'
import { RH, RW } from '@/theme/utils'
import { LIGHT_LABEL } from '@/theme/colors'
import LightButton from '@/components/buttons/Button'
import DarkButton from '@/components/buttons/DarkButton'
import Row from '@/components/wrappers/row'
import { font } from '@/theme/utils'
import CloseSvg from '../../../assets/svgs/closeSvg'

const ChooseGameTypeModal = ({ modalVisible, setModalVisible, onPressYes, onPressNo }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onBackdropPress={() => {
        setModalVisible(false)
      }}
    >
      <View
        style={{
          position: 'absolute',
          zIndex: 999,
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <View
          style={{
            backgroundColor: LIGHT_LABEL,
            paddingVertical: RH(22),
            paddingHorizontal: RW(44),
            borderRadius: RW(20),
            maxWidth: RW(306),
          }}
        >
          <Row wrapper={{ justifyContent: 'flex-end', marginBottom: RH(5), right: -20 }}>
            <Pressable onPress={() => setModalVisible(false)}>
              <CloseSvg width={24} height={24} />
            </Pressable>
          </Row>

          <Text style={{ ...font('regular', 16, '#fff', 25), textAlign: 'center' }}>
            Если Вы хотите сыграть прямо сейчас и у Вас уже собраны игроки для игры, но нет игровых
            атрибутов (карточек), то используйте игровой алгоритм через свой гаджет. Играть с
            помощью гаджета ?
          </Text>
          <Row wrapper={{ justifyContent: 'space-between', marginTop: RH(30) }}>
            <LightButton
              label="Да"
              size={{ width: 100 }}
              onPress={() => {
                setModalVisible(false)
                onPressYes()
              }}
            />
            <DarkButton
              label="Нет"
              size={{ width: 100 }}
              onPress={() => {
                setModalVisible(false)
                onPressNo()
              }}
            />
          </Row>
        </View>
      </View>
    </Modal>
  )
}

export default ChooseGameTypeModal
