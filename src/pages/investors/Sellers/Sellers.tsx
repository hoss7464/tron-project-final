import React from "react";
import "./Sellers.css";
import {
  SellersContainer,
  SellersMainWrapper,
  SellersTopWrapper,
  SellersBottomWrapper,
  SellersPropertyWrapper,
  SellersPeopertyWrapper2,
  SellersCardIconHeaderWrapper,
  SelersSettingIconWrapper,
  SelersSettingIcon,
  SellersCountIcon,
  SellersTotalIcon,
  SellersEarnIcon,
  SellersCardHeaderWrapper,
  SellersCardHeader,
  SellersCardThingsWrapper,
  SellersCardThingsWrapper2,
  SellersCardThingsNameIconWrapper,
  SellersCardThingsNameWrapper,
  SellersCardThingsName,
  SellersCardThingsNumberWrapper,
  SellersCardThingsNumber,
  SellersMainHeaderBtnWrapper,
  SellersMainHeaderWrapper,
  SellersMainHeader,
  SellersBtnWrapper,
  SellersBtnText,
  SellersHistoryWrapper,
  SellersNavTextWrapper,
} from "./SellersElement";
import { HeroMainbgPhotoWrapper } from "../../mainPage/HeroSection/HeroElements";
import {
  LegacyCardWrapper2,
  LegacyCardWrapper3,
  LegacyCardIconNameWrapper,
  LegacyCardIconWrapper1,
  LegacyCardIconWrapper2,
  LegacyCardIconWrapper3,
  LegacyCardIcon,
  LegacyBandwidthEnergyPropertyWrapper,
  LegacyBandwidthEnergyProperty,
  LegacyCardPropertyWrapper,
  LegacyPropertyHeaderWrapper,
  LegacyCardName,
  LegacyPropertyNumberWrapper,
  LegacyPropertyNumber,
  LegacyCircleWrapper,
} from "../../mainPage/LegacySection/LegacyElements";
import {
  HeroGridCardNumberIconWrapper,
  HeroGridCardNumberIconWrapper2,
  HeroGridCardNumberIconWrapper3,
  HeroGridCardNumberIcon,
} from "../../mainPage/HeroSection/HeroElements";
import {
  OrdersWrapper,
  OrderMainWrapper,
  OrdersNavHeaderWrapper,
  OrdersCarouselWrapper,
  OrdersScroll,
  OrderNavWrapper,
  OrderNavTextWrapper1,
  OrderNavTextWrapper,
  OrderNavText,
  OrdersCard,
} from "../../mainPage/mainPageElements";
import { Grid } from "@mui/material";
import energyIcon from "../../../assets/svg/EnergyIcon.svg";
import bandwidthIcon from "../../../assets/svg/BandwidthIcon.svg";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useTronWallet } from "../../../contexts/TronWalletContext";
import { useFetchData } from "../../../contexts/FetchDataContext";
import MyFilterComponent from "../../../components/FilterComponent/MyFilterComponent";

