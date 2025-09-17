import React from "react";
import "./Section1.css";
import {
  Sec1Contrainer,
  SecSummaryIcon,
  SecKeyIcon,
  Sec1ButtonWrapper,
  Sec1ButtonText,
  Sec1CardThingsWrapper,
  Sec1CopyIcon,
} from "./Section1Elements";
import {
  LegacyCardWrapper,
  LegacyCardWrapper2,
  LegacyCardWrapper3,
  LegacyCardIconNameWrapper,
  LegacyCardIconWrapper1,
  LegacyCardIconWrapper2,
  LegacyCardIconWrapper3,
  LegacyCardNameWrapper,
  LegacyCardName,
  LegacyCardIcon,
} from "../../../mainPage/LegacySection/LegacyElements";
import {
  SellersCardThingsWrapper,
  SellersCardThingsWrapper2,
  SellersCardThingsNameIconWrapper,
  SellersCardThingsNameWrapper,
  SellersCardThingsName,
  SellersCardThingsNumberWrapper,
  SellersCardThingsNumber,
} from "../../Sellers/SellersElement";
import {
  HeroGridCardNumberIconWrapper,
  HeroGridCardNumberIconWrapper2,
  HeroGridCardNumberIconWrapper3,
  HeroGridCardNumberIcon,
} from "../../../mainPage/HeroSection/HeroElements";
import {
  FormAddInputWrapper,
  FormAddInputIconWrapper,
  FormAddInputWrapper2,
  FormAddInput,
} from "../../../mainPage/mainPageElements";
import { Grid } from "@mui/material";
import balanceIcon from "../../../../assets/svg/BalanceIcon.svg";
import energyIcon from "../../../../assets/svg/EnergyIcon.svg";
import bandwidthIcon from "../../../../assets/svg/BandwidthIcon.svg";

