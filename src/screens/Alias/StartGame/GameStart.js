import { ICON, WHITE } from '@/theme/colors'
import { useDispatch, useSelector } from 'react-redux'
import { font, RH } from '@/theme/utils'
import { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { View, StyleSheet, Text } from 'react-native'
import AnimatedCircle from '../components/AnimatedCircle'
import AliasBackground from '../assets/Background'
import LightButton from '@/components/buttons/Button'
import Timer from '../components/Timer'
import {
  setExplainYou,
  setExplainedWords,
  setExplainerUser,
  setStart,
  setStep,
  setStoping,
  setTeams,
} from '@/store/Slices/AliasSlice'
import SomeSampleScreen from '../Modals/UserAndInfoModal'
import TimeFinishModal from '../Modals/TimeFinishModal'

const GameStart = () => {
  const [timeIsFinished, setTimeIsFinished] = useState(false)
  const [falsyCount, setFalsyCount] = useState(0)
  const [truthyCount, setTruthyCount] = useState(0)
  const [modalState, setModalState] = useState() //{ state: 'user' }

  const {
    explainerTeam,
    explainYou,
    step,
    explainedWords,
    aliasGameId,
    stoping,
    penalty,
    allTeams,
  } = useSelector(({ alias }) => alias)
  const [userExplainedWordsCount, setUserExplainedWordsCount] = useState({
    points: 0,
    aliasGameId,
  })

  const dispatch = useDispatch()
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      dispatch(
        setExplainedWords({
          truthy: [],
          falsy: [],
        }),
      )
    } else {
      dispatch(setStart(false))
    }
    return () => {
      dispatch(setStart(false))
    }
  }, [isFocused])
  useEffect(() => {
    if (penalty) {
      let truthyCount = step - explainedWords.falsy?.length * 2
      setTruthyCount(truthyCount >= 0 ? truthyCount : 0)
    } else {
      setTruthyCount(step - explainedWords.falsy?.length)
    }

    setFalsyCount(step - explainedWords.truthy?.length)

    // raundic heto vor minus er etum dzelu masy
    if (modalState?.state == 'user' && !explainYou) {
      dispatch(setStep(0))
      setTruthyCount(0)
      setFalsyCount(0)
    }
  }, [explainedWords, explainYou, step, falsyCount, modalState])

  useEffect(() => {
    if (timeIsFinished) {
      dispatch(setExplainerUser(null))
      dispatch(setExplainYou(null))
      if (explainYou) {
        dispatch(
          setTeams([
            ...allTeams?.map((elm) => {
              if (elm.value == explainerTeam) {
                return {
                  ...elm,
                  points: elm.points + truthyCount,
                }
              } else return elm
            }),
          ]),
        )
      }
    }
  }, [timeIsFinished])
  useEffect(() => {
    if (!stoping && modalState?.state === 'user' && !explainYou) {
      setModalState({})
    }
  }, [stoping, modalState, explainYou])

  return (
    <>
      <AliasBackground style={{ justifyContent: 'center', alignItems: 'center' }}>
        <SomeSampleScreen modalState={modalState} setModalState={setModalState} />
        <TimeFinishModal
          timeIsFinished={timeIsFinished}
          setTimeIsFinished={setTimeIsFinished}
          userExplainedWordsCount={userExplainedWordsCount}
          setModalState={setModalState}
        />
        <View
          style={{
            height: '95%',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignContent: 'center',
          }}
        >
          <View style={styles.answersBox}>
            <Text style={styles.commandName}>{explainerTeam}</Text>

            <Text style={styles.countOfTrueAnswer}>{truthyCount}</Text>
            <Text style={styles.countOfTrueAnswer}>Отгадано</Text>
          </View>
          <View style={{ zIndex: 999999 }}>
            <AnimatedCircle
              setTruthyCount={setTruthyCount}
              setFalsyCount={setFalsyCount}
              userExplainedWordsCount={userExplainedWordsCount}
              setUserExplainedWordsCount={setUserExplainedWordsCount}
              truthyCount={truthyCount}
            />
          </View>
          <View style={[styles.answersBox, { bottom: -20 }]}>
            <Text style={styles.countOfTrueAnswer}>Пропущено</Text>
            <Text style={styles.countOfTrueAnswer}>{falsyCount}</Text>
            <View style={styles.bottomBox}>
              <View style={{ width: '65%' }}>
                {!!explainYou && (
                  <LightButton
                    label={!stoping ? 'Стоп' : 'Продолжить'}
                    size={{ width: !stoping ? 100 : null, height: 36 }}
                    onPress={() => dispatch(setStoping(!stoping))}
                  />
                )}
              </View>
              <View style={{ alignItems: 'center', width: '35%' }}>
                <Timer modalState={modalState} setTimeIsFinished={setTimeIsFinished} />
              </View>
            </View>
          </View>
        </View>
      </AliasBackground>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  instruction: {
    ...font('regular', 18, WHITE),
  },
  modalBox: {
    width: '95%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userModalBox: {
    height: '95%',
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  instructionTextBox: {
    height: '60%',
    width: '70%',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  answersBox: {
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 99,
  },
  bottomBox: {
    width: '90%',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  commandName: {
    ...font('medium', 26, ICON),
  },
  countOfTrueAnswer: {
    ...font('regular', 24, WHITE),
    paddingVertical: RH(5),
  },
})

export default GameStart
