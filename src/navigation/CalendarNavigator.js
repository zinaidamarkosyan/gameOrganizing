import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NAV_HEADER_OPTION } from '@/constants'
import CalendarScreen from '@/screens/Calendar/CalendarScreen'
import CalendarSettings from '@/screens/Calendar/CalendarSettings'
import CalendarGameScreen from '@/screens/Calendar/CalendarGameScreen.js'

const Stack = createNativeStackNavigator()

function CalendarNavigator() {
  return (
    <Stack.Navigator screenOptions={NAV_HEADER_OPTION}>
      <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
      <Stack.Screen name="CalendarSettings" component={CalendarSettings} />
      <Stack.Screen name="CalendarGameScreen" component={CalendarGameScreen} />
    </Stack.Navigator>
  )
}

export default CalendarNavigator
