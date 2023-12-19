import { createSlice } from '@reduxjs/toolkit'
import { Platform } from 'react-native'
import axiosInstance from '../Api'
const initialState = {
  teamChatsList: [],
  findedTeam: [],
  members: [],
  findedGames: [],
  findedPlayers: [],
  savedTeam: null,
  betweenPlayers: false,
  choosedTeamGame: null,
  searchPending: false,
  myTeams: [],
  myJoinedTeams: [],
}
export const TeamSlice = createSlice({
  name: 'teamSlice',
  initialState,
  reducers: {
    setTeamChats: (store, action) => {
      return {
        ...store,
        teamChatsList: action.payload,
      }
    },
    setFindedTeam: (store, action) => {
      return {
        ...store,
        findedTeam: action.payload,
      }
    },
    setFindedGames: (store, action) => {
      return {
        ...store,
        findedGames: action.payload,
      }
    },
    setMembersInTeam: (store, action) => {
      return {
        ...store,
        members: action.payload,
      }
    },
    setBetweenPlayers: (store, action) => {
      return {
        ...store,
        betweenPlayers: action.payload,
      }
    },
    saveTeamDataForCreating: (store, action) => {
      return {
        ...store,
        savedTeam: action.payload,
      }
    },
    setFindedPlayers: (store, action) => {
      return {
        ...store,
        findedPlayers: action.payload,
      }
    },
    setChoosedTeamGame: (store, action) => {
      return {
        ...store,
        choosedTeamGame: action.payload,
      }
    },
    setSearchPending: (store, action) => {
      return {
        ...store,
        searchPending: action.payload,
      }
    },
    setMyTeams: (store, action) => {
      return {
        ...store,
        myTeams: action.payload,
      }
    },
    setMyJoinedTeams: (store, action) => {
      return {
        ...store,
        myJoinedTeams: action.payload,
      }
    },
  },
})
export const getTeams = (setModalVisible) => (dispatch) => {
  axiosInstance
    .get('api/team/')
    .then((response) => {
      if (response?.data?.datas?.length) {
        dispatch(setTeamChats(response?.data?.datas))
        setModalVisible && setModalVisible(false)
      } else {
        setModalVisible && setModalVisible(true)
      }
    })
    .catch((err) => {
      setModalVisible && setModalVisible(true)
      console.error('Error: getting team chats', err)
    })
}
export const searchPlayer = (data) => (dispatch) => {
  dispatch(setSearchPending(true))
  axiosInstance
    .get(`/api/team/find/user/`, { params: data })
    .then((response) => {
      dispatch(setFindedPlayers(response.data.users))
      dispatch(setSearchPending(false))
    })

    .catch((err) => {
      console.error('Error: finding player :', err)
      dispatch(setSearchPending(false))
    })
}
export const inviteUserToTeam =
  (data, setModalVisible = () => {}) =>
  (dispatch) => {
    axiosInstance
      .patch('/api/team/invite', data)
      .then((e) => {
        console.log('inviteUserToTeam', e.data)
        setModalVisible(true)
      })

      .catch((err) => {
        console.error('Error: inviting player inviteUserToTeam :', JSON.stringify(err.response))
      })
  }
export const joinPlayerTeam =
  (data, setModalVisible = () => {}) =>
  (dispatch) => {
    axiosInstance
      .put('/api/team/join_player', data)
      .then((e) => {
        if (e.data.message) setModalVisible(e.data.message)
      })

      .catch((err) => {
        console.error('Error: inviting player joinPlayerTeam :', err)
      })
  }

export const setPlayerAdmin = (data, setModalVisible) => (dispatch) => {
  axiosInstance
    .patch('/api/team/become_admin', data)
    .then((response) => {
      if (response.data.message) setModalVisible(response.data.message)
    })
    .catch((err) => {
      console.error('Error: set user admin :', err)
    })
}
export const deletePlayerFromTeam =
  (data, callback = () => {}) =>
  (dispatch) => {
    axiosInstance
      .delete('/api/team/players', data)
      .then((response) => {
        callback()
        console.log(response.data)
      })
      .catch((err) => {
        console.error('Error: delete user from team :', err)
      })
  }
