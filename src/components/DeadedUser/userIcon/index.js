import { Dimensions, Platform, StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import { font, RH, RW } from '@/theme/utils'
import { _storageUrl } from '@/constants'
import { useSelector } from 'react-redux'
import { LIGHT_LABEL, WHITE } from '@/theme/colors'
import UserLine from '../userLine'
import UserCircle from '../userCircle'
import Vk from './vk'
import Modal from '@/components/modal'
import { Grayscale } from 'react-native-color-matrix-image-filters'
import FastImage from 'react-native-fast-image'

function Index({ size, size2, onPressImg, userProps, pressedUser }) {
  let authedUser = useSelector(({ auth }) => auth.user)
  let user = pressedUser ? pressedUser : authedUser
  if (userProps) {
    user = userProps
  }
  if (user?.user) {
    user = user.user
  }
  const { name, surname, avatar } = user || {}
  const fontSizeTitle = size > 150 ? size / RW(33) : size / RW(50)
  const fontSizeCount = size > 150 ? size / RW(22) : size / RW(30)
  const [modalVisible, setModalVisible] = useState(false)

  const screenWidth = Dimensions.get('screen').width

  const sizing = {
    padding: size > 40 ? RH(5) : RH(0),
    marginTop: size > 150 ? RH(4) : RH(-1),
    width: size < 40 ? size / RW(3) : size / RW(4.3),
  }

  return (
    <View
      style={{
        overflow: Platform.OS == 'ios' ? 'visible' : 'hidden',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          flex: 1,
          width: size / 2.8,
          height: size / 2.8,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          top: size2 == 150 ? 13 : 8,
        }}
      >
        <Grayscale style={{ flex: 1 }}>
          <FastImage
            style={[
              {
                ...styles.image,
                borderRadius: size / RW(3),
                top: size > 150 ? '0%' : size < 40 ? '-45%' : '-20%',
                left: RW(0.1),
              },
            ]}
            resizeMode="cover"
            source={
              !avatar
                ? require('../../../assets/defualtUser.png')
                : avatar.startsWith('https://')
                ? { uri: avatar }
                : {
                    uri: _storageUrl + avatar, //userNow.avatar
                  }
            }
          />
        </Grayscale>
      </View>
      <View style={[styles.nameBlock, { marginTop: size < 40 ? RH(4) : RH(10) }]}>
        <Text style={font('bold', size > 150 ? size / RW(20) : size / RW(25), WHITE)}>
          {name ? name : 'Имя'}
        </Text>
        <Text style={font('bold', size > 150 ? size / RW(20) : size / RW(25), WHITE)}>
          {surname ? surname : 'Фамилия'}
        </Text>
      </View>
      <View
        style={{
          ...styles.statusBlock,
          width: screenWidth >= 420 ? size / RW(1.6) : size / RW(1.75),
          overflow: 'visible',
          marginTop: size > 150 ? size / RH(70) : size / RH(80),
        }}
      >
        <UserCircle
          size={size > 150 ? size + RW(25) : size - RW(25)}
          count={user?.create_games?.length}
          status={user?.status}
        />
        <UserLine size={screenWidth >= 420 ? size / 1.05 : size} status={user?.status} />
        <UserCircle
          size={size > 150 ? size + RW(25) : size - RW(25)}
          count={user?.took_part_games?.length}
          status={user?.status}
        />
      </View>
      <View
        style={{
          ...styles.titleBigBloc,
          height: size < 40 ? size / RH(2.9) : size / RW(8.4),
          marginTop: size > 150 ? size / RH(55) : size / RH(90),
          width: size < 40 ? size / RW(1.5) : size / RW(2.1),
          justifyContent: 'space-evenly',
        }}
      >
        <View style={[styles.titleBloc, sizing]}>
          <Text style={{ ...font('openSans_medium', fontSizeTitle, WHITE), textAlign: 'center' }}>
            Создано игр
          </Text>
          <Text style={font('exo_bold', fontSizeCount, WHITE)}>{user?.create_games?.length}</Text>
        </View>
        <View style={[styles.titleBloc, sizing]}>
          <Text style={{ ...font('openSans_medium', fontSizeTitle, WHITE), textAlign: 'center' }}>
            Принято игр
          </Text>
          <Text style={font('exo_bold', fontSizeCount, WHITE)}>
            {user?.took_part_games?.length}
          </Text>
        </View>
        <View style={[styles.titleBloc, sizing]}>
          <Text style={{ ...font('openSans_medium', fontSizeTitle, WHITE), textAlign: 'center' }}>
            Отменено игр
          </Text>
          <Text style={{ ...font('exo_bold', fontSizeCount, WHITE) }}>
            {user?.destroy_the_game}
          </Text>
        </View>
        <View style={[styles.titleBloc, sizing]}>
          <Text style={{ ...font('openSans_medium', fontSizeTitle, WHITE), textAlign: 'center' }}>
            Отклонено игр
          </Text>
          <Text style={font('exo_bold', fontSizeCount, WHITE)}>{user?.exit_the_game}</Text>
        </View>
      </View>
      {/* need detect user have a vk account and show it overwise show some text */}
      <Modal
        item={
          <View style={styles.modal}>
            <Text style={styles.successTeam}>Аккаунт игрока не привязан к VK</Text>
          </View>
        }
        modalVisible={modalVisible}
        setIsVisible={setModalVisible}
        // navigationText={'Home'}
      />
      <View
        style={{ ...styles.soc, marginTop: screenWidth > 380 ? size / RH(7.5) : size / RH(10) }}
      >
        <Vk size={size / RH(12)} />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  titleBigBloc: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  titleBloc: {
    alignItems: 'center',
    padding: RH(5),
    marginTop: RH(4),

    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    ...font('bold', RW(10), WHITE),
  },
  titleCount: { ...font('bold', RW(16), WHITE) },
  statusBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  bg: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    left: -0.7,
  },
  modal: {
    width: RW(306),
    backgroundColor: LIGHT_LABEL,
    borderRadius: RW(20),
    padding: RW(20),
    marginHorizontal: RW(30.5),
  },
  successTeam: {
    ...font('inter', 16, WHITE, 20),
    textAlign: 'center',
  },
  nameBlock: {
    alignItems: 'center',
    marginTop: RH(16),
  },
  soc: {
    backgroundColor: 'rgba(52, 52, 52, 0)',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Index
