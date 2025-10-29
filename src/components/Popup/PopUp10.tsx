import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
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
import LoadingButtonContent from "../LoadingBtnContent/LoadingBtnContent";
import { serverErrorMessageFunc } from "../../utils/errorFunctions";

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
  const { t } = useTranslation();
  const { accessToken } = useTronWallet();
  const dispatch = useDispatch();
  //State for disabling the button after submitting for 300 ms :
  const [isSubmitting, setIsSubmitting] = useState(false);

  const MyCancelReject = () => {
    onClose();
  };
  const cancelTrxAmount = Number(process.env.REACT_APP_CANCEL_TRX_AMOUNT);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const handleConfirmClick = async () => {
    setIsSubmitting(true);
    try {
      const axiosTimeOut = Number(process.env.AXIOS_TIME_OUT);

      const confirmPayload = {
        orderId: orderData?._id,
      };

      const confirmResponse = await axios.post<GetOrderResoponse>(
        `${baseUrl}/Buyer/CancleOrder`,
        confirmPayload,
        {
          headers: {
            "Content-Type": "application/json",
            accesstoken: accessToken,
          },
          timeout: axiosTimeOut,

          validateStatus: (status: number) => status < 550,
        }
      );

      if (confirmResponse.data.success === true) {
        dispatch(
          showNotification({
            name: "cancel-success1",
            message: `${t("Text263")}`,
            severity: "success",
          })
        );
        onClose();
        return;
      } else {
        if (confirmResponse.data.code === undefined) {
            return 
        } 
        const serverError = serverErrorMessageFunc(confirmResponse.data.code)
        dispatch(
          showNotification({
            name: "cancel-error1",
            message: `${serverError}`,
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
          message: `${t("Text262")}`,
          severity: "error",
        })
      );
      onClose();
      return;
    } finally {
      // Re-enable the button after 300ms
      setTimeout(() => {
        setIsSubmitting(false);
      }, 300);
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
          <Popup2Header>{t("Text110")}</Popup2Header>
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
              {orderData.resourceType === "energy" ? `${t("Text6")}` : `${t("Text9")}`}
            </Popup2ItemName>
          </Popup2ItemNameWrapper>
        </Popup2ImgWrapper>
        <DialogContent>
          <Popup5TextWrapper>
            <Popup5Text>
              {t("Text111")} {cancelTrxAmount} TRX {t("Text112")}
              <br /> {t("Text113")}
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
            disabled={isSubmitting}
            color="primary"
            variant="contained"
            sx={{
              backgroundColor: "#430E00",
              borderRadius: "10px",
             "&.Mui-disabled": {
                backgroundColor: "#430E00", // Keep the same background color when disabled
                color: "white"
              },
            }}
          >
            {" "}
            <LoadingButtonContent
              loading={isSubmitting}
              loadingText={`${t("Text74")}...`}
              normalText={`${t("Text114")}`}
            />
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
            {t("Text100")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default React.memo(PopUp5);
