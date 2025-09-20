import React from "react";
import "./Buyers.css";
import {
  BuyersContainer,
  BuyerssMainWrapper,
  Sec2Wrapper,
} from "./BuyersElement";
import { HeroMainbgPhotoWrapper } from "../../mainPage/HeroSection/HeroElements";
import Section1 from "./Section1/Section1";
import { Grid } from "@mui/material";
import BuyerForms from "./Section2/Form/BuyerForms";
import BuyersTables from "./Section2/Table/BuyersTables";

const Buyers: React.FC = () => {
  return (
    <>
      <BuyersContainer>
        <HeroMainbgPhotoWrapper className="Hero-bg"></HeroMainbgPhotoWrapper>
        <BuyerssMainWrapper>
          <Section1 />
          <Sec2Wrapper>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 4 }}>
                <BuyerForms />
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 8 }}>
               <BuyersTables />
              </Grid>
            </Grid>
          </Sec2Wrapper>
        </BuyerssMainWrapper>
      </BuyersContainer>
    </>
  );
};

export default Buyers;
