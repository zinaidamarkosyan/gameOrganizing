import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../Api'
import PushNotification from 'react-native-push-notification'

const initialState = {
  notifications: [],
  calendarGames: [],
  modalOptions: {
    type: null,
    body: null,
    visible: false,
  },
  userGalleries: [],
  notificationCount: null,
  messagesCount: null,
  otherUserGalleries: [],
}

export const AppSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setNotifications: (store, action) => {
      return {
        ...store,
        notifications: action.payload,
      }
    },
    setCalendarGames: (store, action) => {
      return {
        ...store,
        calendarGames: action.payload,
      }
    },
    setModalOptions: (store, action) => {
      return {
        ...store,
        modalOptions: action.payload,
      }
    },
    setModalVisible: (store, action) => {
      return {
        ...store,
        modalOptions: {
          ...store.modalOptions,
          visible: action.payload,
        },
      }
    },
    setUserGalleries: (store, action) => {
      return {
        ...store,
        userGalleries: action.payload,
      }
    },
    setDeleteGalleryFile: (store, action) => {
      const newUserGalleries = store.userGalleries.filter((item) => {
        return item?._id !== action.payload
      })
      return {
        ...store,
        userGalleries: newUserGalleries,
      }
    },
    setNotificationCount: (store, action) => {
      return {
        ...store,
        notificationCount: action.payload,
      }
    },
    setMessagesCount: (store, action) => {
      return {
        ...store,
        messagesCount: action.payload,
      }
    },
    setOtherUserGalleries: (store, action) => {
      return {
        ...store,
        otherUserGalleries: action.payload,
      }
    },
  },
})

export const notificationSettings = (e) => (dispatch) => {
  if (e.checked) {
    axiosInstance
      .post('api/profile/notification', JSON.stringify({ name: e?.label }))
      .then((response) => {})
      .catch((err) => {
        console.error('Error: request notification', err)
      })
  }
}
export const notificationButtonClciked = (notification_id) => (dispatch) => {
  axiosInstance.put(`/api/notification/click/${notification_id}`).catch((err) => {
    console.error('Error: request notification', err)
  })
}

export const getNotifications = () => (dispatch) => {
  axiosInstance
    .get('api/notification')
    .then((response) => {
      dispatch(setNotifications(response.data?.datas))
    })
    .catch((err) => {
      console.error('Error: request notification', err)
    })
}
export const deleteNotification = (id) => (dispatch) => {
  axiosInstance
    .delete(`api/notification/${id}`)
    .then((response) => {})
    .catch((err) => {
      console.error('Error: request notification', err)
    })
}
export const deleteAllNotifications = () => (dispatch) => {
  axiosInstance
    .delete('api/notification')
    .then((response) => {
      PushNotification.setApplicationIconBadgeNumber(0)
      dispatch(setNotifications([]))
    })
    .catch((err) => {
      console.error('Error: request notification', err)
    })
}

export const getCalendarGames = (data) => (dispatch) => {
  axiosInstance
    .get('api/create/game/by_date', {
      params: {
        date_from: data.date_from,
        date_to: data.date_to,
      },
    })
    .then((response) => {
      dispatch(setCalendarGames(response.data.datas))
    })
    .catch((err) => {
      console.error('Error: request notification', err)
    })
}
export const getGalleries = () => (dispatch) => {
  axiosInstance
    .get('api/user/user_game_files')
    .then((response) => {
      dispatch(setUserGalleries(response.data.data))
    })
    .catch((err) => {
      console.error('Error: request notification', err)
    })
}
export const getOtherUserGalleries = (user_id) => (dispatch) => {
  axiosInstance
    .get(`api/user/other_user_game_files/${user_id}`)
    .then((response) => {
      dispatch(setOtherUserGalleries(response.data.data))
    })
    .catch((err) => {
      console.error('Error: getOtherUserGalleries', err)
    })
}

export const deleteGalleryFile = (data) => (dispatch) => {
  axiosInstance
    .put('api/create/game/delete/create_game_file', data)
    .then(() => {
      dispatch(setDeleteGalleryFile(data.file_id))
    })
    .catch((err) => {
      console.error('Error: request notification', err)
    })
}
export const getNotificationCount = (data) => (dispatch) => {
  axiosInstance
    .get('api/notification/unread', data)
    .then((response) => {
      PushNotification.setApplicationIconBadgeNumber(response.data.count)
      dispatch(setNotificationCount(response.data.count))
    })
    .catch((err) => {
      console.error('Error: request notification', err)
    })
}
export const getMessagesCount = () => (dispatch) => {
  axiosInstance
    .get('/api/create/game/chat/messages/un_read_count')
    .then((response) => {
      console.log('response getMessagesCount', response.data)
      dispatch(setMessagesCount(response.data.count))
    })
    .catch((err) => {
      console.error('Error: getMessagesCount', err)
    })
}

export const {
  setNotifications,
  setCalendarGames,
  setModalOptions,
  setModalVisible,
  setUserGalleries,
  setDeleteGalleryFile,
  setNotificationCount,
  setMessagesCount,
  setOtherUserGalleries,
} = AppSlice.actions
export default AppSlice.reducer
