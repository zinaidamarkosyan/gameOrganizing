import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import ScreenMask from '@/components/wrappers/screen'
import { font, RH, RW } from '@/theme/utils'
import { ICON, WHITE } from '@/theme/colors'
import LightButton from '@/components/buttons/Button'
import User from '@/components/User/user'
import { useDispatch, useSelector } from 'react-redux'
import { clearAllDatas } from '@/store/Slices/MafiaSlice'
import { useNavigation } from '@react-navigation/native'

const RatingPlayer = () => {
  const { playersRatings, organizer } = useSelector(({ mafia }) => mafia)
  const dispatch = useDispatch()
  const navigation = useNavigation()

  let sortedPlayersRatings = [...playersRatings]?.sort((item1, item2) => {
    let ratting1 = typeof item1?.rating == 'string' ? item1?.rating?.split('/')[0] : 0
    let ratting2 = typeof item2?.rating == 'string' ? item2?.rating?.split('/')[0] : 0

    if (+ratting1 > +ratting2) {
      return 1
    } else if (+ratting1 < +ratting2) {
      return -1
    }
    return 0
  })
  return (
    <ScreenMask>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.ratingsView}>
            <Text style={styles.ratingsText}> Рейтинги игроков</Text>
          </View>
          <View style={styles.ratingsCommon}>
            {sortedPlayersRatings?.reverse()?.map((item, id) => (
              <View style={styles.ratingsPlayers} key={id}>
                <View>
                  <User size={80} user={item?.user} />
                </View>
                <View style={styles.definedView}>
                  <Text style={styles.definedText}>Определил персонажей</Text>
                  <Text style={styles.RatingsText}>
                    {item.rating.split('/')[0] + ' из ' + item.rating.split('/')[1]}
                  </Text>
                </View>
              </View>
            ))}
          </View>
          <View style={styles.btns}>
            <View style={styles.btnsView}>
              <LightButton
                size={{ width: 281, height: 48 }}
                labelStyle={styles.invitePlayers}
                label={'Завершить игру'}
                onPress={() => {
                  dispatch(clearAllDatas(navigation))
                }}
              />
            </View>
            {organizer ? (
              <View style={styles.btnsView}>
                <LightButton
                  size={{ width: 281, height: 48 }}
                  labelStyle={styles.invitePlayers}
                  label={'Играть заново'}
                  onPress={() => {
                    dispatch(clearAllDatas())
                    navigation.navigate('Settings')
                  }}
                />
              </View>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </ScreenMask>
  )
}

const styles = StyleSheet.create({
  ratingsView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: RW(34),
  },
  ratingsText: {
    ...font('inter', 24, ICON, 24),
    fontWeight: '700',
    letterSpacing: 0.01,
  },
  img: {
    width: '100%',
    height: '100%',
  },
  ratingsPlayers: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginVertical: RH(21),
  },
  definedView: {
    marginLeft: RW(26),
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginTop: RH(12),
  },
  definedText: {
    ...font('inter', 16, WHITE, 20),
    fontWeight: '600',
    marginBottom: RH(5),
  },
  RatingsText: {
    ...font('inter', 16, WHITE, 20),
    fontWeight: '600',
  },
  ratingsCommon: {
    paddingHorizontal: RW(15),
  },
  btns: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnsView: {
    marginBottom: RH(24),
  },
})
export default RatingPlayer
