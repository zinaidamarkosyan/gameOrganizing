import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../Api'
import { setPending } from './AuthSlice'

const initialState = {
  rules: '',
  qrGame: false,
  qrLink: false,
  roles: null,
  participateSuccess: null,
  mafiaGameId: null,
  mafiaSocketOn: false,
  players: [],
  mafiaRole: null,
  addPlayersError: null,
  voteTime: 0,
  civiliansCount: 0,
  mafiasCount: 0,
  mafiaUsersId: [],
  loader: false,
  night: false,
  answerQuestions: [],
  sendAnswer: {},
  questionTruthfulness: null,
  waitNight: null,
  deadUser: [],
  playersRatings: [],
  winner: null,
  organizer: false,
  waitAnswer: false,
  equalVotes: null,
  donVotedPlayers: [],
  answersCount: 0,
}

export const MafiaSlice = createSlice({
  name: 'mafia',
  initialState,
  reducers: {
    setOrganizer: (store, action) => {
      return {
        ...store,
        organizer: action.payload,
      }
    },
    setRules: (store, action) => {
      return {
        ...store,
        rules: action.payload,
      }
    },
    setQrGame: (store, action) => {
      return {
        ...store,
        qrGame: action.payload,
      }
    },
    setQrLink: (store, action) => {
      return {
        ...store,
        qrLink: action.payload,
      }
    },
    setRoles: (store, action) => {
      return {
        ...store,
        roles: action.payload,
      }
    },
    setParticipateSuccess: (store, action) => {
      return {
        ...store,
        participateSuccess: action.payload,
      }
    },
    setMafiaGameId: (store, action) => {
      return {
        ...store,
        mafiaGameId: action.payload,
      }
    },
    setMafiaSocketOn: (store, action) => {
      return {
        ...store,
        mafiaSocketOn: action.payload,
      }
    },
    setPlayers: (store, action) => {
      return {
        ...store,
        players: action.payload,
      }
    },
    setAddPlayersError: (store, action) => {
      return {
        ...store,
        addPlayersError: action.payload,
      }
    },
    setMafiaRole: (store, action) => {
      return {
        ...store,
        mafiaRole: action.payload,
      }
    },
    setVoteTime: (store, action) => {
      return {
        ...store,
        voteTime: action.payload,
      }
    },
    setCiviliansCount: (store, action) => {
      return {
        ...store,
        civiliansCount: action.payload,
      }
    },
    setMafiasCount: (store, action) => {
      return {
        ...store,
        mafiasCount: action.payload,
      }
    },
    setMafiaUsersId: (store, action) => {
      return {
        ...store,
        mafiaUsersId: action.payload,
      }
    },
    setLoader: (store, action) => {
      return {
        ...store,
        loader: action.payload,
      }
    },
    setNight: (store, action) => {
      return {
        ...store,
        night: action.payload,
      }
    },
    setWaitNight: (store, action) => {
      return {
        ...store,
        waitNight: action.payload,
      }
    },
    setAnswerQuestions: (store, action) => {
      return {
        ...store,
        answerQuestions: action.payload,
      }
    },
    setSendAnswer: (store, action) => {
      return {
        ...store,
        sendAnswer: action.payload,
      }
    },
    setQuestionTruthfulness: (store, action) => {
      if (store.waitAnswer) {
        return {
          ...store,
          questionTruthfulness: action.payload,
        }
      }
      return store
    },
    setDeadUser: (store, action) => {
      return {
        ...store,
        deadUser: action.payload,
      }
    },
    setPlayersRatings: (store, action) => {
      return {
        ...store,
        playersRatings: action.payload,
      }
    },
    setWinner: (store, action) => {
      return {
        ...store,
        winner: action.payload,
      }
    },
    setWaitAnswer: (store, action) => {
      return {
        ...store,
        waitAnswer: action.payload,
      }
    },
    setEqualVotes: (store, action) => {
      return {
        ...store,
        equalVotes: action.payload,
      }
    },
    setDonVotedPlayers: (store, action) => {
      return {
        ...store,
        donVotedPlayers: action.payload,
      }
    },
    setAnswersCount: (store, action) => {
      return {
        ...store,
        answersCount: action.payload,
      }
    },
  },
})

