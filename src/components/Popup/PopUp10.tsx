import React from "react";
import axios from "axios";
import { TronLinkAdapter } from "@tronweb3/tronwallet-adapters";
import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import {
  Popup2HeaderWrapper,
  Popup2Header,
  Popup2ImgWrapper,
  Popup2ItemNameWrapper,
  Popup2ItemName,
  Popup5TextWrapper,
  Popup5Text,
} from "./PopUpElements";
import { GetOrderData, GetOrderResoponse } from "../../services/requestService";
import energyIcon from "../../assets/svg/EnergyIcon.svg";
import bandwidthIcon from "../../assets/svg/BandwidthIcon.svg";
import {
  LegacyCardIconWrapper1,
  LegacyCardIconWrapper2,
  LegacyCardIconWrapper3,
  LegacyCardIcon,
} from "../../pages/mainPage/LegacySection/LegacyElements";
import { useTronWallet } from "../../contexts/TronWalletContext";
import { useDispatch } from "react-redux";
import { showNotification } from "../../redux/actions/notifSlice";

interface MyOrderCancelPopupProps {
  open: boolean;
  onClose: () => void;
  orderData: GetOrderData | null;
}

const PopUp5: React.FC<MyOrderCancelPopupProps> = ({
  open,
  onClose,
  orderData,
}) => {
  const { address, adapter } = useTronWallet();
  const dispatch = useDispatch();

  const MyCancelReject = () => {
    onClose();
  };
  const cancelTrxAmount = Number(process.env.REACT_APP_CANCEL_TRX_AMOUNT);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const handleConfirmClick = async () => {
    try {
      const window_tronweb = (window as any).tronWeb;
      const baseURL = process.env.REACT_APP_BASE_URL;
      const axiosTimeOut = Number(process.env.AXIOS_TIME_OUT);

      // Check if adapter is available
      if (!adapter) {
        throw new Error("Wallet adapter not available");
      }

      // Get nonce from server
      const message = orderData?._id + "";
      //To convert message into hex :
      window_tronweb.toHex(message);
      //To sign the message :
      const signature = await adapter.signMessage(message);

      if (!signature) {
        dispatch(
          showNotification({
            name: "tron-error3",
            message: "Tron Error : User rejected signing message.",
            severity: "error",
          })
        );
        return;
      }

      const confirmPayload = {
        orderId: orderData?._id,
        requester: address,
        signature: signature,
      };

      const confirmResponse = await axios.post<GetOrderResoponse>(
        `${baseUrl}/Buyer/CancleOrder`,
        confirmPayload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: axiosTimeOut,
          withCredentials: true,
          validateStatus: (status: number) => status < 500,
        }
      );

      if (confirmResponse.data.success === true) {
        dispatch(
          showNotification({
            name: "cancel-success1",
            message: "Cancel order successfull",
            severity: "success",
          })
        );
        onClose();
        return;
      } else {
        dispatch(
          showNotification({
            name: "cancel-error1",
            message: `Cancel error: ${confirmResponse.data.message}`,
            severity: "error",
          })
        );
        onClose();
        return;
      }
    } catch (error) {
      dispatch(
        showNotification({
          name: "cancel-error2",
          message: `Cancel error : ${error}`,
          severity: "error",
        })
      );
      onClose();
      return;
    }
  };

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
              To cancel this order you lose {cancelTrxAmount} TRX from your
              account,
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
            onClick={handleConfirmClick}
            color="primary"
            variant="contained"
            sx={{
              backgroundColor: "#430E00",
              borderRadius: "10px",
            }}
          >
            {" "}
            confirm
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
            cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default React.memo(PopUp5);
