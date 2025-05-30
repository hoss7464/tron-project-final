import React from "react";
import "./mainPage.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import {
  MainPageContainer,
  MainPageWrapper,
  MainPageWrapper2,
  MainLeftSection,
  MainRightSection,
} from "./mainPageElements";
import LegacyComponent from "./LegacyComponent";
import OrdersComponent from "./OrdersComponent";
import MyOrdersComponent from "./MyOrdersComponent";
import OrderFormComponent from "./OrderFormComponent";
import PopUp from "../../components/Popup/PopUp";
import SelectWalletComponent from "../../components/SelectWalletComponent/SelectWalletComponent";

import Hero from "./HeroSection/Hero";

const MainPage: React.FC = () => {
  const popUpVisible = useSelector(
    (state: RootState) => state.toggle.toggles.popUp
  );

  return (
    <>
      <MainPageContainer>
        {popUpVisible && (
          <PopUp>
            <SelectWalletComponent />
          </PopUp>
        )}
        <Hero />
        <MainPageWrapper2>
        <MainPageWrapper>
          <MainLeftSection>
            <LegacyComponent />
            <OrderFormComponent />
          </MainLeftSection>
          <MainRightSection>
            <OrdersComponent />
            <MyOrdersComponent />
          </MainRightSection>
        </MainPageWrapper>
        </MainPageWrapper2>
      </MainPageContainer>
    </>
  );
};

export default MainPage;
