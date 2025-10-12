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

export const PopUp7: React.FC = () => {
    const {connectWallet} = useTronWallet()

    
  return (
    <>
      <PopUp>
        <ConnectWrapper onClick={connectWallet}>
          <ConnectIconWrapper>
            <ConnectIcon />
          </ConnectIconWrapper>
          <ConnectBtn>
            <ConnectText>Connect Your wallet</ConnectText>
          </ConnectBtn>
        </ConnectWrapper>
      </PopUp>
    </>
  );
};

export default React.memo(PopUp7);
