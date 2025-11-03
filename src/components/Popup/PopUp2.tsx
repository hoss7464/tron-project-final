import React, { useState } from "react";
import { useTronWallet } from "../../contexts/TronWalletContext";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { showNotification } from "../../redux/actions/notifSlice";
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
} from "./PopUpElements";
import {
  LegacyCardIconWrapper1,
  LegacyCardIconWrapper2,
  LegacyCardIconWrapper3,
  LegacyCardIcon,
} from "../../pages/mainPage/LegacySection/LegacyElements";
import energyIcon from "../../assets/svg/EnergyIcon.svg";
import bandwidthIcon from "../../assets/svg/BandwidthIcon.svg";
import { Divider } from "@mui/material";
import { formatStrictDuration } from "../../utils/fromSec";
import LoadingButtonContent from "../LoadingBtnContent/LoadingBtnContent";
import { useTranslation } from "react-i18next";
import { serverErrorMessageFunc } from "../../utils/errorFunctions";

interface OrderSuccessPopupProps {
  open: boolean;
  onClose: () => void;
  mySwitchBtn: string | null;
  myWalletAdd: string | null;
  myWalletAddress: string | null;
  myAmount: string | null;
  myDuration: number | null;
  myNumericSelectedPrice: number | null;
  myTotalPrice: number;
  myPartialFill: boolean;
  myPartialField: string;
  myBulkOrder: boolean;
  myCurrentDate: string;
  myCurrentTime: string;
  resetForm: () => void;
}

//Define type for API response for posting form data :
interface OrderData {
  payTo: string;
  requester: string;
  receiver: string;
  totalPrice: number;
  status: string;
  _id: string;
  createdAt: string;
}

interface ApiResponse {
  success: boolean;
  code: string;
  message: string;
  data: OrderData;
}

interface VerifyPaymentResponse {
  success: boolean;
  code: string;
  message: string;
}

