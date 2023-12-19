import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { font, RH, RW } from '@/theme/utils'
import { _storageUrl } from '@/constants'
import { ICON, WHITE } from '@/theme/colors'
import Row from '@/components/wrappers/row'
import User from '@/components/User/user'
import FastImage from 'react-native-fast-image'
import { useSelector } from 'react-redux'
import dateFormater from '@/helpers/dateFormater'
import useExtractLinksFromText from '@/helpers/useExtractLinksFromText'

function Ticket({ game, initialState, name, dates }) {
  const { game_name, game_description } = useSelector((state) => state.game)

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: RH(50) }}>
      <View style={styles.ticketImgBlock}>
        <FastImage
          resizeMode="contain"
          style={styles.ticketImg}
          source={{ uri: _storageUrl + game?.img }}
        />
      </View>
      <View>
        <View style={styles.firstTextBlock}>
          <Text style={styles.ticketText}>Тип игры:</Text>
          <Text style={styles.ticketTextTwo}>{name}</Text>
        </View>
        {name == 'Своя игра' ? (
          <>
            <View style={styles.firstTextBlock}>
              <Text style={styles.ticketText}>Название игры:</Text>
              <Text style={styles.ticketTextTwo}>{game_name}</Text>
            </View>
            <View style={styles.firstTextBlock}>
              <Text style={styles.ticketText}>Описание игры:</Text>
              {useExtractLinksFromText({
                text: game_description,
                textStyle: { ...font('bold', 16, ICON, 20), marginRight: RW(5) },
                wrapperStyle: { maxWidth: '80%' },
              })}
              {/* <Text style={styles.ticketTextTwo}>{game_description}</Text> */}
            </View>
          </>
        ) : null}
        <View style={styles.ticketTextBlock}>
          <Text style={styles.ticketText}>Дата и время игры:</Text>
          <Text style={styles.ticketTextTwo}>{dateFormater(dates[0])}</Text>
        </View>
        <View style={styles.ticketTextBlock}>
          <Text style={styles.ticketText}>Количество игроков:</Text>
          <Text style={styles.ticketTextTwo}>
            от {initialState?.number_of_players_from} до {initialState?.number_of_players_to}
          </Text>
        </View>
        <View style={styles.ticketTextBlock}>
          <Text style={styles.ticketText}>Возраст игроков:</Text>
          <Text style={styles.ticketTextTwo}>
            {initialState?.age_restrictions_from}-{initialState?.age_restrictions_to}
          </Text>
        </View>
        <View style={styles.ticketTextBlock}>
          <Text style={styles.ticketText}>Половой признак игроков:</Text>
          <Text style={styles.ticketTextTwo}>
            {initialState?.players_gender == 'm'
              ? 'М'
              : initialState?.players_gender == 'Ж'
              ? 'Ж'
              : 'Без ограничений'}
          </Text>
        </View>
        <View style={styles.ticketTextBlock}>
          <Text style={styles.ticketText}>Адрес проведения игры:</Text>
          <Text style={styles.ticketTextTwo}>{initialState?.address_name}</Text>
        </View>
        <View style={styles.ticketTextBlock}>
          <Text style={styles.ticketText}>Дата и время окончания поиска игроков:</Text>
          <Text style={styles.ticketTextTwo}>{dateFormater(dates[1])}</Text>
        </View>
        <Row wrapper={{ ...styles.ticketTextBlock }}>
          <Text style={styles.ticketText}>Организатор игры:</Text>
          <View style={{ width: RW(60), top: '-2%', marginLeft: RW(20) }}>
            <User
              size={45}
              onPressItem={{
                item: <User size={390} />,
                modalClose: false,
              }}
            />
          </View>
        </Row>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  ticketImgBlock: {
    alignItems: 'center',
  },
  ticketTextBlock: {
    marginBottom: RH(16),
    marginLeft: RW(31),
  },
  firstTextBlock: {
    justifyContent: 'space-between',
    marginRight: RW(18),
    marginBottom: RH(24),
    marginLeft: RW(31),
  },
  ticketText: {
    ...font('regular', 14, WHITE, 20),

    marginBottom: RH(6),
  },
  ticketTextTwo: {
    ...font('bold', 16, ICON, 20),
  },
  ticketImg: {
    width: RW(206),
    height: RH(218),
  },
})

export default Ticket
