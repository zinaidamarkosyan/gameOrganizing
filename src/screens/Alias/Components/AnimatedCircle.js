import React, { memo, useRef } from 'react'
import TypeButton from '@/screens/Game/components/TypeButton'
import { PanResponder, Animated } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setExplainedWords, setStep } from '@/store/Slices/AliasSlice'
import { font } from '@/theme/utils'
import { LIGHT_LABEL } from '@/theme/colors'

const AnimatedCircle = ({ userExplainedWordsCount, setUserExplainedWordsCount }) => {
  const dispatch = useDispatch()
  const { explainYou, stoping, step, words, explainedWords } = useSelector(({ alias }) => alias)

  //animation =====================================
  const pan = useRef(new Animated.ValueXY()).current
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dy: pan.y }]),
    onPanResponderRelease: (e, gestureState) => {
      if (explainYou && !stoping) {
        pan.flattenOffset()
        if (gestureState.moveY < 233) {
          dispatch(
            setExplainedWords({
              ...explainedWords,
              truthy: [...explainedWords.truthy, words?.[step]?.name],
            }),
          )
          if (explainYou) {
            setUserExplainedWordsCount({
              ...userExplainedWordsCount,
              points: ++userExplainedWordsCount.points,
            })
          }

          dispatch(setStep(step + 1))

          Animated.timing(pan, {
            toValue: { x: 0, y: 0 },
            duration: 300,
            useNativeDriver: false,
          }).start()
        } else if (gestureState.moveY > 555) {
          dispatch(
            setExplainedWords({
              ...explainedWords,
              falsy: [...explainedWords.falsy, words?.[step]?.name],
            }),
          )

          dispatch(setStep(step + 1))

          Animated.timing(pan, {
            toValue: { x: 0, y: 0 },
            duration: 300,
            useNativeDriver: false,
          }).start()
        } else {
          Animated.timing(pan, {
            toValue: { x: 0, y: 0 },
            duration: 300,
            useNativeDriver: false,
          }).start()
        }
      }
    },
  })

  const range = [-140, 0, 155]
  const clampedY = pan.y.interpolate({
    inputRange: range,
    outputRange: range,
    extrapolate: 'clamp',
  })

  const animatedStyle = {
    transform: [{ translateY: clampedY }],
  }

  return (
    <Animated.View
      style={[!stoping && explainYou ? animatedStyle : {}]}
      {...panResponder.panHandlers}
    >
      <TypeButton
        labelStyle={{ ...font('bold', 21, LIGHT_LABEL, 21) }}
        title={words?.[step]?.name}
        key={Math.random()?.toString()}
      />
    </Animated.View>
  )
}
export default memo(AnimatedCircle)
