import React from "react";
import "./mainPage.css";
import { useTranslation } from "react-i18next";
import {
  AccountHeaderIconWrapper,
  AccountHeaderWrapper,
  AccountHeader,
  AccountIconWrapper,
  AccountIcon,
  AccountTextNumberWrapper,
  AccountTextWrapper,
  AccountText,
  AccountNumberWrapper,
  AccountNumber,
  MobileAccountWrapper,
} from "./mainPageElements";
import accountIcon from "../../assets/svg/AccountIcon.svg";

const MobileResourceComponent: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <MobileAccountWrapper className="order-bg">
        <AccountHeaderIconWrapper>
          <AccountIconWrapper>
            <AccountIcon alt="account" src={accountIcon} />
          </AccountIconWrapper>
          <AccountHeaderWrapper>
            <AccountHeader  style={{ color: "#1E650F" }}>
              {t("account")}
            </AccountHeader>
          </AccountHeaderWrapper>
        </AccountHeaderIconWrapper>

        <AccountTextNumberWrapper>
          <AccountTextWrapper>
            <AccountText style={{ color: "#1E650F" }} >
              {t("balance_trx")}
            </AccountText>
          </AccountTextWrapper>
          <AccountNumberWrapper>
            <AccountNumber style={{ color: "#1E650F" }} >0</AccountNumber>
          </AccountNumberWrapper>
        </AccountTextNumberWrapper>
        <AccountTextNumberWrapper>
          <AccountTextWrapper>
            <AccountText style={{ color: "#1E650F" }} >
              {t("energy")}
            </AccountText>
          </AccountTextWrapper>
          <AccountNumberWrapper>
            <AccountNumber style={{ color: "#1E650F" }}>0</AccountNumber>
          </AccountNumberWrapper>
        </AccountTextNumberWrapper>
        <AccountTextNumberWrapper>
          <AccountTextWrapper>
            <AccountText style={{ color: "#1E650F" }} >
              {t("bandwidth")}
            </AccountText>
          </AccountTextWrapper>
          <AccountNumberWrapper>
            <AccountNumber style={{ color: "#1E650F" }}>0</AccountNumber>
          </AccountNumberWrapper>
        </AccountTextNumberWrapper>
      </MobileAccountWrapper>
    </>
  );
};

export default MobileResourceComponent;
