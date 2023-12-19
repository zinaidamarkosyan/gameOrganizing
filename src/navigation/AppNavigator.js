import { ICON } from '@/theme/colors'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import CircleButton from '@/components/buttons/circle'
import TabBarButton from '@/components/buttons/tabs'
import { NAV_HEADER_OPTION } from '@/constants'

// TAB SCREENS
import ChatScreen from '@/screens/ChatScreens/Chats'
import GameSelectScreen from '@/screens/Game'
import HomeScreen from '@/screens/Home'
import ProfileScreen from '@/screens/Profile'
//TAB SCREENS END
// SCREENS
import ProfileNavigator from '@/navigation/ProfileNavigator'
import TeamNavigator from '@/navigation/TeamNavigator'
import PrivateChat from '@/screens/ChatScreens/PrivateChat'
import GameList from '@/screens/Game/GameList'
import GameItem from '@/screens/Game/GameList/gameItem'
import JoinGame from '@/screens/Game/JoinGame/JoinGame'
import JoinGameQr from '@/screens/Game/JoinGame/JoinGameQr'
import JoinGameTypes from '@/screens/Game/JoinGame/JoinGameTypes'
import Play from '@/screens/Game/Play'
import Map from '@/screens/Map/Map'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AliasNavigator from './AliasNavigator'
import CalendarNavigator from './CalendarNavigator'
import CreateGameNavigator from './CreateGameNavigator'
import CrocodileNavigator from './CrocodileNavigator'
import MafiaNavigator from './MafiaNavigator'
import NotificationNavigator from './NotificationNavigator'
import TournamentNavigator from './TournamentNavigator'
// SCREENS END

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  const [isHome, setIsHome] = React.useState(true)

  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        tabBar={(props) => <TabBarButton {...props} setIsHome={setIsHome} />}
        screenOptions={{
          headerShown: false,
          tabBarVisible: false,
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: ICON,
          tabBarInactiveTintColor: ICON,
        }}
      >
        <Tab.Screen name={'Home'} component={HomeScreen} options={{ gestureEnabled: false }} />
        <Tab.Screen name={'Chat'} component={ChatScreen} />
        <Tab.Screen name={'Profile'} component={ProfileScreen} />
        {/* <Tab.Screen name={'NotificationNavigator'} component={NotificationNavigator} /> */}
      </Tab.Navigator>
      <CircleButton isHome={isHome} setIsHome={setIsHome} />
    </>
  )
}

const AppNavigator = () => {
  return (
    <>
      <Stack.Navigator screenOptions={NAV_HEADER_OPTION}>
        <Stack.Screen name={'TabNavigator'} component={TabNavigator} />
        <Stack.Screen name={'HomeScreen'} component={HomeScreen} />
        <Stack.Screen name={'NotificationNavigator'} component={NotificationNavigator} />
        <Stack.Screen name={'CalendarNavigator'} component={CalendarNavigator} />
        <Stack.Screen name={'Play'} component={Play} />
        <Stack.Screen name={'Game'} component={GameSelectScreen} />
        <Stack.Screen name={'JoinGame'} component={JoinGame} />
        <Stack.Screen name={'GameItem'} component={GameItem} />
        <Stack.Screen name={'JoinGameTypes'} component={JoinGameTypes} />
        <Stack.Screen name={'JoinGameQr'} component={JoinGameQr} />
        <Stack.Screen name={'CreateGameNavigator'} component={CreateGameNavigator} />
        <Stack.Screen name={'MafiaNavigator'} component={MafiaNavigator} />
        <Stack.Screen name={'AliasNavigator'} component={AliasNavigator} />
        <Stack.Screen name={'TournamentNavigator'} component={TournamentNavigator} />
        <Stack.Screen name={'CrocodileNavigator'} component={CrocodileNavigator} />
        <Stack.Screen name={'TeamNavigator'} component={TeamNavigator} />
        <Stack.Screen name={'ProfileNavigator'} component={ProfileNavigator} />
        <Stack.Screen name={'PrivateChat'} component={PrivateChat} />
        <Stack.Screen name={'GameList'} component={GameList} />
        <Stack.Screen name={'Map'} component={Map} />
      </Stack.Navigator>
    </>
  )
}

export default AppNavigator
