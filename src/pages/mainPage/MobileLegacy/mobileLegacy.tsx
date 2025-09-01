import React from "react";
import { MobileLegacyContainer } from "./mobileLegacyElements";
import "../LegacySection/Legacy.css";
import {
  LegacyCardWrapper2,
  LegacyCardWrapper3,
  LegacyCardIconNameWrapper,
  LegacyCardIconWrapper1,
  LegacyCardIconWrapper2,
  LegacyCardIconWrapper3,
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
} from "../LegacySection/LegacyElements";
import { useTronWallet } from "../../../contexts/TronWalletContext";
import accountIcon from "../../../assets/svg/AccountIcon.svg";
import addressIcon from "../../../assets/svg/AddressIcon.svg";
import balanceIcon from "../../../assets/svg/BalanceIcon.svg";
import energyIcon from "../../../assets/svg/EnergyIcon.svg";
import bandwidthIcon from "../../../assets/svg/BandwidthIcon.svg";
import { useDispatch } from "react-redux";
import { showNotification } from "../../../redux/actions/notifSlice";

const MobileLegacy: React.FC = () => {
  const {
    address,
    balance,
    allBandwidth,
    availableBandwidth,
    availableEnergy,
    allEnergy,
  } = useTronWallet();
  const dispatch = useDispatch();

  //Funtion for copy button :
  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      dispatch(
        showNotification({
          name: "copy-notif",
          message: "Copied to clipboard",
          severity: "success",
        })
      );
    }
  };
  return (
    <>
      <MobileLegacyContainer>
        <LegacyCardWrapper2 style={{ width: "100%" }}>
          <LegacyCardWrapper3 className="card-bg">
            <LegacyCardIconNameWrapper>
              <LegacyCardIconWrapper1>
                <LegacyCardIconWrapper2>
                  <LegacyCardIconWrapper3>
                    <LegacyCardIcon alt="account icon" src={accountIcon} />
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
                        <LegacyAddIcon alt="address icon" src={addressIcon} />
                      </LegacyIconWrapper3>
                    </LegacyIconWrapper2>
                  </LegacyIconWrapper1>
                  <LegacyAccountInfoAddWrapper>
                    <LegacyAccountInfoAdd>{address}</LegacyAccountInfoAdd>
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
                        <LegacyAddIcon alt="balance icon" src={balanceIcon} />
                      </LegacyIconWrapper3>
                    </LegacyIconWrapper2>
                  </LegacyIconWrapper>
                  <LegacyBalanceWrapper>
                    <LegacyBalance>
                      Balance{" "}
                      <span style={{ fontSize: "13px", color: "#003543" }}>
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

              <LegacyIconBalanceNumberWrapper style={{ marginTop: "1.5rem" }}>
                <LegacyIconBalanceWrapper>
                  <LegacyIconWrapper>
                    <LegacyIconWrapper2 style={{ border: "solid 1px #003543" }}>
                      <LegacyIconWrapper3
                        style={{ backgroundColor: "#003543" }}
                      >
                        <LegacyAddIcon alt="energy icon" src={energyIcon} />
                      </LegacyIconWrapper3>
                    </LegacyIconWrapper2>
                  </LegacyIconWrapper>
                  <LegacyBalanceWrapper>
                    <LegacyBalance>Energy</LegacyBalance>
                  </LegacyBalanceWrapper>
                </LegacyIconBalanceWrapper>
                <LegacyNumberWrapper>
                  {address ? (
                    <>
                      <LegacyNumber style={{ color: "#003543" }}>
                        {availableEnergy}/{" "}
                      </LegacyNumber>
                      <LegacyNumber style={{ color: "#003543" }}>
                        {allEnergy}
                      </LegacyNumber>
                    </>
                  ) : (
                    <>
                      <LegacyNumber style={{ color: "#003543" }}>
                        _ _ /{" "}
                      </LegacyNumber>
                      <LegacyNumber style={{ color: "#003543" }}>
                        _ _
                      </LegacyNumber>
                    </>
                  )}
                </LegacyNumberWrapper>
              </LegacyIconBalanceNumberWrapper>

              <LegacyIconBalanceNumberWrapper style={{ marginTop: "1.5rem" }}>
                <LegacyIconBalanceWrapper>
                  <LegacyIconWrapper>
                    <LegacyIconWrapper2>
                      <LegacyIconWrapper3>
                        <LegacyAddIcon
                          alt="bandwidth icon"
                          src={bandwidthIcon}
                        />
                      </LegacyIconWrapper3>
                    </LegacyIconWrapper2>
                  </LegacyIconWrapper>
                  <LegacyBalanceWrapper>
                    <LegacyBalance>Bandwidth</LegacyBalance>
                  </LegacyBalanceWrapper>
                </LegacyIconBalanceWrapper>
                <LegacyNumberWrapper>
                  {address ? (
                    <>
                      <LegacyNumber style={{ color: "#430E00" }}>
                        {allBandwidth}/{" "}
                      </LegacyNumber>
                      <LegacyNumber style={{ color: "#430E00" }}>
                        {availableBandwidth}
                      </LegacyNumber>
                    </>
                  ) : (
                    <>
                      <LegacyNumber style={{ color: "#430E00" }}>
                        _ _ /{" "}
                      </LegacyNumber>
                      <LegacyNumber style={{ color: "#430E00" }}>
                        _ _
                      </LegacyNumber>
                    </>
                  )}
                </LegacyNumberWrapper>
              </LegacyIconBalanceNumberWrapper>
            </LegacyAccountInfoWrapper>
          </LegacyCardWrapper3>
        </LegacyCardWrapper2>
      </MobileLegacyContainer>
    </>
  );
};

export default MobileLegacy;
