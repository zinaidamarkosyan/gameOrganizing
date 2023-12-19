import { RW } from '@/theme/utils'
import React from 'react'
import { View, Pressable, StyleSheet, Animated } from 'react-native'
import User from '@/components/User/user'
import ArrowSvg from './assets/ArrowSvg'
import { BACKGROUND } from '@/theme/colors'
import Row from '@/components/wrappers/row'

const SchemeUsers = ({ replacementPlayers, fieldSize }) => {
  return (
    <Row wrapper={styles.container}>
      <View style={[styles.btnContainer]}>
        <Pressable style={styles.arrowContainer} onPress={() => {}}>
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
          {replacementPlayers?.map((user, index) => (
            <Animated.View
              key={index}
              ref={user.ref}
              style={[
                {
                  zIndex: 9999999,

                  position: 'absolute',
                  paddingVertical: user.small ? RW(21.05) : 0,
                  paddingHorizontal: user.small ? RW(20.15) : RW(2.2),
                  top: 0,
                  // backgroundColor: index % 2 ? 'red' : 'green',
                },
                // user.inGame
                //   ? {
                //       transform: [
                //         {
                //           translateX: replacementPlayers[index].xPercent,
                //         },
                //         {
                //           translateY: replacementPlayers[index].yPercent,
                //         },
                //       ],
                //     }
                //   : null,
              ]}
            >
              <User size={user.small ? RW(45) : RW(90)} />
            </Animated.View>
          ))}
        </Row>
      </View>

      <View style={[styles.btnContainer]}>
        <Pressable
          style={[styles.arrowContainer, { transform: [{ rotate: '180deg' }] }]}
          onPress={() => {}}
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
    height: RW(100),
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
