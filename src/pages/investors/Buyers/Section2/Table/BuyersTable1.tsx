import React from "react";
import "./BuyersTable.css";
import { BuyersTableContainer1 } from "./BuyersTableElements";
import {
  OrderMainWrapper,
  OrdersNavHeaderWrapper,
  OrdersCarouselWrapper,
  MyOrdersScroll,
  AvailableNavWrapper,
  AvailableNavTextWrapper,
  OrderNavText,
} from "../../../../mainPage/mainPageElements";
import { LegacyCardName } from "../../../../mainPage/LegacySection/LegacyElements";

const BuyersTable1: React.FC = () => {
  return (
    <>
      <BuyersTableContainer1 className="buyers-table-bg">
        <OrderMainWrapper>
          <OrdersNavHeaderWrapper>
            <LegacyCardName>Orders History</LegacyCardName>
          </OrdersNavHeaderWrapper>

          <OrdersCarouselWrapper>
            <MyOrdersScroll>
              <AvailableNavWrapper>
                <AvailableNavTextWrapper>
                  <OrderNavText>Date</OrderNavText>
                </AvailableNavTextWrapper>

                <AvailableNavTextWrapper>
                  <OrderNavText>OrderId</OrderNavText>
                </AvailableNavTextWrapper>

                <AvailableNavTextWrapper>
                  <OrderNavText>Receiver</OrderNavText>
                </AvailableNavTextWrapper>

                <AvailableNavTextWrapper>
                  <OrderNavText>Resource</OrderNavText>
                </AvailableNavTextWrapper>

                <AvailableNavTextWrapper>
                  <OrderNavText>Price</OrderNavText>
                </AvailableNavTextWrapper>

                <AvailableNavTextWrapper>
                  <OrderNavText>Payment</OrderNavText>
                </AvailableNavTextWrapper>

                <AvailableNavTextWrapper>
                  <OrderNavText>Fulfilled</OrderNavText>
                </AvailableNavTextWrapper>
              </AvailableNavWrapper>
            </MyOrdersScroll>
          </OrdersCarouselWrapper>
        </OrderMainWrapper>
      </BuyersTableContainer1>
    </>
  );
};

export default BuyersTable1;
