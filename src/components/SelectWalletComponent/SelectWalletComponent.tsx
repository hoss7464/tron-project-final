import React, { useEffect } from "react";
import "./SelectWallet.css";
import {
  ConnectContainer,
  ConnectMainWrapper,
  ConnectUniqueTextWrapper,
  ConnectUniqueText,
  ConnectRightWrapper,
  ConnectLeftWrapper,
  ConnectLeftHeaderWrapper,
  ConnectLeftHeader,
  ConnectLeftSubheaderWrapper,
  ConnectLeftSubheader,
  ConnectBoxBtnWrapper,
  ConnectBoxWrapper,
  ConnectBox,
  ConnectBoxImgWrapper,
  ConnectBoxImg,
  ConnectBoxTextWrapper,
  ConnectBoxText,
  ConnectBtnWrapper,
  ConnectBtnText,
  ConnectCloseBtnWrapper,
  ConnectCloseBtn,
  ConnectRightIconWrapper,
  ConnectRightIcon,
  ConnectRightNameWrapper,
  ConnectRightName,
  ConnectRightTextWrapper,
  ConnectRightText,
} from "./SelectWalletCompoElements";
import connectUniiqueText from "../../assets/svg/TRONMAX.svg";
import { useDispatch } from "react-redux";
import { clickToggle } from "../../redux/actions/toggleSlice";
import { ConnectPopupData1 } from "../../helpers/ConnectPopupData";
import { useTronWallet } from "../../contexts/TronWalletContext";
import tronLinkImg from "../../assets/svg/TronLinkImg.svg";

const SelectWalletComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { connectWallet, address } = useTronWallet();

  useEffect(() => {
    if (address) {
      dispatch(clickToggle("popUp"));
    }
  }, [address, dispatch]);

  return (
    <>
      <ConnectContainer>
        <ConnectMainWrapper className="Select-Wallet">
          <ConnectUniqueTextWrapper>
            <ConnectUniqueText
              alt="Connect-unique-text"
              src={connectUniiqueText}
            />
          </ConnectUniqueTextWrapper>
          <ConnectCloseBtnWrapper
            onClick={() => dispatch(clickToggle("popUp"))}
          >
            <ConnectCloseBtn />
          </ConnectCloseBtnWrapper>
          <ConnectLeftWrapper>
            <ConnectLeftHeaderWrapper>
              <ConnectLeftHeader>Connect Your Wallet</ConnectLeftHeader>
            </ConnectLeftHeaderWrapper>
            <ConnectLeftSubheaderWrapper>
              <ConnectLeftSubheader>
                Choose a wallet to connect.
              </ConnectLeftSubheader>
            </ConnectLeftSubheaderWrapper>
            <ConnectBoxBtnWrapper>
              <ConnectBoxWrapper>
                {ConnectPopupData1.map((myBox, index) => (
                  <ConnectBox deactivated={myBox.deactivate} key={index}>
                    <ConnectBoxImgWrapper>
                      <ConnectBoxImg
                        alt={myBox.alt}
                        deactivated={myBox.deactivate}
                        src={myBox.img}
                      />
                    </ConnectBoxImgWrapper>
                    <ConnectBoxTextWrapper>
                      <ConnectBoxText deactivated={myBox.deactivate}>
                        {myBox.text}
                      </ConnectBoxText>
                    </ConnectBoxTextWrapper>
                  </ConnectBox>
                ))}
              </ConnectBoxWrapper>

              <ConnectBtnWrapper onClick={connectWallet}>
                <ConnectBtnText>Connect</ConnectBtnText>
              </ConnectBtnWrapper>
            </ConnectBoxBtnWrapper>
          </ConnectLeftWrapper>
          {/* this block will change based on conditional rendering*/}
          <ConnectRightWrapper>
            <ConnectRightIconWrapper>
              <ConnectRightIcon alt="tronlink" src={tronLinkImg} />
            </ConnectRightIconWrapper>
            <ConnectRightNameWrapper>
              <ConnectRightName>TronLink</ConnectRightName>
            </ConnectRightNameWrapper>
            <ConnectRightTextWrapper>
              <ConnectRightText>
                To log into your wallet , firstly open TronLink browser
                extension and unlock your wallet.{" "}
              </ConnectRightText>
            </ConnectRightTextWrapper>
          </ConnectRightWrapper>
        </ConnectMainWrapper>
      </ConnectContainer>
    </>
  );
};

export default SelectWalletComponent;
