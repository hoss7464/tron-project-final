import React, { useEffect } from "react";
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

  useEffect(() => {
    const notifTime = Number(process.env.REACT_APP_ERROR_TIME)
    // Set timeouts for all active notifications
    const timeouts: NodeJS.Timeout[] = [];

    activeNotifications.forEach(({ name }) => {
      const timeout = setTimeout(() => {
        dispatch(hideNotification(name));
      }, notifTime); //time to vanish

      timeouts.push(timeout);
    });

    // Clean up timeouts when component unmounts or notifications change
    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [activeNotifications, dispatch]);

  if (activeNotifications.length === 0) {
    return null;
  }
  return (
    <>
      <Stack
        sx={{
          width: {
            xs: "95%",
            sm: "85%",
            md: "85%",
            lg: "62%",
          },
          position: "fixed",
          top: 0,
          right: 0,
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
