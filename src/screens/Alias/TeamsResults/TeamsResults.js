import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenMask from '@/components/wrappers/screen'
import { useDispatch, useSelector } from 'react-redux'
import { RH, RW, font } from '@/theme/utils'
import { ICON, WHITE } from '@/theme/colors'
import LightButton from '@/components/buttons/Button'
import { useNavigation } from '@react-navigation/native'
import {
  setExplainYou,
  setWords,
  setExplainerTeam,
  setWaitEndRound,
  setLoader,
} from '@/store/Slices/AliasSlice'

const TeamsResults = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const { allTeams, countWords } = useSelector(({ alias }) => alias)

  return (
    <ScreenMask>
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          {allTeams?.map((elm, i) => {
            return (
              <View key={Math.random().toString()}>
                <View>
                  <Text style={styles.commandName}>{elm.value}</Text>

                  <Text style={styles.points}>{`Очки: ${elm?.points}`}</Text>
                </View>
                {i !== allTeams.length - 1 ? <View style={styles.line}></View> : null}
              </View>
            )
          })}
        </View>
      </View>
      <View style={styles.btnBox}>
        <LightButton
          label={'Продолжить'}
          size={{ width: 288, height: 48 }}
          onPress={() => {
            dispatch(setExplainYou(false))
            dispatch(setWords([]))
            dispatch(setExplainerTeam(null))
            if (
              countWords !== null &&
              countWords <= Math.max(...allTeams.map((item) => item.points))
            ) {
              navigation.navigate('WinnerTeamMessage')
            } else {
              dispatch(setWaitEndRound(true))
              dispatch(setLoader(true))
              navigation.navigate('WaitPlayers')
            }
          }}
        />
      </View>
    </ScreenMask>
  )
}

export default TeamsResults

const styles = StyleSheet.create({
  mainContainer: {
    flex: 0.6,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  line: {
    width: RW(277),
    height: RH(1.5),
    top: '30%',
    backgroundColor: ICON,
  },
  commandName: {
    ...font('bold', 48, ICON),
    textAlign: 'center',
  },
  points: {
    ...font('bold', 48, WHITE),
    textAlign: 'center',
    paddingTop: RH(10),
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnBox: {
    alignSelf: 'center',
    paddingBottom: RH(30),
  },
})
