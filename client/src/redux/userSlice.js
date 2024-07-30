import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  onlineUser: [],
  socketConnection: null
}


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    logout: (state, action) => {
      state.user = null
      state.socketConnection = null
    },
    setOnlineUser: (state, action) => {
      state.onlineUser = action.payload
    },
    setSocketConnection: (state, action) => {
      state.socketConnection = action.payload
    }
  }
})

export const { setUser, logout, setOnlineUser, setSocketConnection } = userSlice.actions

export default userSlice.reducer