const Section1: React.FC = () => {
  return (
    <>
      <Sec1Contrainer>
        <LegacyCardWrapper>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
              <LegacyCardWrapper2>
                <LegacyCardWrapper3 className="card-bg">
                  <LegacyCardIconNameWrapper>
                    <LegacyCardIconWrapper1>
                      <LegacyCardIconWrapper2>
                        <LegacyCardIconWrapper3>
                          <SecSummaryIcon />
                        </LegacyCardIconWrapper3>
                      </LegacyCardIconWrapper2>
                    </LegacyCardIconWrapper1>
                    <LegacyCardNameWrapper>
                      <LegacyCardName>Daily Summary</LegacyCardName>
                    </LegacyCardNameWrapper>
                  </LegacyCardIconNameWrapper>
                  <SellersCardThingsWrapper>
                    <SellersCardThingsWrapper2>
                      <SellersCardThingsNameIconWrapper>
                        <HeroGridCardNumberIconWrapper>
                          <HeroGridCardNumberIconWrapper2
                            style={{ border: "solid 1px #003543" }}
                          >
                            <HeroGridCardNumberIconWrapper3
                              style={{ backgroundColor: "#003543" }}
                            >
                              <HeroGridCardNumberIcon
                                alt="energy icon"
                                src={energyIcon}
                              />
                            </HeroGridCardNumberIconWrapper3>
                          </HeroGridCardNumberIconWrapper2>
                        </HeroGridCardNumberIconWrapper>
                        <SellersCardThingsNameWrapper>
                          <SellersCardThingsName>Energy</SellersCardThingsName>
                        </SellersCardThingsNameWrapper>
                      </SellersCardThingsNameIconWrapper>
                      <SellersCardThingsNumberWrapper>
                        <SellersCardThingsNumber>
                          123456
                        </SellersCardThingsNumber>
                      </SellersCardThingsNumberWrapper>
                    </SellersCardThingsWrapper2>

                    <SellersCardThingsWrapper2>
                      <SellersCardThingsNameIconWrapper>
                        <HeroGridCardNumberIconWrapper>
                          <HeroGridCardNumberIconWrapper2
                            style={{ border: "solid 1px #430E00" }}
                          >
                            <HeroGridCardNumberIconWrapper3
                              style={{ backgroundColor: "#430E00" }}
                            >
                              <HeroGridCardNumberIcon
                                alt="energy icon"
                                src={bandwidthIcon}
                              />
                            </HeroGridCardNumberIconWrapper3>
                          </HeroGridCardNumberIconWrapper2>
                        </HeroGridCardNumberIconWrapper>
                        <SellersCardThingsNameWrapper>
                          <SellersCardThingsName>
                            Bandwidth
                          </SellersCardThingsName>
                        </SellersCardThingsNameWrapper>
                      </SellersCardThingsNameIconWrapper>
                      <SellersCardThingsNumberWrapper>
                        <SellersCardThingsNumber>
                          123456
                        </SellersCardThingsNumber>
                      </SellersCardThingsNumberWrapper>
                    </SellersCardThingsWrapper2>
                  </SellersCardThingsWrapper>
                </LegacyCardWrapper3>
              </LegacyCardWrapper2>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
              <LegacyCardWrapper2>
                <LegacyCardWrapper3 className="card-bg">
                  <LegacyCardIconNameWrapper>
                    <LegacyCardIconWrapper1>
                      <LegacyCardIconWrapper2>
                        <LegacyCardIconWrapper3>
                          <LegacyCardIcon alt="balance" src={balanceIcon} />
                        </LegacyCardIconWrapper3>
                      </LegacyCardIconWrapper2>
                    </LegacyCardIconWrapper1>
                    <LegacyCardNameWrapper>
                      <LegacyCardName>API balance</LegacyCardName>
                    </LegacyCardNameWrapper>
                  </LegacyCardIconNameWrapper>
                  <Sec1CardThingsWrapper>
                    <SellersCardThingsWrapper2 style={{ padding: "0" }}>
                      <SellersCardThingsNameIconWrapper>
                        <SellersCardThingsNameWrapper>
                          <SellersCardThingsName>Amount</SellersCardThingsName>
                        </SellersCardThingsNameWrapper>
                      </SellersCardThingsNameIconWrapper>
                      <SellersCardThingsNumberWrapper>
                        <SellersCardThingsNumber>
                          123456
                        </SellersCardThingsNumber>
                      </SellersCardThingsNumberWrapper>
                    </SellersCardThingsWrapper2>
                    <Sec1ButtonWrapper>
                      <Sec1ButtonText>Recharge</Sec1ButtonText>
                    </Sec1ButtonWrapper>
                  </Sec1CardThingsWrapper>
                </LegacyCardWrapper3>
              </LegacyCardWrapper2>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
              <LegacyCardWrapper2>
                <LegacyCardWrapper3 className="card-bg">
                  <LegacyCardIconNameWrapper>
                    <LegacyCardIconWrapper1>
                      <LegacyCardIconWrapper2>
                        <LegacyCardIconWrapper3>
                          <SecKeyIcon />
                        </LegacyCardIconWrapper3>
                      </LegacyCardIconWrapper2>
                    </LegacyCardIconWrapper1>
                    <LegacyCardNameWrapper>
                      <LegacyCardName>API key</LegacyCardName>
                    </LegacyCardNameWrapper>
                  </LegacyCardIconNameWrapper>
                  <Sec1CardThingsWrapper>
                    <FormAddInputWrapper style={{marginBottom : "1rem"}} >
                      <FormAddInputIconWrapper>
                        <FormAddInputWrapper2>
                          <FormAddInput value="" placeholder="API key" />
                        </FormAddInputWrapper2>

                        <Sec1CopyIcon />
                      </FormAddInputIconWrapper>
                    </FormAddInputWrapper>
                    <Sec1ButtonWrapper>
                      <Sec1ButtonText>Change API</Sec1ButtonText>
                    </Sec1ButtonWrapper>
                  </Sec1CardThingsWrapper>
                </LegacyCardWrapper3>
              </LegacyCardWrapper2>
            </Grid>
          </Grid>
        </LegacyCardWrapper>
      </Sec1Contrainer>
    </>
  );
};

export default Section1;
