import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Form2Container,
  Form2BulkOrderTextWrapper,
  Form2BulkOrderText,
  Form2LableErrorWrapper,
  Form2IconWrapper,
  Form2AmountDurationWrapper,
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
  padding: "0px 6px",
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
  const refreshTrigger = useSelector(
    (state: RootState) => state.refresh.refreshTrigger
  );
  //tron wallet context :
  const { address, isConnectedTrading } = useTronWallet();
  const { fetchData, resourceData } = useFetchData();
  //Switch button states:
  const [switchBtn, setSwitchBtn] = useState<string | null>("energy");
  //Wallet address states :
  const [walletAdd, setWalletAdd] = useState<string>("");
  const [walletAddError, setWalletAddError] = useState<string>("");
  const [bulkOrder, setBulkOrder] = useState<boolean>(false);
  const [bulkOrderPopupOpen, setBulkOrderPopupOpen] = useState<boolean>(false);
  //Amount input states:
  const [amount, setAmount] = useState("");
  const [minAmount, setMinAmount] = useState<{
    energy: number;
    bandwidth: number;
  }>({ energy: 0, bandwidth: 0 });
  const [amountError, setAmountError] = useState("");
  //Duration dropdown states :
  const [durationValue, setDurationValue] = useState("");
  const [durationInSec, setDurationInSec] = useState<number | null>(2592000);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLInputElement | null>(null); //to get a refrence to the actual dom node
  const [durationError, setDurationError] = useState("");
  //Price dropdown states :
  const [inputValue, setInputValue] = useState<string>("");
  const [priceOptions, setPriceOptions] = useState<
    { col1: string; col2: string }[]
  >([]);
  const [minAmountPrice, setMinAmountPrice] = useState<any[]>([]);
  const [priceError, setPriceError] = useState("");
  const [dynamicPlaceholder, setDynamicPlaceholder] = useState("Price");

  const durationWasManuallyChanged = useRef(false);
  const priceWasManuallyChanged = useRef(false);
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
    setAmount("");
    setDurationValue("");
    setDurationInSec(null);
    setInputValue("");
    setPriceOptions([]);
    setDynamicPlaceholder("Price");
    setPriceError("");
    setDurationError("");
    setAmountError("");
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
      setBulkOrder(false);
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
    if (!address || isConnectedTrading === false) {
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
    setBulkOrder(true);
  };
  //-------------------------------------------------------------------------------------
  //Function to store the whole data for order form in it from server :
  useEffect(() => {
    const refreshData = async () => {
      try {
        await fetchData();
      } catch (error) {
        console.error("Error refreshing data:", error);
      }
    };

    if (refreshTrigger) {
      refreshData();
    }
  }, [refreshTrigger, fetchData]);
  //Function to get states from stored data :
  useEffect(() => {
    //Function to get minium amount and minimum price :
    if (!resourceData) return;

    if (resourceData?.data?.minAmount) {
      setMinAmount(resourceData.data.minAmount);
    }
    if (resourceData?.data?.ratesByDuration) {
      setMinAmountPrice(resourceData.data.ratesByDuration);
    }
  }, [resourceData]);
  //-------------------------------------------------------------------------------------
  //Functions for amount input :
  //Function for amount validation :
  const validateAmount = (
    rawValue: string,
    switchBtn: string | null,
    minAmount: { energy: number; bandwidth: number }
  ) => {
    const numericValue = Number(rawValue.replace(/,/g, ""));

    if (rawValue.trim() === "") {
      return "required";
    } else if (isNaN(numericValue)) {
      return "required";
    }

    if (switchBtn === "energy") {
      if (numericValue < minAmount.energy) {
        return `Less than ${minAmount.energy}k`;
      } else if (numericValue > 100000000) {
        return "Maximum limitation";
      }
    } else if (switchBtn === "bandwidth") {
      if (numericValue < minAmount.bandwidth) {
        return `Less than ${minAmount.bandwidth}k`;
      }
    } else {
    }

    return "";
  };
  const amountHandleChange = (
    value: string | React.ChangeEvent<HTMLInputElement>
  ) => {
    let rawValue = "";

    if (typeof value === "string") {
      rawValue = value;
    } else {
      rawValue = value.target.value;
    }

    //Allow commas for display but store as numeric
    const numericValue = Number(rawValue.replace(/,/g, ""));

    // You may also validate here if needed
    if (!isNaN(numericValue)) {
      setAmount(numericValue.toString()); // just display it as a string
    }

    // Validate input
    const errorMessage = validateAmount(rawValue, switchBtn, minAmount);
    setAmountError(errorMessage);
  };
  //Function for getting numeric value out of amount input :
  const getNumericAmount = (amount: string): number => {
    return Number(amount.replace(/,/g, ""));
  };
  //-------------------------------------------------------------------------------------
  //Duration input functions :
  //To create an array of 30 days
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  //To create an array of 1 & 3 hours
  const hours = [1, 3];
  //To create an array for 15 min
  const minutes = [15];
  //Duration inout validation :
  const validateDuration = (value: string): string => {
    const trimmed = value.trim();

    if (trimmed === "") {
      return "required";
    }
    //valid time between options :
    const validDurations = [
      "15 minutes",
      "1 hour",
      "3 hours",
      ...Array.from(
        { length: 30 },
        (_, i) => `${i + 1} ${i + 1 === 1 ? "day" : "days"}`
      ),
    ];

    if (!validDurations.includes(trimmed)) {
      return "invalid time";
    }
    return "";
  };
  //Function to convert duration in seconds :
  const getDurationInSeconds = (value: string): number | null => {
    const trimmed = value.trim().toLowerCase();
    const match = trimmed.match(/^(\d+)\s*(minutes?|hours?|days?)$/);

    if (!match) return null;

    const number = parseInt(match[1], 10);
    const unit = match[2];

    switch (unit) {
      case "minute":
      case "minutes":
        return number * 60;
      case "hour":
      case "hours":
        return number * 3600;
      case "day":
      case "days":
        return number * 86400;
      default:
        return null;
    }
  };

  //handleOption function on click :
  const handleOptionClick = (value: string) => {
    const durationInSeconds = getDurationInSeconds(value);

    setDurationValue(value);
    setDurationInSec(durationInSeconds);

    setOpen(false);
    anchorRef.current?.blur();

    const errorMessage = validateDuration(value);
    setDurationError(errorMessage);

    durationWasManuallyChanged.current = true;
  };
  //-------------------------------------------------------------------------------------
  //Price input functions :
  //To set min max dynamic options :
  const minOption = Math.min(
    ...priceOptions.map((option) => parseInt(option.col1, 10))
  );
  const maxOption = Math.max(
    ...priceOptions.map((option) => parseInt(option.col1, 10))
  );
  //Utils function to get dynamic min value for price :
  const getMatchedRate = (durationInSec: number | null) => {
    if (durationInSec === null) return null;

    return minAmountPrice.find((item) => {
      const { exactDurationSeconds, minDurationSeconds, maxDurationSeconds } =
        item;

      return (
        durationInSec === exactDurationSeconds ||
        (durationInSec >= minDurationSeconds &&
          durationInSec <= maxDurationSeconds)
      );
    });
  };
  //Price input validation :
  const validatePrice = (value: string): string => {
    const numValue = parseInt(value, 10);
    if (value.trim() === "") {
      return "Required";
    }

    if (isNaN(numValue)) {
      return "Invalid number";
    }

    //skip the validation if minAmountPrice and durationInSec are not loaded yet
    if (
      !minAmountPrice ||
      minAmountPrice.length === 0 ||
      durationInSec === null
    ) {
      return "";
    }

    // Match the item based on exact or range duration
    const matchedItem = minAmountPrice.find((item) => {
      const { exactDurationSeconds, minDurationSeconds, maxDurationSeconds } =
        item;

      return (
        durationInSec === exactDurationSeconds ||
        (durationInSec !== null &&
          minDurationSeconds !== undefined &&
          maxDurationSeconds !== undefined &&
          durationInSec >= minDurationSeconds &&
          durationInSec <= maxDurationSeconds)
      );
    });

    if (!matchedItem) {
      return "Invalid price";
    }

    const rate_energy = matchedItem.rate.energy;
    const rate_bandwidth = matchedItem.rate.bandwidth;

    if (switchBtn === "energy") {
      return numValue < rate_energy ? `Less than ${minAmount.energy}k ` : "";
    } else if (switchBtn === "bandwidth") {
      return numValue < rate_bandwidth
        ? `Less than ${minAmount.bandwidth}k`
        : "";
    }

    return "";
  };

  const handlePriceChange = (
    event: React.SyntheticEvent<Element, Event> | null,
    newValue: string | null
  ) => {
    const value = newValue || "";
    setInputValue(value);
    priceWasManuallyChanged.current = true;

    if (value.trim() !== "") {
      const errorMessage = validatePrice(value);
      setPriceError(errorMessage);
    }
  };
  //Function to filter the dropdown to shows nothing if the entered value was more than max-price :
  const filterPriceOptions = (
    options: typeof priceOptions,
    state: { inputValue: string }
  ) => {
    const inputNum = parseInt(state.inputValue, 10);

    if (!state.inputValue || isNaN(inputNum)) {
      return options; // Show all options if input is empty or invalid
    }

    if (inputNum > maxOption) {
      return []; // Hide all options
    }

    return options;
  };
  //Function for getting nearest smaller selected price value in price options and getting the numeric value out of that.
  const getNumericSelectedPrice = (selectedPrice: string): number | null => {
    const inputNum = parseInt(selectedPrice, 10);
    if (isNaN(inputNum)) return null;

    const exactMatch = priceOptions.some((opt) => opt.col1 === selectedPrice);

    if (exactMatch) {
      return inputNum;
    }

    if (inputNum > maxOption) {
      return inputNum; // Accept price > max without fallback
    }

    return Number(selectedPrice); // Return the numeric value
  };
  //-------------------------------------------------------------------------------------
  // Reset the flag when switchBtn changes
  useEffect(() => {
    durationWasManuallyChanged.current = false;
    priceWasManuallyChanged.current = false;
  }, [switchBtn]);

  // 2. This useEffect immediately updates duration and price when switchBtn changes
  useEffect(() => {
    // When switchBtn changes, immediately use the existing data if available
    if (minAmountPrice.length > 0) {
      const defaultDuration = "30 days";
      const durationInSeconds = getDurationInSeconds(defaultDuration);

      // Set duration immediately
      setDurationValue(defaultDuration);
      setDurationInSec(durationInSeconds);

      // Set price immediately if we have the data
      const matchedItem = getMatchedRate(durationInSeconds);
      if (matchedItem) {
        const rate =
          switchBtn === "energy"
            ? matchedItem.rate.energy
            : matchedItem.rate.bandwidth;
        setDynamicPlaceholder(`Min price: ${rate}`);
        setInputValue(rate.toString());
      }
    }
  }, [switchBtn]);

  //To render dynamic options in price dropdown :
  useEffect(() => {
    if (!durationWasManuallyChanged.current && minAmountPrice.length > 0) {
      const defaultDuration = "30 days";
      const durationInSeconds = getDurationInSeconds(defaultDuration);
      setDurationValue(defaultDuration);
      setDurationInSec(durationInSeconds);
    }
  }, [switchBtn, minAmountPrice]);

  useEffect(() => {
    if (
      durationInSec !== null &&
      !priceWasManuallyChanged.current &&
      minAmountPrice.length > 0
    ) {
      const matchedItem = getMatchedRate(durationInSec);
      if (matchedItem) {
        const rate =
          switchBtn === "energy"
            ? matchedItem.rate.energy
            : matchedItem.rate.bandwidth;

        setDynamicPlaceholder(`Min price: ${rate}`);
        setInputValue(rate.toString());
      }
    }
  }, [durationInSec, minAmountPrice, switchBtn]);

  useEffect(() => {
    priceWasManuallyChanged.current = false;
  }, [durationValue]);

  useEffect(() => {
    if (inputValue.trim() !== "") {
      const errorMessage = validatePrice(inputValue);
      setPriceError(errorMessage);
    }
  }, [inputValue, validatePrice]);

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
      requester: address,
      receiver: requeserAddress,
      bulk_order: bulkOrder,
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
          <Form2AmountDurationWrapper>
            <Grid container spacing={0.5}>
              <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                {/** Form amount input component */}
                <FormAddInputLabelWrapper>
                  <FormAddLabelWrapper>
                    <FormAddLabel>Amount</FormAddLabel>
                    {amountError && (
                      <FormErrorWrapper>
                        <FormError>{amountError}</FormError>
                      </FormErrorWrapper>
                    )}
                  </FormAddLabelWrapper>
                  <FormAddInputWrapper>
                    <FormAddInputIconWrapper>
                      <FormAddInputWrapper2 style={{ height: "24px" }}>
                        <FormAddInput
                          style={{ fontSize: "16px", marginLeft: "0.5rem" }}
                          value={Number(amount).toLocaleString()}
                          onChange={amountHandleChange}
                          placeholder={`Amount of ${
                            switchBtn === "energy"
                              ? `energy (${minAmount.energy} - 100,000,000)`
                              : `bandwidth (${minAmount.bandwidth} - ...)`
                          }`}
                        />
                      </FormAddInputWrapper2>
                    </FormAddInputIconWrapper>
                  </FormAddInputWrapper>

                  {switchBtn === "energy" ? (
                    <InputMiniBtnWrapper
                      style={{ paddingLeft: "0", height: "28px" }}
                    >
                      {/** Form input mini btns component */}
                      <InputMiniBtnWrapper2>
                        <InputMiniBtn
                          type="button"
                          onClick={() => amountHandleChange("64,350")}
                          value="64,350"
                          style={{ width: "67px", padding: "2px 0px" }}
                        >
                          USDT Tsf
                        </InputMiniBtn>
                      </InputMiniBtnWrapper2>
                      <InputMiniBtnWrapper2>
                        <InputMiniBtn
                          type="button"
                          onClick={() => amountHandleChange("100,000")}
                          value="100,000"
                          style={{ padding: "2px 2px" }}
                        >
                          100k
                        </InputMiniBtn>
                      </InputMiniBtnWrapper2>
                      <InputMiniBtnWrapper2>
                        <InputMiniBtn
                          type="button"
                          onClick={() => amountHandleChange("1,000,000")}
                          value="1,000,000"
                          style={{ padding: "2px 2px" }}
                        >
                          1m
                        </InputMiniBtn>
                      </InputMiniBtnWrapper2>
                      <InputMiniBtnWrapper2>
                        <InputMiniBtn
                          type="button"
                          onClick={() => amountHandleChange("2,000,000")}
                          value="2,000,000"
                          style={{ padding: "2px 2px" }}
                        >
                          2m
                        </InputMiniBtn>
                      </InputMiniBtnWrapper2>
                      <InputMiniBtnWrapper2>
                        <InputMiniBtn
                          type="button"
                          onClick={() => amountHandleChange("10,000,000")}
                          value="10,000,000"
                          style={{ padding: "2px 2px" }}
                        >
                          10m
                        </InputMiniBtn>
                      </InputMiniBtnWrapper2>
                    </InputMiniBtnWrapper>
                  ) : (
                    <InputMiniBtnWrapper
                      style={{ paddingLeft: "0", height: "28px" }}
                    >
                      <InputMiniBtnWrapper2>
                        <InputMiniBtn
                          type="button"
                          onClick={() => amountHandleChange("1,000")}
                          value="1,000"
                        >
                          1k
                        </InputMiniBtn>
                      </InputMiniBtnWrapper2>
                      <InputMiniBtnWrapper2>
                        <InputMiniBtn
                          type="button"
                          onClick={() => amountHandleChange("2,000")}
                          value="2,000"
                        >
                          2k
                        </InputMiniBtn>
                      </InputMiniBtnWrapper2>
                      <InputMiniBtnWrapper2>
                        <InputMiniBtn
                          type="button"
                          onClick={() => amountHandleChange("5,000")}
                          value="5,000"
                        >
                          5k
                        </InputMiniBtn>
                      </InputMiniBtnWrapper2>
                      <InputMiniBtnWrapper2>
                        <InputMiniBtn
                          type="button"
                          onClick={() => amountHandleChange("10,000")}
                          value="10,000"
                        >
                          10k
                        </InputMiniBtn>
                      </InputMiniBtnWrapper2>
                    </InputMiniBtnWrapper>
                  )}
                </FormAddInputLabelWrapper>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                {/** Form duration dropdown component */}
                <FormAddInputLabelWrapper style={{ marginBottom: "0" }}>
                  <FormAddLabelWrapper>
                    <FormAddLabel>Duration</FormAddLabel>
                    {durationError && (
                      <FormErrorWrapper>
                        <FormError>{durationError}</FormError>
                      </FormErrorWrapper>
                    )}
                  </FormAddLabelWrapper>
                  <FormControl fullWidth style={{ marginBottom: "0.5rem" }}>
                    <ClickAwayListener onClickAway={() => setOpen(false)}>
                      <Box>
                        <TextField
                          placeholder="Duration"
                          value={durationValue}
                          onChange={(e) => setDurationValue(e.target.value)}
                          onFocus={() => setOpen(true)}
                          inputRef={anchorRef}
                          onBlur={() =>
                            setDurationError(validateDuration(durationValue))
                          }
                          fullWidth
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              height: "38px",
                              border: "2px solid #D9E1E3",
                              backgroundColor: "#ffffff",
                              color: "#003543",
                              borderRadius: "10px",

                              "&.Mui-focused fieldset": {
                                borderColor: "transparent",
                              },
                              "& fieldset": {
                                border: "none",
                              },
                            },
                            "& input::placeholder": {
                              fontSize: "14px",
                            },
                          }}
                        />
                        <Popper
                          open={open}
                          anchorEl={anchorRef.current}
                          placement="bottom-start"
                          style={{ zIndex: 1300 }}
                        >
                          <Box
                            sx={{
                              bgcolor: "background.paper",
                              border: "1px solid #ccc",

                              p: 2,
                              mt: 0.5,
                              width: 300,
                              boxShadow: 4,
                              borderRadius: 2,
                            }}
                          >
                            <Typography fontWeight="bold">Minutes</Typography>
                            <Grid container spacing={1} mb={2}>
                              {minutes.map((min) => (
                                <Grid key={min}>
                                  <Box
                                    sx={boxStyle}
                                    onClick={(e) => {
                                      e.stopPropagation(); // prevent triggering events on other components
                                      handleOptionClick(`${min} minutes`);
                                    }}
                                  >
                                    {min}
                                  </Box>
                                </Grid>
                              ))}
                            </Grid>
                            <Typography fontWeight="bold">Hours</Typography>
                            <Grid container spacing={1} mb={2}>
                              {hours.map((hr) => (
                                <Grid key={hr}>
                                  <Box
                                    sx={boxStyle}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleOptionClick(
                                        `${hr} ${hr === 1 ? "hour" : "hours"}`
                                      );
                                    }}
                                  >
                                    {hr}
                                  </Box>
                                </Grid>
                              ))}
                            </Grid>
                            <Typography fontWeight="bold">Days</Typography>
                            <Grid container spacing={1}>
                              {days.map((day) => (
                                <Grid size={2} key={day}>
                                  <Box
                                    sx={boxStyle}
                                    onMouseDown={(e) => {
                                      e.preventDefault(); // Prevent focus shift
                                    }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleOptionClick(
                                        `${day} ${day === 1 ? "day" : "days"}`
                                      );
                                    }}
                                  >
                                    {day}
                                  </Box>
                                </Grid>
                              ))}
                            </Grid>
                          </Box>
                        </Popper>
                      </Box>
                    </ClickAwayListener>
                  </FormControl>
                </FormAddInputLabelWrapper>
              </Grid>
            </Grid>
          </Form2AmountDurationWrapper>
          <Form2AmountDurationWrapper>
            <Grid container spacing={0.5}>
              <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                {/** Form price component */}
                <FormAddInputLabelWrapper style={{ marginBottom: "0" }}>
                  <FormAddLabelWrapper>
                    <FormAddLabel>Price</FormAddLabel>
                    {priceError && (
                      <FormErrorWrapper>
                        <FormError>{priceError}</FormError>
                      </FormErrorWrapper>
                    )}
                  </FormAddLabelWrapper>
                  <FormControl fullWidth>
                    <Autocomplete
                      freeSolo
                      disableClearable
                      openOnFocus
                      options={priceOptions}
                      inputValue={inputValue}
                      onInputChange={(event, newValue) =>
                        handlePriceChange(event, newValue)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder={dynamicPlaceholder}
                          variant="outlined"
                          onBlur={() => {
                            const errorMsg = validatePrice(inputValue);
                            setPriceError(errorMsg);
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              height: "38px",
                              border: "2px solid #D9E1E3",
                              backgroundColor: "#ffffff",
                              color: "#003543",
                              borderRadius: "10px",

                              "&.Mui-focused fieldset": {
                                borderColor: "transparent",
                              },
                              "& fieldset": {
                                border: "none",
                              },
                            },
                            "& input::placeholder": {
                              fontSize: "14px",
                            },
                          }}
                          InputProps={{
                            ...params.InputProps,
                            type: "text",
                            endAdornment: (
                              <div>
                                <DropdownIconWithText />
                              </div>
                            ),
                          }}
                        />
                      )}
                    />
                  </FormControl>
                </FormAddInputLabelWrapper>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                <FormAddInputLabelWrapper>
                  <FormAddLabelWrapper
                    style={{
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <FormAddLabel>Resource By Threshold</FormAddLabel>
                    {walletAddError ? (
                      <FormErrorWrapper>
                        <FormError>{walletAddError}</FormError>
                      </FormErrorWrapper>
                    ) : (
                      ""
                    )}
                  </FormAddLabelWrapper>
                  <FormAddInputWrapper>
                    <FormAddInputIconWrapper>
                      <FormAddInputWrapper2 style={{ height: "24px" }}>
                        <FormAddInput value="" />
                      </FormAddInputWrapper2>
                    </FormAddInputIconWrapper>
                  </FormAddInputWrapper>
                </FormAddInputLabelWrapper>
              </Grid>
            </Grid>
          </Form2AmountDurationWrapper>
          <OrderSubmitBtnWrapper>
            <OrderSubmitBtn type="submit">Confirm Created Rule</OrderSubmitBtn>
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
