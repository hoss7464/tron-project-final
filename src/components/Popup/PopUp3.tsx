import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Divider,
} from "@mui/material";
import { MarketOrder } from "../../pages/mainPage/OrdersComponent";
import {
  Pop3Form,
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
  PopupFormInputWrapper,
  FormMaxBtn,
  FormMaxBtnText,
  FormMaxCandleBtn,
  SettingIcon,
} from "./PopUpElements";
import {
  LegacyCardIconWrapper1,
  LegacyCardIconWrapper2,
  LegacyCardIconWrapper3,
  LegacyCardIcon,
} from "../../pages/mainPage/LegacySection/LegacyElements";
import {
  FormAddInputLabelWrapper,
  FormAddInputWrapper,
  FormAddInputIconWrapper,
  FormAddLabelWrapper,
  FormAddLabel,
  FormAddInputWrapper2,
  FormAddInput,
  FormErrorWrapper,
  FormError,
} from "../../pages/mainPage/mainPageElements";
import energyIcon from "../../assets/svg/EnergyIcon.svg";
import bandwidthIcon from "../../assets/svg/BandwidthIcon.svg";
import { formatStrictDuration } from "../../utils/fromSec";
import { formatDateTime } from "../../utils/dateTime";
import { useTronWallet } from "../../contexts/TronWalletContext";
import { TronWeb } from "tronweb";
import { showNotification } from "../../redux/actions/notifSlice";
import { useDispatch } from "react-redux";

interface Popup3Types {
  open: boolean;
  onClose: () => void;
  order: MarketOrder | null;
  myDelegate: number | null;
}

