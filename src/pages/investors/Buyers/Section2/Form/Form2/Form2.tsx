import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Form2Container,
  Form2BulkOrderTextWrapper,
  Form2BulkOrderText,
  Form2LableErrorWrapper,
  Form2IconWrapper,
} from "./Form2Elements";
import { Form } from "../../../../../mainPage/mainPageElements";
import {
  FormControl,
  TextField,
  Popper,
  Box,
  Typography,
  Grid,
  ClickAwayListener,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  Checkbox,
  FormControlLabel,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  FormHeaderSwitchWrapper,
  FormHeaderIconWrapper,
  FormIconWrapper,
  FormHeaderWrapper,
  FormSwitchWrapper,
  FormAddInputLabelWrapper,
  FormAddLabelWrapper,
  FormAddLabel,
  FormErrorWrapper,
  FormError,
  FormAddInputWrapper,
  FormAddInputIconWrapper,
  FormAddIcon,
  FormAddInputWrapper2,
  FormAddInput,
  InputMiniBtnWrapper,
  InputMiniBtnWrapper2,
  InputMiniBtn,
  FormSettingWrapper,
  FormSettingIconWrapper1,
  FormSettingIconWrapper2,
  FormSettingIcon,
  OrderInfoWrapper,
  OrderInfoHeaderWrapper,
  AccountHeader,
  OrderInfoTextWrapper,
  OrderInfoTextWrapper2,
  OrderInfoText,
  OrderSubmitBtnWrapper,
  OrderSubmitBtn,
} from "../../../../../mainPage/mainPageElements";
import {
  HeroGridCardNumberIconWrapper2,
  HeroGridCardNumberIconWrapper3,
  HeroGridCardNumberIcon,
  HeroGridCardHeader,
} from "../../../../../mainPage/HeroSection/HeroElements";
import energyIcon from "../../../../../../assets/svg/EnergyIcon.svg";
import bandwidthIcon from "../../../../../../assets/svg/BandwidthIcon.svg";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { useFetchData } from "../../../../../../contexts/FetchDataContext";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../../redux/store/store";
import { useTronWallet } from "../../../../../../contexts/TronWalletContext";
import { showNotification } from "../../../../../../redux/actions/notifSlice";
import Autocomplete from "@mui/material/Autocomplete";
import { useLocation } from "react-router-dom";
import Form2PopUp1 from "../FormPopups/Form2PopUp1";
//-------------------------------------------------------------------------------------
//Duration input components :
const boxStyle = {
  px: 1,
  py: 0.5,
  border: "1px solid #666",
  borderRadius: 1,
  textAlign: "center",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#ddd",
  },
};
//-------------------------------------------------------------------------------------
//Custom switch btn 2:
const CustomToggleButton = styled(ToggleButton)(({ theme }) => ({
  textTransform: "none",
  fontWeight: "bold",
  fontSize: "13px",
  border: "2px solid #430E00",
  borderRadius: 8,
  padding: "2px 6px",
  "&.Mui-selected": {
    backgroundColor: "#430E00",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#430E00",
    },
  },
  "&:not(.Mui-selected)": {
    color: "#430E00",
  },
}));
//-------------------------------------------------------------------------------------
//Price input components:
const DropdownIconWithText: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
        marginRight: "0.5rem",
        fontWeight: "500",
      }}
    >
      <span style={{ fontSize: "14px", color: "#003543" }}>SUN</span>
    </div>
  );
};
//-------------------------------------------------------------------------------------

