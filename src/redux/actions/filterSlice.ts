import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  [key: string]: string;
}

const initialState: FilterState = {};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilter: (
      state,
      action: PayloadAction<{ listKey: string; value: string }>
    ) => {
      const { listKey, value } = action.payload;
      state[listKey] = value;
    },
    resetFilter: (state, action: PayloadAction<{ listKey: string }>) => {
      const { listKey } = action.payload;
      delete state[listKey];
    },
  },
});

export const { setFilter, resetFilter } = filterSlice.actions;
export default filterSlice.reducer;
