import { Platform, Pressable, Text, View } from 'react-native'
import React from 'react'
import GameItemBgSvg from '../assets/GameItemBgSvg'
import { RH, RW, font } from '@/theme/utils'
import Row from '@/components/wrappers/row'
import { _storageUrl } from '@/constants'
import { WHITE } from '@/theme/colors'
import FastImage from 'react-native-fast-image'

const CalendarGameItem = ({ img, name, startDate, onPress }) => {

  console.log("CalendarGameItem", name)
  const dateTime = new Date(startDate).toTimeString().substring(0, 5)
  return (
    <Pressable
      onPress={onPress}
      style={{
        height: RH(58),
        width: '100%',
        alignSelf: 'center',
        marginVertical: RH(5),
      }}
    >
      <View style={{ width: '100%', height: '100%', position: 'absolute' }}>
        <GameItemBgSvg />
      </View>
      <Row
        wrapper={{
          width: '80%',
          height: '100%',
          paddingHorizontal: Platform.OS == 'android' ? RW(10) : 0,
          justifyContent: 'space-between',
          position: 'absolute',
          alignSelf: 'center',
        }}
      >
        <Row>
          <FastImage
            style={{ height: RW(30), width: RW(30), marginRight: RW(20) }}
            source={{ uri: _storageUrl + img }}
            resizeMode='contain'
          />
          <Text style={{ ...font('bold', 16, WHITE) }}>{name}</Text>
        </Row>
        <Text style={{ ...font('bold', 16, WHITE) }}>{dateTime}</Text>
      </Row>
    </Pressable>
  )
}

export default CalendarGameItem

