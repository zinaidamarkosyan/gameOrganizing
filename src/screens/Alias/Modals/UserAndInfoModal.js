import LightButton from '@/components/buttons/Button'
import { RH, font } from '@/theme/utils'
import { useIsFocused } from '@react-navigation/native'
import { useEffect, useLayoutEffect, useRef, memo } from 'react'
import { Pressable, Text, View, StyleSheet, Animated, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import PlayingInstructionSVG from '../assets/PlayingInstructionSVG'
import TypeButton from '@/screens/Game/components/TypeButton'
import User from '@/components/User/user'
import { ICON, WHITE } from '@/theme/colors'
import { setStoping } from '@/store/Slices/AliasSlice'

// have render problem

const SomeSampleScreen = ({ modalState, setModalState }) => {
  const isFocused = useIsFocused()
  const { user } = useSelector(({ auth }) => auth)
  const { explainYou, explainerTeam, explainerUser } = useSelector(({ alias }) => alias)
  const height = Dimensions.get('window').height
  const animatedValue = useRef(new Animated.Value(height)).current
  const showInstruction = useRef(true)

  const dispatch = useDispatch()

  useEffect(() => {
    if (explainYou == true || explainerUser !== null) {
      setModalState({ state: 'user' })
    }
  }, [isFocused, explainYou, explainerUser])
  useLayoutEffect(() => {
    if (!isFocused) {
      setTimeout(() => {
        animatedValue.setValue(height)
      }, 1000)
    }

    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start()
  }, [isFocused])

  return (
    <Animated.View
      style={{
        transform: [{ translateY: animatedValue }],
        width: '100%',
        display: !modalState?.state ? 'none' : 'flex',
        height: '120%',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99999,
        backgroundColor: modalState?.state ? 'rgba(0,0,0,0.8)' : 'transparent',
        position: 'absolute',
      }}
    >
      <Pressable
        onPress={() => {
          if (explainYou) {
            showInstruction.current
              ? () => {
                  showInstruction.current = false
                  setModalState({ state: 'inst' })
                }
              : setModalState({})
          } else {
            setModalState({})
          }
        }}
        style={{
          display: modalState?.state == 'user' ? 'flex' : 'none',
          flexDirection: 'column',
          alignItems: 'center',
          height: '87%',
          justifyContent: 'space-evenly',
        }}
      >
        <View style={[styles.userModalBox]}>
          <Text style={[styles.commandName, { position: 'absolute', top: RH(40) }]}>
            {explainerTeam}
          </Text>
          <View style={{ alignItems: 'center' }}>
            <Text style={[styles.countOfTrueAnswer, { bottom: RH(10) }]}>Объясняет</Text>
            {explainYou == true || explainerUser !== null ? (
              <User
                size={370}
                pressedUser={explainYou ? user : explainerUser !== null ? explainerUser : null}
              />
            ) : null}
          </View>

          {!!explainYou && (
            <View style={{ position: 'absolute', bottom: RH(20) }}>
              <LightButton
                label={'Начать'}
                size={{ width: 281, height: 48 }}
                onPress={() => {
                  setModalState({ state: 'inst' })
                }}
              />
            </View>
          )}
        </View>
      </Pressable>

      <View
        onPress={() => {
          dispatch(setStoping(false))
        }}
        style={{
          display: modalState?.state == 'inst' ? 'flex' : 'none',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          height: '84%',
          justifyContent: 'center',
        }}
      >
        <View style={styles.modalBox}>
          <View style={styles.instructionTextBox}>
            <Text style={styles.instruction}>
              После того как ваша команда отгадает слово переместите его вверх
            </Text>
            <Text style={styles.instruction}>Для пропуска слова переместите его вниз</Text>
          </View>
          <PlayingInstructionSVG />
        </View>

        <TypeButton
          size={60}
          title={'OK'}
          onPress={() => {
            dispatch(setStoping(false))
            setModalState(null)
          }}
        />
      </View>
    </Animated.View>
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
    justifyContent: 'space-around',
    alignSelf: 'center',
  },
  answersBox: {
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 999,
  },
  bottomBox: {
    width: '97%',
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
export default memo(SomeSampleScreen)
