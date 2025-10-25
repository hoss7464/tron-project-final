import React from "react";
import PopUp from "./PopUp";
import {
  ConnectWrapper,
  ConnectIconWrapper,
  ConnectIcon,
  ConnectBtn,
  ConnectText,
} from "../Navbar/NavElements";
import { useTronWallet } from "../../contexts/TronWalletContext";
import { useTranslation } from "react-i18next";

export const PopUp7: React.FC = () => {
  const { connectWallet } = useTronWallet();
  const { t } = useTranslation();

  return (
    <>
      <PopUp>
        <ConnectWrapper onClick={connectWallet}>
          <ConnectIconWrapper>
            <ConnectIcon />
          </ConnectIconWrapper>
          <ConnectBtn>
            <ConnectText>{t("Text129")}</ConnectText>
          </ConnectBtn>
        </ConnectWrapper>
      </PopUp>
    </>
  );
};

export default React.memo(PopUp7);
