import React, { useRef, useEffect } from "react";
import "./Navbar.css";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useTronWallet } from "../../contexts/TronWalletContext";
import Logo from "../../assets/svg/Logo/Logo3.svg";

const Navbar: React.FC = () => {
  const Location = useLocation();
  const [selectedLanguage, setSelectedLanguage] = React.useState("EN");
  const { t, i18n } = useTranslation();
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

  const isMarketPage = Location.pathname === "/";
  //const isBuyersOrSellers = Location.pathname === "/Buyers" || Location.pathname === "/Sellers";
  // Update dropdown when language changes
  useEffect(() => {
    // Map i18n language codes to your dropdown values
    const languageMap: { [key: string]: string } = {
      en: "EN",
      ja: "JA",
      ru: "RU",
      cn: "CN",
      kr: "KR",
      tr: "TR",
      id: "ID",
      es: "ES",
      in: "IN",
    };

    const dropdownValue = languageMap[i18n.language] || "EN";
    setSelectedLanguage(dropdownValue);
  }, [i18n.language]);

  const handleChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value;
    setSelectedLanguage(newValue);

    // Map dropdown values to i18n language codes
    const languageCodeMap: { [key: string]: string } = {
      EN: "en",
      JA: "ja",
      RU: "ru",
      CN: "cn",
      KR: "kr",
      TR: "tr",
      ID: "id",
      ES: "es",
      IN: "in",
    };

    const languageCode = languageCodeMap[newValue];
    if (languageCode) {
      i18n.changeLanguage(languageCode);
    }
  };

  const shortenAddress = (address: string) => {
    if (address.length <= 6) return address;
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const isConnected = isMarketPage ? isConnectedMarket : isConnectedTrading;
  const handleConnect = isMarketPage ? connectWalletMarket : connectWallet;
  const handleDisconnect = isMarketPage ? disconnectWallet2 : disconnectWallet;

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
              {t("Text2")}
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
              {t("Text3")}
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
              {t("Text4")}
            </NavLink>
          </NavbarLinkWrapper>
          <NavbarRightSection>
            <TranslateConnectWrapper>
              <TranslateWrapper>
                <FormControl sx={{ mr: 1 }}>
                  <Select
                    value={selectedLanguage}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    sx={{
                      height: 36,
                      borderRadius: "10px",
                      color: "#003543",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#003543",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#003543",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#003543",
                      },
                      "& .MuiSelect-icon": {
                        color: "#003543",
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
                    <MenuItem
                      value="CN"
                      onClick={() => i18n.changeLanguage("cn")}
                    >
                      <span
                        className="flag-icon flag-icon-cn mx-2"
                        style={{ marginRight: "0.5rem" }}
                      ></span>
                      中文
                    </MenuItem>
                    <MenuItem
                      value="KR"
                      onClick={() => i18n.changeLanguage("kr")}
                    >
                      <span
                        className="flag-icon flag-icon-kr mx-2"
                        style={{ marginRight: "0.5rem" }}
                      ></span>
                      한국어
                    </MenuItem>
                    <MenuItem
                      value="TR"
                      onClick={() => i18n.changeLanguage("tr")}
                    >
                      <span
                        className="flag-icon flag-icon-tr mx-2"
                        style={{ marginRight: "0.5rem" }}
                      ></span>
                      TR
                    </MenuItem>
                    <MenuItem
                      value="ID"
                      onClick={() => i18n.changeLanguage("id")}
                    >
                      <span
                        className="flag-icon flag-icon-id mx-2"
                        style={{ marginRight: "0.5rem" }}
                      ></span>
                      ID
                    </MenuItem>
                    <MenuItem
                      value="ES"
                      onClick={() => i18n.changeLanguage("es")}
                    >
                      <span
                        className="flag-icon flag-icon-es mx-2"
                        style={{ marginRight: "0.5rem" }}
                      ></span>
                      ES
                    </MenuItem>
                    <MenuItem
                      value="IN"
                      onClick={() => i18n.changeLanguage("in")}
                    >
                      <span
                        className="flag-icon flag-icon-in mx-2"
                        style={{ marginRight: "0.5rem" }}
                      ></span>
                      भारत
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
                    <ConnectText>{t("Text1")}</ConnectText>
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
