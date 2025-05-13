//this slice is for refreshing the page when we submit data on server , so that myOrderComponent shows the data automatically.
// redux/slices/refreshSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface RefreshState {
  refreshTrigger: boolean;
}

const initialState: RefreshState = {
  refreshTrigger: false,
};

const refreshSlice = createSlice({
  name: 'refresh',
  initialState,
  reducers: {
    toggleRefresh: (state) => {
      state.refreshTrigger = !state.refreshTrigger;
    },
  },
});

export const { toggleRefresh } = refreshSlice.actions;
export default refreshSlice.reducer;
