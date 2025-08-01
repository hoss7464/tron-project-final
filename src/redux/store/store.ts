import { configureStore } from '@reduxjs/toolkit'
import toggleReducer from "../actions/toggleSlice"
import refreshReducer from "../actions/refreshSlice"
import filterReducer from "../actions/filterSlice"
import notifReducer from "../actions/notifSlice"

export const store = configureStore({
  reducer: {
    toggle : toggleReducer,
    refresh : refreshReducer,
    filters : filterReducer,
    notif : notifReducer,
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
