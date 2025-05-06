import { configureStore } from '@reduxjs/toolkit'
import toggleReducer from "../actions/toggleSlice"

export const store = configureStore({
  reducer: {
    toggle : toggleReducer
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
