import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../Api'
import { setPending } from './AuthSlice'

const initialState = {
  rules: '',
  step: 0,
  explainYou: null,
  loader: false,
  start: false,
  countWords: null,
  complexity: null,
  staticTime: null,
  crocodileGameId: null,
  youGuesser: null,
  explainerTeam: null,
  participateSuccess: null,
  playersInGame: [],
  reservedUsers: [],
  qrGameImg: false,
  stoping: true,
  time: 0,
  allTeams: [{ command: 1, value: 'Команда 1', members: [], points: 0 }],
  explainedWords: {
    truthy: [],
    falsy: [],
  },
  waitEndRound: false,
  penalty: false,
  explainerUser: null,
}

export const CrocodileSlice = createSlice({
  name: 'crocodile',
  initialState,
  reducers: {
    setRules: (store, action) => {
      return { ...store, rules: action.payload }
    },
    setCrocodileGameId: (store, action) => {
      return { ...store, crocodileGameId: action.payload }
    },
    setStoping: (store, action) => {
      return { ...store, stoping: action.payload }
    },
    setComplexity: (store, action) => {
      return { ...store, complexity: action.payload }
    },

    setTime: (store, action) => {
      return {
        ...store,
        time: action.payload,
      }
    },
    setExplainerUser: (store, action) => {
      return { ...store, explainerUser: action.payload }
    },
    setPlayersInGame: (store, action) => {
      return { ...store, playersInGame: action.payload }
    },
    setStaticRoundTime: (store, action) => {
      return { ...store, staticTime: action.payload }
    },
    setQrImg: (store, action) => {
      return { ...store, qrGameImg: action.payload }
    },
    setWords: (store, action) => {
      return { ...store, words: action.payload }
    },

    setUserIsOrganizer: (store, action) => {
      return {
        ...store,
        userIsOrganizer: action.payload,
      }
    },
    setReservedUsers: (store, action) => {
      return {
        ...store,
        reservedUsers: action.payload,
      }
    },
    setParticipateSuccess: (store, action) => {
      return {
        ...store,
        participateSuccess: action.payload,
      }
    },
    setStep: (store, action) => {
      return {
        ...store,
        step: action.payload,
      }
    },
    setTeams: (store, action) => {
      return {
        ...store,
        allTeams: action.payload,
      }
    },
    setStart: (store, action) => {
      return {
        ...store,
        start: action.payload,
      }
    },

    setCountWords: (store, action) => {
      return {
        ...store,
        countWords: action.payload,
      }
    },
    setExplainYou: (store, action) => {
      return {
        ...store,
        explainYou: action.payload,
      }
    },
    setYouGuesser: (store, action) => {
      return {
        ...store,
        youGuesser: action.payload,
      }
    },
    setExplainingUser: (store, action) => {
      return {
        ...store,
        explainingUser: action.payload,
      }
    },
    setExplainerTeam: (store, action) => {
      return {
        ...store,
        explainerTeam: action.payload,
      }
    },
    setExplainedWords: (store, action) => {
      return {
        ...store,
        explainedWords: action.payload,
      }
    },
    setLoader: (store, action) => {
      return {
        ...store,
        loader: action.payload,
      }
    },
    setWaitEndRound: (store, action) => {
      return {
        ...store,
        waitEndRound: action.payload,
      }
    },
    setPenalty: (store, action) => {
      return {
        ...store,
        penalty: action.payload,
      }
    },
  },
})
export const setPlayers = (teamInfo) => (dispatch) => {
  axiosInstance
    .post(`api/crocodile/confirm/team`, teamInfo)

    .catch((err) => {
      console.error('Error: setPlayers : response', err.response)
    })
}
export const sendCrocodileSettings = (data, allTeams) => (dispatch) => {
  axiosInstance
    .post('api/crocodile', data)
    .then((response) => {
      if (response.data?.data) {
        dispatch(setQrImg(response.data?.data?.qr_link))
        dispatch(setCrocodileGameId(response.data?.data?._id))
        dispatch(
          setTeams(allTeams.map((elm, i) => ({ ...elm, id: response.data.data.teams[i]._id }))),
        )
      }
    })
    .catch((err) => {
      console.error('Error: sending crocodile settings :', err)
    })
}

export const sendCrocodileGameId = (id) => (dispatch) => {
  dispatch(setPending(true))
  axiosInstance
    .post(`api/crocodile/participate/${id}`)
    .then(async (response) => {
      if (response.data?.data?.players) {
        dispatch(setPlayersInGame(response.data.data.players))
      }
      // console.log('sendCrocodileGameId', id)
      dispatch(setCrocodileGameId(id))
      dispatch(setParticipateSuccess(true))
    })
    .catch((err) => {
      dispatch(setParticipateSuccess(false))
      console.error('Error: sending crocodile game id :', err)
    })
}
export const startCrocodileGame = (gameId) => (dispatch) => {
  axiosInstance
    .post(`api/crocodile/start/${gameId}`)

    .catch((err) => {
      console.error('Error: startCrocodileGame esponse', err)
    })
}

export const cleanDataAndPlayAgain = (data) => (dispatch) => {
  dispatch(setWords([]))
  dispatch(setYouGuesser(null))
  dispatch(setExplainYou(null))
  dispatch(setPlayersInGame([]))
  dispatch(setReservedUsers([]))
  dispatch(setExplainerTeam(null))
  dispatch(setExplainerUser(null))
  dispatch(setParticipateSuccess(null))
}

export const {
  setTime,
  setStep,
  setQrImg,
  setTeams,
  setWords,
  setExplainYou,
  setWaitEndRound,
  setStart,
  setYouGuesser,
  setComplexity,
  setLoader,
  setExplainerUser,
  setCountWords,
  setStoping,
  setRules,
  setCrocodileGameId,
  setUserIsOrganizer,
  setReservedUsers,
  setExplainerTeam,
  setPlayersInGame,
  setStaticRoundTime,
  setParticipateSuccess,
  setExplainedWords,
  setPenalty,
} = CrocodileSlice.actions
export default CrocodileSlice.reducer
