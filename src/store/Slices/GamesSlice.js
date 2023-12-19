import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../Api'
import { setModalOptions } from './AppSlice'

const initialState = {
  games: [],
  nameOfGames: [],
  gameFinishPhoto: null,
}

export const GameSlice = createSlice({
  name: 'gameSlice',
  initialState,
  reducers: {
    setGames: (store, action) => {
      return {
        ...store,
        games: action.payload,
      }
    },
    setNames: (store, action) => {
      return {
        ...store,
        nameOfGames: action.payload,
      }
    },
    setGameFinishPhoto: (store, action) => {
      return {
        ...store,
        gameFinishPhoto: action.payload,
      }
    },
  },
})

export const getGames = () => (dispatch) => {
  axiosInstance
    .get(`api/game`)
    .then((response) => {
      dispatch(setGames(response.data.games))
    })
    .catch((err) => {
      console.error('Error: request', err.request._response)
    })
}
export const getGamesOnlyNames = () => (dispatch) => {
  axiosInstance
    .get('api/game')
    .then((response) => {
      dispatch(
        setNames(
          response.data.games.map((elm) => {
            return {
              name: elm.name,
              checked: false,
              id: elm._id,
            }
          }),
        ),
      )
    })
    .catch((err) => {
      console.error('Error: getting games : ', err)
    })
}
export const participateToGame = (gameId) => (dispatch) => {
  axiosInstance
    .post(`api/create/game/player/confirm/${gameId}`)
    .then((response) => {
      console.log('participateToGame response', response.data)
      dispatch(
        setModalOptions({
          visible: true,
          type: 'message',
          body: 'Вы подключились к игру',
        }),
      )
    })
    .catch((err) => {
      console.error('Error: request', err.request._response)
    })
}
export const confirmPhotoAfterFinishGame = (data) => (dispatch) => {
  axiosInstance
    .put(`api/create/game/confirm_file`, data)
    .then((response) => {
      console.log('confirmPhotoAfterFinishGame result', response.data)
    })
    .catch((err) => {
      console.error('Error: confirmPhotoAfterFinishGame', err.request._response)
    })
}

export const callEndGame = (game_id) => (dispatch) => {
  axiosInstance
    .post(`api/create/game/player/end/${game_id}`)
    .then((response) => {
      console.log('callEndGame result', response.data)
    })
    .catch((err) => {
      console.error('Error: callEndGame', err.request._response)
    })
}
export const ratePlayersAfterFinishGame = (data, navigation) => (dispatch) => {
  axiosInstance
    .post(`api/create/game/create_game/rating`, data)
    .then((response) => {
      console.log('ratePlayersAfterFinishGame result', response.data)
      navigation.navigate('Home')
    })
    .catch((err) => {
      console.error('Error: ratePlayersAfterFinishGame', err.request._response)
    })
}
export const rateOrganizerAfterFinishGame = (data) => (dispatch) => {
  axiosInstance
    .post(`api/create/game/create_game/organizer_rating`, data)
    .then((response) => {
      console.log('rateOrganizerAfterFinishGame result', response.data)
    })
    .catch((err) => {
      console.error('Error: rateOrganizerAfterFinishGame', err.request._response)
    })
}
export const followUser = (data) => (dispatch) => {
  axiosInstance
    .post(`api/user/follow`, data)
    .then((response) => {
      console.log('followUser result', response.data)
    })
    .catch((err) => {
      console.error('Error: followUser', err.request._response)
    })
}
export const getGameById = (create_game_id, navigation) => (dispatch) => {
  axiosInstance
    .get(`api/create/game/${create_game_id}`)
    .then((response) => {
      if (response.data.data) {
        navigation.replace('CreateGameNavigator', {
          screen: 'GameCreating',
          params: { editGame: response.data.data },
        })
      }
    })
    .catch((err) => {
      console.error('Error: getGameById', err.request._response)
    })
}

export const { setGames, setNames, setGameFinishPhoto } = GameSlice.actions
export default GameSlice.reducer
