import React from "react";
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
      <MobileAccountWrapper>
        <AccountHeaderIconWrapper>
          <AccountIconWrapper>
            <AccountIcon alt="account" src={accountIcon} />
          </AccountIconWrapper>
          <AccountHeaderWrapper>
            <AccountHeader style={{ color: "#241DB6" }}>
              {t("account")}
            </AccountHeader>
          </AccountHeaderWrapper>
        </AccountHeaderIconWrapper>

        <AccountTextNumberWrapper>
          <AccountTextWrapper>
            <AccountText style={{ color: "#8CA1ED" }}>
              {t("balance_trx")}
            </AccountText>
          </AccountTextWrapper>
          <AccountNumberWrapper>
            <AccountNumber style={{ color: "#241DB6" }}>0</AccountNumber>
          </AccountNumberWrapper>
        </AccountTextNumberWrapper>
        <AccountTextNumberWrapper>
          <AccountTextWrapper>
            <AccountText style={{ color: "#8CA1ED" }}>
              {t("energy")}
            </AccountText>
          </AccountTextWrapper>
          <AccountNumberWrapper>
            <AccountNumber style={{ color: "#241DB6" }}>0</AccountNumber>
          </AccountNumberWrapper>
        </AccountTextNumberWrapper>
        <AccountTextNumberWrapper>
          <AccountTextWrapper>
            <AccountText style={{ color: "#8CA1ED" }}>
              {t("bandwidth")}
            </AccountText>
          </AccountTextWrapper>
          <AccountNumberWrapper>
            <AccountNumber style={{ color: "#241DB6" }}>0</AccountNumber>
          </AccountNumberWrapper>
        </AccountTextNumberWrapper>
      </MobileAccountWrapper>
    </>
  );
};

export default MobileResourceComponent;
