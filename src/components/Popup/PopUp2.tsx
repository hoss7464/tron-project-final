import React from "react";
import { PopUpContainer } from "./PopUpElements";
import { useTronWallet } from "../../contexts/TronWalletContext";
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
import Notification from "../Notifictions/Notification";
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
  const handleSendTrx = async () => {
    if (!orderData) return;

    try {
      const result = await transferTrx(orderData.payTo, orderData.totalPrice);

      if (result.success) {
        //verify payment :
        const resultPayload = {
          txid: result.txId,
          orderId: orderData._id,
        };

        const veryfyPayment = axios.post(
          `${baseUrl}/order/verifyPayment`,
          resultPayload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(veryfyPayment);

        dispatch(
          showNotification({
            name: "success1",
            message: "Payment verification successful.",
            severity: "success",
          })
        );
      } else {
        dispatch(
          showNotification({
            name: "error1",
            message: `Payment verification faild: ${result.error}`,
            severity: "error",
          })
        );
      }
    } catch (error) {
      dispatch(
        showNotification({
          name: "error1",
          message: `Error sending TRX ${error}`,
          severity: "error",
        })
      );
    }
  };

  if (!orderData) return null;
  return (
    <>
      <PopUpContainer>
        <Dialog open={open} onClose={onClose}>
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
            <Button onClick={onClose} color="primary" variant="contained">
              Close
            </Button>

            <Button
              disabled={isTransferring || !address}
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
