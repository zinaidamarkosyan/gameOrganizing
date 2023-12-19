import GameCreatingSlice from './Slices/GameCreatingSlice'
import CrocodileSlice from './Slices/CrocodileSlice'
import { configureStore } from '@reduxjs/toolkit'
import MafiaSlice from './Slices/MafiaSlice'
import GamesSlice from './Slices/GamesSlice'
import ChatsSlice from './Slices/ChatsSlice'
import AliasSlice from './Slices/AliasSlice'
import AuthSlice from './Slices/AuthSlice'
import TeamSlice from './Slices/TeamSlice'
import AppSlice from './Slices/AppSlice'
import TournamentSlice from './Slices/TournamentSlice'

const store = configureStore({
  reducer: {
    app: AppSlice,
    auth: AuthSlice,
    game: GameCreatingSlice,
    games: GamesSlice,
    chats: ChatsSlice,
    teams: TeamSlice,
    mafia: MafiaSlice,
    alias: AliasSlice,
    crocodile: CrocodileSlice,
    tournament: TournamentSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
})

export default store
