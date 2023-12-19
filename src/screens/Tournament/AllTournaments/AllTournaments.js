import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { _storageUrl } from '@/constants'
import { RH, RW, font } from '@/theme/utils'
import PrizeCup from '@/assets/svgs/prizeCup'
import ScreenMask from '@/components/wrappers/screen'
import LinearGradient from 'react-native-linear-gradient'
import { FONT_INTER_BOLD, FONT_INTER_MEDIUM } from '@/theme/fonts'
import { ICON, LIGHT_LABEL, RADIO_TEXT, WHITE } from '@/theme/colors'
import Wave from '@/assets/svgs/wave'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

const AllTournaments = () => {
  const navigation = useNavigation()
  const { findedTourney } = useSelector(({ tournament }) => tournament)

  const handleClick = (elm) => {
    navigation.navigate('EachTournament', elm)
  }
  const EatchItem = ({ elm }) => {
    const [back, setBack] = useState(false)
    return (
      <Pressable
        style={styles.gameItemContainer}
        onPressIn={() => setBack(true)}
        onPressOut={() => setBack(false)}
        onPress={() => handleClick(elm)}
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
              opacity: 0.3,
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
              opacity: 0.5,
              borderRadius: RW(10),
            }}
          ></LinearGradient>
        )}
        <View style={styles.prizeBox}>
          <PrizeCup width={'100%'} height={'100%'} />
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
            07.07.22 , 18:30, Пресненская наб. 25
            {/* {new Date(elm?.updatedAt).toLocaleDateString()},{' '} */}
            {/* {new Date(elm?.updatedAt).toLocaleTimeString().slice(0, 5)}, {elm?.address_name} */}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              // alignSelf: 'center',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                width: '100%',
                alignSelf: 'flex-end',
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '25%',
                }}
              >
                <Wave />
                <Text style={styles.distantion}>1.6 км</Text>
              </View>
            </View>
          </View>
          {/* <Text style={styles.priceText}>{`Сумма участия- ${elm.ticket_price}.`}</Text> */}
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
              10-23
              {/* {elm.number_of_players_from}-{elm.number_of_players_to} */}
            </Text>
          </View>
          <View style={styles.countCircle}>
            <Text style={styles.countOfPlayersText}>3{/* {elm.players.length} */}</Text>
          </View>
        </View>
      </Pressable>
    )
  }

  return (
    <ScreenMask>
      <ScrollView>
        {findedTourney.map((elm, i) => {
          return <EatchItem key={i} />
        })}
      </ScrollView>
    </ScreenMask>
  )
}

export default AllTournaments

const styles = StyleSheet.create({
  gameItemContainer: {
    width: RW(395),
    minHeight: RH(85),
    maxHeight: RH(90),
    // backgroundColor: 'rgba(101, 122, 197, 0.6)',
    borderRadius: RW(8),
    alignSelf: 'center',
    marginVertical: RW(6),
    flexDirection: 'row',
    alignItems: 'center',
    // position: 'relative',
    alignContent: 'center',
    justifyContent: 'center',
  },
  midText: {
    ...font('medium', 17, WHITE),
    top: '10%',
    width: RW(260),
    flexWrap: 'wrap',
    textAlign: 'left',
  },
  distantion: {
    ...font('medium', 17, WHITE),
    alignSelf: 'flex-start',
    // width: RW(260),
    flexWrap: 'wrap',

    textAlign: 'right',
  },
  priceText: {
    ...font('medium', 12, WHITE),
    width: RW(230),
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
  gameListContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },

  gameItemTop: {
    flexDirection: 'row',
  },
  gameTitle: {
    ...font('bold', 20, LIGHT_LABEL, 20),
    color: WHITE,
    marginTop: RH(25),
    marginBottom: RH(25),
    textAlign: 'center',
  },
  gameMiddleContainer: {
    marginLeft: RW(25),
    marginRight: RW(15),
    marginTop: RH(10),
  },
  distanceBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameItemTopText: {
    ...font('bold', 18, WHITE, 20),
  },
  gameItemPriceText: {
    ...font('bold', 12, WHITE, 20),
    marginTop: RH(7),
  },
  gameItemBottomText: {
    ...font('bold', 18, WHITE, 20),
    marginTop: RH(5),
  },
  gameItemBottom: {
    flexDirection: 'row',
    marginRight: RW(3),
  },
  line: {
    borderWidth: RW(1),
    height: RW(45),
    borderColor: RADIO_TEXT,
    marginHorizontal: '2%',
  },

  gameItemCircle: {
    backgroundColor: '#596aaa',
    alignItems: 'center',
    justifyContent: 'center',
    width: RW(30),
    height: RH(30),
    borderRadius: RH(15),
  },
  circleText: {
    color: WHITE,
    fontSize: RH(14),
    fontFamily: FONT_INTER_MEDIUM,
  },
  playersIn: {
    color: WHITE,
    fontSize: RH(14),
    fontFamily: FONT_INTER_MEDIUM,
  },
  bigIcon: {
    width: '100%',
    alignItems: 'center',
    marginTop: RH(42),
    marginBottom: RH(33),
  },
  eachInfo: {
    ...font('regular', 14, WHITE, 20),
    marginLeft: RW(11),
    marginBottom: RH(6),
  },
  eachInfoTwo: {
    ...font('bold', 16, ICON, 20),
    marginLeft: RW(11),
    marginBottom: RH(24),
  },
  eachInfoRegular: {
    fontFamily: FONT_INTER_BOLD,
    fontSize: RH(14),
    color: WHITE,
    paddingVertical: RH(10),
  },
  itemWrapper: {
    height: '85%',
    flexDirection: 'column',
  },
  priceTextBlock: {
    width: '100%',
    marginLeft: RW(130),
  },
  prizeBox: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '12%',
    height: '70%',
  },
})