export const searchTeam =
  (teamId, isEmpty = () => {}, nav, navText, sendingData) =>
  async (dispatch) => {
    axiosInstance
      .get(`api/team?id_or_name=${teamId}`)
      .then(async (response) => {
        if (response?.data?.datas?.length) {
          await dispatch(setFindedTeam(response.data?.datas))
          nav.navigate(navText, sendingData ? sendingData : null)
          isEmpty(false)
        } else {
          isEmpty(true)
        }
      })
      .catch((err) => {
        dispatch(setFindedTeam([]))
        isEmpty(true)
        console.error('Error: searching team', err)
      })
  }
export const getMembersList = (teamId) => async (dispatch) => {
  axiosInstance.get(`api/team/players/${teamId}`).catch((err) => {
    console.error('Error: searching players in this team :', err)
  })
}
export const joinGame = (gameId, nav, setError, setModalVisible) => async (dispatch) => {
  axiosInstance
    .post(`api/participate/${gameId}`)
    .then((response) => {
      if (response.data.message !== 'Success') {
        setError(response.data.message)
        setModalVisible(true)
      } else {
        setModalVisible(false), nav.navigate('Home')
      }
    })
    .catch((err) => {
      console.error('Error: joining to game :', err)
    })
}
export const joinInTeam = (teamId, setModalVisible) => async (dispatch) => {
  axiosInstance
    .put(`api/team/join_player`, { team_id: teamId })
    .then((response) => {
      setModalVisible(response.data.message)
    })
    .catch((err) => {
      console.error('Error: joining to team :', err)
    })
}
export const searchGame = (data, nav, setError) => async (dispatch) => {
  axiosInstance
    .get('api/create/game/', {
      params: data,
    })

    .then((response) => {
      dispatch(setFindedGames(response?.data?.datas))
      if (response?.data?.datas.length) {
        nav.navigate('GameList')
      } else {
        setError(true)
        setTimeout(() => {
          setError(false)
        }, 2500)
      }
    })
    .catch((err) => {
      console.error('Error: searching players in this team :', err?.message)
    })
}

export const createTeam = (data, token, setModalVisible = () => {}) => {
  let myHeaders = new Headers()
  myHeaders.append('Content-Type', 'multipart/form-data')
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Accept', 'application/json')

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: data,
  }
  fetch(`${Platform.OS == 'ios' ? 'https' : 'http'}://to-play.ru/api/team`, requestOptions)
    .then((response) => {
      setModalVisible(true)
    })
    .catch((err) => {
      console.error('Error: creating team :', err)
    })
}
export const createTeamGame = (data, setModalVisible) => (dispatch) => {
  axiosInstance
    .post('api/team/create/game', data)
    .then((response) => {
      setModalVisible([true, 'ok'])
    })
    .catch((err) => {
      setModalVisible([true, 'error'])
      console.error('Error: creating game with team :', err.request)
    })
}
export const getMyTeams = (setModalVisible) => (dispatch) => {
  axiosInstance
    .get('/api/team/my_teams')
    .then((response) => {
      if (response?.data?.datas?.length) {
        dispatch(setMyTeams(response?.data?.datas))
        setModalVisible && setModalVisible(false)
      } else {
        setModalVisible && setModalVisible(true)
      }
    })
    .catch((err) => {
      console.error('Error: getMyTeams :', err.request)
    })
}
export const getMyJoinedTeams = () => (dispatch) => {
  axiosInstance
    .get('/api/team/my_joined_teams')
    .then((response) => {
      dispatch(setMyJoinedTeams(response?.data?.datas))
    })
    .catch((err) => {
      console.error('Error: getMyJoinedTeams :', err.request)
    })
}

export const {
  setTeamChats,
  saveTeamDataForCreating,
  setFindedTeam,
  setMembersInTeam,
  setFindedGames,
  setFindedPlayers,
  setBetweenPlayers,
  setChoosedTeamGame,
  setSearchPending,
  setMyTeams,
  setMyJoinedTeams,
} = TeamSlice.actions
export default TeamSlice.reducer
