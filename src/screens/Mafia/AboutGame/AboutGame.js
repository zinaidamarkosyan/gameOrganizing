import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native'
import ScreenMask from '@/components/wrappers/screen'
import { font, RH, RW } from '@/theme/utils'
import { BLACK, LIGHT_LABEL, WHITE } from '@/theme/colors'
import LightButton from '@/components/buttons/Button'
import { useNavigation } from '@react-navigation/native'
import Modal from '@/components/modal'
import { useDispatch, useSelector } from 'react-redux'
import { _storageUrl } from '@/constants'
import {
  clearAllDatas,
  participateToGame,
  setLoader,
  startGame,
} from '../../../store/Slices/MafiaSlice'
import FastImage from 'react-native-fast-image'

const AboutGame = ({ route }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const { roles, mafiaRole, mafiaGameId } = useSelector(({ mafia }) => mafia)
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const propsGameId = route.params?.id
  let gameIsStarted = route.params?.gameIsStarted

  useEffect(() => {
    if (propsGameId) {
      dispatch(clearAllDatas())
      dispatch(participateToGame(propsGameId))
    }
  }, [propsGameId])
  useEffect(() => {
    if (mafiaRole && propsGameId) {
      setModalVisible(false)
    }
  }, [mafiaRole])

  return (
    <ScreenMask>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.aboutMe}>Словарь игроков</Text>

          {roles?.map((item, i) => (
            <ImageBackground
              key={i}
              source={require('@/assets/imgs/Grandient.png')}
              resizeMode="stretch"
              borderRadius={RW(15)}
              style={styles.rules}
            >
              <View
                style={{
                  width: '30%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: RW(15),
                }}
              >
                <FastImage
                resizeMode='contain'
                  style={{  width: '100%', height: 125 }}
                  source={{ uri: _storageUrl + item.img }}
                />
              </View>
              <View
                style={{
                  width: '60%',
                  justifyContent: 'center',
                  padding: 10,
                }}
              >
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.textDecretion}>{item.description}</Text>
              </View>
            </ImageBackground>
          ))}
          <View style={{ paddingVertical: 25, alignSelf: 'center' }}>
            <LightButton
              size={{ width: 281, height: 48 }}
              labelStyle={styles.countinue}
              label={!gameIsStarted ? 'Продолжить' : 'Вернутся'}
              // label={'Продолжить'}
              white={'white'}
              background={'#7DCE8A'}
              bgColor={'#4D7CFE'}
              onPress={() => {
                if (!gameIsStarted) {
                  navigation.navigate('WaitPlayers')
                  dispatch(startGame(mafiaGameId))
                  dispatch(setLoader(true))
                } else {
                  navigation.navigate('PlayMafia', { daysCount: route.params?.daysCount })
                }
              }}
            />
          </View>
        </ScrollView>
      </View>
      <Modal
        modalVisible={modalVisible}
        setIsVisible={setModalVisible}
        item={
          <View style={styles.backgroundModal}>
            <View style={styles.aboutGames}>
              <Text style={styles.aboutGamesText}>Об игре</Text>
              <Text style={styles.mafiaText}>
                Мафия захватывает город, и мирные жители больше не могут спокойно спать: им нужно
                вычислить кто есть кто и выгнать всю мафию, чтобы спастись. Если им не удастся это
                сделать, мафия захватит город, и мирные жители будут обречены.
              </Text>
              <Text style={{ ...styles.mafiaText, marginTop: RH(20) }}>
                Игра делится на два периода: утро и ночь. В утреннем обсуждении — участвуют все
                игроки, а ночью… у каждого персонажа своя роль. Весь игровой процесс используется
                при помощи мобильного устройства.
              </Text>
              <Text style={styles.luckyGames}>Удачной игры!</Text>
            </View>
          </View>
        }
      />
    </ScreenMask>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingHorizontal: RW(10),
  },
  aboutMe: {
    ...font('inter', 24, WHITE, 24),
    fontWeight: '700',
    letterSpacing: RW(0.01),
    alignSelf: 'center',
    paddingTop: RH(10),
  },
  rules: {
    flexDirection: 'row',
    marginVertical: 15,
  },
  text: {
    ...font('inter', 18, BLACK, 24),
    fontWeight: '700',
    letterSpacing: RW(0.01),
    marginVertical: RH(15),
  },
  textDecretion: {
    ...font('inter', 16, BLACK, 20),
    fontWeight: '400',
    letterSpacing: RW(0.01),
  },
  countinue: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...font('inter', '18', LIGHT_LABEL, 24),
    fontWeight: '700',
    letterSpacing: 0.01,
  },
  aboutGames: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  aboutGamesText: {
    ...font('bold', 24, WHITE, 24),
    letterSpacing: 0.01,
    paddingVertical: RH(38),
  },
  mafiaText: {
    textAlign: 'center',
    ...font('regular', 16, WHITE, 24),
    paddingHorizontal: RW(24),
  },
  gamesText: {
    alignItems: 'center',
    ...font('regular', 16, WHITE, 24),
    paddingHorizontal: RW(24),
    paddingVertical: RH(24),
  },
  luckyGames: {
    ...font('regular', 16, WHITE, 24),
    paddingHorizontal: RW(24),
    paddingVertical: RH(24),
  },
  backgroundModal: {
    backgroundColor: LIGHT_LABEL,
    borderRadius: RW(20),
    marginHorizontal: RW(10),
  },
})

export default AboutGame
