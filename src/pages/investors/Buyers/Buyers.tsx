import React from "react";
import "./Buyers.css"
import { BuyersContainer, BuyerssMainWrapper } from "./BuyersElement";
import { HeroMainbgPhotoWrapper } from "../../mainPage/HeroSection/HeroElements";

const Buyers : React.FC = () => {
    return (
        <>
        <BuyersContainer>
            <HeroMainbgPhotoWrapper className="Hero-bg"></HeroMainbgPhotoWrapper>
            <BuyerssMainWrapper >Hello buyers</BuyerssMainWrapper>
        </BuyersContainer>
        </>
    )
}

export default Buyers