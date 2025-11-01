import React from "react";
import "./mainPage.css";
import {
  MainPageContainer,
  MainPageWrapper,
  MainPageWrapper2,
  MainTopSection,
  MainBottomSection,
} from "./mainPageElements";
import OrdersComponent from "./OrdersComponent";
import MyOrdersComponent from "./MyOrdersComponent";
import OrderFormComponent from "./OrderFormComponent";
import AvailableResource from "./AvailableResource";
import Hero from "./HeroSection/Hero";
import Legacy from "./LegacySection/Legacy";
import MobileLegacy from "./MobileLegacy/mobileLegacy";

const MainPage: React.FC = () => {
  return (
    <>
      <MainPageContainer >
        <Hero />
        <Legacy />
        <MainPageWrapper2>
          <MainPageWrapper  >
            <MainTopSection>
              <OrderFormComponent />
              <OrdersComponent />
            </MainTopSection>
            <MainBottomSection>
              <MobileLegacy />
              <AvailableResource />
              <MyOrdersComponent />
            </MainBottomSection>
          </MainPageWrapper>
        </MainPageWrapper2>
      </MainPageContainer>
    </>
  );
};

export default MainPage;
