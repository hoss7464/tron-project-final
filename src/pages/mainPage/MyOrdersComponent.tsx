import React from "react";
import "./mainPage.css";
import {
  MyOrdersWrapper,
  MyOrdersWrapper2,
  OrderNavWrapper,
  OrdersNavHeaderWrapper,
  AccountHeader,
} from "./mainPageElements";

const MyOrdersComponent: React.FC = () => {
  return (
    <>
      <MyOrdersWrapper className="order-bg">
        <OrderNavWrapper>
          <OrdersNavHeaderWrapper>
            <AccountHeader>My Orders</AccountHeader>
          </OrdersNavHeaderWrapper>
        </OrderNavWrapper>
        <MyOrdersWrapper2></MyOrdersWrapper2>
      </MyOrdersWrapper>
    </>
  );
};

export default MyOrdersComponent;
