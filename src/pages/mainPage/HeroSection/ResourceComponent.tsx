import React from "react";
import "./Hero.css";
import {
  HeroResourceContainer,
  HeroResourceWrapper,
  HeroGridCard,
  HeroGridCardIconHeaderWrapper,
  HeroGridCardIconWrapper,
  HeroGridCardIcon,
  HeroGridCardHeaderWrapper,
  HeroGridCardHeader,
  HeroGridCardSubHeaderWrapper,
  HeroGridCardSubHeader,
  HeroGridCardNumberIconTextWrapper,
  HeroGridCardNumberIconWrapper,
  HeroGridCardNumberIconWrapper2,
  HeroGridCardNumberIconWrapper3,
  HeroGridCardNumberIcon,
  HeroGridCardNumberTextWrapper,
  HeroGridCardNumberText,
} from "./HeroElements";
import { Grid } from "@mui/material";
import readyResourceIcon from "../../../assets/svg/ReadyResourceIcon.svg";
import energyIcon from "../../../assets/svg/EnergyIcon.svg";
import bandwidthIcon from "../../../assets/svg/BandwidthIcon.svg";
import recoveryIcon from "../../../assets/svg/RecoveryIcon.svg";
import apyForSellersIcon from "../../../assets/svg/ApyForSellersIcon.svg";

const ResourceComponent: React.FC = () => {
  return (
    <>
      <HeroResourceContainer>
        <HeroResourceWrapper>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
              <HeroGridCard className="border">
                <HeroGridCardIconHeaderWrapper>
                  <HeroGridCardIconWrapper>
                    <HeroGridCardIcon
                      alt="ready resource"
                      src={readyResourceIcon}
                    />
                  </HeroGridCardIconWrapper>
                  <HeroGridCardHeaderWrapper>
                    <HeroGridCardHeader>Ready Resource</HeroGridCardHeader>
                  </HeroGridCardHeaderWrapper>
                </HeroGridCardIconHeaderWrapper>

                <HeroGridCardSubHeaderWrapper>
                  <HeroGridCardSubHeader>
                    Your energy and bandwidth, Ready when you are.
                  </HeroGridCardSubHeader>
                </HeroGridCardSubHeaderWrapper>

                <HeroGridCardNumberIconTextWrapper>
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
                  <HeroGridCardNumberTextWrapper>
                    <HeroGridCardNumberText>123,456,789</HeroGridCardNumberText>
                  </HeroGridCardNumberTextWrapper>
                </HeroGridCardNumberIconTextWrapper>

                <HeroGridCardNumberIconTextWrapper>
                  <HeroGridCardNumberIconWrapper>
                    <HeroGridCardNumberIconWrapper2
                      style={{ border: "solid 1px #430E00" }}
                    >
                      <HeroGridCardNumberIconWrapper3
                        style={{ backgroundColor: "#430E00" }}
                      >
                        <HeroGridCardNumberIcon
                          alt="bandwidth icon"
                          src={bandwidthIcon}
                        />
                      </HeroGridCardNumberIconWrapper3>
                    </HeroGridCardNumberIconWrapper2>
                  </HeroGridCardNumberIconWrapper>
                  <HeroGridCardNumberTextWrapper>
                    <HeroGridCardNumberText>123,456</HeroGridCardNumberText>
                  </HeroGridCardNumberTextWrapper>
                </HeroGridCardNumberIconTextWrapper>
              </HeroGridCard>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
              <HeroGridCard className="border">
                <HeroGridCardIconHeaderWrapper>
                  <HeroGridCardIconWrapper>
                    <HeroGridCardIcon alt="recovery icon" src={recoveryIcon} />
                  </HeroGridCardIconWrapper>
                  <HeroGridCardHeaderWrapper>
                    <HeroGridCardHeader>24h Recovery</HeroGridCardHeader>
                  </HeroGridCardHeaderWrapper>
                </HeroGridCardIconHeaderWrapper>

                <HeroGridCardSubHeaderWrapper>
                  <HeroGridCardSubHeader>
                    Your energy and bandwidth are fully restored every 24 hours.
                  </HeroGridCardSubHeader>
                </HeroGridCardSubHeaderWrapper>

                <HeroGridCardNumberIconTextWrapper>
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
                  <HeroGridCardNumberTextWrapper>
                    <HeroGridCardNumberText>123,456,789</HeroGridCardNumberText>
                  </HeroGridCardNumberTextWrapper>
                </HeroGridCardNumberIconTextWrapper>

                <HeroGridCardNumberIconTextWrapper>
                  <HeroGridCardNumberIconWrapper>
                    <HeroGridCardNumberIconWrapper2
                      style={{ border: "solid 1px #430E00" }}
                    >
                      <HeroGridCardNumberIconWrapper3
                        style={{ backgroundColor: "#430E00" }}
                      >
                        <HeroGridCardNumberIcon
                          alt="bandwidth icon"
                          src={bandwidthIcon}
                        />
                      </HeroGridCardNumberIconWrapper3>
                    </HeroGridCardNumberIconWrapper2>
                  </HeroGridCardNumberIconWrapper>
                  <HeroGridCardNumberTextWrapper>
                    <HeroGridCardNumberText>123,456</HeroGridCardNumberText>
                  </HeroGridCardNumberTextWrapper>
                </HeroGridCardNumberIconTextWrapper>
              </HeroGridCard>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
              <HeroGridCard>
                <HeroGridCardIconHeaderWrapper>
                  <HeroGridCardIconWrapper>
                    <HeroGridCardIcon
                      alt="apy for sellers icon"
                      src={apyForSellersIcon}
                    />
                  </HeroGridCardIconWrapper>
                  <HeroGridCardHeaderWrapper>
                    <HeroGridCardHeader>APY for sellers</HeroGridCardHeader>
                  </HeroGridCardHeaderWrapper>
                </HeroGridCardIconHeaderWrapper>

                <HeroGridCardSubHeaderWrapper>
                  <HeroGridCardSubHeader>
                    Earn passive APY by supplying energy and bandwidth.
                  </HeroGridCardSubHeader>
                </HeroGridCardSubHeaderWrapper>

                <HeroGridCardNumberIconTextWrapper>
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
                  <HeroGridCardNumberTextWrapper>
                    <HeroGridCardNumberText>12.58 %</HeroGridCardNumberText>
                  </HeroGridCardNumberTextWrapper>
                </HeroGridCardNumberIconTextWrapper>

                <HeroGridCardNumberIconTextWrapper>
                  <HeroGridCardNumberIconWrapper>
                    <HeroGridCardNumberIconWrapper2
                      style={{ border: "solid 1px #430E00" }}
                    >
                      <HeroGridCardNumberIconWrapper3
                        style={{ backgroundColor: "#430E00" }}
                      >
                        <HeroGridCardNumberIcon
                          alt="bandwidth icon"
                          src={bandwidthIcon}
                        />
                      </HeroGridCardNumberIconWrapper3>
                    </HeroGridCardNumberIconWrapper2>
                  </HeroGridCardNumberIconWrapper>
                  <HeroGridCardNumberTextWrapper>
                    <HeroGridCardNumberText>74.32 %</HeroGridCardNumberText>
                  </HeroGridCardNumberTextWrapper>
                </HeroGridCardNumberIconTextWrapper>
              </HeroGridCard>
            </Grid>
          </Grid>
        </HeroResourceWrapper>
      </HeroResourceContainer>
    </>
  );
};

export default ResourceComponent;
