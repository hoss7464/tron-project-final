import { configureStore } from '@reduxjs/toolkit'
import toggleReducer from "../actions/toggleSlice"
import refreshReducer from "../actions/refreshSlice"

export const store = configureStore({
  reducer: {
    toggle : toggleReducer,
    refresh : refreshReducer
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
