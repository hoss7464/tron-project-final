import React from "react";
import "./mainPage.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
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
import PopUp from "../../components/Popup/PopUp";
import SelectWalletComponent from "../../components/SelectWalletComponent/SelectWalletComponent";
import { useTronWallet } from "../../contexts/TronWalletContext";

const MainPage: React.FC = () => {
  const popUpVisible = useSelector(
    (state: RootState) => state.toggle.toggles.popUp
  );
  const { address } = useTronWallet();

  return (
    <>
      <MainPageContainer>
        {popUpVisible && (
          <PopUp>
            <SelectWalletComponent />
          </PopUp>
        )}

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
