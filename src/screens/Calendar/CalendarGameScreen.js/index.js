import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenMask from '@/components/wrappers/screen'
import { _storageUrl } from '@/constants'
import { RH, RW, font } from '@/theme/utils'
import Row from '@/components/wrappers/row'
import User from '@/components/User/user'
import FastImage from 'react-native-fast-image'

const CalendarGameScreen = (props) => {
  const gameData = props.route.params.game
  let startData = new Date(gameData?.start_date)
  let startTime = startData.toTimeString().substring(0, 5)
  startData = startData.toISOString().substring(0, 10).split('-').reverse().join('.')

  return (
    <ScreenMask>
      <FastImage resizeMode='contain' style={styles.img} source={{ uri: _storageUrl + gameData.game.img }} />
      <View style={styles.main}>
        <Row wrapper={styles.row}>
          <Text style={styles.text1}>
            Тип игры:{' '}
            <Text style={styles.text2}>
              {gameData?.game?.category?.name == 'active' ? 'Активный' : 'Настольный'}
            </Text>
          </Text>
        </Row>
        <Row wrapper={styles.row}>
          <Text style={styles.text1}>
            Название игры: <Text style={styles.text2}>{gameData?.game?.name}</Text>
          </Text>
        </Row>
        <Row wrapper={styles.row}>
          <Text style={styles.text1}>
            Описание игры: <Text style={styles.text2}>{gameData?.game?.description ? gameData?.game?.description : "Нету"}</Text>
          </Text>
        </Row>
        {gameData?.number_of_players_from && gameData?.number_of_players_to ? (<Row wrapper={styles.row}>
          <Text style={styles.text1}>
            Количество участников:{' '}
            <Text style={styles.text2}>
              {gameData?.number_of_players_from} до {gameData?.number_of_players_to}
            </Text>
          </Text>
        </Row>) : null}
        {gameData?.age_restrictions_from && gameData?.age_restrictions_to ? (<Row wrapper={styles.row}>
          <Text style={styles.text1}>
            Возраст участников:{' '}
            <Text style={styles.text2}>
              {gameData?.age_restrictions_from} - {gameData?.age_restrictions_to}
            </Text>
          </Text>
        </Row>) : null}
        
        <Row wrapper={styles.row}>
          <Text style={styles.text1}>
            Пол участников:{' '}
            <Text style={styles.text2}>
              {gameData?.players_gender == 'm/f'
                ? 'Без ограничений'
                : gameData?.players_gender == 'm'
                ? 'М'
                : 'Ж'}
            </Text>
          </Text>
        </Row>
        <Row wrapper={styles.row}>
          <Text style={styles.text1}>
            Дата игры: <Text style={styles.text2}>{startData}</Text>
          </Text>
        </Row>
        <Row wrapper={styles.row}>
          <Text style={styles.text1}>
            Время: <Text style={styles.text2}>{startTime}</Text>
          </Text>
        </Row>
        <Row wrapper={styles.row}>
          <Text style={styles.text1}>
            Адрес проведения игры: <Text style={styles.text2}>{gameData?.address_name}</Text>
          </Text>
        </Row>
        {/* <Row wrapper={styles.row}>
          <Text style={styles.text1}>
            Плата за участие:{' '}
            <Text style={styles.text2}>
              {gameData?.ticket_price != 0 ? gameData?.ticket_price : 'Бесплатно'}
            </Text>
          </Text>
        </Row> */}
        <Row wrapper={styles.row}>
          <Text style={[styles.text1, { marginRight: RW(15) }]}>Организатор игры:</Text>
          <User
            size={40}
            pressedUser={gameData?.user}
            zoom={true}
            onPressItem={{
              item: <User size={390} pressedUser={gameData?.user} />,
            }}
          />
        </Row>
      </View>
    </ScreenMask>
  )
}

export default CalendarGameScreen

const styles = StyleSheet.create({
  img: {
    height: RH(250),
  },
  main: {
    marginTop: RH(40),
    marginHorizontal: RW(20),
  },
  row: {
    marginBottom: RH(10),
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
  },
  text1: {
    ...font('bold', 16, '#fff'),
  },
  text2: {
    ...font('regular', 16, '#fff'),
  },
})
