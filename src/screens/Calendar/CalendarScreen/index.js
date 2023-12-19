import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenMask from '@/components/wrappers/screen'
import Calendar from './components/Calendar'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

const CalendarScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const calendarGames = useSelector(({ app }) => app.calendarGames)
  return (
    <ScreenMask>
      <Calendar navigation={navigation} dispatch={dispatch} calendarGames={calendarGames} />
    </ScreenMask>
  )
}

export default CalendarScreen

const styles = StyleSheet.create({})
