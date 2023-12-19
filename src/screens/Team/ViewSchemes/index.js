import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ScreenMask from '@/components/wrappers/screen'
import Row from '@/components/wrappers/row'
import { _storageUrl } from '@/constants'
import { RH, RW, font } from '@/theme/utils'
import { ICON, WHITE } from '@/theme/colors'
import User from '@/components/User/user'
import FastImage from 'react-native-fast-image'

const ViewSchemes = ({ route }) => {
  const [replacementPlayers, setReplacementPlayers] = useState([{ pageX: 0, pageY: 0 }])

  const [initialCordinates, setInitialCordinates] = useState({ x: 0, y: 0 })
  const props = route.params.replacementPlayers

  const data = {
    players: ['64219136e3a868ee5e71a799'],
    schemaImg: '/game_schema_img/Group 1805.png',
    teamImg: '/team/image/a64e7664-9a78-42c3-bff7-b02a92c40c0a.jpg',
    teamName: 'Test2',
  }
  const fieldSize = useRef({
    width: 0,
    height: 0,
  })
  useEffect(() => {
    setReplacementPlayers(props)
  }, [props])
  return (
    <ScreenMask>
      <Row wrapper={styles.teamNameRow}>
        <FastImage style={styles.teamImg} source={{ uri: _storageUrl + data?.teamImg }} />
        <Text style={styles.teamName}>{data?.teamName}</Text>
      </Row>
      <View style={styles.schemaImgContainer}>
        <FastImage
          onLayout={(e) => {
            fieldSize.current = {
              width: (e.nativeEvent.layout.width / 100) * 81.5,
              height: (e.nativeEvent.layout.height / 100) * 85.1,
            }

            setInitialCordinates({
              x: (e.nativeEvent.layout.width / 100) * 9.25 + e.nativeEvent.layout.x,
              y: (e.nativeEvent.layout.height / 100) * 7.45 + e.nativeEvent.layout.y,
            })
          }}
          style={styles.schemaImg}
          resizeMode='contain'
          source={{ uri: _storageUrl + data?.schemaImg }}
        />

        {replacementPlayers.map((user, index) => {
          if (user.inGame)
            return (
              <View
                key={index}
                style={{
                  paddingHorizontal: 0,
                  position: 'absolute',
                  left: user.pageX * (fieldSize.current?.width / 100) + initialCordinates.x,
                  top: user.pageY * (fieldSize.current?.height / 100) + initialCordinates.y,
                }}
              >
                <User
                  size={RW(45)}
                  onPressItem={{ item: <User size={390} />, modalClose: false }}
                />
              </View>
            )
        })}
      </View>
      <View style={{ zIndex: 999 }}>
        <Text style={styles.playersTitle}>Запасные игроки:</Text>
      </View>
    </ScreenMask>
  )
}

export default ViewSchemes

const styles = StyleSheet.create({
  teamNameRow: {
    alignSelf: 'center',
  },
  teamImg: {
    height: RW(30),
    width: RW(30),
    borderRadius: RW(15),
  },
  teamName: {
    ...font('bold', 20, WHITE, 30),
    marginLeft: RW(20),
  },
  schemaImgContainer: {
    width: '100%',
    height: RH(516),
    marginTop: RH(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  schemaImg: {
    height: RW(516),
    width: RW(370),
  },
  playersTitle: {
    ...font('regular', 16, ICON, 24),
    marginTop: RH(28),
    marginBottom: RH(16),
  },
})
