import React, { useState } from 'react'
import { StyleSheet, Text, View, Animated, Pressable } from 'react-native'
import BgGamesLiner from '@/assets/imgs/BgGamesLiner'
import Border from '@/assets/imgs/Border'
import { useNavigation } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient'
import { RH, RW, font } from '@/theme/utils'
import { _storageUrl } from '@/constants'
import { BLACK, LIGHT_LABEL, WHITE } from '@/theme/colors'
import { useDispatch, useSelector } from 'react-redux'
import { setQrGame, setRules } from '@/store/Slices/MafiaSlice'
import Modal from '@/components/modal'
import LightButton from '@/components/buttons/Button'
import DarkButton from '@/components/buttons/DarkButton'
import { setBetweenPlayers, setChoosedTeamGame } from '@/store/Slices/TeamSlice'
import { setTournamentGameType, setTournamentImagePath } from '@/store/Slices/TournamentSlice'
import FastImage from 'react-native-fast-image'

function ListItem({ game, pressable, qrGame, fromTournament }) {
  const [modalVisible, setModalVisible] = useState(false)
  const [back, setBack] = useState(false)
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { savedTeam } = useSelector(({ teams }) => teams)

  return (
    <Animated.View>
      <Pressable
        onPressIn={() => setBack(true)}
        onPressOut={() => setBack(false)}
        onPress={() => {
          if (pressable) {
            if (qrGame) {
              dispatch(setRules(game.rules))
              dispatch(setQrGame(qrGame))
              if (game?.name == 'Своя игра') {
                navigation.navigate('OwnGameName', { game })
              } else {
                !savedTeam?.id && qrGame
                  ? navigation.navigate(
                      game?.name == 'Мафия'
                        ? 'MafiaNavigator'
                        : game?.name == 'Элиас'
                        ? 'AliasNavigator'
                        : game?.name == 'Крокодил'
                        ? 'CrocodileNavigator'
                        : null,
                    )
                  : navigation.navigate('CommandLeadCreate')
              }
            } else if (fromTournament) {
              dispatch(setTournamentGameType(game.name))
              dispatch(setTournamentImagePath(game.img))
              navigation.replace('TournamentNavigator', {
                screen: 'CreateTournament',
              })
            } else {
              savedTeam?.id
                ? setModalVisible(true)
                : game?.name == 'Своя игра'
                ? navigation.navigate('OwnGameName', { game })
                : navigation.navigate('GameCreating', { game })
            }
          }
        }}
        style={styles.bgFon}
      >
        {back ? (
          <LinearGradient
            colors={['#7DCE8A', '#4D7CFE']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            useAngle={true}
            angle={105}
            angleCenter={{ x: 0.5, y: 0.5 }}
            style={{
              width: RW(335),
              height: RH(707),
              zIndex: -1,
              position: 'absolute',
              opacity: 0.5,
            }}
          ></LinearGradient>
        ) : (
          <LinearGradient
            colors={['#7DCE8A', '#4D7CFE']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            useAngle={true}
            angle={105}
            angleCenter={{ x: 0.5, y: 0.5 }}
            style={{
              width: RW(335),
              height: RH(707),
              zIndex: -1,
              position: 'absolute',
              opacity: 0.1,
            }}
          ></LinearGradient>
        )}

        <View style={{ ...styles.border, ...styles.leftBorder }}>
          <Border />
        </View>
        <View style={{ ...styles.border, ...styles.rightBorder }}>
          <Border />
        </View>
        <View style={styles.bgGamesLiner}>
          <BgGamesLiner />
        </View>
        <View style={styles.title}>
          <FastImage
            resizeMode="contain"
            source={{ uri: _storageUrl + game?.img }}
            style={styles.image}
          />
        </View>
        <View style={styles.btn}>
          <LinearGradient
            colors={['#16A672', '#29CEEC', '#57E5FF', '#0649F5']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            useAngle={true}
            angle={105}
            angleCenter={{ x: 0.5, y: 0.5 }}
            style={{
              borderRadius: RW(5),
              alignItems: 'center',
              justifyContent: 'center',
              width: RW(191),
              height: RH(48),
              opacity: 0.9,
            }}
          >
            <Text style={styles.btnText}>{game?.name}</Text>
          </LinearGradient>
          {savedTeam && modalVisible && (
            <Modal
              modalVisible={modalVisible}
              setIsVisible={setModalVisible}
              item={
                <View style={styles.modal}>
                  <Text style={styles.successTeam}>
                    Вы хотите организовать игру между игроками команды?
                  </Text>
                  <View style={styles.rowBox}>
                    <LightButton
                      label={'Да'}
                      size={{ width: 100 }}
                      onPress={() => {
                        dispatch(setChoosedTeamGame(game))
                        navigation.navigate('CommandLeadCreate', game)
                        dispatch(setBetweenPlayers(true))
                        setModalVisible(false)
                      }}
                    />
                    <DarkButton
                      label={'Нет'}
                      size={{ width: 100 }}
                      onPress={() => {
                        dispatch(setChoosedTeamGame(game))
                        navigation.navigate('CommandLeadNotCreate', game)
                        dispatch(setBetweenPlayers(false))
                        setModalVisible(false)
                      }}
                    />
                  </View>
                </View>
              }
            />
          )}
        </View>
      </Pressable>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  bgFon: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: RW(335),
    height: RH(707),
    borderWidth: RW(2),
    borderRadius: RW(20),
    borderColor: WHITE,
    overflow: 'hidden',
    zIndex: -1,
    backgroundColor: 'rgba(217, 217, 217, 0.2)',
    paddingBottom: RH(80),
  },
  btnText: {
    ...font('bold', 20, BLACK),
  },
  border: {
    position: 'absolute',
    zIndex: 1,
  },
  leftBorder: {
    top: RH(13.5),
    left: RW(12.87),
  },
  rightBorder: {
    bottom: RH(13.5),
    right: RW(12.87),
    transform: [{ rotate: '180deg' }],
  },
  bgGamesLiner: {
    position: 'absolute',
  },
  title: {
    marginLeft: 'auto',
    marginRight: 'auto',
    zIndex: 1,
    marginTop: RH(190),
  },
  btn: {
    marginTop: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    zIndex: 10,
  },
  modal: {
    alignSelf: 'center',
    width: RW(280),
    backgroundColor: LIGHT_LABEL,
    borderRadius: RW(20),
    padding: RW(40),
    marginHorizontal: RW(30.5),
  },
  successTeam: {
    ...font('inter', 16, WHITE, 20),
    textAlign: 'center',
    width: '95%',
  },
  image: {
    width: RW(300),
    height: RH(300),
  },
  rowBox: {
    width: '110%',
    paddingTop: RH(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
})

export default ListItem
