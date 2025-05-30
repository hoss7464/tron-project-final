import React, { useRef } from "react";
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
  NavbarRightSection,
  TranslateConnectWrapper,
  TranslateWrapper,
  ConnectWrapper,
  ConnectBtn,
  ConnectText,
  ConnectIconWrapper,
  ConnectIcon,
} from "./NavElements";
import {Menu, Box } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useTronWallet } from "../../contexts/TronWalletContext";

const Navbar: React.FC = () => {
  const [age, setAge] = React.useState("EN");
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const avatarRef = useRef<HTMLButtonElement | null>(null);
  const { address, disconnectWallet } = useTronWallet();

  const avatarOpen = useSelector(
    (state: RootState) => state.toggle.toggles["avatarToggle"]
  );

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  const handleAvatarEnter = () => {
    dispatch(hoverEnableToggle("avatarToggle"));
  };
  const handleAvatarLeave = () => {
    dispatch(hoverDisableToggle("avatarToggle"));
  };
  const handleDisconnect = () => {
    disconnectWallet();
    dispatch(hoverDisableToggle("avatarToggle"));
  };

  const shortenAddress = (address: string, length = 5) => {
    return address.length > length ? `${address.slice(0, length)}...` : address;
  }

  return (
    <>
      <NavContainer>
        <NavbarActiveArea>
          <NavbarLeftSection>
            <NavbarLogoWrapper />
          </NavbarLeftSection>
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
                      height: 40,
                      borderRadius: "55px",
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
              {address ? (
                <Box
                  onMouseEnter={handleAvatarEnter}
                  onMouseLeave={handleAvatarLeave}
                >
                  <span ref={avatarRef} >
                    <ConnectWrapper >
                      <ConnectIconWrapper>
                        <ConnectIcon />
                      </ConnectIconWrapper>
                      <ConnectBtn>
                        <ConnectText style={{fontSize : "14px", fontWeight : "500"}} >{shortenAddress(address, 5)}</ConnectText>
                      </ConnectBtn>
                    </ConnectWrapper>
                  </span>
                  <Menu
                    anchorEl={avatarRef.current}
                    open={avatarOpen}
                    onClose={handleAvatarLeave}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    disableScrollLock={true}
                    MenuListProps={{
                      onMouseEnter: handleAvatarEnter,
                      onMouseLeave: handleAvatarLeave,
                      sx: { pointerEvents: "auto", cursor: "pointer" },
                    }}
                  >
                    <MenuItem onClick={handleDisconnect}>Disconnect</MenuItem>
                  </Menu>
                </Box>
              ) : (
                <ConnectWrapper onClick={() => dispatch(clickToggle("popUp"))}>
                  <ConnectIconWrapper>
                    <ConnectIcon />
                  </ConnectIconWrapper>
                  <ConnectBtn>
                    <ConnectText>{t("wallet")}</ConnectText>
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
