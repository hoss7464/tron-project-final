import React from "react";
import {
  SelectContainer,
  SelectHeaderWrapper,
  SelectHeader,
  SelectWalletWrapper,
  SelectWalletWrapper2,
  SelectWalletIconTextWrapper,
  SelectWalletIconWrapper,
  SelectWalletIcon,
  SelectWalletTextWrapper,
  SelectWalletText,
  SelectWalletConnectBtnWrapper,
  SelectWalletConnectBtn,
} from "./SelectWalletCompoElements";
import { useTronWallet } from "../../contexts/TronWalletContext";
import tronIcon from "../../assets/svg/TronIcon.svg"

const SelectWalletComponent: React.FC = () => {
  const { connectWallet } = useTronWallet();
  
  return (
    <>
      <SelectContainer>
        <SelectHeaderWrapper>
            <SelectHeader>Connect Wallet</SelectHeader>
        </SelectHeaderWrapper>
        <SelectWalletWrapper>
            <SelectWalletWrapper2>
                <SelectWalletIconTextWrapper>
                    <SelectWalletIconWrapper>
                        <SelectWalletIcon alt="TronLink" src={tronIcon} />
                    </SelectWalletIconWrapper>
                    <SelectWalletTextWrapper>
                        <SelectWalletText>TronLink</SelectWalletText>
                    </SelectWalletTextWrapper>
                </SelectWalletIconTextWrapper>
                <SelectWalletConnectBtnWrapper onClick={connectWallet}>
                   <SelectWalletConnectBtn>Connect</SelectWalletConnectBtn>
                </SelectWalletConnectBtnWrapper>
            </SelectWalletWrapper2>
        </SelectWalletWrapper>
      </SelectContainer>
      
    </>
  );
};

export default SelectWalletComponent;
