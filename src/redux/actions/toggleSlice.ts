import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface ToggleState {
  toggles: {
    [key: string]: boolean
  }
}

const initialState: ToggleState = {
  toggles: {
    languageDropdown : false
  },
}

export const toggleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    // Toggle function on click
    clickToggle: (state, action: PayloadAction<string>) => {
      const toggleKey = action.payload
      state.toggles[toggleKey] = !state.toggles[toggleKey]
    },
    // Enable on hover
    hoverEnableToggle: (state, action: PayloadAction<string>) => {
      const id = action.payload
      state.toggles[id] = true
    },
    // Disable on hover
    hoverDisableToggle: (state, action: PayloadAction<string>) => {
      const id = action.payload
      state.toggles[id] = false
    },
  },
})

export const { clickToggle, hoverEnableToggle, hoverDisableToggle } = toggleSlice.actions

export default toggleSlice.reducer
