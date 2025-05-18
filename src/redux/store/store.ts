import { configureStore } from '@reduxjs/toolkit'
import toggleReducer from "../actions/toggleSlice"
import refreshReducer from "../actions/refreshSlice"
import filterReducer from "../actions/filterSlice"

export const store = configureStore({
  reducer: {
    toggle : toggleReducer,
    refresh : refreshReducer,
    filters : filterReducer,
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
