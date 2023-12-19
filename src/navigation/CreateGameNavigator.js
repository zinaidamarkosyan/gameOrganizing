import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NAV_HEADER_OPTION } from '@/constants'
import ChooseGameType from '@/screens/GameCreating/ChooseGameType'
import GameListCarousel from '@/screens/GameCreating/GameListCarousel'
import GameCreating from '@/screens/GameCreating/GameCreating/GameCreating'
import GameTicket from '@/screens/GameCreating/GameTicket'
import CommandLeadCreate from '@/screens/Team/CommandLeadCreate/CreateGameInTeam'
import ChoosePlayers from '@/screens/Team/CommandLeadCreate/ChoosePlayers'
import CommandLeadNotCreate from '@/screens/Team/CommandLeadNotCreate/CommandLeadNotCreate'
import EditTeamInfo from '@/screens/Team/EditTeam/EditTeamInfo'
import TeamInfo from '@/screens/Team/CommandLeadNotCreate/TeamInfo'
import EditTeamPlayers from '@/screens/Team/CommandLeadNotCreate/EditTeamPlayers'
import OwnGameName from '@/screens/GameCreating/OwnGame/OwnGameName'
import AddPhoto from '@/screens/Game/FinishGame/AddPhoto'
import RatePlayers from '@/screens/Game/FinishGame/RatePlayers'

const Stack = createNativeStackNavigator()

const CreateGameNavigator = () => {
  return (
    <Stack.Navigator screenOptions={NAV_HEADER_OPTION}>
      <Stack.Screen name={'ChooseGameType'} component={ChooseGameType} />
      <Stack.Screen name={'GameListCarousel'} component={GameListCarousel} />
      <Stack.Screen name={'OwnGameName'} component={OwnGameName} />
      <Stack.Screen name={'CommandLeadCreate'} component={CommandLeadCreate} />
      <Stack.Screen name={'CommandLeadNotCreate'} component={CommandLeadNotCreate} />
      <Stack.Screen name={'EditTeamPlayers'} component={EditTeamPlayers} />
      <Stack.Screen name={'TeamInfo'} component={TeamInfo} />
      <Stack.Screen name={'TeamSearchInfo'} component={EditTeamInfo} />
      <Stack.Screen name={'ChoosePlayers'} component={ChoosePlayers} />
      <Stack.Screen name={'GameCreating'} component={GameCreating} />
      <Stack.Screen name={'GameTicket'} component={GameTicket} />
      <Stack.Screen name={'AddPhoto'} component={AddPhoto} />
      <Stack.Screen name={'RatePlayers'} component={RatePlayers} />
    </Stack.Navigator>
  )
}

export default CreateGameNavigator
