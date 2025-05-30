import React from "react";
import "./Hero.css";
import {
  HeroContainer,
  HeroMainbgPhotoWrapper,
  HeroTextButtonHeaderWrapper,
  HeroHeaderWrapper,
  HeroHeader,
  HeroTextWrapper,
  HeroText,
  HeroButtonWrapper,
  HeroButtonWrapper2,
  HeroButtonText,
  HeroUniqueTextWrapper,
  HeroUniqueText,
} from "./HeroElements";
import { useDispatch } from "react-redux";
import { useTronWallet } from "../../../contexts/TronWalletContext";
import { clickToggle } from "../../../redux/actions/toggleSlice";
import uniqueText from "../../../assets/svg/unique/UniqueText.svg";
import ResourceComponent from "./ResourceComponent";


const Hero: React.FC = () => {
  const dispatch = useDispatch();
  const { address, disconnectWallet } = useTronWallet();

  const shortenAddress = (address: string, length = 7) => {
    return address.length > length ? `${address.slice(0, length)}...` : address;
  };

  return (
    <>
      <HeroContainer>
        <HeroMainbgPhotoWrapper className="Hero-bg"></HeroMainbgPhotoWrapper>
        <HeroTextButtonHeaderWrapper>
          <HeroHeaderWrapper>
            <HeroHeader>
              Fuel Your dApps with{" "}
              <span style={{ color: "#416872" }}>Energy</span> and
              <span style={{ color: "#416872" }}> Bandwidth</span>.
            </HeroHeader>
          </HeroHeaderWrapper>
          <HeroTextWrapper>
            <HeroText>
              Lower fees, faster transactions, take your decentralized
              applications to the next level.
            </HeroText>
          </HeroTextWrapper>
          <HeroButtonWrapper>
            {address ? (
              <HeroButtonWrapper2 onClick={() => disconnectWallet()}>
                <HeroButtonText>{shortenAddress(address, 7)}</HeroButtonText>
              </HeroButtonWrapper2>
            ) : (
              <HeroButtonWrapper2
                onClick={() => dispatch(clickToggle("popUp"))}
              >
                <HeroButtonText>Get Started</HeroButtonText>
              </HeroButtonWrapper2>
            )}
          </HeroButtonWrapper>
        </HeroTextButtonHeaderWrapper>
        <HeroUniqueTextWrapper>
          <HeroUniqueText alt="unique text" src={uniqueText} />
        </HeroUniqueTextWrapper>
        <ResourceComponent />
      </HeroContainer>
    </>
  );
};

export default Hero;
