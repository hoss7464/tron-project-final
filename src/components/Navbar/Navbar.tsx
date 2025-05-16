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
} from "./NavElements";
import { Avatar, Menu, Box, Typography, IconButton } from "@mui/material";
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
                <FormControl sx={{ mr: 2 }}>
                  <Select
                    value={age}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    sx={{ width: 70, height: 42 }}
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
                      EN
                    </MenuItem>
                    <MenuItem
                      value="JA"
                      onClick={() => i18n.changeLanguage("ja")}
                    >
                      JA
                    </MenuItem>
                    <MenuItem
                      value="RU"
                      onClick={() => i18n.changeLanguage("ru")}
                    >
                      RU
                    </MenuItem>
                  </Select>
                </FormControl>
              </TranslateWrapper>
              {address ? (
                <Box
                  onMouseEnter={handleAvatarEnter}
                  onMouseLeave={handleAvatarLeave}
                >
                  <IconButton
                    size="large"
                    ref={avatarRef}
                    sx={{ cursor: "pointer" }}
                  >
                    <Avatar alt="User" src="/static/images/avatar/1.jpg" />
                  </IconButton>
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
                <ConnectWrapper>
                  <ConnectBtn onClick={() => dispatch(clickToggle("popUp"))}>
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
