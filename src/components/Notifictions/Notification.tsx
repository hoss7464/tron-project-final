import React, { useEffect } from "react";
import Alert from "@mui/joy/Alert";
import AspectRatio from "@mui/joy/AspectRatio";
import IconButton from "@mui/joy/IconButton";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import LinearProgress from "@mui/joy/LinearProgress";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store/store";
import { hideNotification } from "../../redux/actions/notifSlice";
import Check from "@mui/icons-material/Check";
import Close from "@mui/icons-material/Close";
import Warning from "@mui/icons-material/Warning";
import Error from "@mui/icons-material/Error";
import Info from "@mui/icons-material/Info";

// Icon mapping based on severity
const severityIcons = {
  success: Check,
  error: Error,
  warning: Warning,
  info: Info,
};

// Title mapping based on severity
const severityTitles = {
  success: "Success",
  error: "Error",
  warning: "Warning",
  info: "Information",
};

// Map your severity types to MUI's color palette
const severityToColor = {
  success: "success",
  error: "danger",
  warning: "warning",
  info: "primary"
} as const;

// Gradient backgrounds for each severity type
const severityGradients = {
  success: 'linear-gradient(90deg,rgba(0, 53, 67, 1) 0%, rgba(176, 192, 197, 1) 100%)',
  error: 'linear-gradient(90deg,rgba(67, 14, 0, 1) 0%, rgba(197, 180, 176, 1) 100%)',
  warning: 'linear-gradient(135deg, #FF9800 0%, #FFA726 50%, #FFB74D 100%)',
  info: 'linear-gradient(135deg, #2196F3 0%, #42A5F5 50%, #64B5F6 100%)'
} as const;

// Custom icon colors for each severity
const severityIconColors = {
  success: '#003543', // White for success icon
  error: '#430e00',   // White for error icon
  warning: '#FFFFFF', // White for warning icon
  info: '#FFFFFF'     // White for info icon
} as const;

const Notification: React.FC = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state: RootState) => state.notif.notifications
  );

  // Get all active notifications
  const activeNotifications = Object.entries(notifications)
    .filter(([_, notification]) => notification.open)
    .map(([name, notification]) => ({
      name,
      ...notification,
    }));

  useEffect(() => {
    const notifTime = Number(process.env.REACT_APP_ERROR_TIME);
    // Set timeouts for all active notifications
    const timeouts: NodeJS.Timeout[] = [];

    activeNotifications.forEach(({ name }) => {
      const timeout = setTimeout(() => {
        dispatch(hideNotification(name));
      }, notifTime); // time to vanish

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
    <Stack
      spacing={2}
      sx={{
        width: {
          xs: "100%",
          sm: "100%",
          md: "45%",
          lg: "35%",
        },
        position: "fixed",
     
        zIndex: 9999,
        padding: "16px",
        boxSizing: "border-box",
      }}
    >
      {activeNotifications.map(({ name, message, severity }) => {
        const IconComponent = severityIcons[severity];
        const color = severityToColor[severity];
        const gradient = severityGradients[severity];
        const iconColor = severityIconColors[severity];
        
        return (
          <Alert
            key={name}
            size="lg"
            color={color}
            variant="solid"
            invertedColors
            sx={{
              background: gradient,
              alignItems: 'flex-start',
              overflow: 'hidden',
              // Ensure text remains visible against gradient background
              '& .MuiAlert-message': {
                color: 'white',
              }
            }}
            startDecorator={
              <AspectRatio
                variant="solid"
                ratio="1"
                sx={{
                  minWidth: 40,
                  borderRadius: '50%',
                  boxShadow: '0 2px 12px 0 rgb(0 0 0/0.2)',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                }}
              >
                <div>
                  <IconComponent sx={{ fontSize: "2rem", color: iconColor }} />
                </div>
              </AspectRatio>
            }
            endDecorator={
              <IconButton
                variant="plain"
                sx={{
                  '--IconButton-size': '32px',
                  transform: 'translate(0.5rem, -0.5rem)',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  }
                }}
                onClick={() => dispatch(hideNotification(name))}
              >
                <Close />
              </IconButton>
            }
          >
            <div>
              <Typography level="title-lg" sx={{ color: 'white' }}>
                {severityTitles[severity]}
              </Typography>
              <Typography level="body-sm" sx={{ color: 'white' }}>
                {message}
              </Typography>
            </div>
            <LinearProgress
              variant="solid"
              color={color}
              value={40}
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                borderRadius: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                }
              }}
            />
          </Alert>
        );
      })}
    </Stack>
  );
};

export default Notification;