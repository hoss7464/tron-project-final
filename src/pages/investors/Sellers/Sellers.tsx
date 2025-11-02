import React, { useState, useCallback, useEffect } from "react";
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
import SellersTables from "./Table/SellersTables";
import { Sec1CardThingsWrapper } from "../Buyers/Section1/Section1Elements";
import { AccountInfoResponse } from "../../../services/requestService";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { Grid } from "@mui/material";
import energyIcon from "../../../assets/svg/EnergyIcon.svg";
import bandwidthIcon from "../../../assets/svg/BandwidthIcon.svg";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useTronWallet } from "../../../contexts/TronWalletContext";
import { useFetchData } from "../../../contexts/FetchDataContext";
import PopUp6 from "../../../components/Popup/PopUp6";
import PopUp7 from "../../../components/Popup/PopUp7";
import PopUp11 from "../../../components/Popup/PopUp11";
import { useTranslation } from "react-i18next";
import { showNotification } from "../../../redux/actions/notifSlice";

const Sellers: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const {
    address,
    allBandwidth,
    availableBandwidth,
    availableEnergy,
    allEnergy,
    sellersPermission,
    isConnectedTrading,
  } = useTronWallet();
  const { resourceData, tradingAccountInfo, fetchData } = useFetchData();
  const [settingBtn, setSettingBtn] = useState(false);
  const [accountInfoData, setAccountInfoData] =
    useState<AccountInfoResponse | null>(null);

  const refreshTrigger = useSelector(
    (state: RootState) => state.refresh.refreshTrigger
  );

  //----------------------------------------------------------------------------------------
  //To get refresh data from server :
  useEffect(() => {
    const refreshData = async () => {
      try {
        await fetchData();
      } catch (error) {
        dispatch(
          showNotification({
            name: "error1",
            message: `${t("Text215")}`,
            severity: "error",
          })
        );
      }
    };

    if (refreshTrigger) {
      refreshData();
    }
  }, [refreshTrigger, fetchData]);

  useEffect(() => {
    if (tradingAccountInfo) {
      setAccountInfoData(tradingAccountInfo);
    }
  }, [tradingAccountInfo]);

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

  //----------------------------------------------------------------------------------------
  //Function for setting button :
  const handleSettingPopupOpen = () => {
    setSettingBtn(true);
  };

  const handleSettingPopupClose = useCallback(() => {
    setSettingBtn(false);
  }, []);
  //Function to change sun to trx :
  const sunToTrx = (value: number) => {
    const trxValue = value / 1_000_000;
    return trxValue.toFixed(2);
  };
  //----------------------------------------------------------------------------------------
  if (accountInfoData?.data.seller.delegationedTotal === undefined) {
    return;
  }

  return (
    <>
      {isConnectedTrading === true && sellersPermission === true ? null : (
        <PopUp6 />
      )}
      {!isConnectedTrading ? <PopUp7 /> : null}
      <SellersContainer>
        <HeroMainbgPhotoWrapper className="Hero-bg"></HeroMainbgPhotoWrapper>
        <SellersMainWrapper>
          {/*Sellers header */}
          <SellersMainHeaderBtnWrapper>
            <SellersMainHeaderWrapper>
              <SellersMainHeader>{t("Text143")}</SellersMainHeader>
            </SellersMainHeaderWrapper>

            <SellersBtnWrapper onClick={handleSettingPopupOpen}>
              <SelersSettingIconWrapper>
                <SelersSettingIcon />
              </SelersSettingIconWrapper>
              <SellersBtnText>{t("Text144")}</SellersBtnText>
            </SellersBtnWrapper>
          </SellersMainHeaderBtnWrapper>
          <SellersTopWrapper>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                {/*energy component */}
                <LegacyCardWrapper2  >
                  <LegacyCardWrapper3 className="card-bg" style={{minHeight : "210px"}}>
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
                                {availableEnergy?.toLocaleString()} /{" "}
                              </span>
                              <span style={{ color: "#B0C0C5" }}>
                                {allEnergy?.toLocaleString()}
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
                              {t("Text6")}
                            </LegacyCardName>
                          </LegacyPropertyHeaderWrapper>
                          <LegacyPropertyNumberWrapper>
                            {address ? (
                              <LegacyPropertyNumber
                                style={{ fontSize: "18px" }}
                              >
                                {availableEnergy?.toLocaleString()}
                              </LegacyPropertyNumber>
                            ) : (
                              <LegacyPropertyNumber>_ _</LegacyPropertyNumber>
                            )}
                          </LegacyPropertyNumberWrapper>
                        </SellersPeopertyWrapper2>
                        <SellersPeopertyWrapper2>
                          <LegacyPropertyHeaderWrapper>
                            <LegacyCardName style={{ fontWeight: "600" }}>
                              {t("Text145")}
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
                {/*bandwidth component */}
                <LegacyCardWrapper2 >
                  <LegacyCardWrapper3 className="card-bg" style={{minHeight : "210px"}}>
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
                                {allBandwidth?.toLocaleString()} /
                              </span>{" "}
                              <span style={{ color: "#C5B4B0" }}>
                                {availableBandwidth?.toLocaleString()}
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
                              {t("Text9")}
                            </LegacyCardName>
                          </LegacyPropertyHeaderWrapper>
                          <LegacyPropertyNumberWrapper>
                            {address ? (
                              <LegacyPropertyNumber
                                style={{ fontSize: "18px" }}
                              >
                                {allBandwidth?.toLocaleString()}
                              </LegacyPropertyNumber>
                            ) : (
                              <LegacyPropertyNumber>_ _</LegacyPropertyNumber>
                            )}
                          </LegacyPropertyNumberWrapper>
                        </SellersPeopertyWrapper2>
                        <SellersPeopertyWrapper2>
                          <LegacyPropertyHeaderWrapper>
                            <LegacyCardName style={{ fontWeight: "600" }}>
                              {t("Text145")}
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
                {/*delegated count component */}
                <LegacyCardWrapper2>
                  <LegacyCardWrapper3 className="card-bg" style={{minHeight : "210px"}}>
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
                        <SellersCardHeader>{t("Text146")}</SellersCardHeader>
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
                              {t("Text6")}
                            </SellersCardThingsName>
                          </SellersCardThingsNameWrapper>
                        </SellersCardThingsNameIconWrapper>

                        {isConnectedTrading ? (
                          <SellersCardThingsNumberWrapper>
                            <SellersCardThingsNumber>
                              {accountInfoData?.data.seller.delegationedCount.energy.toLocaleString()}
                            </SellersCardThingsNumber>
                          </SellersCardThingsNumberWrapper>
                        ) : (
                          <SellersCardThingsNumberWrapper>
                            <SellersCardThingsNumber>
                              _ _
                            </SellersCardThingsNumber>
                          </SellersCardThingsNumberWrapper>
                        )}
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
                              {t("Text9")}
                            </SellersCardThingsName>
                          </SellersCardThingsNameWrapper>
                        </SellersCardThingsNameIconWrapper>
                        {isConnectedTrading ? (
                          <SellersCardThingsNumberWrapper>
                            <SellersCardThingsNumber>
                              {accountInfoData?.data.seller.delegationedCount.bandwidth.toLocaleString()}
                            </SellersCardThingsNumber>
                          </SellersCardThingsNumberWrapper>
                        ) : (
                          <SellersCardThingsNumberWrapper>
                            <SellersCardThingsNumber>
                              _ _
                            </SellersCardThingsNumber>
                          </SellersCardThingsNumberWrapper>
                        )}
                      </SellersCardThingsWrapper2>
                    </SellersCardThingsWrapper>
                  </LegacyCardWrapper3>
                </LegacyCardWrapper2>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
                {/* credit component */}
                <LegacyCardWrapper2>
                  <LegacyCardWrapper3 className="card-bg" style={{minHeight : "210px"}}>
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
                        <SellersCardHeader>{t("Text147")}</SellersCardHeader>
                      </SellersCardHeaderWrapper>
                    </SellersCardIconHeaderWrapper>

                    <Sec1CardThingsWrapper style={{ marginBottom: "0.3rem" }}>
                      <SellersCardThingsWrapper2 style={{ padding: "0" }}>
                        <SellersCardThingsNameIconWrapper>
                          <SellersCardThingsNameWrapper>
                            <SellersCardThingsName>
                              {t("Text148")}{" "}
                            </SellersCardThingsName>
                          </SellersCardThingsNameWrapper>
                        </SellersCardThingsNameIconWrapper>
                        <SellersCardThingsNumberWrapper>
                          {isConnectedTrading === true ? (
                            <SellersCardThingsNumber>
                              {sunToTrx(
                                accountInfoData.data.sellerCredit
                              ).toLocaleString()}{" "}
                              TRX
                            </SellersCardThingsNumber>
                          ) : (
                            <SellersCardThingsNumber>
                              _ _
                            </SellersCardThingsNumber>
                          )}
                        </SellersCardThingsNumberWrapper>
                      </SellersCardThingsWrapper2>
                    </Sec1CardThingsWrapper>
                  </LegacyCardWrapper3>
                </LegacyCardWrapper2>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
                {/* total delegated component */}
                <LegacyCardWrapper2>
                  <LegacyCardWrapper3 className="card-bg" style={{minHeight : "210px"}}>
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
                        <SellersCardHeader>{t("Text149")}</SellersCardHeader>
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
                              {t("Text6")}
                            </SellersCardThingsName>
                          </SellersCardThingsNameWrapper>
                        </SellersCardThingsNameIconWrapper>

                        {isConnectedTrading ? (
                          <SellersCardThingsNumberWrapper>
                            <SellersCardThingsNumber>
                              {accountInfoData?.data.seller.delegationedTotal.energy.toLocaleString()}
                            </SellersCardThingsNumber>
                          </SellersCardThingsNumberWrapper>
                        ) : (
                          <SellersCardThingsNumberWrapper>
                            <SellersCardThingsNumber>
                              _ _
                            </SellersCardThingsNumber>
                          </SellersCardThingsNumberWrapper>
                        )}
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
                              {t("Text9")}
                            </SellersCardThingsName>
                          </SellersCardThingsNameWrapper>
                        </SellersCardThingsNameIconWrapper>
                        {isConnectedTrading ? (
                          <SellersCardThingsNumberWrapper>
                            <SellersCardThingsNumber>
                              {accountInfoData?.data.seller.delegationedTotal.bandwidth.toLocaleString()}
                            </SellersCardThingsNumber>
                          </SellersCardThingsNumberWrapper>
                        ) : (
                          <SellersCardThingsNumberWrapper>
                            <SellersCardThingsNumber>
                              _ _
                            </SellersCardThingsNumber>
                          </SellersCardThingsNumberWrapper>
                        )}
                      </SellersCardThingsWrapper2>
                    </SellersCardThingsWrapper>
                  </LegacyCardWrapper3>
                </LegacyCardWrapper2>
              </Grid>
            </Grid>
          </SellersBottomWrapper>
          {/* history table component */}
          <SellersHistoryWrapper>
            <SellersTables />
          </SellersHistoryWrapper>
        </SellersMainWrapper>
      </SellersContainer>
      <PopUp11 open={settingBtn} onClose={handleSettingPopupClose} />
    </>
  );
};

export default Sellers;
