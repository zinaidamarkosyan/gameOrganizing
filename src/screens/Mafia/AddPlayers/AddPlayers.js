import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ScreenMask from '@/components/wrappers/screen'
import { font, RH, RW } from '@/theme/utils'
import { BTN_TEXT, LIGHT_LABEL, WHITE } from '@/theme/colors'
import LightButton from '@/components/buttons/Button'
import { useNavigation } from '@react-navigation/native'
import DarkButton from '@/components/buttons/DarkButton'
import PlayerList from './componnets/PlayerList'
import { getDictonary, setAddPlayersError, startGame } from '@/store/Slices/MafiaSlice'
import { useDispatch, useSelector } from 'react-redux'
import ErrorModal from './componnets/ErrorModal'

const AddPlayers = () => {
  const [errorModal, setErrorModal] = useState(false)
  const { mafiaGameId, players, addPlayersError } = useSelector(({ mafia }) => mafia)
  const navigation = useNavigation()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setAddPlayersError(null))
    return () => {
      dispatch(setAddPlayersError(null))
    }
  }, [])

  useEffect(() => {
    if (addPlayersError) {
      setErrorModal(true)
    }
  }, [addPlayersError])
  return (
    <ScreenMask>
      <View style={styles.common}>
        <Text style={styles.title}>Игроки добавились в игру</Text>
        <PlayerList players={players} />
        <View>
          <View style={{ marginTop: RH(20), marginBottom: RH(20) }}>
            <LightButton
              size={{ width: 281, height: 48 }}
              labelStyle={styles.countinue}
              label={'Продолжить'}
              white={'white'}
              background={'#7DCE8A'}
              bgColor={'#4D7CFE'}
              onPress={() => {
                dispatch(getDictonary(mafiaGameId))
              }}
            />
          </View>
          <View>
            <DarkButton
              onPress={() => navigation.goBack()}
              size={{ width: 281, height: 48 }}
              label={'Пригласить игроков'}
            />
          </View>
        </View>
      </View>
      <ErrorModal modalVisible={errorModal} setModalVisible={setErrorModal} />
    </ScreenMask>
  )
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    ...font('bold', 24, WHITE),
    marginTop: RH(30),
  },
  scroll: {
    marginRight: 'auto',
    marginLeft: 'auto',
    width: RW(310),
    height: RH(600),
    flexGrow: 0,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  item: {
    padding: RW(3),
    marginTop: RH(30),
  },
  players: {
    backgroundColor: 'red',
    marginLeft: 10,
    width: 50,
    height: 50,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  common: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  games: {
    paddingTop: RH(126),
    paddingBottom: RH(42.9),
  },
  countinue: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...font('inter', '18', LIGHT_LABEL, 24),
    fontWeight: '700',
    letterSpacing: 0.01,
  },
})
export default AddPlayers
