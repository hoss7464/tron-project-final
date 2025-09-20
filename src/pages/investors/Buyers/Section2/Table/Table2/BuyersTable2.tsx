import React from "react";
import "../BuyersTable.css";
import {
  OrderMainWrapper,
  OrdersNavHeaderWrapper,
  OrdersCarouselWrapper,
  MyOrdersScroll,
  AvailableNavWrapper,
  AvailableNavTextWrapper,
  OrderNavText,
} from "../../../../../mainPage/mainPageElements";
import { LegacyCardName } from "../../../../../mainPage/LegacySection/LegacyElements";

const BuyersTable2: React.FC = () => {
  return (
    <>
      
        <OrderMainWrapper style={{ padding : "0"}} >
          <OrdersCarouselWrapper>
            <MyOrdersScroll >
              <AvailableNavWrapper  >
                <AvailableNavTextWrapper>
                  <OrderNavText>ID</OrderNavText>
                </AvailableNavTextWrapper>

                <AvailableNavTextWrapper>
                  <OrderNavText>Time</OrderNavText>
                </AvailableNavTextWrapper>

                <AvailableNavTextWrapper>
                  <OrderNavText>Amount</OrderNavText>
                </AvailableNavTextWrapper>

                <AvailableNavTextWrapper>
                  <OrderNavText>Type</OrderNavText>
                </AvailableNavTextWrapper>

                
              </AvailableNavWrapper>
            </MyOrdersScroll>
          </OrdersCarouselWrapper>
        </OrderMainWrapper>
      
    </>
  );
};

export default BuyersTable2;