const PopUp3: React.FC<Popup3Types> = ({
  open,
  onClose,
  order,
  myDelegate,
}) => {
  const dispatch = useDispatch();
  //States :
  //states for requester input :
  const [requesterInput, setRequesterInput] = useState("");
  const [requesterError, setRequesterError] = useState<string | null>(null);
  //to get address from useTronWallet :
  const { address, fillOrder, fillTRX, fillTrxError } = useTronWallet();
  //state for candelegated amount :
  const [maxCandle, setMaxCandle] = useState<number | null>(null);
  //state for delegate input :
  const [delegatedAmount, setDelegatedAmount] = useState<string>("");
  const [delegateInputError, setDelegateInputError] = useState<string>("");

  //-------------------------------------------------------------------------------------------
  //Functions for Payout target address input :
  //Wallet address validation :
  const validationRequesterAdd = (address: string) => {
    const walletAddRegX = /^T[a-zA-Z0-9]{33}$/;
    return walletAddRegX.test(address);
  };

  // When popup opens or order changes, set requesterInput to address
  useEffect(() => {
    if (open && address) {
      setRequesterInput(address);
      setRequesterError(null);
    }
  }, [open, address, order]);

  const handleRequesterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setRequesterInput(value);
    if (!validationRequesterAdd(value)) {
      setRequesterError("Invalid wallet address.");
    } else {
      setRequesterError(null);
    }
  };
  //-------------------------------------------------------------------------------------------
  //Functions for maximum candelicate button :
  const maxCandleHandler = async () => {
    if (!address || !order || myDelegate === null) {
      dispatch(
        showNotification({
          name: "Order-popuo-error1",
          message: "Missing required data.",
          severity: "error",
        })
      );
      return;
    }

    try {
      const tronNileUrl = process.env.REACT_APP_TRON_API;
      const tronWeb = new TronWeb({ fullHost: tronNileUrl });
      const resourceType = order.resourceType.toUpperCase() as
        | "ENERGY"
        | "BANDWIDTH";

      // Fetch max delegatable amount (returns { max_size: number })

      let { max_size: maxCandelegated } =
        await tronWeb.trx.getCanDelegatedMaxSize(address, resourceType);

      maxCandelegated = maxCandelegated / 1_000_000;

      if (maxCandelegated > myDelegate) {
        setMaxCandle(myDelegate);
      } else if (maxCandelegated < myDelegate) {
        setMaxCandle(maxCandelegated);
      } else {
        return;
      }
    } catch (error) {
      dispatch(
        showNotification({
          name: "Order-popuo-error2",
          message: "Error in maxCandleHandler:" + error,
          severity: "error",
        })
      );
    }
  };
  //Function to run maxCandleHandler when popoup loads :
  useEffect(() => {
    if (open && address && order && myDelegate !== null) {
      maxCandleHandler();
    }
  }, [open, address, order, myDelegate]);

  //-------------------------------------------------------------------------------------------
  //Function for delegated input :
  const handleMaxClick = () => {
    if (maxCandle !== null) {
      const roundedValue = Math.floor(maxCandle); // Rounds to nearest integer
      setDelegatedAmount(roundedValue.toString());
      setDelegateInputError("");
    }
  };

  //-------------------------------------------------------------------------------------------
  // Function for delegated input validation
  const handleDelegateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const MIN_DELEGATE_AMOUNT = Number(
      process.env.REACT_APP_MIN_DELEGATE_AMOUNT
    );

    // 1. Allow empty input (for deletion)
    if (value === "") {
      setDelegatedAmount("");
      setDelegateInputError("");
      return;
    }

    // 2. Block invalid characters (only numbers and .)
    if (!/^\d*$/.test(value)) {
      return;
    }

    // 3. Don't allow multiple decimal points
    if ((value.match(/\./g) || []).length > 1) {
      return;
    }

    // 4. Update the input value immediately (don't validate during typing)
    setDelegatedAmount(value);
    setDelegateInputError("");
  };

  // Add this new function to validate on blur
  const handleDelegateBlur = () => {
    const MIN_DELEGATE_AMOUNT = Number(
      process.env.REACT_APP_MIN_DELEGATE_AMOUNT
    );

    if (delegatedAmount === "") return;

    const numericValue = parseFloat(delegatedAmount);
    const roundedMax = maxCandle !== null ? Math.floor(maxCandle) : null;

    if (isNaN(numericValue)) {
      setDelegateInputError("Enter a valid number");
      return;
    }

    if (roundedMax !== null) {
      if (numericValue > roundedMax) {
        setDelegateInputError(`Cannot exceed ${roundedMax}`);
        return;
      } else if (numericValue < MIN_DELEGATE_AMOUNT) {
        setDelegateInputError(`Min amount is ${MIN_DELEGATE_AMOUNT}`);
        return;
      } else if (numericValue <= 0) {
        setDelegateInputError("Amount must be positive");
        return;
      }
    }

    // Format the number to 2 decimal places when blurring
    setDelegatedAmount(Math.round(numericValue).toString());
  };

  // Function to prevent invalid paste
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = e.clipboardData.getData("text");
    if (!/^(\d+\.?\d*|\.\d+)?$/.test(pastedData)) {
      e.preventDefault();
    }
  };
  //-------------------------------------------------------------------------------------------
  const handleFill = async () => {
    // Validate delegated amount first
    const MIN_DELEGATE_AMOUNT = Number(
      process.env.REACT_APP_MIN_DELEGATE_AMOUNT
    );
    const numericDelegatedAmount = parseFloat(delegatedAmount);
    const roundedMax = maxCandle !== null ? Math.floor(maxCandle) : null;

    // Check if delegated amount is valid
    if (isNaN(numericDelegatedAmount)) {
      setDelegateInputError("Enter a valid number");
      return;
    }

    if (roundedMax !== null) {
      if (numericDelegatedAmount > roundedMax) {
        setDelegateInputError(`Cannot exceed ${roundedMax}`);
        return;
      } else if (numericDelegatedAmount < MIN_DELEGATE_AMOUNT) {
        setDelegateInputError(`Min amount is ${MIN_DELEGATE_AMOUNT}`);
        return;
      } else if (numericDelegatedAmount <= 0) {
        setDelegateInputError("Amount must be positive");
        return;
      }
    }

    // Validate requester address
    if (!validationRequesterAdd(requesterInput)) {
      setRequesterError("Invalid wallet address");
      return;
    }

    // Check required fields
    if (!order?.receiver || !address) {
      dispatch(
        showNotification({
          name: "Order-popuo-error3",
          message: "Missing required data",
          severity: "error",
        })
      );
      return;
    }

    try {
      const result = await fillOrder(
        order.receiver,
        numericDelegatedAmount,
        order.resourceType,
        address,
        false,
        0
      );

      if (result.success) {
        dispatch(
          showNotification({
            name: "Order-popup-success",
            message: "Delegation successful!",
            severity: "success",
          })
        );
        handleClose(); // Close the popup on success
      }
    } catch (err) {
      dispatch(
        showNotification({
          name: "Order-popuo-error4",
          message: err instanceof Error ? err.message : "Network failure",
          severity: "error",
        })
      );
      return;
    }
  };
  //-------------------------------------------------------------------------------------------
  //Funtion to close popup :
  const handleClose = () => {
    setMaxCandle(null);
    setDelegatedAmount("");
    setDelegateInputError("");
    setRequesterError(null);
    onClose();
  };
  //-------------------------------------------------------------------------------------------
  if (!order) return null;
  const { date, time } = formatDateTime(order.createdAt);

  return (
    <Pop3Form>
      <Dialog
        open={open}
        onClose={(event, reason) => {
          if (reason === "backdropClick" || reason === "escapeKeyDown") {
            return;
          }
          handleClose();
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
          },
        }}
      >
        <Popup2ImgWrapper style={{ marginBottom: "1rem" }}>
          <LegacyCardIconWrapper1>
            <LegacyCardIconWrapper2
              style={
                order.resourceType === "energy"
                  ? { border: "solid 2px #003543" }
                  : { border: "solid 2px #430E00" }
              }
            >
              <LegacyCardIconWrapper3
                style={
                  order.resourceType === "energy"
                    ? { backgroundColor: "#003543" }
                    : { backgroundColor: "#430E00" }
                }
              >
                <LegacyCardIcon
                  alt="account icon"
                  src={
                    order.resourceType === "energy" ? energyIcon : bandwidthIcon
                  }
                />
              </LegacyCardIconWrapper3>
            </LegacyCardIconWrapper2>
          </LegacyCardIconWrapper1>
          <Popup2ItemNameWrapper>
            <Popup2ItemName
              style={
                order.resourceType === "energy"
                  ? { color: "#003543" }
                  : { color: "#430E00" }
              }
            >
              {order.resourceType === "energy" ? "Energy" : "Bandwidth"}
            </Popup2ItemName>
          </Popup2ItemNameWrapper>
        </Popup2ImgWrapper>

        <FormAddInputLabelWrapper>
          <FormAddLabelWrapper>
            <FormAddLabel>To delegated amount (TRX)</FormAddLabel>
            {delegateInputError ? (
              <FormErrorWrapper>
                <FormError>{delegateInputError}</FormError>
              </FormErrorWrapper>
            ) : (
              ""
            )}
          </FormAddLabelWrapper>
          <PopupFormInputWrapper>
            <FormAddInputWrapper style={{ height: "38px" }}>
              <FormAddInputWrapper2>
                <FormAddInput
                  value={delegatedAmount}
                  onChange={handleDelegateChange}
                  onBlur={handleDelegateBlur}
                  onPaste={handlePaste}
                  type="text"
                  placeholder="0.00"
                />
              </FormAddInputWrapper2>
            </FormAddInputWrapper>
            <FormMaxCandleBtn onClick={handleMaxClick} value={maxCandle ?? 0}>
              Max
            </FormMaxCandleBtn>
          </PopupFormInputWrapper>
        </FormAddInputLabelWrapper>

        <FormAddInputLabelWrapper>
          <FormAddLabelWrapper>
            <FormAddLabel>Payout target address</FormAddLabel>
            {requesterError ? (
              <FormErrorWrapper>
                <FormError>{requesterError}</FormError>
              </FormErrorWrapper>
            ) : (
              ""
            )}
          </FormAddLabelWrapper>
          <PopupFormInputWrapper>
            <FormAddInputWrapper style={{ height: "38px" }}>
              <FormAddInputIconWrapper>
                <FormAddInputWrapper2>
                  <FormAddInput
                    value={requesterInput}
                    onChange={handleRequesterChange}
                  />
                </FormAddInputWrapper2>
              </FormAddInputIconWrapper>
            </FormAddInputWrapper>
            <FormMaxBtn style={{ padding: "10px 25px" }}>
              <SettingIcon />
            </FormMaxBtn>
          </PopupFormInputWrapper>
        </FormAddInputLabelWrapper>

        <DialogContent>
          <Box mb={2}>
            <Popup2SubheaderWrapper>
              <Popup2Subheader>Details</Popup2Subheader>
            </Popup2SubheaderWrapper>

            <Popup2NameItemWrapper>
              <Popup2NameWrapper>
                <Popup2Name>Amount:</Popup2Name>
              </Popup2NameWrapper>
              <Popup2ItemWrapper>
                <Popup2Item>{order.resourceAmount}</Popup2Item>
              </Popup2ItemWrapper>
            </Popup2NameItemWrapper>

            <Popup2NameItemWrapper>
              <Popup2NameWrapper>
                <Popup2Name>Duration:</Popup2Name>
              </Popup2NameWrapper>
              <Popup2ItemWrapper>
                <Popup2Item>
                  {formatStrictDuration(order.durationSec)}
                </Popup2Item>
              </Popup2ItemWrapper>
            </Popup2NameItemWrapper>

            <Popup2NameItemWrapper>
              <Popup2NameWrapper>
                <Popup2Name>Delegate:</Popup2Name>
              </Popup2NameWrapper>
              <Popup2ItemWrapper>
                <Popup2Item>{myDelegate?.toFixed(2)} TRX</Popup2Item>
              </Popup2ItemWrapper>
            </Popup2NameItemWrapper>

            <Popup2NameItemWrapper>
              <Popup2NameWrapper>
                <Popup2Name>Date:</Popup2Name>
              </Popup2NameWrapper>
              <Popup2ItemWrapper>
                <Popup2Item>{date}</Popup2Item>
              </Popup2ItemWrapper>
            </Popup2NameItemWrapper>

            <Popup2NameItemWrapper>
              <Popup2NameWrapper>
                <Popup2Name>Time:</Popup2Name>
              </Popup2NameWrapper>
              <Popup2ItemWrapper>
                <Popup2Item>{time}</Popup2Item>
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
                <Popup2Name>Receiver:</Popup2Name>
              </Popup2NameWrapper>
              <Popup2ItemWrapper>
                <Popup2Item>{order.receiver}</Popup2Item>
              </Popup2ItemWrapper>
            </Popup2NameItemWrapper>
          </Box>
          <Divider
            orientation="horizontal"
            flexItem
            sx={{ my: 2, backgroundColor: "#D9E1E3" }}
          />
          <Box mb={2}>
            <Popup2NameItemWrapper>
              <Popup2NameWrapper>
                <Popup2Name style={{ fontSize: "20px", fontWeight: "800" }}>
                  Payout:
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
                  {order.totalPrice} TRX
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
            color="primary"
            variant="contained"
            sx={{
              backgroundColor: "#430E00",
              borderRadius: "10px",
            }}
            onClick={handleFill}
          >
            Fill
          </Button>

          <Button
            fullWidth
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
            onClick={handleClose}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Pop3Form>
  );
};

export default PopUp3;
