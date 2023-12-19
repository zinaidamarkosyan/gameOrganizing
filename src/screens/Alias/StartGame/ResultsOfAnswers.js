import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { memo, useEffect } from 'react'
import ScreenMask from '@/components/wrappers/screen'
import { RH, RW, font } from '@/theme/utils'
import { ICON, WHITE } from '@/theme/colors'
import LightButton from '@/components/buttons/Button'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { setExplainedWords } from '@/store/Slices/AliasSlice'

const ResultsOfAnswers = ({ route }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const isFocused = useIsFocused()

  const handleSubmit = () => {
    navigation.navigate('TeamsResults')
  }
  const { user } = useSelector(({ auth }) => auth)
  const { explainedWords, explainerTeam, explainYou, explainerUser } = useSelector(
    ({ alias }) => alias,
  )
  let data = route.params
  useEffect(() => {
    data.player = explainYou ? user : explainerUser

    if (!isFocused) {
      dispatch(
        setExplainedWords({
          truthy: [],
          falsy: [],
        }),
      )
    }
  }, [isFocused])
  return (
    <ScreenMask>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.commandName}>{explainerTeam}</Text>
        <View style={styles.mainBox}>
          <View style={styles.trueAnswers}>
            <Text style={styles.title}>Отгадано {explainedWords?.truthy?.length}</Text>
            <View style={styles.trueAnswersWrap}>
              {explainedWords?.truthy?.map((elm, i) => {
                return <Text style={styles.word} key={i}>{`${i + 1}. ${elm}`}</Text>
              })}
            </View>
          </View>
          <View style={styles.falseAnswers}>
            <Text style={styles.title}>Пропущено {explainedWords?.falsy?.length}</Text>
            <View style={styles.trueAnswersWrap}>
              {explainedWords?.falsy?.map((elm, i) => {
                return <Text style={styles.word} key={i}>{`${i + 1}. ${elm}`}</Text>
              })}
            </View>
          </View>
        </View>
        <View style={styles.btnBox}>
          <LightButton
            label={'Продолжить'}
            size={{ width: 281, height: 48 }}
            onPress={handleSubmit}
          />
        </View>
      </ScrollView>
    </ScreenMask>
  )
}

export default ResultsOfAnswers

const styles = StyleSheet.create({
  commandName: {
    ...font('regular', 24, ICON),
    alignSelf: 'center',
    paddingTop: '15%',
  },
  falseAnswers: {
    marginTop: '5%',
    width: '100%',
    marginLeft: '6%',
    alignSelf: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  trueAnswers: {
    marginTop: '10%',
    width: '100%',
    marginLeft: '6%',
    alignSelf: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  trueAnswersWrap: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    // height: RH(280),
    width: '80%',
  },
  title: {
    ...font('medium', 24, WHITE),
    paddingVertical: RH(25),
    textAlign: 'left',
    left: '3%',
  },
  word: {
    ...font('regular', 16, WHITE),
    paddingVertical: RH(5),
    marginLeft: RW(20),
  },
  mainBox: {
    width: '100%',
    // alignItems: 'flex-start',
  },
  btnBox: {
    alignSelf: 'center',
    paddingTop: '18%',
    paddingBottom: '6%',
  },
})
