import React from "react";
import {
  MobileOrderFormContainer,
  MobileOrderFormWrapper,
} from "./MobileOrderFormElements";
import OrderFormComponent from "../OrderFormComponent";

const MobileOrderForm: React.FC = () => {
  return (
    <>
      <MobileOrderFormContainer>
        <MobileOrderFormWrapper>
          <OrderFormComponent />
        </MobileOrderFormWrapper>
      </MobileOrderFormContainer>
    </>
  );
};

export default MobileOrderForm;
