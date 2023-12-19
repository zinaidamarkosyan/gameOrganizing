import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../Api'

const initialState = {
  number_of_players_from: null,
  number_of_players_to: null,
  age_restrictions_from: null,
  age_restrictions_to: null,
  players_gender: 'm/f',
  latitude: 0,
  longitude: 0,
  organizer_in_the_game: true,
  ticket_price: 0,
  game: '',
  address_name: '',
  gameCreatedSuccessful: null,
  game_name: '',
  game_description: '',
}

export const GameCreatingSlice = createSlice({
  name: 'CreateGameSlice',
  initialState,
  reducers: {
    setStart_date: (store, action) => {
      return {
        ...store,
        start_date: action.payload,
      }
    },
    setNumber_of_players_from: (store, action) => {
      return {
        ...store,
        number_of_players_from: action.payload,
      }
    },
    setNumber_of_players_to: (store, action) => {
      return {
        ...store,
        number_of_players_to: action.payload,
      }
    },
    setAge_restrictions_from: (store, action) => {
      return {
        ...store,
        age_restrictions_from: action.payload,
      }
    },
    setAge_restrictions_to: (store, action) => {
      return {
        ...store,
        age_restrictions_to: action.payload,
      }
    },
    setPlayers_gender: (store, action) => {
      return {
        ...store,
        players_gender: action.payload,
      }
    },
    setLatitude: (store, action) => {
      return {
        ...store,
        latitude: action.payload,
      }
    },
    setLongitude: (store, action) => {
      return {
        ...store,
        longitude: action.payload,
      }
    },
    setPlaceName: (store, action) => {
      return {
        ...store,
        address_name: action.payload,
      }
    },
    setEnd_Date: (store, action) => {
      return {
        ...store,
        end_date: action.payload,
      }
    },
    setOrganizer_in_the_game: (store, action) => {
      return {
        ...store,
        organizer_in_the_game: action.payload,
      }
    },
    setTicket_price: (store, action) => {
      return {
        ...store,
        ticket_price: action.payload,
      }
    },
    setGameDescription: (store, action) => {
      return {
        ...store,
        game_description: action.payload,
      }
    },
    setGameName: (store, action) => {
      return {
        ...store,
        game_name: action.payload,
      }
    },
    setGame: (store, action) => {
      return {
        ...store,
        game: action.payload,
      }
    },
    setInitialState: (store, action) => {
      return { ...action.payload }
    },
    setGameCreatedSuccessful: (store, action) => {
      return {
        ...store,
        gameCreatedSuccessful: action.payload,
      }
    },
  },
})

export const createGame = (data, callBack) => (dispatch) => {
  axiosInstance
    .post('api/create/game', data)
    .then((res) => {
      if (res.data.message == 'Created successfully') {
        dispatch(setGameCreatedSuccessful(true))
        callBack()
      }
    })
    .catch((err) => {
      console.error('Error: createGame', err)
    })
}
export const clearInitialState = () => (dispatch) => {
  dispatch(
    setInitialState({
      number_of_players_from: null,
      number_of_players_to: null,
      age_restrictions_from: null,
      age_restrictions_to: null,
      players_gender: 'm/f',
      latitude: 0,
      longitude: 0,
      organizer_in_the_game: true,
      ticket_price: 0,
      game: '',
      address_name: '',
      gameCreatedSuccessful: null,
      game_name: '',
      game_description: '',
    }),
  )
}

export const {
  setStart_date,
  setNumber_of_players_from,
  setNumber_of_players_to,
  setAge_restrictions_from,
  setAge_restrictions_to,
  setPlayers_gender,
  setLatitude,
  setLongitude,
  setPlaceName,
  setGameName,
  setEnd_Date,
  setOrganizer_in_the_game,
  setTicket_price,
  setGameDescription,
  setGame,
  setInitialState,
  setGameCreatedSuccessful,
} = GameCreatingSlice.actions
export default GameCreatingSlice.reducer
