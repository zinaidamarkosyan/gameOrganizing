import { Text, View, ImageBackground } from 'react-native'
import React from 'react'
import Modal from '@/components/modal'
import { font, RH, RW } from '@/theme/utils'
import { WHITE } from '@/theme/colors'
import { useSelector } from 'react-redux'
import { _storageUrl } from '@/constants'
import FastImage from 'react-native-fast-image'

const MafiaModal = ({ modalVisible, setModalVisible }) => {
  const { mafiaRole, roles } = useSelector(({ mafia }) => mafia)
  const description = roles?.find((item) => item?.name == mafiaRole?.name)?.description
  return (
    <View>
      <Modal
        modalVisible={modalVisible}
        setIsVisible={setModalVisible}
        item={
          <>
            <Text
              style={{
                position: 'absolute',
                color: '#fff',
                top: RH(100),
                alignSelf: 'center',
                ...font('bold', 24, WHITE, 47),
                textAlign: 'center',
              }}
            >
              Игра началась!{'\n'}Вашa роль в игре
            </Text>
            <ImageBackground
              source={require('../assets/modalBg.png')}
              resizeMode={'contain'}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: RW(40),
                paddingHorizontal: RH(100),
                // height: RH(420),
              }}
            >
              <FastImage
              resizeMode='contain'
                source={{ uri: _storageUrl + mafiaRole?.img }}
                style={{ height: RH(150), width: RH(120) }}
              />
              <Text
                style={{
                  textAlign: 'center',
                  ...font('bold', 25, '#000'),
                  marginTop: RH(10),
                  maxWidth: '90%',
                  // marginHorizontal: RW(100),
                }}
              >
                {mafiaRole?.name}
              </Text>
              {/* <Text
                style={{
                  textAlign: 'center',
                  ...font('bold', 16, '#000'),
                  marginTop: RH(10),
                  paddingHorizontal: RW(50),
                }}
              >
                {description}
              </Text> */}
            </ImageBackground>
          </>
        }
      />
    </View>
  )
}

export default MafiaModal
