import React, { useState } from "react";
import { PopUpContainer } from "./PopUpElements";
import { useTronWallet } from "../../contexts/TronWalletContext";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { showNotification } from "../../redux/actions/notifSlice";

interface OrderSuccessPopupProps {
  open: boolean;
  onClose: () => void;
  orderData: {
    payTo: string;
    requester: string;
    receiver: string;
    totalPrice: number;
    status: string;
    _id: string;
    createdAt: string;
  } | null;
}

const PopUp2: React.FC<OrderSuccessPopupProps> = ({
  open,
  onClose,
  orderData,
}) => {
  const dispatch = useDispatch();
  const { transferTrx, isTransferring, address } = useTronWallet();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [isProcessing, setIsProcessing] = useState(false);

  const handleReject = () => {
    dispatch(
      showNotification({
        name: "tron-warning1",
        message: "Transaction rejected by user.",
        severity: "warning",
      })
    );
    onClose();
  };

  const handleSendTrx = async () => {
    if (!orderData) return;

    setIsProcessing(true); // Disable buttons

    try {
      const result = await transferTrx(orderData.payTo, orderData.totalPrice);

      if (result.success) {
        //verify payment :
        const resultPayload = { txid: result.txId, orderId: orderData._id };
        //to get axios timeout :
        const axiosTimeOut = Number(process.env.AXIOS_TIME_OUT);

        const veryfyPayment = await axios.post(
          `${baseUrl}/order/verifyPayment`,
          resultPayload,
          {
            headers: {
              "Content-Type": "application/json",
            },
            timeout: axiosTimeOut,
          }
        );

        if (veryfyPayment.status === 200) {
          dispatch(
            showNotification({
              name: "success1",
              message: "Transaction successful.",
              severity: "success",
            })
          );
          onClose(); // Close popup automatically on success
          return;
        }
      } else {
        dispatch(
          showNotification({
            name: "error1",
            message: `Payment verification faild: ${result.error}`,
            severity: "error",
          })
        );

        return;
      }
    } catch (error) {
      dispatch(
        showNotification({
          name: "error2",
          message: `Error sending TRX ${error}`,
          severity: "error",
        })
      );
    } finally {
      setIsProcessing(false);
    }
  };

  if (!orderData) return null;
  return (
    <>
      <PopUpContainer>
        <Dialog
          open={open}
          onClose={(event, reason) => {
            // Only close if the reason is not 'backdropClick'
            if (reason !== "backdropClick" && !isProcessing) {
              handleReject();
            }
          }}
        >
          <DialogTitle>Order Created Successfully</DialogTitle>
          <DialogContent>
            <Box mb={2}>
              <Typography variant="subtitle1">Order ID:</Typography>
              <Typography variant="body2">{orderData._id}</Typography>
            </Box>

            <Box mb={2}>
              <Typography variant="subtitle1">Payment Details:</Typography>
              <Typography variant="body2">Pay to: {orderData.payTo}</Typography>
              <Typography variant="body2">
                Total Price: {orderData.totalPrice} SUN
              </Typography>
            </Box>

            <Box mb={2}>
              <Typography variant="subtitle1">Parties:</Typography>
              <Typography variant="body2">
                Requester: {orderData.requester}
              </Typography>
              <Typography variant="body2">
                Receiver: {orderData.receiver}
              </Typography>
            </Box>

            <Box mb={2}>
              <Typography variant="subtitle1">Status:</Typography>
              <Typography variant="body2">{orderData.status}</Typography>
              <Typography variant="body2">
                Created at: {new Date(orderData.createdAt).toLocaleString()}
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              disabled={isProcessing || isTransferring}
              onClick={handleReject}
              color="primary"
              variant="contained"
            >
              Reject
            </Button>

            <Button
              disabled={isTransferring || !address || isProcessing}
              onClick={handleSendTrx}
              color="primary"
              variant="contained"
            >
              {isTransferring ? "Sending..." : "Send TRX"}
            </Button>
          </DialogActions>
        </Dialog>
      </PopUpContainer>
    </>
  );
};

export default PopUp2;
