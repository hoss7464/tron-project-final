import React, { useRef } from "react";
import "./Navbar.css";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  hoverEnableToggle,
  hoverDisableToggle,
} from "../../redux/actions/toggleSlice";
import { RootState } from "../../redux/store/store";
import { clickToggle } from "../../redux/actions/toggleSlice";
import {
  NavContainer,
  NavbarActiveArea,
  NavbarLeftSection,
  NavbarLogoWrapper,
  NavbarLogo,
  NavbarLinkWrapper,
  NavLink,
  NavLinkIconWrapper,
  NavMarketIcon,
  NavBuyersIcon,
  NavSellersIcon,
  NavbarRightSection,
  TranslateConnectWrapper,
  TranslateWrapper,
  ConnectWrapper,
  ConnectBtn,
  ConnectText,
  ConnectIconWrapper,
  ConnectIcon,
} from "./NavElements";
import { Menu, Box } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useTronWallet } from "../../contexts/TronWalletContext";
import Logo from "../../assets/svg/Logo/Logo3.svg";
import { toggleRefresh } from "../../redux/actions/refreshSlice";

const Navbar: React.FC = () => {
  const Location = useLocation();
  const [age, setAge] = React.useState("EN");
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const avatarRef = useRef<HTMLButtonElement | null>(null);
  const {
    address,
    disconnectWallet,
    disconnectWallet2,
    connectWallet,
    connectWalletMarket,
    isConnectedMarket,
    isConnectedTrading,
  } = useTronWallet();

  const isHighZ =
    Location.pathname === "/Sellers" || Location.pathname === "/Buyers";

  const avatarOpen = useSelector(
    (state: RootState) => state.toggle.toggles["avatarToggle"]
  );

  const isMarketPage = Location.pathname === "/";
  const isBuyersOrSellers = Location.pathname === "/Buyers" || Location.pathname === "/Sellers";

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  const handleAvatarEnter = () => {
    dispatch(hoverEnableToggle("avatarToggle"));
  };
  const handleAvatarLeave = () => {
    dispatch(hoverDisableToggle("avatarToggle"));
  };

  const shortenAddress = (address: string) => {
    if (address.length <= 6) return address;
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const isConnected = isMarketPage ? isConnectedMarket : isConnectedTrading;
  const handleConnect = isMarketPage ? connectWalletMarket : connectWallet;
  const handleDisconnect = isMarketPage ? disconnectWallet2 : disconnectWallet



  return (
    <>
      <NavContainer $isHighZ={isHighZ}>
        <NavbarActiveArea>
          <NavbarLeftSection>
            <NavbarLogoWrapper>
              <NavbarLogo alt="Logo" src={Logo} />
            </NavbarLogoWrapper>
            
          </NavbarLeftSection>
          <NavbarLinkWrapper>
              <NavLink
                className="navlink-margin"
                to="/"
                style={
                  Location.pathname === "/"
                    ? { backgroundColor: "#003543", color: "#ffffff" }
                    : { backgroundColor: "", color: "#003543" }
                }
              >
                <NavLinkIconWrapper>
                  <NavMarketIcon
                    style={
                      Location.pathname === "/"
                        ? { color: "#ffffff" }
                        : { color: "#003543" }
                    }
                  />
                </NavLinkIconWrapper>{" "}
                Market
              </NavLink>
              <NavLink
                className="navlink-margin"
                to="/Buyers"
                style={
                  Location.pathname === "/Buyers"
                    ? { backgroundColor: "#003543", color: "#ffffff" }
                    : { backgroundColor: "", color: "#003543" }
                }
              >
                <NavLinkIconWrapper>
                  <NavBuyersIcon
                    style={
                      Location.pathname === "/Buyers"
                        ? { color: "#ffffff" }
                        : { color: "#003543" }
                    }
                  />
                </NavLinkIconWrapper>{" "}
                Buyers
              </NavLink>
              <NavLink
                to="/Sellers"
                style={
                  Location.pathname === "/Sellers"
                    ? { backgroundColor: "#003543", color: "#ffffff" }
                    : { backgroundColor: "", color: "#003543" }
                }
              >
                <NavLinkIconWrapper>
                  <NavSellersIcon
                    style={
                      Location.pathname === "/Sellers"
                        ? { color: "#ffffff" }
                        : { color: "#003543" }
                    }
                  />
                </NavLinkIconWrapper>{" "}
                Sellers
              </NavLink>
            </NavbarLinkWrapper>
          <NavbarRightSection>
            <TranslateConnectWrapper>
              <TranslateWrapper>
                <FormControl sx={{ mr: 1 }}>
                  <Select
                    value={age}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    sx={{
                      height: 36,
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
                          width: 70,
                        },
                      },
                    }}
                  >
                    <MenuItem
                      value="EN"
                      onClick={() => i18n.changeLanguage("en")}
                    >
                      <span
                        className="flag-icon flag-icon-gb mx-2"
                        style={{ marginRight: "0.5rem" }}
                      ></span>
                      EN
                    </MenuItem>
                    <MenuItem
                      value="JA"
                      onClick={() => i18n.changeLanguage("ja")}
                    >
                      <span
                        className="flag-icon flag-icon-jp mx-2"
                        style={{ marginRight: "0.5rem" }}
                      ></span>
                      じゃ
                    </MenuItem>
                    <MenuItem
                      value="RU"
                      onClick={() => i18n.changeLanguage("ru")}
                    >
                      <span
                        className="flag-icon flag-icon-ru mx-2"
                        style={{ marginRight: "0.5rem" }}
                      ></span>
                      РУ
                    </MenuItem>
                  </Select>
                </FormControl>
              </TranslateWrapper>

              {isConnected && address ? (
                
                  <span ref={avatarRef}>
                    <ConnectWrapper onClick={handleDisconnect}>
                      <ConnectIconWrapper>
                        <ConnectIcon />
                      </ConnectIconWrapper>
                      <ConnectBtn>
                        <ConnectText>{shortenAddress(address)}</ConnectText>
                      </ConnectBtn>
                    </ConnectWrapper>
                  </span>
                  
              
              ) : (
                <ConnectWrapper onClick={handleConnect}>
                  <ConnectIconWrapper>
                    <ConnectIcon />
                  </ConnectIconWrapper>
                  <ConnectBtn>
                    <ConnectText>{t("Wallet")}</ConnectText>
                  </ConnectBtn>
                </ConnectWrapper>
              )}
            </TranslateConnectWrapper>
          </NavbarRightSection>
        </NavbarActiveArea>
      </NavContainer>
    </>
  );
};

export default Navbar;