const Sellers: React.FC = () => {
  const {
    address,
    balance,
    allBandwidth,
    availableBandwidth,
    availableEnergy,
    allEnergy,
  } = useTronWallet();
  const { resourceData } = useFetchData();
  //----------------------------------------------------------------------------------------
  //Functions for circular progress bars :
  const bandwidthPercentage =
    allBandwidth && availableBandwidth
      ? Math.round((allBandwidth / availableBandwidth) * 100)
      : 0;

  const energyPercantage =
    availableEnergy && allEnergy
      ? Math.round((availableEnergy / allEnergy) * 100)
      : 0;
  //----------------------------------------------------------------------------------------
  //Function to get 30 days minimum price :
  const minimumPrice = resourceData?.data.ratesByDuration.find(
    (minRate) => minRate.maxDurationSeconds === 2592000
  );

  return (
    <>
      <SellersContainer>
        <HeroMainbgPhotoWrapper className="Hero-bg"></HeroMainbgPhotoWrapper>
        <SellersMainWrapper>
          <SellersMainHeaderBtnWrapper>
            <SellersMainHeaderWrapper>
              <SellersMainHeader>Dashboard</SellersMainHeader>
            </SellersMainHeaderWrapper>
            <SellersBtnWrapper>
              <SelersSettingIconWrapper>
                <SelersSettingIcon />
              </SelersSettingIconWrapper>
              <SellersBtnText>Setting</SellersBtnText>
            </SellersBtnWrapper>
          </SellersMainHeaderBtnWrapper>
          <SellersTopWrapper>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                <LegacyCardWrapper2>
                  <LegacyCardWrapper3 className="card-bg">
                    <LegacyCardIconNameWrapper>
                      <LegacyCardIconWrapper1>
                        <LegacyCardIconWrapper2
                          style={{ border: "solid 2px #003543" }}
                        >
                          <LegacyCardIconWrapper3
                            style={{ backgroundColor: "#003543" }}
                          >
                            <LegacyCardIcon
                              alt="energy icon"
                              src={energyIcon}
                            />
                          </LegacyCardIconWrapper3>
                        </LegacyCardIconWrapper2>
                      </LegacyCardIconWrapper1>
                      <LegacyBandwidthEnergyPropertyWrapper>
                        <LegacyBandwidthEnergyProperty>
                          {address ? (
                            <>
                              <span style={{ color: "#003543" }}>
                                {availableEnergy} /{" "}
                              </span>
                              <span style={{ color: "#B0C0C5" }}>
                                {allEnergy}
                              </span>
                            </>
                          ) : (
                            <>
                              <span style={{ color: "#003543" }}>_ _ / </span>
                              <span style={{ color: "#B0C0C5" }}>_ _</span>
                            </>
                          )}
                        </LegacyBandwidthEnergyProperty>
                      </LegacyBandwidthEnergyPropertyWrapper>
                    </LegacyCardIconNameWrapper>
                    <LegacyCardPropertyWrapper>
                      <SellersPropertyWrapper>
                        <SellersPeopertyWrapper2>
                          <LegacyPropertyHeaderWrapper>
                            <LegacyCardName style={{ fontWeight: "600" }}>
                              Energy
                            </LegacyCardName>
                          </LegacyPropertyHeaderWrapper>
                          <LegacyPropertyNumberWrapper>
                            {address ? (
                              <LegacyPropertyNumber
                                style={{ fontSize: "18px" }}
                              >
                                {availableEnergy}
                              </LegacyPropertyNumber>
                            ) : (
                              <LegacyPropertyNumber>_ _</LegacyPropertyNumber>
                            )}
                          </LegacyPropertyNumberWrapper>
                        </SellersPeopertyWrapper2>
                        <SellersPeopertyWrapper2>
                          <LegacyPropertyHeaderWrapper>
                            <LegacyCardName style={{ fontWeight: "600" }}>
                              Min-Price
                            </LegacyCardName>
                          </LegacyPropertyHeaderWrapper>
                          <LegacyPropertyNumberWrapper>
                            {address ? (
                              <LegacyPropertyNumber
                                style={{ fontSize: "18px" }}
                              >
                                {minimumPrice?.rate.energy}
                              </LegacyPropertyNumber>
                            ) : (
                              <LegacyPropertyNumber>_ _</LegacyPropertyNumber>
                            )}
                          </LegacyPropertyNumberWrapper>
                        </SellersPeopertyWrapper2>
                      </SellersPropertyWrapper>

                      <LegacyCircleWrapper className="circular-text-style">
                        <CircularProgressbar
                          value={energyPercantage}
                          text={`${energyPercantage}%`}
                          styles={buildStyles({
                            pathColor: "#003543",
                            trailColor: "#B0C0C5",
                            textColor: "#003543",
                          })}
                        />
                      </LegacyCircleWrapper>
                    </LegacyCardPropertyWrapper>
                  </LegacyCardWrapper3>
                </LegacyCardWrapper2>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                <LegacyCardWrapper2>
                  <LegacyCardWrapper3 className="card-bg">
                    <LegacyCardIconNameWrapper>
                      <LegacyCardIconWrapper1>
                        <LegacyCardIconWrapper2>
                          <LegacyCardIconWrapper3>
                            <LegacyCardIcon
                              alt="bandwidth icon"
                              src={bandwidthIcon}
                            />
                          </LegacyCardIconWrapper3>
                        </LegacyCardIconWrapper2>
                      </LegacyCardIconWrapper1>
                      <LegacyBandwidthEnergyPropertyWrapper>
                        <LegacyBandwidthEnergyProperty>
                          {address ? (
                            <>
                              <span style={{ color: "#430E00" }}>
                                {allBandwidth} /
                              </span>{" "}
                              <span style={{ color: "#C5B4B0" }}>
                                {availableBandwidth}
                              </span>
                            </>
                          ) : (
                            <>
                              <span style={{ color: "#430E00" }}>_ _ /</span>{" "}
                              <span style={{ color: "#C5B4B0" }}>_ _</span>
                            </>
                          )}
                        </LegacyBandwidthEnergyProperty>
                      </LegacyBandwidthEnergyPropertyWrapper>
                    </LegacyCardIconNameWrapper>
                    <LegacyCardPropertyWrapper>
                      <SellersPropertyWrapper>
                        <SellersPeopertyWrapper2>
                          <LegacyPropertyHeaderWrapper>
                            <LegacyCardName style={{ fontWeight: "600" }}>
                              Bandwidth
                            </LegacyCardName>
                          </LegacyPropertyHeaderWrapper>
                          <LegacyPropertyNumberWrapper>
                            {address ? (
                              <LegacyPropertyNumber
                                style={{ fontSize: "18px" }}
                              >
                                {allBandwidth}
                              </LegacyPropertyNumber>
                            ) : (
                              <LegacyPropertyNumber>_ _</LegacyPropertyNumber>
                            )}
                          </LegacyPropertyNumberWrapper>
                        </SellersPeopertyWrapper2>
                        <SellersPeopertyWrapper2>
                          <LegacyPropertyHeaderWrapper>
                            <LegacyCardName style={{ fontWeight: "600" }}>
                              Min-Price
                            </LegacyCardName>
                          </LegacyPropertyHeaderWrapper>
                          <LegacyPropertyNumberWrapper>
                            {address ? (
                              <LegacyPropertyNumber
                                style={{ fontSize: "18px" }}
                              >
                                {minimumPrice?.rate.bandwidth}
                              </LegacyPropertyNumber>
                            ) : (
                              <LegacyPropertyNumber>_ _</LegacyPropertyNumber>
                            )}
                          </LegacyPropertyNumberWrapper>
                        </SellersPeopertyWrapper2>
                      </SellersPropertyWrapper>
                      <LegacyCircleWrapper className="circular-text-style">
                        <CircularProgressbar
                          value={bandwidthPercentage}
                          text={`${bandwidthPercentage}%`}
                          styles={buildStyles({
                            pathColor: "#430E00",
                            trailColor: "#C5B4B0",
                            textColor: "#430E00",
                          })}
                        />
                      </LegacyCircleWrapper>
                    </LegacyCardPropertyWrapper>
                  </LegacyCardWrapper3>
                </LegacyCardWrapper2>
              </Grid>
            </Grid>
          </SellersTopWrapper>
          <SellersBottomWrapper>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
                <LegacyCardWrapper2>
                  <LegacyCardWrapper3 className="card-bg">
                    <SellersCardIconHeaderWrapper>
                      <LegacyCardIconWrapper1>
                        <LegacyCardIconWrapper2
                          style={{ border: "solid 2px #003543" }}
                        >
                          <LegacyCardIconWrapper3
                            style={{ backgroundColor: "#003543" }}
                          >
                            <SellersCountIcon />
                          </LegacyCardIconWrapper3>
                        </LegacyCardIconWrapper2>
                      </LegacyCardIconWrapper1>
                      <SellersCardHeaderWrapper>
                        <SellersCardHeader>Delegation Count</SellersCardHeader>
                      </SellersCardHeaderWrapper>
                    </SellersCardIconHeaderWrapper>

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
                            <SellersCardThingsName>
                              Energy
                            </SellersCardThingsName>
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
                    <SellersCardIconHeaderWrapper>
                      <LegacyCardIconWrapper1>
                        <LegacyCardIconWrapper2
                          style={{ border: "solid 2px #003543" }}
                        >
                          <LegacyCardIconWrapper3
                            style={{ backgroundColor: "#003543" }}
                          >
                            <SellersTotalIcon />
                          </LegacyCardIconWrapper3>
                        </LegacyCardIconWrapper2>
                      </LegacyCardIconWrapper1>
                      <SellersCardHeaderWrapper>
                        <SellersCardHeader>Total Delegated</SellersCardHeader>
                      </SellersCardHeaderWrapper>
                    </SellersCardIconHeaderWrapper>

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
                            <SellersCardThingsName>
                              Energy
                            </SellersCardThingsName>
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
                    <SellersCardIconHeaderWrapper>
                      <LegacyCardIconWrapper1>
                        <LegacyCardIconWrapper2
                          style={{ border: "solid 2px #003543" }}
                        >
                          <LegacyCardIconWrapper3
                            style={{ backgroundColor: "#003543" }}
                          >
                            <SellersEarnIcon />
                          </LegacyCardIconWrapper3>
                        </LegacyCardIconWrapper2>
                      </LegacyCardIconWrapper1>
                      <SellersCardHeaderWrapper>
                        <SellersCardHeader>Total Earned</SellersCardHeader>
                      </SellersCardHeaderWrapper>
                    </SellersCardIconHeaderWrapper>

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
                            <SellersCardThingsName>
                              Energy
                            </SellersCardThingsName>
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
            </Grid>
          </SellersBottomWrapper>
          <SellersHistoryWrapper>
            <OrdersWrapper className="history-bg" style={{width : "100%"}}>
              <OrderMainWrapper>
                <OrdersNavHeaderWrapper>
                  <LegacyCardName style={{ color: "#003543" }}>
                    History
                  </LegacyCardName>
                  <MyFilterComponent
                    listKey="seller-history"
                    options={[
                      "price",
                      "energy",
                      "bandwidth",
                      "latest",
                      "oldest",
                    ]}
                    label="Product"
                  />
                </OrdersNavHeaderWrapper>
                <OrdersCarouselWrapper>
                  <OrdersScroll>
                    <OrderNavWrapper>
                      <OrderNavTextWrapper1 style={{justifyContent : "space-between"}} >
                        <SellersNavTextWrapper>
                          <OrderNavText>Date</OrderNavText>
                        </SellersNavTextWrapper>
                        <SellersNavTextWrapper>
                          <OrderNavText>Type</OrderNavText>
                        </SellersNavTextWrapper>
                        <SellersNavTextWrapper>
                          <OrderNavText>Receiver</OrderNavText>
                        </SellersNavTextWrapper>
                        <SellersNavTextWrapper>
                          <OrderNavText>Resource</OrderNavText>
                        </SellersNavTextWrapper>
                        <SellersNavTextWrapper>
                          <OrderNavText>Price</OrderNavText>
                        </SellersNavTextWrapper>
                        <SellersNavTextWrapper>
                          <OrderNavText>Duration</OrderNavText>
                        </SellersNavTextWrapper>
                        <SellersNavTextWrapper>
                          <OrderNavText>Paid-Amount</OrderNavText>
                        </SellersNavTextWrapper>
                        <SellersNavTextWrapper>
                          <OrderNavText>Paid</OrderNavText>
                        </SellersNavTextWrapper>
                      </OrderNavTextWrapper1>
                    </OrderNavWrapper>
                    <OrdersCard></OrdersCard>
                  </OrdersScroll>
                </OrdersCarouselWrapper>
              </OrderMainWrapper>
            </OrdersWrapper>
          </SellersHistoryWrapper>
        </SellersMainWrapper>
      </SellersContainer>
    </>
  );
};

export default Sellers;
