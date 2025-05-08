import React from "react";
import "./mainPage.css"
import { useTranslation } from "react-i18next";
import {
  OrdersWrapper,
  OrderNavWrapper,
  OrdersWrapper2,
  OedersPaginationWrapper,
  OrdersNavHeaderWrapper,
  AccountHeader,
  OrderNavTextWrapper1,
  OrderNavTextWrapper2,
  OrderNavTextWrapper3,
  OrderNavTextWrapper4,
  OrderNavTextWrapper5,
  OrderNavTextWrapper6,
  OrderNavTextWrapper7,
  OrderNavText,
  OrdersCardWrapper,
  OrdersCardTextWrap1,
  OrdersCardTextWrap2,
  OrdersCardTextWrap3,
  OrdersCardTextWrap4,
  OrdersCardTextWrapper2,
  OrdersCardText1,
  OrdersCardText2,
  OrderCardLinearWrapper,
  OrdersSellBtnWrapper,
  OrdersSell,
} from "./mainPageElements";
import LinearProgress from "@mui/material/LinearProgress";

export const OrdersComponent: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <OrdersWrapper>
        <OrderNavWrapper>
          <OrdersNavHeaderWrapper>
            <AccountHeader>{t("orders")}</AccountHeader>
          </OrdersNavHeaderWrapper>
          <OrderNavTextWrapper1>

            <OrderNavTextWrapper2>
              <OrderNavText>{t("date")}</OrderNavText>
            </OrderNavTextWrapper2>

            <OrderNavTextWrapper3>
              <OrderNavText>{t("resource")}</OrderNavText>
            </OrderNavTextWrapper3>

            <OrderNavTextWrapper4>
              <OrderNavText>{t("price")}</OrderNavText>
            </OrderNavTextWrapper4>

            <OrderNavTextWrapper5>
              <OrderNavText>{t("payment")}</OrderNavText>
            </OrderNavTextWrapper5>

            <OrderNavTextWrapper6>
              <OrderNavText>{t("fulfilled")}</OrderNavText>
            </OrderNavTextWrapper6>

            <OrderNavTextWrapper7>
              <OrderNavText>{t("operate")}</OrderNavText>
            </OrderNavTextWrapper7>
          </OrderNavTextWrapper1>
        </OrderNavWrapper>



        <OrdersWrapper2>
          <OrdersCardWrapper>
            <OrdersCardTextWrap1>
              <OrdersCardTextWrapper2>
                <OrdersCardText1>13 : 38</OrdersCardText1>
              </OrdersCardTextWrapper2>
              <OrdersCardTextWrapper2>
                <OrdersCardText2>28/04</OrdersCardText2>
              </OrdersCardTextWrapper2>
            </OrdersCardTextWrap1>

            <OrdersCardTextWrap2>
              <OrdersCardTextWrapper2>
                <OrdersCardText1>1,000,000</OrdersCardText1>
              </OrdersCardTextWrapper2>
              <OrdersCardTextWrapper2>
                <OrdersCardText2>3/ days</OrdersCardText2>
              </OrdersCardTextWrapper2>
            </OrdersCardTextWrap2>

            <OrdersCardTextWrap3>
              <OrdersCardTextWrapper2>
                <OrdersCardText1>55 SUN</OrdersCardText1>
              </OrdersCardTextWrapper2>
              <OrdersCardTextWrapper2>
                <OrdersCardText2>APY: 29.09 %</OrdersCardText2>
              </OrdersCardTextWrapper2>
            </OrdersCardTextWrap3>

            <OrdersCardTextWrap4>
              <OrdersCardTextWrapper2>
                <OrdersCardText1>1,403.17</OrdersCardText1>
              </OrdersCardTextWrapper2>
            </OrdersCardTextWrap4>
            
            <OrderCardLinearWrapper>
              <LinearProgress
                variant="determinate"
                value={30}
                sx={{
                  height: 5,
                  borderRadius: 5,
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#433BFF",
                  },
                }}
              />
            </OrderCardLinearWrapper>
            <OrdersSellBtnWrapper>
                <OrdersSell>Sell</OrdersSell>
            </OrdersSellBtnWrapper>
          </OrdersCardWrapper>
        </OrdersWrapper2>




        <OedersPaginationWrapper></OedersPaginationWrapper>
      </OrdersWrapper>
    </>
  );
};

export default OrdersComponent;
