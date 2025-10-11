import React, { useState, useEffect, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Divider,
  Menu,
  MenuItem,
  FormControlLabel,
  Checkbox,
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
import axios from "axios";
import LoadingButtonContent from "../LoadingBtnContent/LoadingBtnContent";

interface Popup3Types {
  open: boolean;
  onClose: () => void;
  order: MarketOrder | null;
  myDelegate: number | null;
  pairTrx: number | null;
}

interface PermissionKey {
  address: string;
  weight: number;
  // Add other key properties if needed
}
//interface for persmissions to get permission id :
interface Permission {
  type: "Owner" | "Active" | string;
  id?: number;
  permission_id?: number;
  threshold?: number;
  keys?: PermissionKey[]; // Add this
  operations?: string;
}

interface ExtendedAccount {
  address: string;
  balance: number;
  active_permission?: Permission[];
  permissions?: Permission[];
}

interface VerifyPaymentResponse {
  success: boolean;
  message: string;
}

interface CheckOrderResponse {
  success: boolean;
  res_id: string;
  // add other properties you expect in the response
}

const PopUp3: React.FC<Popup3Types> = ({
  open,
  onClose,
  order,
  myDelegate,
  pairTrx,
}) => {
  const dispatch = useDispatch();
  //to get address from useTronWallet :
  const { address, fillOrder } = useTronWallet();
  //States :
  //states for requester input :
  const [requesterInput, setRequesterInput] = useState(address ?? "");
  const [requesterError, setRequesterError] = useState<string | null>(null);

  //state for candelegated amount :
  const [maxCandle, setMaxCandle] = useState<number | null>(null);
  //state for delegate input :
  const [delegatedAmount, setDelegatedAmount] = useState<string>("");
  const [delegateInputError, setDelegateInputError] = useState<string>("");
  //Multi signature states :
  const [multiSignature, setMultiSignature] = useState<string | null>(null);
  const [isSignatureTouched, setIsSignatureTouched] = useState(false);
  const [signatureError, setSignatureError] = useState<string | null>(null);
  //states for validate multisignature permission :
  const [permissionValid, setPermissionValid] = useState<boolean | null>(null);
  //Setting dropdown states :
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [settingBtn, setSettingBtn] = useState(false);
  const baseURL = process.env.REACT_APP_BASE_URL;

  // NEW: Function to track already delegated amounts
  const [alreadyDelegatedAmount, setAlreadyDelegatedAmount] = useState(0);

  //State for disabling the button after submitting for 300 ms :
  const [isSubmitting, setIsSubmitting] = useState(false);
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
  }, [open, address]);
  //To change wallet address by user :
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
  useEffect(() => {
    const fetchMaxCandle = async () => {
      if (open && address && order && myDelegate !== null) {
        try {
        } catch (error) {
          console.error("Error fetching max candle:", error);
        }
      }
    };

    fetchMaxCandle();
  }, [open, address, order, myDelegate, settingBtn, multiSignature]);

  const maxCandleHandler = async (): Promise<number | null> => {
    //If wallet is not connect or order doesn't exist or myDelegate === null return an error :
    if (!address || !order || myDelegate === null) {
      dispatch(
        showNotification({
          name: "Order-popup-error1",
          message: "Missing required data.",
          severity: "error",
        })
      );
      return null;
    }

    //To send request towards tronLink to get getCanDelegatedMaxSize :
    try {
      const tronNileUrl = process.env.REACT_APP_TRON_API;
      const tronWeb = new TronWeb({ fullHost: tronNileUrl });
      const resourceType = order.resourceType.toUpperCase() as
        | "ENERGY"
        | "BANDWIDTH";

      let targetAddress: string;

      if (settingBtn) {
        // Multi-signature mode
        if (!multiSignature) {
          setMaxCandle(null);
          setDelegatedAmount(""); // Clear delegated amount when no multi-signature address
          return null;
        }

        if (!validationSignatureAdd(multiSignature)) {
          setMaxCandle(null);
          setDelegatedAmount(""); // Clear delegated amount for invalid address
          return null;
        }

        targetAddress = multiSignature;
      } else {
        // Regular mode - use the connected wallet address
        targetAddress = address;
      }

      let { max_size: maxCandelegated } =
        await tronWeb.trx.getCanDelegatedMaxSize(targetAddress, resourceType);

      if (maxCandelegated === null || maxCandelegated === undefined) {
        maxCandelegated = 0;
      }

      maxCandelegated = maxCandelegated / 1_000_000;

      // NEW: Calculate already delegated amount in this session
      const alreadyDelegated = calculateAlreadyDelegatedAmount();
      // Subtract already delegated amount from the available max
      const availableMax = Math.max(0, maxCandelegated - alreadyDelegated);

      // Calculate the new maximum, considering myDelegate as the upper limit
      const newMaxCandle = Math.min(availableMax, myDelegate / 1e6);

      setMaxCandle(newMaxCandle);

      // Clear delegated amount when max candle changes significantly
      if (Math.abs((maxCandle || 0) - newMaxCandle) > 1) {
        setDelegatedAmount("");
      }

      return newMaxCandle;
    } catch (error) {
      dispatch(
        showNotification({
          name: "Order-popup-error1",
          message: "Error in maxCandleHandler:" + error,
          severity: "error",
        })
      );
      return null;
    }
  };

  const calculateAlreadyDelegatedAmount = () => {
    return alreadyDelegatedAmount;
  };

  //-------------------------------------------------------------------------------------------
  //Function for delegated input :
  const handleMaxClick = async () => {
    try {
      // First, update the maxCandle value by calling maxCandleHandler
      const newMax = await maxCandleHandler();

      // Then set the delegated amount after maxCandle is updated
      if (newMax !== null) {
        const roundedValue = Math.floor(newMax);
        setDelegatedAmount(roundedValue.toString());
        setDelegateInputError("");
      }
    } catch (error) {
      dispatch(
        showNotification({
          name: "Order-popup-error-max",
          message: "Failed to get maximum available amount",
          severity: "error",
        })
      );
    }
  };
  //-------------------------------------------------------------------------------------------
  // Function for delegated input validation
  const handleDelegateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const MIN_DELEGATE_AMOUNT = Number(
      process.env.REACT_APP_MIN_DELEGATE_AMOUNT
    );
    const roundedMax = maxCandle !== null ? Math.floor(maxCandle) : null;

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

    // 4. Update the input value immediately (don't validate during typing)
    setDelegatedAmount(value);
    // 4. Validate against min/max during typing (but don't show error until blur)
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      if (roundedMax !== null && numericValue > roundedMax) {
        setDelegateInputError(`Cannot exceed ${roundedMax}`);
      } else if (numericValue < MIN_DELEGATE_AMOUNT) {
        setDelegateInputError(`Min amount is ${MIN_DELEGATE_AMOUNT}`);
      } else if (numericValue <= 0) {
        setDelegateInputError("Amount must be positive");
      } else {
        setDelegateInputError(""); // Clear error if valid
      }
    }
  };
  // Function to validate blur :
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
  //function to send data towards server and tronLink :
  const handleFill = async () => {
    // To get minimum delegate amount from .env :
    const MIN_DELEGATE_AMOUNT = Number(
      process.env.REACT_APP_MIN_DELEGATE_AMOUNT
    );
    //to get axios time out from .env :
    const axiosTimeOut = Number(process.env.AXIOS_TIME_OUT);
    //To get base url from .env :
    const baseUrl = process.env.REACT_APP_BASE_URL;
    //To cast data :
    const numericDelegatedAmount = parseFloat(delegatedAmount);
    //To round the number downwards :
    const roundedMax = maxCandle !== null ? Math.floor(maxCandle) : null;

    //if data is NaN return an error :
    if (isNaN(numericDelegatedAmount)) {
      setDelegateInputError("Enter a valid number");
      return;
    }
    //if amount is not rounded and amount was more than max value return an error :
    if (roundedMax !== null && numericDelegatedAmount > roundedMax) {
      setDelegateInputError(`Cannot exceed ${roundedMax}`);
      return;
    }
    //if amount was lower than minimum delegated amount return an error:
    if (numericDelegatedAmount < MIN_DELEGATE_AMOUNT) {
      setDelegateInputError(`Min amount is ${MIN_DELEGATE_AMOUNT}`);
      return;
    }
    //if amount was negative number return an error :
    if (numericDelegatedAmount <= 0) {
      setDelegateInputError("Amount must be positive");
      return;
    }
    //if requester input didn't meet the validation return an error :
    if (!validationRequesterAdd(requesterInput)) {
      setRequesterError("Invalid wallet address");
      return;
    }
    //if receiver address doesn't exist or the wallet is not connected return an error :
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
    setIsSubmitting(true);
    //After checking all the validations data must ply between front ,server and tronlink :
    try {
      //step1 ----> order._id and amount must send towards the server so that server checks if another client is filling the order or not :
      const checkPayload = {
        orderId: order._id,
        Amount: delegatedAmount,
        requester: address,
      };
      const checkResponse = await axios.post<CheckOrderResponse>(
        `${baseUrl}/order/ManuallySell`,
        checkPayload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: axiosTimeOut,
          validateStatus: (status: number) => status < 500,
        }
      );
      //step2 ----> send data towards tronlink after checking data is successfull :
      if (checkResponse.data.success === true) {
        let result = null;
        let permissionId;
        let options = {};
        //if settingBtn is true :
        if (settingBtn) {
          // if multi signature address was empty return an error :
          if (!multiSignature) {
            setSignatureError("Multi-signature address is required");
            return;
          }
          //if multi signature address doesn't meet the validation return an error :
          if (!validationSignatureAdd(multiSignature)) {
            setSignatureError("Invalid multi-signature address");
            return;
          }
          //After checking multi signature address get permission ID :
          permissionId = await handleSettingFill();
          //if permissionId doesn't exist return an error :
          if (!permissionId) {
            dispatch(
              showNotification({
                name: "Order-popup-error5",
                message: "Failed to get permission ID",
                severity: "error",
              })
            );
            return;
          }
          //After checking all the validations send data towards tronLink :
          options = {
            permissionId: permissionId,
            address: multiSignature,
          };
          result = await fillOrder(
            order.receiver,
            numericDelegatedAmount,
            order.resourceType,
            multiSignature, // requesterAddress
            order.lock,
            order.durationSec / 3 - 3,
            true, // isMultiSignature
            options
          );
        } else {
          // if settingBtn is false send data towards tronLink without multisignature :
          result = await fillOrder(
            order.receiver,
            numericDelegatedAmount,
            order.resourceType,
            address, // requesterAddress
            order.lock,
            order.durationSec / 3 - 3
          );
        }
        //step3 ----> if the result of sending data towards tronlink was successfull then send txid, orderId and checkResponse.res_id towards the server:
        if (result.success) {
          let resultPayload = null;
          if (settingBtn === false) {
            resultPayload = {
              txid: result.txId,
              orderId: order._id,
              resId: checkResponse.data.res_id,
              payOutAddress: requesterInput,
              requester: address,
            };
          } else {
            resultPayload = {
              txid: result.txId,
              orderId: order._id,
              resId: checkResponse.data.res_id,
              multiAddress: multiSignature,
              payOutAddress: requesterInput,
              requester: address,
            };
          }

          const verifyFillPayment = await axios.post<VerifyPaymentResponse>(
            `${baseURL}/order/VerifyManuallySell`,
            resultPayload,
            {
              headers: {
                "Content-Type": "application/json",
              },
              timeout: axiosTimeOut,
              validateStatus: (status: number) => status < 500,
            }
          );
        }
        //if result.success === true show a notification then close the popup :
        if (result?.success) {
          // Track the delegated amount
          setAlreadyDelegatedAmount((prev) => prev + numericDelegatedAmount);
          dispatch(
            showNotification({
              name: "Order-popup-success",
              message: "Delegation successful!",
              severity: "success",
            })
          );
          handleClose();
        }
      } else if (checkResponse.data.success === false) {
        dispatch(
          showNotification({
            name: "Order-popup-error6",
            message: "Data is in processing try again 5 mins later.",
            severity: "error",
          })
        );
        return;
      } else {
        return {};
      }
    } catch (err) {
      dispatch(
        showNotification({
          name: "Order-popuo-error4",
          message: err instanceof Error ? err.message : "Transaction failed",
          severity: "error",
        })
      );
    } finally {
      // Re-enable the button after 300ms
      setTimeout(() => {
        setIsSubmitting(false);
      }, 300);
    }
  };

  //-------------------------------------------------------------------------------------------
  //Funtion to close popup :
  const handleClose = () => {
    setMaxCandle(null);
    setDelegatedAmount("");
    setDelegateInputError("");
    setRequesterError(null);
    setSettingBtn(false);
    setMultiSignature(null);
    setSignatureError("");
    onClose();
  };
  //-------------------------------------------------------------------------------------------
  //Functions for setting button :
  //checkbox click toggle function :
  const handleSettingClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  //Function to close the checkbox when clicking anywhere :
  const handleSettingClose = () => {
    setAnchorEl(null);
  };
  const menuOpen = Boolean(anchorEl);

  const handleSettingFill = async (
    event?: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event) {
      const partialValue = event.target.checked;
      setSettingBtn(partialValue);

      // Reset multi-signature state when turning off
      if (!partialValue) {
        setIsSignatureTouched(false);
        setSignatureError(null);
        setMultiSignature(null);
      }

      // maxCandleHandler will be automatically called by the useEffect
      // due to the settingBtn dependency change
    }
    if (!multiSignature) {
      return null;
    }

    try {
      const { TronWeb } = await import("tronweb");
      const tronWeb = new TronWeb({ fullHost: process.env.REACT_APP_TRON_API });

      // Get account details with permissions
      const account = (await tronWeb.trx.getAccount(
        multiSignature
      )) as ExtendedAccount;

      if (!account || !account.active_permission) {
        throw new Error("No active permissions found for this account");
      }

      // Find the permission that includes our current address as a key
      const relevantPermission = account.active_permission.find(
        (permission) => {
          return permission.keys?.some(
            (key) => tronWeb.address.fromHex(key.address) === address
          );
        }
      );

      if (!relevantPermission) {
        return;
      }

      // Get permission ID (different TRON versions use different field names)
      const permissionId =
        relevantPermission.id ?? relevantPermission.permission_id;

      if (permissionId === undefined) {
        throw new Error("Permission ID not found in the permission");
      }

      return permissionId;
    } catch (error) {
      dispatch(
        showNotification({
          name: "Order-popup-error5",
          message:
            error instanceof Error
              ? error.message
              : "Failed to get permission ID",
          severity: "error",
        })
      );
      return null;
    }
  };
  //-------------------------------------------------------------------------------------------
  //Functions for multi-signature :
  const validationSignatureAdd = (address: string) => {
    const walletAddRegX = /^T[a-zA-Z0-9]{33}$/;
    return walletAddRegX.test(address);
  };

  const handleSignatureChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setMultiSignature(value);
    setIsSignatureTouched(true);

    if (!value) {
      setSignatureError(null);
      setPermissionValid(null);
    } else if (!validationSignatureAdd(value)) {
      setSignatureError("Invalid wallet address.");
      setPermissionValid(false);
    } else {
      setSignatureError(null);
      await validateMultisigPermission(value);
    }
  };

  //Function to validate multi-signature address permission :
  const validateMultisigPermission = async (multisigAddress: string) => {
    if (!multisigAddress || !address) {
      setPermissionValid(false);
      return false;
    }

    try {
      const { TronWeb } = await import("tronweb");
      const tronWeb = new TronWeb({ fullHost: process.env.REACT_APP_TRON_API });

      // Get account details with permissions
      const account = (await tronWeb.trx.getAccount(
        multisigAddress
      )) as ExtendedAccount;

      if (!account || !account.active_permission) {
        setPermissionValid(false);
        dispatch(
          showNotification({
            name: "Order-popup-error10",
            message:
              "Your address doesn't have permission to act on this account",
            severity: "error",
          })
        );
        return false;
      }

      // Find the permission that includes our current address as a key
      const relevantPermission = account.active_permission.find(
        (permission) => {
          return permission.keys?.some(
            (key) => tronWeb.address.fromHex(key.address) === address
          );
        }
      );

      if (!relevantPermission) {
        setPermissionValid(false);
        dispatch(
          showNotification({
            name: "Order-popup-error10",
            message:
              "Your address doesn't have permission to act on this account",
            severity: "error",
          })
        );
        return false;
      }

      // Get permission ID
      const permissionId =
        relevantPermission.id ?? relevantPermission.permission_id;

      if (permissionId === undefined) {
        setPermissionValid(false);
        setSignatureError("Permission ID not found");
        return false;
      }

      setPermissionValid(true);
      setSignatureError(null);
      return true;
    } catch (error) {
      setPermissionValid(false);
      setSignatureError(
        error instanceof Error ? error.message : "Failed to validate permission"
      );
      return false;
    }
  };
  //-------------------------------------------------------------------------------------------
  //Function to calculate payout :
  const handlePayout = useMemo(() => {
    if (pairTrx === null || delegatedAmount === "" || delegatedAmount === "0") {
      return 0;
    }
    const numericDelegateAmount = Number(delegatedAmount);
    return pairTrx * numericDelegateAmount;
  }, [delegatedAmount, pairTrx]);

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
            minWidth: "30%",
          },
        }}
      >
        {/* pop up headers and img */}
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
        {/* pop up delegate amount input */}
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
                  placeholder="0"
                />
              </FormAddInputWrapper2>
            </FormAddInputWrapper>
            <FormMaxCandleBtn onClick={handleMaxClick} value={maxCandle ?? 0}>
              Max
            </FormMaxCandleBtn>
          </PopupFormInputWrapper>
        </FormAddInputLabelWrapper>
        {/* pop up address input */}
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
            <FormMaxBtn
              style={{ padding: "10px 17px" }}
              onClick={handleSettingClick}
            >
              <SettingIcon />
            </FormMaxBtn>
            <Menu
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={handleSettingClose}
              disableScrollLock
              anchorOrigin={{
                vertical: "bottom", // Aligns menu below anchor
                horizontal: "right", // Aligns menu right edge to anchor's right edge
              }}
              transformOrigin={{
                vertical: "top", // Menu grows downward
                horizontal: "right", // Menu's right edge stays aligned
              }}
              MenuListProps={{
                style: {
                  paddingTop: 0,
                  paddingBottom: 0,
                },
              }}
              sx={{
                "& .MuiMenuItem-root:hover": {
                  backgroundColor: "transparent !important",
                },
              }}
            >
              <MenuItem>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={settingBtn}
                      onChange={handleSettingFill}
                      sx={{
                        color: "#430E00", // border color when unchecked
                        "&.Mui-checked": {
                          color: "#430E00", // color when checked
                        },
                        "& .MuiSvgIcon-root": {
                          fontSize: 26,
                        },
                      }}
                    />
                  }
                  label="Multi-Signature"
                />
              </MenuItem>
            </Menu>
          </PopupFormInputWrapper>
        </FormAddInputLabelWrapper>
        {/* pop up multi signature input */}
        {settingBtn && (
          <FormAddInputLabelWrapper>
            <FormAddLabelWrapper>
              <FormAddLabel>Multi-Signature</FormAddLabel>
              {signatureError ? (
                <FormErrorWrapper>
                  <FormError>{signatureError}</FormError>
                </FormErrorWrapper>
              ) : (
                ""
              )}
            </FormAddLabelWrapper>
            <FormAddInputWrapper style={{ height: "38px" }}>
              <FormAddInputWrapper2>
                <FormAddInput
                  value={multiSignature || ""}
                  onChange={handleSignatureChange}
                  onBlur={() => setIsSignatureTouched(true)}
                />
              </FormAddInputWrapper2>
            </FormAddInputWrapper>
          </FormAddInputLabelWrapper>
        )}

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
                <Popup2Item>{order.resourceAmount.toLocaleString()}</Popup2Item>
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
                <Popup2Name>Max-Delegate:</Popup2Name>
              </Popup2NameWrapper>
              <Popup2ItemWrapper>
                <Popup2Item>{Number(myDelegate?.toFixed(2))} TRX</Popup2Item>
              </Popup2ItemWrapper>
            </Popup2NameItemWrapper>
            {/*<Popup2NameItemWrapper>
              <Popup2NameWrapper>
                <Popup2Name>Date:</Popup2Name>
              </Popup2NameWrapper>
              <Popup2ItemWrapper>
                <Popup2Item>{date}</Popup2Item>
              </Popup2ItemWrapper>
            </Popup2NameItemWrapper> */}

            {/* <Popup2NameItemWrapper>
              <Popup2NameWrapper>
                <Popup2Name>Time:</Popup2Name>
              </Popup2NameWrapper>
              <Popup2ItemWrapper>
                <Popup2Item>{time}</Popup2Item>
              </Popup2ItemWrapper>
            </Popup2NameItemWrapper>*/}
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
                  {Number((handlePayout * 1e6).toFixed(3))} TRX
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
              "&.Mui-disabled": {
                backgroundColor: "#430E00", // Keep the same background color when disabled
                color: "white",
              },
            }}
            onClick={handleFill}
          >
            <LoadingButtonContent
              loading={isSubmitting}
              loadingText="Filling..."
              normalText="Fill"
            />
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

export default React.memo(PopUp3);