const Form2: React.FC = () => {
  //States :
  //translation states :
  const { t } = useTranslation();
  //redux dispatch :
  const dispatch = useDispatch();
  //tron wallet context :
  const { address, isConnectedTrading } = useTronWallet();
  //Switch button states:
  const [switchBtn, setSwitchBtn] = useState<string | null>("energy");
  //Wallet address states :
  const [walletAdd, setWalletAdd] = useState<string>("");
  const [walletAddError, setWalletAddError] = useState<string>("");
  const [bulkOrder, setBulkOrder] = useState<boolean>(false);
  const [bulkOrderPopupOpen, setBulkOrderPopupOpen] = useState<boolean>(false);
  //--------------------------------------------------------------------------------------
  //Switch button handleChange function :
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newSwitchBtn: string | null
  ) => {
    // If the same switchBtn is clicked again, do nothing
    if (newSwitchBtn === switchBtn || newSwitchBtn === null) {
      return;
    }
    setSwitchBtn(newSwitchBtn);
  };
  //-------------------------------------------------------------------------------------
  //Functions for wallet address :
  //Wallet address validation :
  const validationWalletAdd = (address: string) => {
    const walletAddRegX = /^T[a-zA-Z0-9]{33}$/;
    return walletAddRegX.test(address);
  };

  //Function to validate walletAdd based on bulk order (returns boolean) :
  const bulkOrderValidation = (addresses: string) => {
    if (addresses.trim() === "") return false;
    const addressArray = addresses
      .split(/[\s,]+/)
      .filter((addr) => addr.trim() !== "");

    return addressArray.every((addr) => validationWalletAdd(addr));
  };

  //Function for wallet address changes :
  const handleWalletAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!address || isConnectedTrading === false) {
      setWalletAdd("");
      setWalletAddError("");
      setBulkOrder(false)
      return;
    }

    const newValue = event.target.value;

    //if bulk order === false and address input length was more than 34 characters return an error:
    if (bulkOrder === false && newValue.length > 34) {
      setWalletAddError("bulk order restriction");
      return;
    }

    //set address value to whatever the client wants after connecting:
    setWalletAdd(newValue);
    //if address input is empty and we are connected in buyers page show this error :
    if (newValue.trim() === "" && isConnectedTrading === true) {
      setWalletAddError("fill address");
      return;
    }

    //condition 1---> if bulk order === true
    if (bulkOrder === true) {
      //validate newValue based on bulkOrderValidation :
      const isValid = bulkOrderValidation(newValue);
      if (!isValid) {
        setWalletAddError("wrong format");
      } else {
        setWalletAddError("");
      }
      //condition 2---> if bulk order === false
    } else {
      //validate newValue based on validationWalletAdd
      const isValid = validationWalletAdd(newValue);
      if (!isValid) {
        setWalletAddError("wrong format");
      } else {
        setWalletAddError("");
      }
    }
  };

  // Separate function to clean addresses for sending (returns string)
  const cleanAddressesForSending = (addresses: string): string => {
    if (addresses.trim() === "") return "";

    return addresses
      .split(/[\s,]+/)
      .filter((addr) => addr.trim() !== "")
      .map((addr) => addr.trim())
      .join(",");
  };

  //Function for input address when the page renders or rerenders :
  useEffect(() => {
    //if address does exists and we are connected in Buyers page:
    if (address && isConnectedTrading === true) {
      setWalletAdd(address);
      //when we are disconnected
    } else {
      setWalletAdd("");
      setWalletAddError("");
      setBulkOrder(false);
    }
  }, [address, isConnectedTrading]);
  //Function for bulk order popup :
  const handleBulkOrderPopupClose = useCallback(() => {
    setBulkOrderPopupOpen(false);
  }, []);

  const handleBulkOrderClick = () => {
    if (!address || isConnectedTrading === false ) {
      dispatch(
        showNotification({
          name: "error2",
          message: "Connect your wallet.",
          severity: "error",
        })
      );
      return;
    }
    setBulkOrderPopupOpen(true);
    setBulkOrder(true)

    
  };

  //-------------------------------------------------------------------------------------
  //Function to submit data towards the server :
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!address && isConnectedTrading === false) {
      dispatch(
        showNotification({
          name: "error1",
          message: "Connect your wallet.",
          severity: "error",
        })
      );
      return;
    }

    if (walletAddError) {
      return;
    }
    //to clean spaces between addresses(if exists) before sending the data :
    const requeserAddress = cleanAddressesForSending(walletAdd);

    //payload to send data towards the server :
    const submitPayload = {
      resourceType: switchBtn,
      requester : address,
      receiver: requeserAddress,
      bulk_order : bulkOrder,
    };
    console.log(submitPayload);

    /*
    //after sending data towards the server successfully :
    
    setWalletAdd(address);
    setBulkOrder(false)
    */
  };
  //-------------------------------------------------------------------------------------

  return (
    <>
      <Form2Container>
        <Form
          onSubmit={handleSubmit}
          style={{
            height: "100%",
            paddingLeft: "0.5rem",
            paddingRight: "0.5rem",
          }}
        >
          {/** Form header and switch btn component */}
          <FormHeaderSwitchWrapper>
            <FormHeaderIconWrapper>
              <FormIconWrapper>
                {switchBtn === "energy" ? (
                  <HeroGridCardNumberIconWrapper2
                    style={{ border: "solid 1px #003543" }}
                  >
                    <HeroGridCardNumberIconWrapper3
                      style={{ backgroundColor: "#003543" }}
                    >
                      <HeroGridCardNumberIcon
                        alt="energy icon"
                        src={energyIcon}
                        style={{ width: "18px", height: "18px" }}
                      />
                    </HeroGridCardNumberIconWrapper3>
                  </HeroGridCardNumberIconWrapper2>
                ) : (
                  <HeroGridCardNumberIconWrapper2
                    style={{ border: "solid 1px #430E00" }}
                  >
                    <HeroGridCardNumberIconWrapper3
                      style={{ backgroundColor: "#430E00" }}
                    >
                      <HeroGridCardNumberIcon
                        alt="bandwidth icon"
                        src={bandwidthIcon}
                        style={{ width: "18px", height: "18px" }}
                      />
                    </HeroGridCardNumberIconWrapper3>
                  </HeroGridCardNumberIconWrapper2>
                )}
              </FormIconWrapper>
              <FormHeaderWrapper>
                {switchBtn === "energy" ? (
                  <HeroGridCardHeader style={{ color: "#003543" }}>
                    {t("energy")}
                  </HeroGridCardHeader>
                ) : (
                  <HeroGridCardHeader style={{ color: "#003543" }}>
                    {t("bandwidth")}
                  </HeroGridCardHeader>
                )}
              </FormHeaderWrapper>
            </FormHeaderIconWrapper>
            <FormSwitchWrapper>
              <ToggleButtonGroup
                value={switchBtn}
                exclusive
                onChange={handleChange}
              >
                <CustomToggleButton value="energy">
                  {t("energy")}
                </CustomToggleButton>
                <CustomToggleButton value="bandwidth">
                  {t("bandwidth")}
                </CustomToggleButton>
              </ToggleButtonGroup>
            </FormSwitchWrapper>
          </FormHeaderSwitchWrapper>
          {/** Form wallet address input component */}
          <FormAddInputLabelWrapper>
            <FormAddLabelWrapper
              style={{
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Form2LableErrorWrapper>
                <FormAddLabel>Wallet Address</FormAddLabel>
                {walletAddError ? (
                  <FormErrorWrapper>
                    <FormError>{walletAddError}</FormError>
                  </FormErrorWrapper>
                ) : (
                  ""
                )}
              </Form2LableErrorWrapper>

              <Form2BulkOrderTextWrapper>
                <Form2BulkOrderText onClick={handleBulkOrderClick}>
                  Bulk order
                </Form2BulkOrderText>
              </Form2BulkOrderTextWrapper>
            </FormAddLabelWrapper>
            <FormAddInputWrapper>
              <FormAddInputIconWrapper>
                <Form2IconWrapper
                  style={{
                    backgroundColor: "#003543",
                    marginRight: "0.5rem",
                  }}
                >
                  <FormAddIcon />
                </Form2IconWrapper>

                <FormAddInputWrapper2>
                  <FormAddInput value={walletAdd} onChange={handleWalletAdd} />
                </FormAddInputWrapper2>
              </FormAddInputIconWrapper>
            </FormAddInputWrapper>
          </FormAddInputLabelWrapper>
          <OrderSubmitBtnWrapper>
            <OrderSubmitBtn type="submit">Create Order</OrderSubmitBtn>
          </OrderSubmitBtnWrapper>
        </Form>
      </Form2Container>
      {bulkOrderPopupOpen && (
        <Form2PopUp1
          open={bulkOrderPopupOpen}
          onClose={handleBulkOrderPopupClose}
          walletAdd={walletAdd}
          setWalletAdd={setWalletAdd}
          setBulkOrder={setBulkOrder}
          setWalletAddError={setWalletAddError}
        />
      )}
    </>
  );
};

export default React.memo(Form2);
