import React, { useState, useRef, useEffect } from "react";
import { useLoading } from "../../contexts/LoaderContext";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { showNotification } from "../../redux/actions/notifSlice";
import "./mainPage.css";
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
  FormWrapper,
  FormWrapper2,
  Form,
  FormHeaderSwitchWrapper,
  FormHeaderIconWrapper,
  FormHeaderWrapper,
  FormIconWrapper,
  AccountHeader,
  FormSwitchWrapper,
  FormAddInputLabelWrapper,
  FormAddLabelWrapper,
  FormAddLabel,
  FormAddInputWrapper,
  FormAddInputIconWrapper,
  FormAddIcon,
  FormAddInputWrapper2,
  FormAddInput,
  InputMiniBtnWrapper,
  InputMiniBtnWrapper2,
  InputMiniBtn,
  OrderInfoWrapper,
  OrderInfoHeaderWrapper,
  OrderInfoTextWrapper,
  OrderInfoTextWrapper2,
  OrderInfoText,
  OrderSubmitBtnWrapper,
  OrderSubmitBtn,
  FormErrorWrapper,
  FormError,
  FormSettingWrapper,
  FormSettingIconWrapper1,
  FormSettingIconWrapper2,
  FormSettingIcon,
} from "./mainPageElements";
import {
  HeroGridCardNumberIconWrapper2,
  HeroGridCardNumberIconWrapper3,
  HeroGridCardNumberIcon,
} from "./HeroSection/HeroElements";
import { HeroGridCardHeader } from "./HeroSection/HeroElements";
import Autocomplete from "@mui/material/Autocomplete";
import { styled } from "@mui/material/styles";
import bandwidthIcon from "../../assets/svg/BandwidthIcon.svg";
import energyIcon from "../../assets/svg/EnergyIcon.svg";
import { toggleRefresh } from "../../redux/actions/refreshSlice";
import { useTronWallet } from "../../contexts/TronWalletContext";
import PopUp2 from "../../components/Popup/PopUp2";
//-------------------------------------------------------------------------------------
// Define the type for the data structure
interface SettingUI {
  data: {
    minAmount?: any;
    ratesByDuration?: any;
    longTermData?: any;
  };
}
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
//Switch button material ui styles :
const CustomToggleButton = styled(ToggleButton)(({ theme }) => ({
  textTransform: "none",
  fontWeight: "bold",
  fontSize: "12px",
  border: "2px solid #430E00",
  borderRadius: 8,
  padding: "4px 6px",
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
const OrderFormComponent: React.FC = () => {
  //States :
  //loader states :
  const { incrementLoading, decrementLoading } = useLoading();
  //translation states :
  const { t } = useTranslation();
  //redux dispatch :
  const dispatch = useDispatch();
  const refreshTrigger = useSelector(
    (state: RootState) => state.refresh.refreshTrigger
  );
  //tron wallet context :
  const { address, balance, availableBandwidth } = useTronWallet();
  //Switch button states:
  const [switchBtn, setSwitchBtn] = useState<string | null>("energy");
  //Wallet address states :
  const [walletAdd, setWalletAdd] = useState<string>("");
  const [walletAddError, setWalletAddError] = useState<string | null>("");
  //Setting button (Allow partial fill) states :
  const [partialFill, setPartialFill] = useState<boolean>(true);
  //Setting button (Bulk order) states :
  const [bulkOrder, setBulkOrder] = useState<boolean>(false);
  //Store whole fetch data in one state :
  const [wholeData, setWholeData] = useState<SettingUI | null>(null);
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
  //Setting dropdown states :
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [popupOpen2, setPopupOpen2] = useState(false);
  //to get axios timeout :
  const axiosTimeOut = Number(process.env.AXIOS_TIME_OUT);
  //States for date and time :
  const [currentDate, setCurrentDate] = useState<string>("");
  const [currentTime, setCurrentTime] = useState<string>("");
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
  //--------------------------------------------------------------------------------------
  //Functions for setting button (Allow partial fill) :
  const handlePartialFill = (event: React.ChangeEvent<HTMLInputElement>) => {
    let partialValue = event.target.checked;
    setPartialFill(partialValue);
  };
  //Functions for stting button (Bulk order) :
  const handleBulkOrder = (event: React.ChangeEvent<HTMLInputElement>) => {
    const bulkValue = event.target.checked;
    setBulkOrder(bulkValue);
  };
  //--------------------------------------------------------------------------------------
  //Functions for wallet address :
  //Wallet address validation :
  const validationWalletAdd = (address: string) => {
    const walletAddRegX = /^T[a-zA-Z0-9]{33}$/;
    return walletAddRegX.test(address);
  };
  //Wallet address function :
  const handleWalletAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setWalletAdd(newValue);
    //when bulk order is true
    if (bulkOrder) {
      //separate addresses from each other by - and ignore spaces
      const allAdresses = newValue.split(",").map((addr) => addr.trim());
      //all addresses must be validated into correct format
      const allValid = allAdresses.every((addr) => validationWalletAdd(addr));

      if (!allValid) {
        setWalletAddError("all addresses must be in write format.");
      } else {
        setWalletAddError(null);
      }
    } else {
      if (newValue && !validationWalletAdd(newValue)) {
        setWalletAddError("wrong format.");
      } else {
        setWalletAddError(null);
      }
    }
  };
  //Function for conditional wallet add validation with bulkOrder :
  const isWalletAddValid = (): boolean => {
    if (!bulkOrder) {
      const walletAddressIsValid = validationWalletAdd(walletAdd);
      if (!walletAddressIsValid) {
        setWalletAddError("wrong format.");
        return false;
      } else {
        setWalletAddError(null);
        return true;
      }
    }

    // bulkOrder === true
    const addresses = walletAdd.split(",").map((addr) => addr.trim());
    const allValid = addresses.every((addr) => validationWalletAdd(addr));
    if (!allValid) {
      setWalletAddError("addresses must be valid and separated by ','");
      return false;
    } else {
      setWalletAddError(null);
      return true;
    }
  };

  useEffect(() => {
    if (walletAdd.trim() !== "") {
      isWalletAddValid();
    }
  }, [bulkOrder]);

  useEffect(() => {
    if (address) {
      setWalletAdd(address); // Set when address exists
    } else {
      setWalletAdd(""); // Clear when address is null (disconnected)
    }
  }, [address]);
  //--------------------------------------------------------------------------------------
  //Function to store the whole data for order form in it from server :
  useEffect(() => {
    const getMinimumAmountDuration = async () => {
      const baseURL = process.env.REACT_APP_BASE_URL;
      //we use the loader tracker that loader stays loading until minimum prices will get from server :
      incrementLoading();
      try {
        const res = await axios.get<SettingUI>(`${baseURL}/Setting/UI`, {
          headers: { "Content-Type": "application/json" },
          timeout: axiosTimeOut,
        });
        // store full response in one state
        setWholeData(res.data);
      } catch (error) {
        console.error("Failed to fetch setting UI:", error);
      } finally {
        //we finish the tracking operation when fetching data ends :
        decrementLoading();
      }
    };
    getMinimumAmountDuration();
  }, [refreshTrigger]);

  //Function to get states from stored data :
  useEffect(() => {
    //Function to get minium amount and minimum price :
    if (!wholeData || !wholeData.data) return;

    if (wholeData?.data?.minAmount) {
      setMinAmount(wholeData.data.minAmount);
    }
    if (wholeData?.data?.ratesByDuration) {
      setMinAmountPrice(wholeData.data.ratesByDuration);
    }
  }, [wholeData]);
  //--------------------------------------------------------------------------------------
  //Amount input functions :
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
        return "Minimum limitation";
      } else if (numericValue > 100000000) {
        return "Maximum limitation";
      }
    } else if (switchBtn === "bandwidth") {
      if (numericValue < minAmount.bandwidth) {
        return "Minimum limitation";
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
  //--------------------------------------------------------------------------------------

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
  //funtion to post duration data towards the server :

  //handleOption function on click :
  const handleOptionClick = (value: string) => {
    const durationInSeconds = getDurationInSeconds(value);

    setDurationValue(value);
    setDurationInSec(durationInSeconds);

    setOpen(false);
    anchorRef.current?.blur();

    const errorMessage = validateDuration(value);
    setDurationError(errorMessage);
  };
  //--------------------------------------------------------------------------------------
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
      return numValue < rate_energy ? "less than min amount" : "";
    } else if (switchBtn === "bandwidth") {
      return numValue < rate_bandwidth ? "less than min amount" : "";
    }

    return "";
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

  //--------------------------------------------------------------------------------------
  //To render dynamic options in price dropdown :
  useEffect(() => {
    const defaultDuration = "30 days";
    const durationInSeconds = getDurationInSeconds(defaultDuration);
    setDurationValue(defaultDuration);
    setDurationInSec(durationInSeconds);
  }, [switchBtn, minAmountPrice]);

  useEffect(() => {
    if (durationInSec !== null) {
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
  }, [durationInSec, minAmountPrice]);

  useEffect(() => {
    if (inputValue.trim() !== "") {
      const errorMessage = validatePrice(inputValue);
      setPriceError(errorMessage);
    }
  }, [inputValue, validatePrice]);

  //--------------------------------------------------------------------------------------
  //Functions for setting button :
  //checkbox click toggle function :
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  //Function to close the checkbox when clicking anywhere :
  const handleClose = () => {
    setAnchorEl(null);
  };
  const menuOpen = Boolean(anchorEl);
  //--------------------------------------------------------------------------------------
  //To calculate payout amount :
  const calculateTotalPrice = () => {
    const numericAmount = getNumericAmount(amount);
    const numericDuration = getDurationInSeconds(durationValue);
    if (numericDuration === null) {
      return { totalPrice: 0 };
    }
    const pricePerUnit = getNumericSelectedPrice(inputValue);
    const SUN = 1000000;
    //To get minimum value of each selected duration based on server data :
    const matchedRate = getMatchedRate(numericDuration);
    if (!matchedRate || !matchedRate.rate) {
      return { totalPrice: 0 };
    }
    const minOption =
      switchBtn === "energy"
        ? matchedRate.rate.energy
        : matchedRate.rate.bandwidth;

    if (pricePerUnit === null || numericAmount === null) {
      return { totalPrice: 0 };
    }

    if (pricePerUnit < minOption) {
      return { totalPrice: 0 }; // Return 0 if price is too low
    }

    // Convert duration to seconds
    let totalSeconds = numericDuration;
    let totalPrice = 0;

    if (totalSeconds === 900) {
      // 15 minutes
      totalPrice = (numericAmount / SUN) * pricePerUnit;
    } else if (totalSeconds === 3600) {
      // 1 hour
      totalPrice = (numericAmount / SUN) * pricePerUnit;
    } else if (totalSeconds === 10800) {
      // 3 hours
      totalPrice = (numericAmount / SUN) * pricePerUnit;
    } else if (totalSeconds % 86400 === 0) {
      // whole days
      const numberOfDays = totalSeconds / 86400;
      totalPrice = (numericAmount / SUN) * pricePerUnit * numberOfDays;
    } else {
      return null; // Invalid time
    }

    return { totalPrice: Number(totalPrice.toFixed(3)) };
  };
  let myPrice = calculateTotalPrice();
  //--------------------------------------------------------------------------------------
  //Submit form function :
  if (!myPrice) {
    return;
  }
  const { totalPrice } = myPrice;
  const durationNumericValue = getDurationInSeconds(durationValue);
  let stringSelectedPrice = inputValue;
  let numericSelectedPrice = getNumericSelectedPrice(stringSelectedPrice);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Set current date and time
    const now = new Date();
    setCurrentDate(now.toLocaleDateString());
    setCurrentTime(now.toLocaleTimeString());

    if (!address) {
      dispatch(
        showNotification({
          name: "error1",
          message: "Connect your wallet.",
          severity: "error",
        })
      );
      return;
    }
    //Wallet address input validation :
    const isValid = isWalletAddValid();
    if (!isValid) return;
    //Amount input validation :
    const amountValidationError = validateAmount(amount, switchBtn, minAmount);
    setAmountError(amountValidationError);
    //Duration input validation :
    const durationValidationError = validateDuration(durationValue);

    setDurationError(durationValidationError);
    //Price input validation :
    const priceValidationError = validatePrice(inputValue);
    setPriceError(priceValidationError);

    if (
      amountValidationError ||
      durationValidationError ||
      priceValidationError
    ) {
      return;
    }

    //Switch button value :
    let formBtn = switchBtn;
    //Wallet address :
    let walletAddress = walletAdd || (address ?? "");
    //numeric value of amount input
    const numericAmount = getNumericAmount(amount);
    //duration input value :
    const durationNumericValue = getDurationInSeconds(durationValue);
    //Price input value :
    let stringSelectedPrice = inputValue;
    let numericSelectedPrice = getNumericSelectedPrice(stringSelectedPrice);
    //Total price value :
    let myPrice = calculateTotalPrice();
    if (!myPrice) {
      return;
    }
    const { totalPrice } = myPrice;

    if (
      formBtn === null ||
      numericAmount === null ||
      durationNumericValue === null ||
      numericSelectedPrice === null ||
      !myPrice
    ) {
      return;
    }

    //Fetch data towards server :

    try {
      if (balance) {
        const balanceNum = parseFloat(balance);
        //balance must be at least 0.4 more than total price :
        if (balanceNum >= totalPrice + 0.4) {
          setPopupOpen2(true);
          //if balance = total price ----> bandwidth must be at lease 500 or more :
        } else if (balanceNum === totalPrice) {
          if (!availableBandwidth || availableBandwidth <= 500) {
            dispatch(
              showNotification({
                name: "post-error",
                message: "Available bandwidth must be more than 500.",
                severity: "error",
              })
            );
            return;
          } else {
            setPopupOpen2(true);
          }
        } else {
          dispatch(
            showNotification({
              name: "error5",
              message: `Insufficient balance: Need ${
                totalPrice + 0.4
              } TRX at least or exactly ${totalPrice} TRX with >500 bandwidth`,
              severity: "error",
            })
          );
          return;
        }
      } else {
        dispatch(
          showNotification({
            name: "error5",
            message: `please check your balance or bandwidth.`,
            severity: "error",
          })
        );
        return;
      }
    } catch (error) {
      dispatch(
        showNotification({
          name: "error3",
          message: "Internal Server Error.",
          severity: "error",
        })
      );
    }
  };

  //--------------------------------------------------------------------------------------

  return (
    <>
      <FormWrapper>
        <FormWrapper2 className="form-bg1">
          <Form onSubmit={handleSubmit} className="form-bg2">
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
              <FormAddLabelWrapper>
                <FormAddLabel>Wallet Address</FormAddLabel>
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
                  <HeroGridCardNumberIconWrapper3
                    style={{
                      backgroundColor: "#003543",
                      marginRight: "0.5rem",
                    }}
                  >
                    <FormAddIcon />
                  </HeroGridCardNumberIconWrapper3>

                  <FormAddInputWrapper2>
                    <FormAddInput
                      value={walletAdd}
                      onChange={handleWalletAdd}
                    />
                  </FormAddInputWrapper2>
                </FormAddInputIconWrapper>
              </FormAddInputWrapper>
            </FormAddInputLabelWrapper>
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
                  {switchBtn === "energy" ? (
                    <HeroGridCardNumberIconWrapper3
                      style={{ backgroundColor: "#003543" }}
                    >
                      <HeroGridCardNumberIcon
                        alt="energy icon"
                        src={energyIcon}
                        style={{ width: "18px", height: "18px" }}
                      />
                    </HeroGridCardNumberIconWrapper3>
                  ) : (
                    <HeroGridCardNumberIconWrapper3
                      style={{ backgroundColor: "#430E00" }}
                    >
                      <HeroGridCardNumberIcon
                        alt="bandwidth icon"
                        src={bandwidthIcon}
                        style={{ width: "18px", height: "18px" }}
                      />
                    </HeroGridCardNumberIconWrapper3>
                  )}
                  <FormAddInputWrapper2>
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
                <InputMiniBtnWrapper>
                  {/** Form input mini btns component */}
                  <InputMiniBtnWrapper2>
                    <InputMiniBtn
                      type="button"
                      onClick={() => amountHandleChange("64,350")}
                      value="64,350"
                    >
                      USDT Tsf
                    </InputMiniBtn>
                  </InputMiniBtnWrapper2>
                  <InputMiniBtnWrapper2>
                    <InputMiniBtn
                      type="button"
                      onClick={() => amountHandleChange("100,000")}
                      value="100,000"
                    >
                      100k
                    </InputMiniBtn>
                  </InputMiniBtnWrapper2>
                  <InputMiniBtnWrapper2>
                    <InputMiniBtn
                      type="button"
                      onClick={() => amountHandleChange("1,000,000")}
                      value="1,000,000"
                    >
                      1m
                    </InputMiniBtn>
                  </InputMiniBtnWrapper2>
                  <InputMiniBtnWrapper2>
                    <InputMiniBtn
                      type="button"
                      onClick={() => amountHandleChange("2,000,000")}
                      value="2,000,000"
                    >
                      2m
                    </InputMiniBtn>
                  </InputMiniBtnWrapper2>
                  <InputMiniBtnWrapper2>
                    <InputMiniBtn
                      type="button"
                      onClick={() => amountHandleChange("10,000,000")}
                      value="10,000,000"
                    >
                      10m
                    </InputMiniBtn>
                  </InputMiniBtnWrapper2>
                </InputMiniBtnWrapper>
              ) : (
                <InputMiniBtnWrapper>
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
                          height: "40px",
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
                  onInputChange={(_, newInputValue) =>
                    setInputValue(newInputValue)
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
                          height: "40px",
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
            {/** Setting button */}
            <FormSettingWrapper>
              <FormSettingIconWrapper1 onClick={handleClick}>
                <FormSettingIconWrapper2>
                  <FormSettingIcon />
                </FormSettingIconWrapper2>
              </FormSettingIconWrapper1>
              <Menu
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleClose}
                disableScrollLock
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
                <MenuItem
                  disableRipple
                  sx={{
                    minHeight: "auto",
                    transition: "none",
                    "&:hover": {
                      backgroundColor: "transparent !important",
                    },
                    "&.Mui-focusVisible, &:focus, &:active": {
                      backgroundColor: "transparent !important",
                      outline: "none",
                      boxShadow: "none",
                      border: "none",
                    },
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={partialFill}
                        onChange={handlePartialFill}
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
                    label="Allow partial fill"
                  />
                </MenuItem>

                <MenuItem
                  disableRipple
                  sx={{
                    minHeight: "auto",
                    transition: "none",
                    "&:hover": {
                      backgroundColor: "transparent !important",
                    },
                    "&.Mui-focusVisible, &:focus, &:active": {
                      backgroundColor: "transparent !important",
                      outline: "none",
                      boxShadow: "none",
                      border: "none",
                    },
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={bulkOrder}
                        onChange={handleBulkOrder}
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
                    label="Bulk order"
                  />
                </MenuItem>
              </Menu>
            </FormSettingWrapper>
            <Divider
              orientation="horizontal"
              flexItem
              sx={{ my: 2, backgroundColor: "#D9E1E3" }}
            />
            {/** Order info */}
            <OrderInfoWrapper>
              <OrderInfoHeaderWrapper style={{ marginBottom: "0.5rem" }}>
                <AccountHeader
                  style={{
                    color: "#003543",
                    fontSize: "16px",
                    fontWeight: "800",
                  }}
                >
                  Order Info
                </AccountHeader>
              </OrderInfoHeaderWrapper>
              <OrderInfoTextWrapper>
                <OrderInfoTextWrapper2>
                  <OrderInfoText style={{ color: "#003543" }}>
                    Amount
                  </OrderInfoText>
                </OrderInfoTextWrapper2>
                <OrderInfoTextWrapper2>
                  <OrderInfoText style={{ color: "#003543" }}>
                    {Number(amount).toLocaleString()}
                  </OrderInfoText>
                </OrderInfoTextWrapper2>
              </OrderInfoTextWrapper>

              <OrderInfoTextWrapper>
                <OrderInfoTextWrapper2>
                  <OrderInfoText style={{ color: "#003543" }}>
                    Duration
                  </OrderInfoText>
                </OrderInfoTextWrapper2>
                <OrderInfoTextWrapper2>
                  <OrderInfoText style={{ color: "#003543" }}>
                    {durationValue}
                  </OrderInfoText>
                </OrderInfoTextWrapper2>
              </OrderInfoTextWrapper>

              <OrderInfoTextWrapper>
                <OrderInfoTextWrapper2>
                  <OrderInfoText style={{ color: "#003543" }}>
                    Payout
                  </OrderInfoText>
                </OrderInfoTextWrapper2>

                <OrderInfoTextWrapper2>
                  <OrderInfoText
                    style={{
                      color: "#430E00",
                      fontSize: "20px",
                      fontWeight: "800",
                    }}
                  >
                    {myPrice?.totalPrice.toLocaleString() ?? 0} TRX
                  </OrderInfoText>
                </OrderInfoTextWrapper2>
              </OrderInfoTextWrapper>
            </OrderInfoWrapper>
            <OrderSubmitBtnWrapper>
              <OrderSubmitBtn type="submit">Create Order</OrderSubmitBtn>
            </OrderSubmitBtnWrapper>
          </Form>
        </FormWrapper2>
      </FormWrapper>

      <PopUp2
        open={popupOpen2}
        onClose={() => setPopupOpen2(false)}
        mySwitchBtn={switchBtn}
        myWalletAdd={walletAdd}
        myWalletAddress={walletAdd || (address ?? "")}
        myAmount={amount}
        myDuration={durationNumericValue}
        myNumericSelectedPrice={numericSelectedPrice}
        myTotalPrice={totalPrice}
        myPartialFill={partialFill}
        myBulkOrder={bulkOrder}
        myCurrentDate={currentDate}
        myCurrentTime={currentTime}
        resetForm={() => {
          dispatch(toggleRefresh());
          setAmount("");
          setDurationValue("");
          setInputValue("");
          setAmountError("");
          setDurationError("");
          setPriceError("");
          setPartialFill(true);
          setBulkOrder(false);
        }}
      />
    </>
  );
};

export default OrderFormComponent;
