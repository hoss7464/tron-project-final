import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Notification {
  message: string;
  severity: 'error' | 'warning' | 'info' | 'success';
  open: boolean;
}

interface NotificationState {
  notifications: {
    [key: string]: Notification;
  };
}

const initialState: NotificationState = {
  notifications: {},
};

export const notifSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (state, action: PayloadAction<{
      name: string;
      message: string;
      severity?: 'error' | 'warning' | 'info' | 'success';
    }>) => {
      const { name, message, severity } = action.payload;
      state.notifications[name] = {
        message,
        severity: severity || 'info',
        open: true,
      };
    },
    hideNotification: (state, action: PayloadAction<string>) => {
      const name = action.payload;
      if (state.notifications[name]) {
        state.notifications[name].open = false;
      }
    },
  },
});

export const { showNotification, hideNotification} = notifSlice.actions;

export default notifSlice.reducer;