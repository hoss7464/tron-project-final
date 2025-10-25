import React, { useState } from "react";
import "./SellersTable.css"
import {
  BuyersTableContainer1,
  BuyersContentsWrapper,
} from "../../Buyers/Section2/Table/BuyersTableElements";
import {
  OrderMainWrapper,
  OrdersNavHeaderWrapper,
} from "../../../mainPage/mainPageElements";
import { styled } from "@mui/material/styles";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import SellersTable1 from "./Table1/Table1";
import SellersTable2 from "./Table2/Table2";
import { useTranslation } from "react-i18next";

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

const SellersTables: React.FC = () => {
  const { t } = useTranslation();
  const [sellersTableSwitchBtn, setSelersTableSwitchBtn] = useState<
    string | null
  >("Orders");

  const sellersTableSwitchBtnChange = (
    event: React.MouseEvent<HTMLElement>,
    newSwitchBtn: string | null
  ) => {
    // If the same switchBtn is clicked again, do nothing
    if (newSwitchBtn === sellersTableSwitchBtn || newSwitchBtn === null) {
      return;
    }
    setSelersTableSwitchBtn(newSwitchBtn);
  };
  return (
    <>
      <BuyersTableContainer1 className="sellerss-table-bg">
        <OrderMainWrapper style={{ padding: "0" }}>
          <OrdersNavHeaderWrapper>
            <FullWidthToggleButtonGroup
              value={sellersTableSwitchBtn}
              exclusive
              onChange={sellersTableSwitchBtnChange}
            >
              <CustomToggleButton value="Orders">{t("Text79")}</CustomToggleButton>
              <CustomToggleButton value="Withdraw">{t("Text154")}</CustomToggleButton>
            </FullWidthToggleButtonGroup>
          </OrdersNavHeaderWrapper>
        </OrderMainWrapper>
        <BuyersContentsWrapper style={{ justifyContent: "space-between" }}>
          {sellersTableSwitchBtn === "Orders" ? (
            <SellersTable1 />
          ) : (
            <SellersTable2 />
          )}
        </BuyersContentsWrapper>
      </BuyersTableContainer1>
    </>
  );
};

export default SellersTables;
