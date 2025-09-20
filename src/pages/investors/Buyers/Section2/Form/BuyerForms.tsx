import React, { useState } from "react";
import "./BuyersForm.css";
import {
  BuyersFormsContainer,
  FormSwitchBtnWrapper,
  BuyerFormContentWrapper,
  BuyersForm,
} from "./BuyerFormsElements";
import { FormWrapper2 } from "../../../../mainPage/mainPageElements";
import { styled } from "@mui/material/styles";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import Form1 from "./Form1/Form1";
import Form2 from "./Form2/Form2";

// Custom ToggleButtonGroup with full width
const FullWidthToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',

}));

//Custom switch btn 1 to change the form :
const CustomToggleButton = styled(ToggleButton)(({ theme }) => ({
  textTransform: "none",
  fontWeight: "bold",
  fontSize: "14px",
  border: "2px solid #430E00",
  borderRadius: 12,
  padding: "4px 6px",
  flex: 1,
  width: "100px",
  "&.Mui-selected": {
    backgroundColor: "#430E00",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#430E00",
    },
  },
  "&:not(.Mui-selected)": {
    color: "#430E00",
  },
}));

const BuyerForms: React.FC = () => {
  //State for switch btn 1 to change the form 
  const [buyerSwitchBtn, setBuyerSwitchBtn] = useState<string | null>("Manual");

//--------------------------------------------------------------------------------------
  //Function for switch Btn 1 to change the form :
  const buyerSwitchBtnChange = (
    event: React.MouseEvent<HTMLElement>,
    newSwitchBtn: string | null
  ) => {
    // If the same switchBtn is clicked again, do nothing
    if (newSwitchBtn === buyerSwitchBtn || newSwitchBtn === null) {
      return;
    }
    setBuyerSwitchBtn(newSwitchBtn);
  };
  //--------------------------------------------------------------------------------------
  return (
    <>
      <BuyersFormsContainer>
        <FormWrapper2 className="form-bg1" style={{ height: "100%" }}>
          <BuyersForm className="form-bg2" style={{ height: "100%", padding : "0"}}>
            {/*Switch btn 1 to change the form */}
            <FormSwitchBtnWrapper>
              <FullWidthToggleButtonGroup
                value={buyerSwitchBtn}
                exclusive
                onChange={buyerSwitchBtnChange}
              >
                <CustomToggleButton value="Manual">Manual</CustomToggleButton>
                <CustomToggleButton value="Auto">Auto</CustomToggleButton>
              </FullWidthToggleButtonGroup>
            </FormSwitchBtnWrapper>
            <BuyerFormContentWrapper >
                {buyerSwitchBtn === "Manual" ? <Form1 /> : <Form2 />}
            </BuyerFormContentWrapper> 

          </BuyersForm>
        </FormWrapper2>
      </BuyersFormsContainer>
    </>
  );
};

export default BuyerForms;
