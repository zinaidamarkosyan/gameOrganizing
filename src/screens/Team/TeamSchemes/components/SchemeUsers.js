import { RW } from '@/theme/utils'
import React, { useEffect, useRef, useState } from 'react'
import {
  View,
  PanResponder,
  Pressable,
  StyleSheet,
  Animated,
  NativeModules,
  Platform,
} from 'react-native'
import User from '@/components/User/user'
import ArrowSvg from './assets/ArrowSvg'
import { BACKGROUND } from '@/theme/colors'
import Row from '@/components/wrappers/row'
const StatusBarHeight = Platform.OS == 'ios' ? NativeModules.StatusBarManager?.HEIGHT : 0

const SchemeUsers = ({
  replacementPlayers,
  setReplacementPlayers,
  fieldSize,
  initialCordinates,
  players
}) => {
  const [screenX, setScreenX] = useState(0)
  const componentWidth = useRef(0)
  const refsArray = useRef([])

  const animatedScrollX = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const val = -screenX
    Animated.timing(animatedScrollX, {
      toValue: val,
      duration: 600,
      useNativeDriver: true,
    }).start()
  }, [screenX])
  const panResponders = replacementPlayers?.map((item, index) => {
    return PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: (event, gesture) => {
        const { dx, dy } = gesture

        setReplacementPlayers((prevplayingPlayers) => {
          const updatedplayingPlayers = [...prevplayingPlayers]
          updatedplayingPlayers[index] = {
            ...updatedplayingPlayers[index],
            small: false,
            inGame: true,
            x:
              prevplayingPlayers[index].x +
              dx +
              (updatedplayingPlayers[index].x == 0 ? gesture.moveX - RW(90) : 0),
            y: prevplayingPlayers[index].y + dy,
            moveX: gesture.moveX,
            moveY: gesture.moveY,
          }
  
          return updatedplayingPlayers
        })
      },

      onPanResponderEnd: (event, gesture) => {
        refsArray.current[index].measure((x, y, width, height, px, py) => {
          if (
            px - initialCordinates.x >= 0 &&
            px - initialCordinates.x <= fieldSize?.width - RW(38) &&
            py - initialCordinates.y1 - initialCordinates.y2 - StatusBarHeight + RW(21.05) >= 0 &&
            py - initialCordinates.y1 - initialCordinates.y2 - StatusBarHeight + RW(21.05) <=
              fieldSize?.height - RW(56)
          ) {
            const currentComponent = replacementPlayers[index]

            replacementPlayers.forEach((item, i) => {
              if (item?.moveX && i !== index) {
                const differenceX = currentComponent.moveX - item.moveX
                const differenceY = currentComponent.moveY - item.moveY
                if (
                  differenceX < 25 &&
                  differenceX > -25 &&
                  differenceY < 25 &&
                  differenceY > -25
                ) {
                  setReplacementPlayers((prevplayingPlayers) => {
                    const updatedplayingPlayers = [...prevplayingPlayers]
                    updatedplayingPlayers[i] = {
                      ...updatedplayingPlayers[i],
                      x: 0,
                      y: 0,
                      small: false,
                      inGame: false,
                    }
                    return updatedplayingPlayers
                  })
                }
              }
            })
            setReplacementPlayers((prevplayingPlayers) => {
              const updatedplayingPlayers = [...prevplayingPlayers]
              updatedplayingPlayers[index] = {
                ...updatedplayingPlayers[index],

                pageX: ((px - initialCordinates.x) * 100) / fieldSize?.width,
                pageY:
                  ((py -
                    initialCordinates.y1 -
                    initialCordinates.y2 -
                    StatusBarHeight +
                    RW(21.05)) *
                    100) /
                  fieldSize?.height,
                small: true,
                inGame: true,
              }
              return updatedplayingPlayers
            })
          } else {
            console.log('else')
            setReplacementPlayers((prevplayingPlayers) => {
              const updatedplayingPlayers = [...prevplayingPlayers]
              updatedplayingPlayers[index] = {
                ...updatedplayingPlayers[index],
                x: 0,
                y: 0,
                small: false,
                inGame: false,
              }
              return updatedplayingPlayers
            })
          }
        })
      },
    })
  })

  return (
    <Row wrapper={styles.container}>
      <View style={[styles.btnContainer]}>
        <Pressable
          style={styles.arrowContainer}
          onPress={() => {
            if (screenX < componentWidth.current * 4) {
              setScreenX(0)
            } else if (screenX > 0) {
              setScreenX(screenX - componentWidth.current * 4)
            }
          }}
        >
          <ArrowSvg />
        </Pressable>
      </View>
      <View
        style={{
          width: '80%',
          overflow: 'visible',
        }}
      >
        <Row
          wrapper={{
            height: RW(100),
          }}
        >
          {replacementPlayers?.map((user, index) => {
            return (
            <Animated.View
              key={index}
      
              ref={(elRef) => refsArray.current[index] = elRef}
              onLayout={(e) => {
                if (!componentWidth.current) componentWidth.current = e.nativeEvent.layout.width
              }}
              style={[
                {
                  zIndex: user.small ? 9 : user?.inGame ? 999 : 99,
                  position: user.inGame ? 'absolute' : 'relative',
                  paddingVertical: user.small ? RW(21.05) : 0,
                  paddingHorizontal: user.small ? RW(20.15) : RW(2.2),
                },
                user.inGame
                  ? {
                      transform: [{ translateX: user.x }, { translateY: user.y }],
                    }
                  : {
                      transform: [
                        {
                          translateX: animatedScrollX,
                        },
                      ],
                    },
              ]}
              {...panResponders[index]?.panHandlers}
            >
              <User user={players[index]} size={user.small ? RW(45) : RW(90)} />
            </Animated.View>
          )})}
        </Row>
      </View>

      <View style={[styles.btnContainer]}>
        <Pressable
          style={[styles.arrowContainer, { transform: [{ rotate: '180deg' }] }]}
          onPress={() => {
            let outGamePlayers = replacementPlayers.filter((item) => !item.inGame)
            if (
              screenX <
              Math.floor(outGamePlayers.length / 4) * componentWidth.current * 4 -
                (outGamePlayers.length % 4 == 0 ? componentWidth.current * 4 : 0)
            ) {
              setScreenX(screenX + componentWidth.current * 4)
            }
          }}
        >
          <ArrowSvg />
        </Pressable>
      </View>
    </Row>
  )
}

export default SchemeUsers

const styles = StyleSheet.create({
  container: {
    height: RW(110),
    backgroundColor: BACKGROUND,
    justifyContent: 'space-between',
    width: RW(428),
    left: -RW(16),
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
    overflow: 'scroll',
    zIndex: 9999,
  },
  btnContainer: {
    backgroundColor: BACKGROUND,
    width: '10%',
    height: '100%',
    justifyContent: 'center',
    zIndex: 9999,
    paddingHorizontal: RW(5),
  },
  arrowContainer: {
    width: RW(40),
    height: RW(40),
    borderRadius: RW(20),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    zIndex: 99999999,
  },
})
