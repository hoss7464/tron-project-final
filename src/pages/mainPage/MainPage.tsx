import React from "react";
import "./mainPage.css";
import {
  MainPageContainer,
  MainPageWrapper,
  MainLeftSection,
  MainRightSection,
} from "./mainPageElements";
import ResourceComponent from "./ResourceComponent";
import LegacyComponent from "./LegacyComponent";
import MobileResourceComponent from "./MobileResourceComponent";
import OrdersComponent from "./OrdersComponent";
import MyOrdersComponent from "./MyOrdersComponent";
import OrderFormComponent from "./OrderFormComponent";

const MainPage: React.FC = () => {
  return (
    <>
      <MainPageContainer>
        <MainPageWrapper>
          <MainLeftSection>
            <LegacyComponent />
            <OrderFormComponent />
          </MainLeftSection>
          <MainRightSection>
            <MobileResourceComponent />
            <ResourceComponent />
            <OrdersComponent />
            <MyOrdersComponent />
          </MainRightSection>
        </MainPageWrapper>
      </MainPageContainer>
    </>
  );
};

export default MainPage;
