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
  //States :
  const [requesterInput, setRequesterInput] = useState("");
  const [requesterError, setRequesterError] = useState<string | null>(null);
  const { address } = useTronWallet();

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
          onClose();
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
          </FormAddLabelWrapper>
          <PopupFormInputWrapper>
            <FormAddInputWrapper style={{ height: "38px" }}>
              <FormAddInputWrapper2>
                <FormAddInput value="" />
              </FormAddInputWrapper2>
            </FormAddInputWrapper>
            <FormMaxBtn>
              <FormMaxBtnText>Max</FormMaxBtnText>
            </FormMaxBtn>
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
            onClick={onClose}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Pop3Form>
  );
};

export default PopUp3;
