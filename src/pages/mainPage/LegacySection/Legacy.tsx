import React from "react";
import "./Legacy.css";
import {
  LegacyContainer,
  LegacyWrapper,
  LegacyHeaderWrapper,
  LegacyHeader,
  LegacyCardWrapper,
  LegacyCardWrapper2,
  LegacyCardWrapper3,
  LegacyCardIconWrapper1,
  LegacyCardIconWrapper2,
  LegacyCardIconWrapper3,
  LegacyCardIconNameWrapper,
  LegacyCardIcon,
  LegacyCardNameWrapper,
  LegacyCardName,
  LegacyAccountInfoWrapper,
  LegacyAddCopyWrapper,
  LegacyIconAddWrapper,
  LegacyIconWrapper1,
  LegacyIconWrapper2,
  LegacyIconWrapper3,
  LegacyAddIcon,
  LegacyAccountInfoAddWrapper,
  LegacyAccountInfoAdd,
  LegacyAccountInfoCopyWrapper,
  LegacyAccountInfoCopyIcon,
  LegacyIconBalanceNumberWrapper,
  LegacyIconBalanceWrapper,
  LegacyIconWrapper,
  LegacyBalanceWrapper,
  LegacyBalance,
  LegacyNumberWrapper,
  LegacyNumber,
  LegacyBandwidthEnergyPropertyWrapper,
  LegacyBandwidthEnergyProperty,
  LegacyCardPropertyWrapper,
  LegacyPropertyWrapper,
  LegacyPropertyHeaderWrapper,
  LegacyPropertyNumberWrapper,
  LegacyPropertyNumber,
  LegacyCircleWrapper,
} from "./LegacyElements";
import { Grid } from "@mui/material";
import accountIcon from "../../../assets/svg/AccountIcon.svg";
import addressIcon from "../../../assets/svg/AddressIcon.svg";
import balanceIcon from "../../../assets/svg/BalanceIcon.svg";
import energyIcon from "../../../assets/svg/EnergyIcon.svg";
import bandwidthIcon from "../../../assets/svg/BandwidthIcon.svg";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useTronWallet } from "../../../contexts/TronWalletContext";