export const postSettings = (data) => (dispatch) => {
  dispatch(setPending(true))
  axiosInstance
    .post('api/game/mafia', data)
    .then((response) => {
      dispatch(setQrLink(response.data?.data?.qr_link))
      dispatch(setMafiaGameId(response.data?.data?._id))
      dispatch(setRoles(response.data?.roles))

      dispatch(setPending(false))
    })
    .catch((err) => {
      console.error('Error: postSettings', err)

      dispatch(setPending(false))
    })
}
export const getDictonary = (mafia_game_id) => (dispatch) => {
  dispatch(setPending(true))
  axiosInstance
    .get(`/api/game/mafia/dictonary/${mafia_game_id}`)

    .catch((err) => {
      dispatch(setParticipateSuccess(false))
      console.error('Error: request participateToGame', err.request._response)
    })
  dispatch(setPending(false))
}
export const participateToGame = (mafia_game_id) => (dispatch) => {
  dispatch(setPending(true))
  axiosInstance
    .post(`/api/game/mafia/participate/${mafia_game_id}`)
    .then((response) => {
      dispatch(setRoles(response.data?.all_roles))
      dispatch(setMafiaGameId(mafia_game_id))
      dispatch(setParticipateSuccess(true))
    })
    .catch((err) => {
      dispatch(setParticipateSuccess(false))
      console.error('Error: request participateToGame', err.request._response)
    })
  dispatch(setPending(false))
}

export const startGame = (mafia_game_id) => (dispatch) => {
  dispatch(setPending(true))
  axiosInstance
    .post(`/api/game/mafia/start/${mafia_game_id}`)
    .then(() => {})
    .catch((err) => {
      dispatch(setAddPlayersError(true))
      console.error('Error: request startGame', err.request._response)
    })
  dispatch(setPending(false))
}
export const resetGame = (mafia_game_id) => (dispatch) => {
  dispatch(setPending(true))
  axiosInstance
    .post(`/api/game/mafia/reset/${mafia_game_id}`)
    .then((e) => {
      dispatch(clearAllDatas())
    })
    .catch((err) => {
      dispatch(setAddPlayersError(true))
      console.error('Error: request startGame', err.request._response)
    })
  dispatch(setPending(false))
}
export const clearAllDatas = (navigation) => (dispatch) => {
  if (navigation) {
    navigation?.navigate('TabNavigator', { screen: 'Home' })
  }
  dispatch(setAddPlayersError(null))
  dispatch(setQrGame(false))
  dispatch(setQrLink(false))
  dispatch(setParticipateSuccess(null))
  dispatch(setMafiaGameId(null))
  dispatch(setMafiaSocketOn(false))
  dispatch(setPlayers([]))
  dispatch(setMafiaRole(null))
  dispatch(setVoteTime(0))
  dispatch(setCiviliansCount(0))
  dispatch(setMafiasCount(0))
  dispatch(setMafiaUsersId([]))
  dispatch(setLoader(false))
  dispatch(setNight(false))
  dispatch(setAnswerQuestions([]))
  dispatch(setWaitNight(null))
  dispatch(setSendAnswer({}))
  dispatch(setQuestionTruthfulness(null))
  dispatch(setDeadUser([]))
  dispatch(setPlayersRatings([]))
  dispatch(setWinner(null))
  dispatch(setOrganizer(false))
  dispatch(setWaitAnswer(false))
  dispatch(setEqualVotes(null))
  dispatch(setDonVotedPlayers([]))
  dispatch(setAnswersCount(0))
}

export const {
  setRules,
  setQrGame,
  setQrLink,
  setRoles,
  setParticipateSuccess,
  setMafiaGameId,
  setMafiaSocketOn,
  setPlayers,
  setMafiaRole,
  setAddPlayersError,
  setVoteTime,
  setCiviliansCount,
  setMafiaUsersId,
  setMafiasCount,
  setLoader,
  setNight,
  setWaitNight,
  setAnswerQuestions,
  setSendAnswer,
  setQuestionTruthfulness,
  setDeadUser,
  setPlayersRatings,
  setWinner,
  setOrganizer,
  setWaitAnswer,
  setEqualVotes,
  setDonVotedPlayers,
  setAnswersCount,
} = MafiaSlice.actions
export default MafiaSlice.reducer
