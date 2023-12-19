import { setAnswersCount, setLoader, setWaitNight } from '@/store/Slices/MafiaSlice'
import { font } from '@/theme/utils'
import React, { useState, useEffect } from 'react'
import { Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

const Timer = ({ setChoosedUsers }) => {
  const [seconds, setSeconds] = useState(voteTime * 60)
  const { mafiaRole, night, voteTime, answersCount } = useSelector(({ mafia }) => mafia)
  const dispatch = useDispatch()
  const mafiaRoleName = mafiaRole?.name

  useEffect(() => {
    let interval = null

    interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds((seconds) => seconds - 1)
      } else if (night && answersCount == 0) {
        setSeconds(120) // 8
        dispatch(setAnswersCount(1))
        setChoosedUsers(null)
        if (mafiaRoleName == 'Дон') {
          dispatch(setLoader(false))
        }
      } else if (night && answersCount > 0) {
        dispatch(setLoader(true))
        dispatch(setWaitNight(false))
        setChoosedUsers(null)
      } else {
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [seconds, night, answersCount])
  useEffect(() => {
    if (night && answersCount == 0) {
      setSeconds(120) // 7
      setChoosedUsers(null)
    } else if (night && answersCount == 1) {
      setSeconds(120) // 8
    } else if (!night) {
      setSeconds(voteTime * 60)
      setChoosedUsers(null)
    }
  }, [night, answersCount])

  let minute =
    Math.floor(seconds / 60).toString().length == 1
      ? '0' + Math.floor(seconds / 60)
      : Math.floor(seconds / 60)
  let second = (seconds % 60).toString().length == 1 ? '0' + (seconds % 60) : seconds % 60
  return (
    <Text style={[font('bold', 18, '#fff'), seconds == 0 && { color: 'red' }]}>
      {minute + ':' + second}
    </Text>
  )
}

export default Timer
