import React from "react";
import { useLocation } from "react-router-dom";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Close as CloseIcon,
  Home as HomeIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  Mail as MailIcon,
} from "@mui/icons-material";
import {
  NavLink,
  NavMarketIcon,
  NavBuyersIcon,
  NavSellersIcon,
  NavbarLogoWrapper, 
  NavbarLogo
} from "../Navbar/NavElements";
import Logo from "../../assets/svg/Logo/Logo3.svg"

interface RightSidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<RightSidebarProps> = ({ open, onClose }) => {
  const Location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const menuItems = [
    {
      text: "Market",
      icon: <NavMarketIcon />,
      to: "/",
    },
    {
      text: "Buyers",
      icon: <NavBuyersIcon />,
      to: "/Buyers",
    },
    {
      text: "Sellers",
      icon: <NavSellersIcon />,
      to: "/Sellers",
    },
  ];
  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        sx={{
          "& .MuiDrawer-paper": {
            width: isMobile ? "100%" : 300,
            boxSizing: "border-box",
            backgroundColor: "#ffffff",
          },
        }}
        ModalProps={{
          keepMounted: true,
          BackdropProps: {
            sx: {
              backdropFilter: "blur(8px)",
              background: "rgba(255, 255, 255, 0.5)",
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: theme.spacing(1, 2),
            color: theme.palette.primary.contrastText,
          }}
        >
          <NavbarLogoWrapper>
            <NavbarLogo src={Logo} />
          </NavbarLogoWrapper>
          <IconButton
            onClick={onClose}
            sx={{ color: "#003543" }}
            aria-label="close sidebar"
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        <Box sx={{ padding: theme.spacing(2) }}>

          <List>
            {menuItems.map((item, index) => (
              <ListItem key={index} disablePadding sx={{ display: "block", mt : 1 }}>
                <NavLink
                  to={item.to}
                  style={
                    Location.pathname === item.to
                      ? { backgroundColor: "#003543", color: "#ffffff" }
                      : { backgroundColor: "", color: "#003543" }
                  }
                >
                  <ListItemIcon sx={{ color: "inherit", minWidth: "40px" }}>
                    {item.icon}
                  </ListItemIcon>
                  {item.text}
                </NavLink>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
