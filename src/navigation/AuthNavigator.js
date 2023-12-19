import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Preferences from '@/screens/Auth/screens/SignUp/screens/Preferences'
import Onboard from '@/screens/Auth/screens/SignUp/screens/Onboard'
import SignIn from '@/screens/Auth/screens/SignIn'
import SignUp from '@/screens/Auth/screens/SignUp'
import { NAV_HEADER_OPTION } from '@/constants'
import AuthHome from '@/screens/Auth'

const Stack = createNativeStackNavigator()

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={NAV_HEADER_OPTION} initialRouteName={'Home'}>
      <Stack.Screen name={'Home'} component={AuthHome} />
      <Stack.Screen name={'SignUp'} component={SignUp} />
      <Stack.Screen name={'SignIn'} component={SignIn} />
      <Stack.Screen name={'Onboard'} component={Onboard} />
      <Stack.Screen name={'Preferences'} component={Preferences} />
    </Stack.Navigator>
  )
}

export default AuthNavigator
