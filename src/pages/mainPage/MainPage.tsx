import React from "react";
import "./mainPage.css";
import {
  MainPageContainer,
  MainPageWrapper,
  MainPageWrapper2,
  MainLeftSection,
  MainRightSection,
} from "./mainPageElements";
import OrdersComponent from "./OrdersComponent";
import MyOrdersComponent from "./MyOrdersComponent";
import OrderFormComponent from "./OrderFormComponent";
import Hero from "./HeroSection/Hero";
import Legacy from "./LegacySection/Legacy";
import MobileOrderForm from "./MobileOrderForm/MobileOrderForm";
import MobileLegacy from "./MobileLegacy/mobileLegacy";

const MainPage: React.FC = () => {
  return (
    <>
      <MainPageContainer>
        <Hero />
        <MobileOrderForm />
        <Legacy />
        <MainPageWrapper2>
          <MainPageWrapper>
            <MainLeftSection>
              <OrderFormComponent />
            </MainLeftSection>
            <MainRightSection>
              <OrdersComponent />
              <MyOrdersComponent />
              <MobileLegacy />
            </MainRightSection>
          </MainPageWrapper>
        </MainPageWrapper2>
      </MainPageContainer>
    </>
  );
};

export default MainPage;
