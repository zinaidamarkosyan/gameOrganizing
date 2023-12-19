import ScreenMask from '@/components/wrappers/screen'
import React, { useRef, useState } from 'react'
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native'
import { RH, RW, font } from '@/theme/utils'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { _storageUrl } from '@/constants'
import Wave from '@/assets/svgs/wave'
import LinearGradient from 'react-native-linear-gradient'
import LightButton from '@/components/buttons/Button'
import FastImage from 'react-native-fast-image'
import { ICON, LIGHT_LABEL, RADIO_TEXT, WHITE } from '@/theme/colors'
import dateFormater from '@/helpers/dateFormater'

function GamesList() {
  const navigation = useNavigation()
  const { findedGames } = useSelector(({ teams }) => teams)
  const [forUpdate, setForUpdate] = useState(false)
  const ref = useRef(null)
  const scrollToTop = () =>
    ref.current?.scrollTo({
      y: 10,
      animated: true,
    })
  const passIdGameItem = (id) => {
    findedGames.map((elem) => {
      if (elem?._id === id) {
        navigation.navigate('GameItem', { item: { ...elem, clicked: true } })
      } else {
        return null
      }
    })
  }

  const EatchItem = ({ elm }) => {
    const [back, setBack] = useState(false)
    return (
      <Pressable
        style={styles.gameItemContainer}
        onPressIn={() => setBack(true)}
        onPressOut={() => setBack(false)}
        onPress={() => passIdGameItem(elm._id)}
      >
        {!back ? (
          <LinearGradient
            colors={['#7DCE8A', '#4D7CFE']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 0 }}
            useAngle={true}
            angle={105}
            angleCenter={{ x: 0.5, y: 0.5 }}
            style={{
              width: '100%',
              height: '100%',
              zIndex: -1,
              alignSelf: 'center',
              opacity: 0.6,
              position: 'absolute',
              borderRadius: RW(10),
            }}
          ></LinearGradient>
        ) : (
          <LinearGradient
            colors={['#7DCE8A', '#4D7CFE']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 0 }}
            useAngle={true}
            angle={105}
            angleCenter={{ x: 0.5, y: 0.5 }}
            style={{
              width: '100%',
              height: '100%',
              zIndex: -1,
              alignSelf: 'center',
              position: 'absolute',
              opacity: 0.8,
              borderRadius: RW(10),
            }}
          ></LinearGradient>
        )}
        <View style={styles.image}>
          <FastImage
            style={{
              width: RW(50),
              height: RH(50),

              borderRadius: RW(30),
            }}
            resizeMode="contain"
            source={{ uri: _storageUrl + elm.game?.img }}
          />
        </View>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            height: '93%',
            paddingVertical: RH(5),
            width: '57%',
            marginHorizontal: RW(20),
            justifyContent: 'space-evenly',
          }}
        >
          <Text style={styles.midText}>
            {dateFormater(elm?.createdAt)}, {elm?.address_name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View style={styles.horizontalLine}></View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '28%',
              }}
            >
              <Wave />
              <Text style={styles.midText}>{elm.distance} км</Text>
            </View>
          </View>
        </View>
        <View style={styles.line}></View>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            height: '80%',
            justifyContent: 'space-evenly',
          }}
        >
          <View>
            <Text style={styles.playersText}>Игроки</Text>
            <Text style={styles.playersText}>
              {elm.number_of_players_from}-{elm.number_of_players_to}
            </Text>
          </View>
          <View style={styles.countCircle}>
            <Text style={styles.countOfPlayersText}>{elm.players.length}</Text>
          </View>
        </View>
      </Pressable>
    )
  }

  return (
    <ScreenMask>
      <View
        style={{
          flex: 1,
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
        }}
      >
        <FastImage
          resizeMode="contain"
          style={{ width: RW(360), position: 'absolute', height: RW(360) }}
          source={require('@/assets/bgLogo.png')}
        />
        <View
          style={{
            width: RW(360),
            height: RW(360),
            borderRadius: RW(180),
            position: 'absolute',
            backgroundColor: 'rgba(0,0,0,0.7)',
          }}
        />
      </View>
      <ScrollView
        style={{ flex: 1, paddingTop: RH(15) }}
        contentContainerStyle={{ paddingBottom: RH(80) }}
        showsVerticalScrollIndicator={false}
        ref={ref}
      >
        {!findedGames.length ? <Text style={styles.topLoading}>Загрузка...</Text> : null}

        {findedGames?.map((elm, i) => {
          return <EatchItem elm={elm} key={i} />
        })}
      </ScrollView>
      {findedGames.length ? (
        <View style={{ alignSelf: 'center', position: 'absolute', bottom: RH(40) }}>
          <LightButton
            label={'Обновить'}
            size={{ width: 375, height: 48 }}
            onPress={() => {
              setForUpdate(!forUpdate), scrollToTop()
            }}
          />
        </View>
      ) : null}
    </ScreenMask>
  )
}
const styles = StyleSheet.create({
  gameItemContainer: {
    width: RW(395),
    minHeight: RH(99),
    maxHeight: RH(116),
    borderRadius: RW(8),
    alignSelf: 'center',
    marginVertical: RW(6),
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  midText: {
    ...font('medium', 17, WHITE),
    width: RW(240),
    flexWrap: 'wrap',
    textAlign: 'left',
  },
  playersText: {
    textAlign: 'center',
    ...font('regular', 10, WHITE),
  },
  topLoading: {
    textAlign: 'center',
    ...font('regular', 19, WHITE),
    paddingVertical: RH(12),
  },
  countCircle: {
    backgroundColor: ICON,
    width: RW(28),
    height: RH(28),
    borderRadius: RW(19),
    alignItems: 'center',
    justifyContent: 'center',
  },
  countOfPlayersText: {
    ...font('bold', 14, WHITE),
  },
  horizontalLine: {
    width: '59%',
    marginTop: RH(10),
    alignSelf: 'flex-start',
    borderWidth: RW(1),
    borderColor: RADIO_TEXT,
  },
  gameTitle: {
    ...font('bold', 20, LIGHT_LABEL, 20),
    color: WHITE,
    marginTop: RH(25),
    marginBottom: RH(25),
    textAlign: 'center',
  },

  line: {
    borderWidth: RW(1),
    height: RW(45),
    borderColor: RADIO_TEXT,
    marginHorizontal: '2%',
  },
})

export default GamesList
