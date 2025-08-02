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
    const { transferTrx, isTransferring, address } = useTronWallet();
    const handleSendTrx = async () => {
    if (!orderData) return;
    
    try {
      const result = await transferTrx(
        orderData.payTo, 
        orderData.totalPrice
      );
      
      if (result.success) {
        console.log("Transaction successful:", result.txId);
        // You might want to show a success message or update UI
      } else {
        console.error("Transaction failed:", result.error);
        // Error is already handled in the context, no need to show again
      }
    } catch (error) {
      console.error("Error sending TRX:", error);
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

            <Button disabled={isTransferring || !address} onClick={handleSendTrx} color="primary" variant="contained">
              {isTransferring ? "Sending..." : "Send TRX"}
            </Button>
          </DialogActions>
        </Dialog>
      </PopUpContainer>
    </>
  );
};

export default PopUp2;
