import React, { useState } from "react";
import "./BuyersTable.css";
import {
  BuyersTableContainer1,
  BuyersContentsWrapper,
} from "./BuyersTableElements";
import {
  OrderMainWrapper,
  OrdersNavHeaderWrapper,

} from "../../../../mainPage/mainPageElements";
import { styled } from "@mui/material/styles";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import BuyersTable1 from "./Table1/BuyersTable1";
import BuyersTable2 from "./Table2/BuyersTable2";

// Custom ToggleButtonGroup with full width
const FullWidthToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  //width: '100%',
  display: "flex",
  justifyContent: "space-between",
}));

//Custom switch btn 1 to change the form :
const CustomToggleButton = styled(ToggleButton)(({ theme }) => ({
  textTransform: "none",
  fontWeight: "bold",
  fontSize: "13px",
  border: "2px solid #430E00",
  borderRadius: 6,
  padding: "0px 6px",
  flex: 1,
  width: "80px",
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

const BuyersTables: React.FC = () => {
  const [BuyersTableSitchBtn, setBuyersTableSwitchBtn] = useState<
    string | null
  >("Orders");

  //--------------------------------------------------------------------------------------
  //Function for switch Btn 1 to change the form :
  const buyerBuyersTableSwitchBtnChange = (
    event: React.MouseEvent<HTMLElement>,
    newSwitchBtn: string | null
  ) => {
    // If the same switchBtn is clicked again, do nothing
    if (newSwitchBtn === BuyersTableSitchBtn || newSwitchBtn === null) {
      return;
    }
    setBuyersTableSwitchBtn(newSwitchBtn);
  };
  return (
    <>
      <BuyersTableContainer1 className="buyers-table-bg">
        <OrderMainWrapper style={{ padding : "0" }}>
          <OrdersNavHeaderWrapper>
            <FullWidthToggleButtonGroup
              value={BuyersTableSitchBtn}
              exclusive
              onChange={buyerBuyersTableSwitchBtnChange}
            >
              <CustomToggleButton value="Orders">Orders</CustomToggleButton>
              <CustomToggleButton value="Deposit">Deposit</CustomToggleButton>
            </FullWidthToggleButtonGroup>
          </OrdersNavHeaderWrapper>
        </OrderMainWrapper>
        <BuyersContentsWrapper style={{ justifyContent : "space-between"}} >
            {BuyersTableSitchBtn === "Orders" ? <BuyersTable1 /> :  <BuyersTable2 />}
        </BuyersContentsWrapper>
      </BuyersTableContainer1>
    </>
  );
};

export default React.memo(BuyersTables);
