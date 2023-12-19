import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

import { font } from '@/theme/utils'
import { RED, WHITE } from '@/theme/colors'
import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'
import { setStoping, setTime } from '@/store/Slices/CrocodileSlice'

const Timer = ({ modalState, setTimeIsFinished }) => {
  const { explainYou, stoping, time, staticTime } = useSelector(({ crocodile }) => crocodile)
  const dispatch = useDispatch()
  const isFocused = useIsFocused()
  const [selectedTime, setSelectedTime] = useState({ seconds: staticTime - 20 })

  useEffect(() => {
    if (!isFocused && selectedTime.seconds == 0) {
      dispatch(setStoping('withoutSocket'))
    } else if (selectedTime.seconds > 0 && selectedTime.seconds < staticTime - 20) {
      setSelectedTime((prev) => ({ seconds: prev.seconds }))
    } else {
      setSelectedTime({ seconds: staticTime - 20 })
    }
  }, [stoping, staticTime, isFocused])

  useEffect(() => {
    let timer
    if (!stoping) {
      timer = setInterval(() => {
        if (selectedTime.seconds == 0) setTimeIsFinished(true)

        if (selectedTime.seconds > 0 && selectedTime.seconds !== 0) {
          if (!modalState?.state && explainYou) {
            setSelectedTime({
              seconds: selectedTime.seconds - 1,
            })
            dispatch(setTime(selectedTime.seconds - 1))
          }
          if (!explainYou && !stoping) {
            setSelectedTime({
              seconds: selectedTime.seconds - 1,
            })
            dispatch(setTime(selectedTime.seconds - 1))
          }
        } else if (time == 0) {
          dispatch(setTime(selectedTime.seconds - 1))
        }
      }, 1000)
    }

    return () => clearInterval(timer)
  }, [selectedTime.seconds, stoping, explainYou])
  const displayMinutes = Math.floor(selectedTime.seconds / 60)
    .toString()
    .padStart(1, '0')
  const displaySeconds = (selectedTime.seconds % 60).toString().padStart(2, '0')
  return (
    <>
      <Text style={styles.timer}>Оставшееся время</Text>
      <Text style={[styles.timerClock, { color: selectedTime.seconds > 5 ? WHITE : RED }]}>
        {selectedTime.seconds < 0
          ? 0
          : [displayMinutes > 0 ? displayMinutes + ':' : '', displaySeconds]}
      </Text>
    </>
  )
}

export default Timer
const styles = StyleSheet.create({
  timer: {
    ...font('regular', 12, WHITE),
  },
  timerClock: {
    ...font('medium', 24, WHITE),
  },
})
