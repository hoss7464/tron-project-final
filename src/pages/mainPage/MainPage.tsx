import React from "react";
import "./mainPage.css"
import { useTranslation } from "react-i18next";
import {
  MainPageContainer,
  MainPageWrapper,
  MainLeftSection,
  MainRightSection,
  FormWrapper,
  Form,
} from "./mainPageElements";
import ResourceComponent from "./ResourceComponent";
import LegacyComponent from "./LegacyComponent";
import MobileResourceComponent from "./MobileResourceComponent";
import OrdersComponent from "./OrdersComponent";
import MyOrdersComponent from "./MyOrdersComponent";

const MainPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <MainPageContainer>
        <MainPageWrapper>
          <MainLeftSection>
            <LegacyComponent />
            <FormWrapper >
              <Form className="order-bg"></Form>
            </FormWrapper>
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
