import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import {
  Popup2HeaderWrapper,
  Popup2Header,
  Popup2ImgWrapper,
  Popup2ItemNameWrapper,
  Popup2ItemName,
  Popup2SubheaderWrapper,
  Popup2Subheader,
  Popup2NameItemWrapper,
  Popup2NameWrapper,
  Popup2Name,
  Popup2ItemWrapper,
  Popup2Item,
  Popup5TextWrapper,
  Popup5Text,
} from "./PopUpElements";
import { MyMarketOrder } from "../../services/requestService";

import energyIcon from "../../assets/svg/EnergyIcon.svg";
import bandwidthIcon from "../../assets/svg/BandwidthIcon.svg";

import {
  LegacyCardIconWrapper1,
  LegacyCardIconWrapper2,
  LegacyCardIconWrapper3,
  LegacyCardIcon,
} from "../../pages/mainPage/LegacySection/LegacyElements";

interface MyOrderCancelPopupProps {
  open: boolean;
  onClose: () => void;
  orderData: MyMarketOrder | null;
}

const PopUp5: React.FC<MyOrderCancelPopupProps> = ({
  open,
  onClose,
  orderData,
}) => {
  const MyCancelReject = () => {
    onClose();
  };
  const cancelTrxAmount = Number(process.env.REACT_APP_CANCEL_TRX_AMOUNT)
  if (!orderData) return null;
  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          MyCancelReject();
        }}
        sx={{
          "& .MuiDialog-container": {
            backdropFilter: "blur(2px)",
            background: "rgba(255, 255, 255, 0.5)",
          },
          "& .MuiPaper-root": {
            padding: "0.5rem 0.5rem",
            borderRadius: "16px !important",
            border: "solid 2px #D9E1E3",
            minWidth: "30%",
          },
        }}
      >
        <Popup2HeaderWrapper>
          <Popup2Header>Cancel Operation</Popup2Header>
        </Popup2HeaderWrapper>

        <Popup2ImgWrapper style={{ marginBottom: "1rem" }}>
          <LegacyCardIconWrapper1>
            <LegacyCardIconWrapper2
              style={
                orderData.resourceType === "energy"
                  ? { border: "solid 2px #003543" }
                  : { border: "solid 2px #430E00" }
              }
            >
              <LegacyCardIconWrapper3
                style={
                  orderData.resourceType === "energy"
                    ? { backgroundColor: "#003543" }
                    : { backgroundColor: "#430E00" }
                }
              >
                <LegacyCardIcon
                  alt="account icon"
                  src={
                    orderData.resourceType === "energy"
                      ? energyIcon
                      : bandwidthIcon
                  }
                />
              </LegacyCardIconWrapper3>
            </LegacyCardIconWrapper2>
          </LegacyCardIconWrapper1>
          <Popup2ItemNameWrapper>
            <Popup2ItemName
              style={
                orderData.resourceType === "energy"
                  ? { color: "#003543" }
                  : { color: "#430E00" }
              }
            >
              {orderData.resourceType === "energy" ? "Energy" : "Bandwidth"}
            </Popup2ItemName>
          </Popup2ItemNameWrapper>
        </Popup2ImgWrapper>
        <DialogContent>
          <Popup5TextWrapper>
            <Popup5Text>
              To cancel this order you lose {cancelTrxAmount} TRX from your account,
              <br /> Are you sure ?
            </Popup5Text>
          </Popup5TextWrapper>
        </DialogContent>

        <DialogActions
          sx={{
            display: "flex",
            flexDirection: "column", // Stack vertically
            gap: "0.5rem", // Space between buttons

            "& .MuiButton-root": {
              // Target both buttons
              width: "100%", // Full width
              margin: 0, // Remove default margins
            },
          }}
        >
          <Button
            fullWidth
            color="primary"
            variant="contained"
            sx={{
              backgroundColor: "#430E00",
              borderRadius: "10px",
            }}
          >
            {" "}
            cancel
          </Button>
          <Button
            fullWidth
            onClick={MyCancelReject}
            color="primary"
            variant="outlined"
            sx={{
              borderRadius: "10px",
              borderColor: "#430E00",
              color: "#430E00",
              "&:hover": {
                borderColor: "#430E00",
                backgroundColor: "rgba(67, 14, 0, 0.04)",
              },
            }}
          >
            Reject
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PopUp5;