const Legacy: React.FC = () => {
  const {
    address,
    balance,
    allBandwidth,
    totalBandwidth,
    availableEnergy,
    allEnergy,
  } = useTronWallet();
  const percentage = 85;

  //Funtion for copy button :
  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(address);
    }
  };
  return (
    <>
      <LegacyContainer>
        <LegacyWrapper>
          <LegacyHeaderWrapper>
            <LegacyHeader>My Resource</LegacyHeader>
          </LegacyHeaderWrapper>

          <LegacyCardWrapper>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
                <LegacyCardWrapper2>
                  <LegacyCardWrapper3 className="card-bg">
                    <LegacyCardIconNameWrapper>
                      <LegacyCardIconWrapper1>
                        <LegacyCardIconWrapper2>
                          <LegacyCardIconWrapper3>
                            <LegacyCardIcon
                              alt="account icon"
                              src={accountIcon}
                            />
                          </LegacyCardIconWrapper3>
                        </LegacyCardIconWrapper2>
                      </LegacyCardIconWrapper1>
                      <LegacyCardNameWrapper>
                        <LegacyCardName>Account</LegacyCardName>
                      </LegacyCardNameWrapper>
                    </LegacyCardIconNameWrapper>

                    <LegacyAccountInfoWrapper className="account-info-bg">
                      <LegacyAddCopyWrapper>
                        <LegacyIconAddWrapper>
                          <LegacyIconWrapper1>
                            <LegacyIconWrapper2>
                              <LegacyIconWrapper3>
                                <LegacyAddIcon
                                  alt="address icon"
                                  src={addressIcon}
                                />
                              </LegacyIconWrapper3>
                            </LegacyIconWrapper2>
                          </LegacyIconWrapper1>

                          <LegacyAccountInfoAddWrapper>
                            <LegacyAccountInfoAdd>
                              {address}
                            </LegacyAccountInfoAdd>
                          </LegacyAccountInfoAddWrapper>
                        </LegacyIconAddWrapper>

                        <LegacyAccountInfoCopyWrapper onClick={handleCopy}>
                          <LegacyAccountInfoCopyIcon />
                        </LegacyAccountInfoCopyWrapper>
                      </LegacyAddCopyWrapper>

                      <LegacyIconBalanceNumberWrapper>
                        <LegacyIconBalanceWrapper>
                          <LegacyIconWrapper>
                            <LegacyIconWrapper2>
                              <LegacyIconWrapper3>
                                <LegacyAddIcon
                                  alt="balance icon"
                                  src={balanceIcon}
                                />
                              </LegacyIconWrapper3>
                            </LegacyIconWrapper2>
                          </LegacyIconWrapper>
                          <LegacyBalanceWrapper>
                            <LegacyBalance>
                              Balance{" "}
                              <span
                                style={{ fontSize: "13px", color: "#003543" }}
                              >
                                {"(TRX)"}
                              </span>
                            </LegacyBalance>
                          </LegacyBalanceWrapper>
                        </LegacyIconBalanceWrapper>
                        <LegacyNumberWrapper>
                          {address ? (
                            <LegacyNumber>{balance}</LegacyNumber>
                          ) : (
                            <LegacyNumber>_ _</LegacyNumber>
                          )}
                        </LegacyNumberWrapper>
                      </LegacyIconBalanceNumberWrapper>
                    </LegacyAccountInfoWrapper>
                  </LegacyCardWrapper3>
                </LegacyCardWrapper2>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
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
                          {" "}
                          <span style={{ color: "#003543" }}>
                            {availableEnergy} /{" "}
                          </span>{" "}
                          <span style={{ color: "#B0C0C5" }}>{allEnergy}</span>
                        </LegacyBandwidthEnergyProperty>
                      </LegacyBandwidthEnergyPropertyWrapper>
                    </LegacyCardIconNameWrapper>
                    <LegacyCardPropertyWrapper>
                      <LegacyPropertyWrapper>
                        <LegacyPropertyHeaderWrapper>
                          <LegacyCardName>Energy</LegacyCardName>
                        </LegacyPropertyHeaderWrapper>
                        <LegacyPropertyNumberWrapper>
                          {address ? (
                            <LegacyPropertyNumber>
                              {availableEnergy}
                            </LegacyPropertyNumber>
                          ) : (
                            <LegacyPropertyNumber>_ _</LegacyPropertyNumber>
                          )}
                        </LegacyPropertyNumberWrapper>
                      </LegacyPropertyWrapper>
                      <LegacyCircleWrapper className="circular-text-style">
                        <CircularProgressbar
                          value={percentage}
                          text={`${percentage}%`}
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

              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
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
                          <span style={{ color: "#430E00" }}>
                            {" "}
                            {allBandwidth} /
                          </span>{" "}
                          <span style={{ color: "#C5B4B0" }}>
                            {" "}
                            {totalBandwidth}
                          </span>
                        </LegacyBandwidthEnergyProperty>
                      </LegacyBandwidthEnergyPropertyWrapper>
                    </LegacyCardIconNameWrapper>
                    <LegacyCardPropertyWrapper>
                      <LegacyPropertyWrapper>
                        <LegacyPropertyHeaderWrapper>
                          <LegacyCardName>Bandwidth</LegacyCardName>
                        </LegacyPropertyHeaderWrapper>
                        <LegacyPropertyNumberWrapper>
                          {address ? (
                            <LegacyPropertyNumber>
                              {allBandwidth}
                            </LegacyPropertyNumber>
                          ) : (
                            <LegacyPropertyNumber>_ _</LegacyPropertyNumber>
                          )}
                        </LegacyPropertyNumberWrapper>
                      </LegacyPropertyWrapper>
                      <LegacyCircleWrapper className="circular-text-style">
                        <CircularProgressbar
                          value={percentage}
                          text={`${percentage}%`}
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
          </LegacyCardWrapper>
        </LegacyWrapper>
      </LegacyContainer>
    </>
  );
};

export default Legacy;
