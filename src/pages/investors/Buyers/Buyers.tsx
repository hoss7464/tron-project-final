import React from "react";
import "./Buyers.css";
import { BuyersContainer, BuyerssMainWrapper } from "./BuyersElement";
import { HeroMainbgPhotoWrapper } from "../../mainPage/HeroSection/HeroElements";
import Section1 from "./Section1/Section1";

const Buyers: React.FC = () => {
  return (
    <>
      
      <BuyersContainer>
        <HeroMainbgPhotoWrapper className="Hero-bg"></HeroMainbgPhotoWrapper>
        <BuyerssMainWrapper>
            < Section1 />
        </BuyerssMainWrapper>
      </BuyersContainer>
    </>
  );
};

export default Buyers;
