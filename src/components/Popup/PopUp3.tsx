import React, { useState, useEffect } from "react";
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

interface Popup3Types {
  open: boolean;
  onClose: () => void;
  order: MarketOrder | null;
  myDelegate: number | null;
}
//interface for persmissions to get permission id :
interface Permission {
  type: "Owner" | "Active" | string;
  id?: number;
  permission_id?: number;
  // Add other permission properties you need
}

interface ExtendedAccount {
  address: string;
  balance: number;
  // Other standard Account properties...
  permissions?: Permission[];
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
  const { address, fillOrder } = useTronWallet();
  //state for candelegated amount :
  const [maxCandle, setMaxCandle] = useState<number | null>(null);
  //state for delegate input :
  const [delegatedAmount, setDelegatedAmount] = useState<string>("");
  const [delegateInputError, setDelegateInputError] = useState<string>("");
  //Multi signature states :
  const [multiSignature, setMultiSignature] = useState<string | null>(null);
  const [isSignatureTouched, setIsSignatureTouched] = useState(false);
  const [signatureError, setSignatureError] = useState<string | null>(null);
  //Setting dropdown states :
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [settingBtn, setSettingBtn] = useState(false);

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

      //To fetch delegated max size conditionally :
      //if settingBtn === false   use requester address in getCanDelegatedMaxSize
      if (settingBtn === false) {
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
        //if settingBtn === true  use client input in getCanDelegatedMaxSize
      } else if (settingBtn === true) {
        if (!multiSignature) {
          return;
        }

        let { max_size: maxCandelegated } =
          await tronWeb.trx.getCanDelegatedMaxSize(
            multiSignature,
            resourceType
          );

        maxCandelegated = maxCandelegated / 1_000_000;

        if (maxCandelegated > myDelegate) {
          setMaxCandle(myDelegate);
        } else if (maxCandelegated < myDelegate) {
          setMaxCandle(maxCandelegated);
        } else {
          return;
        }
      } else {
        return;
      }
    } catch (error) {
      setSignatureError("Invalid address");
    }
  };
  console.log(maxCandle);
  //Function to run maxCandleHandler when popoup loads :
  useEffect(() => {
    if (open && address && order && myDelegate !== null) {
      maxCandleHandler();
    }
  }, [open, address, order, myDelegate, multiSignature, settingBtn]);
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
  const handleFill = async () => {
    // Validate delegated amount first
    // First get the permission ID
  const permissionId = await handleSettingClick();
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
      let result = null;

      if (settingBtn) {
        // Multi-signature case
        if (!multiSignature) {
          setSignatureError("Multi-signature address is required");
          return;
        }

        if (!validationSignatureAdd(multiSignature)) {
          setSignatureError("Invalid multi-signature address");
          return;
        }

        result = await fillOrder(
          order.receiver,
          numericDelegatedAmount,
          order.resourceType,
          address, // requesterAddress
          order.lock, // lock
          order.durationSec / 3, // lockPeriod (example: 3 days)
          true, // isMultiSignature
          {
            // options
            permissionId: permissionId, // example permission ID
            address: multiSignature,
          }
        );
      } else {
        // Regular case
        result = await fillOrder(
          order.receiver,
          numericDelegatedAmount,
          order.resourceType,
          address, // requesterAddress
          order.lock, // lock
          order.durationSec / 3 // lockPeriod
          // isMultiSignature and options omitted (defaults to false/undefined)
        );
      }

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
    setSettingBtn(false);
    setMultiSignature(null);
    setSignatureError("");
    onClose();
  };
  //-------------------------------------------------------------------------------------------
  //Functions for setting button :
  //checkbox click toggle function :
  const handleSettingClick = async (event?: React.MouseEvent<HTMLElement>) => {
    if (event) {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  }
    // Return early if no multiSignature address is set
    if (!multiSignature) {
      setSignatureError("Multi-signature address is required");
      return;
    }

    try {
      const { TronWeb } = await import("tronweb");
      //nile network url :
      const tronNileUrl = process.env.REACT_APP_TRON_API;
      //To get data from api.trongrid.io
      const tronWeb = new TronWeb({ fullHost: tronNileUrl });

      // Get account details
      console.log("Fetching account for:", multiSignature);
      const account = (await tronWeb.trx.getAccount(
        multiSignature
      )) as ExtendedAccount;
      console.log("Account response:", account);

      if (!account || !account.permissions) {
        console.log("No permissions found for this account");
        throw new Error("No permissions found for this account");
      }

      // More detailed permission logging
      console.log("Permissions found:", account.permissions);

      // Find the active permission (typically used for transactions)
      const activePermission = account.permissions.find(
        (permission: any) => permission.type === "Active"
      );

      if (!activePermission) {
        throw new Error("No active permission found");
      }

      // Get the permission ID (usually the first one is used)
      const permissionId =
        activePermission.id ??
        activePermission.permission_id ??
        (activePermission as any).permissionId;
      if (permissionId === undefined) {
        throw new Error("Permission ID not found in active permission");
      }

      console.log("Permission ID:", permissionId);
      // You might want to store this permissionId in state or use it directly
      return permissionId;
    } catch (error) {
      dispatch(
        showNotification({
          name: "Order-popup-error5",
          message: "Error fetching permission ID:" + error,
          severity: "error",
        })
      );
      return null;
    }
  };

  //Function to close the checkbox when clicking anywhere :
  const handleSettingClose = () => {
    setAnchorEl(null);
  };
  const menuOpen = Boolean(anchorEl);

  const handleSettingFill = (event: React.ChangeEvent<HTMLInputElement>) => {
    const partialValue = event.target.checked;
    setSettingBtn(partialValue);
    setDelegatedAmount("");
    // Reset touched state when toggling
    if (!partialValue) {
      setIsSignatureTouched(false);
      setSignatureError(null);
    }
  };
  //-------------------------------------------------------------------------------------------
  //Functions for multi-signature :
  const validationSignatureAdd = (address: string) => {
    const walletAddRegX = /^T[a-zA-Z0-9]{33}$/;
    return walletAddRegX.test(address);
  };

  const handleSignatureChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setMultiSignature(value);
    setIsSignatureTouched(true);

    if (!value) {
      setSignatureError(null);
    } else if (!validationSignatureAdd(value)) {
      setSignatureError("Invalid wallet address.");
    } else {
      setSignatureError(null);
    }
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
