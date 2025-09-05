import React from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTronWallet } from "../../contexts/TronWalletContext";
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
  FormControl,
  MenuItem,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
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
  NavbarLogo,
  TranslateWrapper,
  ConnectWrapper,
  ConnectIconWrapper,
  ConnectIcon,
  ConnectBtn,
  ConnectText,
} from "../Navbar/NavElements";
import Logo from "../../assets/svg/Logo/Logo3.svg";

interface RightSidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<RightSidebarProps> = ({ open, onClose }) => {
  const { address } = useTronWallet();
  const [age, setAge] = React.useState("EN");
  const { t, i18n } = useTranslation();
  const Location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  const shortenAddress = (address: string) => {
    if (address.length <= 6) return address;
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

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
  if (!address) {
    return null;
  }
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
          <TranslateWrapper style={{ width: "100%" }}>
            <FormControl sx={{ width: "100%" }}>
              <Select
                value={age}
                onChange={handleChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                sx={{
                  height: 38,
                  borderRadius: "10px",
                  color: "#003543",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#003543", // default border color
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#003543", // Border color on hover
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#003543", // border on focus
                  },
                  "& .MuiSelect-icon": {
                    color: "#003543", // arrow icon color
                  },
                }}
                MenuProps={{
                  disableScrollLock: true,
                  PaperProps: {
                    sx: {
                      width: 100,
                    },
                  },
                }}
              >
                <MenuItem value="EN" onClick={() => i18n.changeLanguage("en")}>
                  <span
                    className="flag-icon flag-icon-gb mx-2"
                    style={{ marginRight: "0.5rem" }}
                  ></span>
                  EN
                </MenuItem>
                <MenuItem value="JA" onClick={() => i18n.changeLanguage("ja")}>
                  <span
                    className="flag-icon flag-icon-jp mx-2"
                    style={{ marginRight: "0.5rem" }}
                  ></span>
                  じゃ
                </MenuItem>
                <MenuItem value="RU" onClick={() => i18n.changeLanguage("ru")}>
                  <span
                    className="flag-icon flag-icon-ru mx-2"
                    style={{ marginRight: "0.5rem" }}
                  ></span>
                  РУ
                </MenuItem>
              </Select>
            </FormControl>
          </TranslateWrapper>
        </Box>

        <Box sx={{ padding: theme.spacing(2) }}>
          <ConnectWrapper>
            <ConnectIconWrapper>
              <ConnectIcon />
            </ConnectIconWrapper>
            <ConnectBtn>
              <ConnectText>{shortenAddress(address)}</ConnectText>
            </ConnectBtn>
          </ConnectWrapper>
        </Box>
        <Divider />

        <Box sx={{ padding: theme.spacing(2) }}>
          <List>
            {menuItems.map((item, index) => (
              <ListItem
                key={index}
                disablePadding
                sx={{ display: "block", mt: 1, borderRadius : "10px" }}
              >
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
