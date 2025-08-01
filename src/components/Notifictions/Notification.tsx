import React, { useState } from "react";
import Alert, { AlertColor } from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store/store";
import { hideNotification } from "../../redux/actions/notifSlice";

const Notification: React.FC = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state: RootState) => state.notif.notifications
  );
  //severity has 4 states ----> info, warning , success, error
  // Get all active notifications
  const activeNotifications = Object.entries(notifications)
    .filter(([_, notification]) => notification.open)
    .map(([name, notification]) => ({
      name,
      ...notification,
    }));

  if (activeNotifications.length === 0) {
    return null;
  }
  return (
    <>
      <Stack
        sx={{
          width: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9999,
          padding: "16px",
          boxSizing: "border-box",
        }}
        spacing={2}
      >
        {activeNotifications.map(({ name, message, severity }) => (
          <Alert
            key={name}
            variant="filled"
            severity={severity as AlertColor}
            onClose={() => dispatch(hideNotification(name))}
            sx={{ borderRadius: "8px" }}
          >
            {message}
          </Alert>
        ))}
      </Stack>
    </>
  );
};

export default Notification;
