import React from "react";
import { useTranslation } from "react-i18next";
import {
  MainPageContainer,
  MainPageWrapper,
  MainLeftSection,
  MainRightSection,
  FormWrapper,
  Form,
  MyOrdersWrapper,
} from "./mainPageElements";
import ResourceComponent from "./ResourceComponent";
import LegacyComponent from "./LegacyComponent";
import MobileResourceComponent from "./MobileResourceComponent";
import OrdersComponent from "./OrdersComponent";

const MainPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <MainPageContainer>
        <MainPageWrapper>
          <MainLeftSection>
            <LegacyComponent />
            <FormWrapper>
              <Form></Form>
            </FormWrapper>
          </MainLeftSection>
          <MainRightSection>
            <MobileResourceComponent />
            <ResourceComponent />
            <OrdersComponent />
            <MyOrdersWrapper></MyOrdersWrapper>
          </MainRightSection>
        </MainPageWrapper>
      </MainPageContainer>
    </>
  );
};

export default MainPage;
