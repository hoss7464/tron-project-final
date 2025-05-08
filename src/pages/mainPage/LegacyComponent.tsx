import React from "react";
import { useTranslation } from "react-i18next";
import {
  LegacyContainer,
  AccountWrapper,
  AccountHeaderIconWrapper,
  AccountIconWrapper,
  AccountIcon,
  AccountHeaderWrapper,
  AccountHeader,
  AccountAddCopyWrapper,
  AccountAddWrapper,
  AccountAdd,
  AccountCopyWrapper,
  AccountCopyIcon,
  AccountTextNumberWrapper,
  AccountTextWrapper,
  AccountText,
  AccountNumberWrapper,
  AccountNumber,
  EnergyWrapper,
  EnergyResourceWrapper,
  BandwidthWrapper,
} from "./mainPageElements";
import accountIcon from "../../assets/svg/AccountIcon.svg";
import energyIcon from "../../assets/svg/EnergyIcon.svg";
import bandwidthIcon from "../../assets/svg/BandwidthIcon.svg";

const LegacyComponent: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <LegacyContainer>
        <AccountWrapper  >
          <AccountHeaderIconWrapper>
            <AccountIconWrapper>
              <AccountIcon alt="account" src={accountIcon} />
            </AccountIconWrapper>
            <AccountHeaderWrapper>
              <AccountHeader style={{ color: "#1E650F" }}>
                {t("account")}
              </AccountHeader>
            </AccountHeaderWrapper>
          </AccountHeaderIconWrapper>
          <AccountAddCopyWrapper>
            <AccountAddWrapper>
              <AccountAdd>XzWPJDLR3jXzWPJDLR3j zWPJDLR3jzW</AccountAdd>
            </AccountAddWrapper>
            <AccountCopyWrapper>
              <AccountCopyIcon />
            </AccountCopyWrapper>
          </AccountAddCopyWrapper>
          <AccountTextNumberWrapper>
            <AccountTextWrapper>
              <AccountText style={{ color: "#1E650F" }}>
                {t("balance_trx")}
              </AccountText>
            </AccountTextWrapper>
            <AccountNumberWrapper>
              <AccountNumber style={{ color: "#1E650F" }}>0</AccountNumber>
            </AccountNumberWrapper>
          </AccountTextNumberWrapper>
          <AccountTextNumberWrapper>
            <AccountTextWrapper>
              <AccountText style={{ color: "#1E650F" }}>
                {t("freeze_trx")}
              </AccountText>
            </AccountTextWrapper>
            <AccountNumberWrapper>
              <AccountNumber style={{ color: "#1E650F" }}>0</AccountNumber>
            </AccountNumberWrapper>
          </AccountTextNumberWrapper>
          <AccountTextNumberWrapper>
            <AccountTextWrapper>
              <AccountText style={{ color: "#1E650F" }}>
                {t("all_trx")}
              </AccountText>
            </AccountTextWrapper>
            <AccountNumberWrapper>
              <AccountNumber style={{ color: "#1E650F" }}>0</AccountNumber>
            </AccountNumberWrapper>
          </AccountTextNumberWrapper>
        </AccountWrapper>

        <EnergyWrapper>
          <AccountHeaderIconWrapper>
            <AccountIconWrapper>
              <AccountIcon alt="energy" src={energyIcon} />
            </AccountIconWrapper>
            <AccountHeaderWrapper>
              <AccountHeader style={{ color: "#1E650F" }}>
                {t("energy")}
              </AccountHeader>
            </AccountHeaderWrapper>
          </AccountHeaderIconWrapper>
          <EnergyResourceWrapper>
            <AccountNumberWrapper style={{ marginLeft: "0.5rem" }}>
              <AccountNumber style={{ color: "#1E650F" }}>0 / <span style={{color: "#989898"}} >0</span></AccountNumber>
            </AccountNumberWrapper>
          </EnergyResourceWrapper>
          <AccountTextNumberWrapper>
            <AccountTextWrapper>
              <AccountText style={{ color: "#1E650F" }}>
                {t("delegable_energy")}
              </AccountText>
            </AccountTextWrapper>
            <AccountNumberWrapper>
              <AccountNumber style={{ color: "#1E650F" }}>0</AccountNumber>
            </AccountNumberWrapper>
          </AccountTextNumberWrapper>
          <AccountTextNumberWrapper>
            <AccountTextWrapper>
              <AccountText style={{ color: "#1E650F" }}>
                {t("delegated_energy")}
              </AccountText>
            </AccountTextWrapper>
            <AccountNumberWrapper>
              <AccountNumber style={{ color: "#1E650F" }}>0</AccountNumber>
            </AccountNumberWrapper>
          </AccountTextNumberWrapper>
        </EnergyWrapper>

        <BandwidthWrapper>
          <AccountHeaderIconWrapper>
            <AccountIconWrapper>
              <AccountIcon alt="bandwidth" src={bandwidthIcon} />
            </AccountIconWrapper>
            <AccountHeaderWrapper>
              <AccountHeader style={{ color: "#1E650F" }}>
                {t("bandwidth")}
              </AccountHeader>
            </AccountHeaderWrapper>
          </AccountHeaderIconWrapper>
          <EnergyResourceWrapper>
            <AccountNumberWrapper style={{ marginLeft: "0.5rem" }}>
              <AccountNumber style={{ color: "#1E650F" }}>0 / <span style={{color: "#989898"}} >0</span></AccountNumber>
            </AccountNumberWrapper>
          </EnergyResourceWrapper>
          <AccountTextNumberWrapper>
            <AccountTextWrapper>
              <AccountText style={{ color: "#1E650F" }}>
                {t("delegable_bandwidth")}
              </AccountText>
            </AccountTextWrapper>
            <AccountNumberWrapper>
              <AccountNumber style={{ color: "#1E650F" }}>0</AccountNumber>
            </AccountNumberWrapper>
          </AccountTextNumberWrapper>
          <AccountTextNumberWrapper>
            <AccountTextWrapper>
              <AccountText style={{ color: "#1E650F" }}>
                {t("delegated_bandwidth")}
              </AccountText>
            </AccountTextWrapper>
            <AccountNumberWrapper>
              <AccountNumber style={{ color: "#1E650F" }}>0</AccountNumber>
            </AccountNumberWrapper>
          </AccountTextNumberWrapper>
        </BandwidthWrapper>
      </LegacyContainer>
    </>
  );
};

export default LegacyComponent;