const PopUp2: React.FC<OrderSuccessPopupProps> = ({
  open,
  onClose,
  mySwitchBtn,
  myWalletAdd,
  myWalletAddress,
  myAmount,
  myDuration,
  myNumericSelectedPrice,
  myTotalPrice,
  myPartialFill,
  myPartialField,
  myBulkOrder,
  myCurrentDate,
  myCurrentTime,
  resetForm,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { transferTrx, isTransferring, address } = useTronWallet();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [isProcessing, setIsProcessing] = useState(false);

  //base url :
  const baseURL = process.env.REACT_APP_BASE_URL;
  //to get axios timeout :
  const axiosTimeOut = Number(process.env.AXIOS_TIME_OUT);

  const handleReject = () => {
    onClose();
  };

  const handleSendTrx = async () => {
    setIsProcessing(true); // Disable buttons

    try {
      //step1 ----> to send data towards server :
      let postData = null;
      if (myPartialFill === true) {
        postData = {
          resourceType: mySwitchBtn,
          requester: address,
          receiver: myWalletAdd,
          resourceAmount: myAmount,
          durationSec: myDuration,
          price: myNumericSelectedPrice,
          totalPrice: myTotalPrice,
          options: {
            allow_partial: myPartialFill,
            partial_min: Number(myPartialField),
          },
        };
      } else {
        postData = {
          resourceType: mySwitchBtn,
          requester: address,
          receiver: myWalletAdd,
          resourceAmount: myAmount,
          durationSec: myDuration,
          price: myNumericSelectedPrice,
          totalPrice: myTotalPrice,
          options: {
            allow_partial: myPartialFill,
          },
        };
      }

      const orderResponse = await axios.post<ApiResponse>(
        `${baseURL}/order/CreateOrder`,
        postData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: axiosTimeOut,
          withCredentials: true,
          validateStatus: (status: number) => status < 550,
        }
      );

      if (orderResponse.data.success === true) {
        const orderData = orderResponse.data.data;

        if (orderData === null) {
          return;
        }

        const result = await transferTrx(orderData.payTo, orderData.totalPrice);

        if (result.success) {
          //verify payment :
          const resultPayload = { txid: result.txId, orderId: orderData._id };
          //to get axios timeout :
          const axiosTimeOut = Number(process.env.AXIOS_TIME_OUT);

          const veryfyPayment = await axios.post<VerifyPaymentResponse>(
            `${baseUrl}/order/verifyPayment`,
            resultPayload,
            {
              headers: {
                "Content-Type": "application/json",
              },
              timeout: axiosTimeOut,
              validateStatus: (status: number) => status < 550,
            }
          );

          if (veryfyPayment.data.success === true) {
            dispatch(
              showNotification({
                name: "success1",
                message: `${t("Text217")}`,
                severity: "success",
              })
            );
            resetForm();
            onClose(); // Close popup automatically on success
            return;
          } else {
            const serverError = serverErrorMessageFunc(veryfyPayment.data.code);
            dispatch(
              showNotification({
                name: "success1",
                message: `${serverError}`,
                severity: "success",
              })
            );
          }
          return;
        } else {
          dispatch(
            showNotification({
              name: "error2",
              message: `${t("Text216")} TRX `,
              severity: "error",
            })
          );
          return;
        }
      } else {
        //do something with orderResponse
        const serverError = serverErrorMessageFunc(orderResponse.data.code);
        dispatch(
          showNotification({
            name: "error10",
            message: `${serverError}`,
            severity: "error",
          })
        );
        return;
      }
    } catch (error) {
      dispatch(
        showNotification({
          name: "error2",
          message: `${t("Text216")} TRX `,
          severity: "error",
        })
      );
      return;
    } finally {
      // Re-enable the button after 300ms
      setTimeout(() => {
        setIsProcessing(false);
      }, 300);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={(event, reason) => {
          // Only close if the reason is not 'backdropClick'
          if (reason !== "backdropClick" && !isProcessing) {
            handleReject();
          }
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
            "@media (max-width: 600px)": {
              margin: "0.5rem",
            },
          },
        }}
      >
        <Popup2HeaderWrapper>
          <Popup2Header>{t("Text67")}</Popup2Header>
        </Popup2HeaderWrapper>

        <Popup2ImgWrapper>
          <LegacyCardIconWrapper1>
            <LegacyCardIconWrapper2
              style={
                mySwitchBtn === "energy"
                  ? { border: "solid 2px #003543" }
                  : { border: "solid 2px #430E00" }
              }
            >
              <LegacyCardIconWrapper3
                style={
                  mySwitchBtn === "energy"
                    ? { backgroundColor: "#003543" }
                    : { backgroundColor: "#430E00" }
                }
              >
                <LegacyCardIcon
                  alt="account icon"
                  src={mySwitchBtn === "energy" ? energyIcon : bandwidthIcon}
                />
              </LegacyCardIconWrapper3>
            </LegacyCardIconWrapper2>
          </LegacyCardIconWrapper1>
          <Popup2ItemNameWrapper>
            <Popup2ItemName
              style={
                mySwitchBtn === "energy"
                  ? { color: "#003543" }
                  : { color: "#430E00" }
              }
            >
              {mySwitchBtn === "energy" ? `${t("Text6")}` : `${t("Text9")}`}
            </Popup2ItemName>
          </Popup2ItemNameWrapper>
        </Popup2ImgWrapper>
        <DialogContent>
          <Box mb={2}>
            <Popup2SubheaderWrapper>
              <Popup2Subheader>{t("Text68")}</Popup2Subheader>
            </Popup2SubheaderWrapper>
            <Popup2NameItemWrapper>
              <Popup2NameWrapper>
                <Popup2Name>{t("Text48")}:</Popup2Name>
              </Popup2NameWrapper>
              <Popup2ItemWrapper>
                <Popup2Item>{Number(myAmount).toLocaleString()}</Popup2Item>
              </Popup2ItemWrapper>
            </Popup2NameItemWrapper>

            <Popup2NameItemWrapper>
              <Popup2NameWrapper>
                <Popup2Name>{t("Text50")}:</Popup2Name>
              </Popup2NameWrapper>
              <Popup2ItemWrapper>
                <Popup2Item>
                  {formatStrictDuration(Number(myDuration))}
                </Popup2Item>
              </Popup2ItemWrapper>
            </Popup2NameItemWrapper>
          </Box>
          <Divider
            orientation="horizontal"
            flexItem
            sx={{ my: 2, backgroundColor: "#D9E1E3" }}
          />

          <Box mb={2}>
            
            <Popup2NameItemWrapper
              style={{ flexDirection: "column", alignItems: "flex-start" }}
            >
              <Popup2NameWrapper>
                <Popup2Name>{t("Text70")}:</Popup2Name>
              </Popup2NameWrapper>
              <Popup2ItemWrapper>
                <Popup2Item>{address}</Popup2Item>
              </Popup2ItemWrapper>
            </Popup2NameItemWrapper>

            <Popup2NameItemWrapper
              style={{ flexDirection: "column", alignItems: "flex-start" }}
            >
              <Popup2NameWrapper>
                <Popup2Name>{t("Text71")}:</Popup2Name>
              </Popup2NameWrapper>
              <Popup2ItemWrapper>
                <Popup2Item>{myWalletAdd}</Popup2Item>
              </Popup2ItemWrapper>
            </Popup2NameItemWrapper>
          </Box>
          <Divider
            orientation="horizontal"
            flexItem
            sx={{ my: 2, backgroundColor: "#D9E1E3" }}
          />

          <Box mb={2}>
            <Popup2SubheaderWrapper>
              <Popup2Subheader>{t("Text72")}</Popup2Subheader>
            </Popup2SubheaderWrapper>
            <Popup2NameItemWrapper>
              <Popup2NameWrapper>
                <Popup2Name>{t("Text73")}:</Popup2Name>
              </Popup2NameWrapper>
              <Popup2ItemWrapper>
                <Popup2Item>
                  {myCurrentDate} - {myCurrentTime}
                </Popup2Item>
              </Popup2ItemWrapper>
            </Popup2NameItemWrapper>
          </Box>
          <Divider
            orientation="horizontal"
            flexItem
            sx={{ my: 1, backgroundColor: "#D9E1E3" }}
          />
          <Box mt={2}>
            <Popup2NameItemWrapper>
              <Popup2NameWrapper>
                <Popup2Name style={{ fontSize: "20px", fontWeight: "800" }}>
                  {t("Text65")}:
                </Popup2Name>
              </Popup2NameWrapper>
              <Popup2ItemWrapper>
                <Popup2Item
                  style={{
                    fontSize: "20px",
                    fontWeight: "800",
                    color: "#430E00",
                  }}
                >
                  {myTotalPrice} TRX
                </Popup2Item>
              </Popup2ItemWrapper>
            </Popup2NameItemWrapper>
          </Box>
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
            disabled={isTransferring || !address || isProcessing}
            onClick={handleSendTrx}
            color="primary"
            variant="contained"
            sx={{
              backgroundColor: "#430E00",
              borderRadius: "10px",
              "&.Mui-disabled": {
                backgroundColor: "#430E00", // Keep the same background color when disabled
                color: "white",
              },
            }}
          >
            {" "}
            <LoadingButtonContent
              loading={isProcessing}
              loadingText={`${t("Text74")}...`}
              normalText={
                mySwitchBtn === "energy" ? `${t("Text286")} ${t("Text7")}` : `${t("Text286")} ${t("Text9")}`
              }
            />
          </Button>

          <Button
            fullWidth
            disabled={isProcessing || isTransferring}
            onClick={handleReject}
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
            {t("Text77")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default React.memo(PopUp2);
