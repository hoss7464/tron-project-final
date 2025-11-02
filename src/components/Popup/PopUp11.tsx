import React, { useState, useEffect, useRef } from "react";
import { useFetchData } from "../../contexts/FetchDataContext";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  TextField,
  Popper,
  Box,
  Typography,
  Grid,
  ClickAwayListener,
  Divider,
  Slider,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import {
  FormHeaderSwitchWrapper,
  FormHeaderIconWrapper,
  FormIconWrapper,
  FormHeaderWrapper,
  FormAddInputLabelWrapper,
  FormAddLabelWrapper,
  FormAddLabel,
  FormErrorWrapper,
  FormError,
  FormAddInputWrapper,
  FormAddInputIconWrapper,
  FormAddInputWrapper2,
  FormAddInput,
} from "../../pages/mainPage/mainPageElements";
import { AccountInfoResponse } from "../../services/requestService";
import energyIcon from "../../assets/svg/EnergyIcon.svg";
import bandwidthIcon from "../../assets/svg/BandwidthIcon.svg";
import {
  HeroGridCardNumberIconWrapper2,
  HeroGridCardNumberIconWrapper3,
  HeroGridCardNumberIcon,
  HeroGridCardHeader,
} from "../../pages/mainPage/HeroSection/HeroElements";
import { useTronWallet } from "../../contexts/TronWalletContext";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { showNotification } from "../../redux/actions/notifSlice";
import LoadingButtonContent from "../LoadingBtnContent/LoadingBtnContent";
import { serverErrorMessageFunc } from "../../utils/errorFunctions";

interface SettingPopupProps {
  open: boolean;
  onClose: () => void;
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

const PopUp11: React.FC<SettingPopupProps> = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { tradingAccountInfo, resourceData, fetchData } = useFetchData();
  const { isConnectedTrading, accessToken } = useTronWallet();
  const refreshTrigger = useSelector(
    (state: RootState) => state.refresh.refreshTrigger
  );
  //------------------------------------------------
  //satate to store account info data :
  const [info, setInfo] = useState<{
    minDurationBandwidth: number;
    minDurationEnergy: number;
    isActive: boolean;
    minPriceBandwidth: number;
    minPriceEnergy: number;
    minUnitBandwidth: number;
    minUnitEnergy: number;
    profit: number;
  }>({
    minDurationBandwidth: 0,
    minDurationEnergy: 0,
    isActive: false,
    minPriceBandwidth: 0,
    minPriceEnergy: 0,
    minUnitBandwidth: 0,
    minUnitEnergy: 0,
    profit: 0,
  });
  //------------------------------------------------
  //States for energy amount :
  const [energymount, setEnergyAmount] = useState("");
  const [energyAmountError, setEnergyAmountError] = useState("");
  //States for bandwidth amount :
  const [bandwidthmount, setBandwidthAmount] = useState("");
  const [bandwidthAmountError, setBandwidthAmountError] = useState("");
  //States for min max amount :
  const [minAmount, setMinAmount] = useState<{
    energy: number;
    bandwidth: number;
  }>({ energy: 0, bandwidth: 0 });
  const [maxAmount, setMaxAmount] = useState<{
    energy: number;
    bandwidth: number;
  }>({ energy: 0, bandwidth: 0 });
  //------------------------------------------------
  //energy min-duration states :
  const [energyDurationValue, setEnergyDurationValue] = useState("");
  const [energyDurationInSec, setEnergyDurationInSec] = useState<number | null>(
    null
  );
  const [energyOpen, setEnergyOpen] = useState(false);
  const anchorRef1 = useRef<HTMLInputElement | null>(null);
  const [energyDurationError, setEnergyDurationError] = useState("");
  //bandwidth min-duration states :
  const [bandwidthDurationValue, setBandwidthDurationValue] = useState("");
  const [bandwidthDurationInSec, setBandwidthDurationInSec] = useState<
    number | null
  >(null);
  const [bandwidthOpen, setBandwidthOpen] = useState(false);
  const anchorRef2 = useRef<HTMLInputElement | null>(null);
  const [bandwidthDurationError, setBandwidthDurationError] = useState("");
  //------------------------------------------------
  // states for energy price :
  const [energyPrice, setEnergyPrice] = useState("");
  const [energyPriceError, setEnergyPriceError] = useState("");
  // states for bandwidth price :
  const [bandwidthPrice, setBandwidthPrice] = useState("");
  const [bandwidthPriceError, setBandwidthPriceError] = useState("");
  //States for min max price :
  const [minPrice, setMinPrice] = useState<{
    energy: number;
    bandwidth: number;
  }>({ energy: 0, bandwidth: 0 });
  //------------------------------------------------
  //Profit states :
  const [profit, setProfit] = useState<number>(0);
  const [profitValue, setProfitValue] = useState<number>(0);
  //------------------------------------------------
  //states for active sell :
  const [activeSell, setActiveSell] = useState<boolean>(false);
  const [activeSellValue, setActiveSellValue] = useState<boolean>(false);
  //------------------------------------------------
  //State for disabling the button after submitting for 300 ms :
  const [isSubmitting, setIsSubmitting] = useState(false);
  //------------------------------------------------
  //to get axios timeout :
  const axiosTimeOut = Number(process.env.AXIOS_TIME_OUT);
  //------------------------------------------------
  const durationWasManuallyChanged = useRef(false);
  const isUserInput = useRef(false);
  const userEditedRef = useRef(false);
  const initialSetRef = useRef(false);
  //----------------------------------------------------------------------------
  //Function to refresh the data when data changes on database:
  useEffect(() => {
    const refreshData = async () => {
      try {
        await fetchData();
      } catch (error) {
        dispatch(
          showNotification({
            name: "error1",
            message: `${t("Text215")}`,
            severity: "error",
          })
        );
      }
    };

    if (refreshTrigger) {
      refreshData();
    }
  }, [refreshTrigger, fetchData]);
  //Function to get data from resourceData request :
  useEffect(() => {
    if (!resourceData) return;

    if (resourceData?.data?.minAmount) {
      setMinAmount(resourceData.data.minAmount);
    }

    if (resourceData?.data?.maxSellers) {
      setMaxAmount(resourceData.data.maxSellers);
    }

    if (resourceData?.data?.minSellersPrice) {
      setMinPrice(resourceData.data.minSellersPrice);
    }
  }, [resourceData]);
  //Function to get data from accountInfo request :
  useEffect(() => {
    if (!tradingAccountInfo) return;

    const settings = tradingAccountInfo?.data?.settings;
    if (!settings || settings.profit == null) return;

    const newInfo = {
      minDurationBandwidth:
        settings.minDurationBandwidth ?? info.minDurationBandwidth,
      minDurationEnergy: settings.minDurationEnergy ?? info.minDurationEnergy,
      isActive: settings.isActive ?? info.isActive,
      minPriceBandwidth:
        settings.minPriceBandwidth ?? settings.minPriceBandwidth,
      minPriceEnergy: settings.minPriceEnergy ?? settings.minPriceEnergy,
      minUnitBandwidth: settings.minUnitBandwidth ?? settings.minUnitBandwidth,
      minUnitEnergy: settings.minUnitEnergy ?? settings.minUnitEnergy,
      profit: settings.profit ?? info.profit,
    };

    //to store data from server in info state :
    setInfo(newInfo);
    //duration
    setEnergyDurationInSec(settings.minDurationEnergy);
    if (!durationWasManuallyChanged.current && energyDurationInSec !== null) {
      const energyDurationFromSec = getDurationFromSeconds(energyDurationInSec);
      setEnergyDurationValue(energyDurationFromSec);
    }
    setBandwidthDurationInSec(settings.minDurationBandwidth);
    if (
      !durationWasManuallyChanged.current &&
      bandwidthDurationInSec !== null
    ) {
      const bandwidthDurationFromSec = getDurationFromSeconds(
        bandwidthDurationInSec
      );
      setBandwidthDurationValue(bandwidthDurationFromSec);
    }
    //profit
    const percentageProfit = settings.profit * 100;
    setProfitValue(percentageProfit);
    if (!initialSetRef.current || profit === 0) {
      setProfit(percentageProfit);
    }
    //active sell
    setActiveSellValue(settings.isActive);
    if (!userEditedRef.current) {
      setActiveSell(activeSellValue);
    }
  }, [tradingAccountInfo]);
  //----------------------------------------------------------------------------
  //Functions for duration :
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
      return `${t("Text32")}`;
    }
    //valid time between options :
    const validDurations = [
      `15 ${t("Text53")}`,
      `1 ${t("Text55")}`,
      `3 ${t("Text56")}`,
      ...Array.from(
        { length: 30 },
        (_, i) =>
          `${i + 1} ${i + 1 === 1 ? `${t("Text58")}` : `${t("Text59")}`}`
      ),
    ];

    if (!validDurations.includes(trimmed)) {
      return `${t("Text35")}`;
    }
    return "";
  };
  //Function to convert duration in seconds :
  const getDurationInSeconds = (value: string): number | null => {
    const trimmed = value.trim().toLowerCase();

    // Get all possible unit translations
    const minuteUnits = [`${t("Text53")}`.toLowerCase()]; // minutes
    const hourUnits = [
      `${t("Text55")}`.toLowerCase(),
      `${t("Text56")}`.toLowerCase(),
    ]; // hours
    const dayUnits = [
      `${t("Text58")}`.toLowerCase(),
      `${t("Text59")}`.toLowerCase(),
    ]; // days

    // Create regex pattern with all possible units
    const allUnits = [...minuteUnits, ...hourUnits, ...dayUnits];
    const regexPattern = new RegExp(`^(\\d+)\\s*(${allUnits.join("|")})$`);

    const match = trimmed.match(regexPattern);

    if (!match) return null;

    const number = parseInt(match[1], 10);
    const unit = match[2];

    if (minuteUnits.includes(unit)) {
      return number * 60;
    } else if (hourUnits.includes(unit)) {
      return number * 3600;
    } else if (dayUnits.includes(unit)) {
      return number * 86400;
    } else {
      return null;
    }
  };
  //funtion to get duration from seconds :
  // Function to convert seconds to duration string (reverse of getDurationInSeconds)
  const getDurationFromSeconds = (seconds: number): string => {
    if (!seconds || seconds <= 0) return "";

    const minutes = seconds / 60;
    const hours = seconds / 3600;
    const days = seconds / 86400;

    // Check for exact matches with your available options
    if (seconds === 15 * 60) return `15 ${t("Text53")}`;
    if (seconds === 1 * 3600) return `1 ${t("Text55")}`;
    if (seconds === 3 * 3600) return `3 ${t("Text56")}`;

    // Check for days (1-30)
    if (days >= 1 && days <= 30 && Number.isInteger(days)) {
      return `${days} ${days === 1 ? `${t("Text58")}` : `${t("Text59")}`}`;
    }

    // If it doesn't match any of the predefined options, return the closest representation
    // This handles edge cases where you might get unexpected values
    if (days >= 1) {
      const roundedDays = Math.round(days);
      if (roundedDays >= 1 && roundedDays <= 30) {
        return `${roundedDays} ${
          roundedDays === 1 ? `${t("Text58")}` : `${t("Text59")}`
        }`;
      }
    }

    if (hours >= 1) {
      const roundedHours = Math.round(hours);
      if (roundedHours === 1 || roundedHours === 3) {
        return `${roundedHours} ${
          roundedHours === 1 ? `${t("Text55")}` : `${t("Text56")}`
        }`;
      }
    }

    if (minutes === 15) {
      return `15 ${t("Text53")}`;
    }

    // Fallback: return the value in the most appropriate unit
    if (seconds >= 86400) {
      const dayCount = Math.round(seconds / 86400);
      return `${dayCount} ${
        dayCount === 1 ? `${t("Text58")}` : `${t("Text59")}`
      }`;
    } else if (seconds >= 3600) {
      const hourCount = Math.round(seconds / 3600);
      return `${hourCount} ${
        hourCount === 1 ? `${t("Text55")}` : `${t("Text56")}`
      }`;
    } else {
      const minuteCount = Math.round(seconds / 60);
      return `${minuteCount} ${
        minuteCount === 1 ? `${t("Text198")}` : `${t("Text53")}`
      }`;
    }
  };
  //Function for click on energy min-duration:
  const handleOptionClick1 = (value: string) => {
    setEnergyDurationValue(value);

    setEnergyOpen(false);
    anchorRef1.current?.blur();

    const errorMessage = validateDuration(value);
    setEnergyDurationError(errorMessage);

    durationWasManuallyChanged.current = true;
  };

  //Function for click on energy min-duration:
  const handleOptionClick2 = (value: string) => {
    setBandwidthDurationValue(value);

    setBandwidthOpen(false);
    anchorRef2.current?.blur();

    const errorMessage = validateDuration(value);
    setBandwidthDurationError(errorMessage);

    durationWasManuallyChanged.current = true;
  };

  useEffect(() => {
    isUserInput.current = false;
  }, []);

  //--------------------------------------------------------------------------------------
  //useEffect for showing data in initial rendering :
  useEffect(() => {
    // Only update from server if user hasn't started typing
    if (!isUserInput.current) {
      setEnergyAmount(info.minUnitEnergy.toString());
      setBandwidthAmount(info.minUnitBandwidth.toString());
      setEnergyPrice(info.minPriceEnergy.toString());
      setBandwidthPrice(info.minPriceBandwidth.toString());
    }
  }, [info]);
  //--------------------------------------------------------------------------------------
  //Function for energy amount validation :
  const validateEnergyAmount = (
    rawValue: string,
    minAmount: { energy: number; bandwidth: number },
    maxAmount: { energy: number; bandwidth: number }
  ) => {
    const numericValue = Number(rawValue.replace(/,/g, ""));

    if (rawValue.trim() === "") {
      return `${t("Text32")}`;
    } else if (isNaN(numericValue)) {
      return `${t("Text32")}`;
    }

    if (numericValue < minAmount.energy) {
      return `> ${minAmount.energy}`;
    } else if (numericValue > maxAmount.energy) {
      return `< ${maxAmount.energy}`;
    }
    return "";
  };
  //Function for energy change :
  const amountHandleChange1 = (
    value: string | React.ChangeEvent<HTMLInputElement>
  ) => {
    let rawValue = typeof value === "string" ? value : value.target.value;

    // Mark as user input
    isUserInput.current = true;

    //Allow commas for display but store as numeric
    const numericValue = Number(rawValue.replace(/,/g, ""));

    // You may also validate here if needed
    if (!isNaN(numericValue)) {
      setEnergyAmount(numericValue.toString()); // just display it as a string
    }

    // Validate input
    const errorMessage = validateEnergyAmount(rawValue, minAmount, maxAmount);
    setEnergyAmountError(errorMessage);
  };
  //Function for bandwidth amount validation :
  const validateBandwidthAmount = (
    rawValue: string,
    minAmount: { energy: number; bandwidth: number },
    maxAmount: { energy: number; bandwidth: number }
  ) => {
    const numericValue = Number(rawValue.replace(/,/g, ""));

    if (rawValue.trim() === "") {
      return `${t("Text32")}`;
    } else if (isNaN(numericValue)) {
      return `${t("Text32")}`;
    }

    if (numericValue < minAmount.bandwidth) {
      return `> ${minAmount.bandwidth}`;
    } else if (numericValue > maxAmount.bandwidth) {
      return `< ${maxAmount.bandwidth}`;
    }
    return "";
  };
  //Function for bandwidth change :
  const amountHandleChange2 = (
    value: string | React.ChangeEvent<HTMLInputElement>
  ) => {
    let rawValue = typeof value === "string" ? value : value.target.value;

    // Mark as user input
    isUserInput.current = true;

    //Allow commas for display but store as numeric
    const numericValue = Number(rawValue.replace(/,/g, ""));

    // You may also validate here if needed
    if (!isNaN(numericValue)) {
      setBandwidthAmount(numericValue.toString()); // just display it as a string
    }

    // Validate input
    const errorMessage = validateBandwidthAmount(
      rawValue,
      minAmount,
      maxAmount
    );
    setBandwidthAmountError(errorMessage);
  };
  //----------------------------------------------------------------------------
  //Function for energy price validation :
  const maxPriceValue = Number(process.env.REACT_APP_SELLERS_SETTING_MAX_PRICE);
  const validateEnergyPrice = (
    rawValue: string,
    minAmount: { energy: number; bandwidth: number }
  ) => {
    const numericValue = Number(rawValue.replace(/,/g, ""));

    if (rawValue.trim() === "") {
      return `${t("Text32")}`;
    } else if (isNaN(numericValue)) {
      return `${t("Text32")}`;
    }

    if (numericValue < minPrice.energy) {
      return `> ${minPrice.energy}`;
    } else if (numericValue > maxPriceValue) {
      return `< ${maxPriceValue}`;
    }
    return "";
  };
  //Function for energy change :
  const priceHandleChange1 = (
    value: string | React.ChangeEvent<HTMLInputElement>
  ) => {
    let rawValue = typeof value === "string" ? value : value.target.value;

    // Mark as user input
    isUserInput.current = true;

    //Allow commas for display but store as numeric
    const numericValue = Number(rawValue.replace(/,/g, ""));

    // You may also validate here if needed
    if (!isNaN(numericValue)) {
      setEnergyPrice(numericValue.toString()); // just display it as a string
    }

    // Validate input
    const errorMessage = validateEnergyPrice(rawValue, minPrice);
    setEnergyPriceError(errorMessage);
  };
  //Function for bandwidth price validation :
  const validateBandwidthPrice = (
    rawValue: string,
    minAmount: { energy: number; bandwidth: number }
  ) => {
    const numericValue = Number(rawValue.replace(/,/g, ""));

    if (rawValue.trim() === "") {
      return `${t("Text32")}`;
    } else if (isNaN(numericValue)) {
      return `${t("Text32")}`;
    }

    if (numericValue < minPrice.bandwidth) {
      return `> ${minPrice.bandwidth}`;
    } else if (numericValue > maxPriceValue) {
      return `< ${maxPriceValue}`;
    }
    return "";
  };
  //Function for bandwidth change :
  const priceHandleChange2 = (
    value: string | React.ChangeEvent<HTMLInputElement>
  ) => {
    let rawValue = typeof value === "string" ? value : value.target.value;

    // Mark as user input
    isUserInput.current = true;

    //Allow commas for display but store as numeric
    const numericValue = Number(rawValue.replace(/,/g, ""));

    // You may also validate here if needed
    if (!isNaN(numericValue)) {
      setBandwidthPrice(numericValue.toString()); // just display it as a string
    }

    // Validate input
    const errorMessage = validateBandwidthPrice(rawValue, minPrice);
    setBandwidthPriceError(errorMessage);
  };
  //----------------------------------------------------------------------------
  //Function for profit :
  const handleProfitChange = (_event: Event, newValue: number) => {
    const value = newValue;

    initialSetRef.current = true;

    if (value <= profitValue) {
      setProfit(value);
    } else {
      setProfit(profitValue);
    }
  };
  //----------------------------------------------------------------------------
  //Function for active sell :
  const handleActiveSellChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    userEditedRef.current = true;
    let activeValue = event.target.checked;
    setActiveSell(activeValue);
  };
  //----------------------------------------------------------------------------
  //Function to close the popup :
  const handleCloseSetting = () => {
    if (tradingAccountInfo?.data === undefined) {
      return;
    }
    setEnergyDurationValue(
      getDurationFromSeconds(tradingAccountInfo.data.settings.minDurationEnergy)
    );
    setEnergyDurationError("");
    setBandwidthDurationValue(
      getDurationFromSeconds(
        tradingAccountInfo.data.settings.minDurationBandwidth
      )
    );
    setBandwidthDurationError("");

    setEnergyAmount(tradingAccountInfo.data.settings.minUnitEnergy.toString());
    setEnergyAmountError("");
    setBandwidthAmount(
      tradingAccountInfo.data.settings.minUnitBandwidth.toString()
    );
    setBandwidthAmountError("");

    setEnergyPrice(tradingAccountInfo.data.settings.minPriceEnergy.toString());
    setEnergyPriceError("");
    setBandwidthPrice(
      tradingAccountInfo.data.settings.minPriceBandwidth.toString()
    );
    setBandwidthPriceError("");

    setProfit(tradingAccountInfo?.data.settings.profit * 100);
    setActiveSell(tradingAccountInfo?.data.settings.isActive);

    onClose();
  };
  //----------------------------------------------------------------------------
  //Function for submit data :
  const handleSettingSubmit = async () => {
    if (
      energyDurationError ||
      bandwidthDurationError ||
      energyAmountError ||
      bandwidthAmountError ||
      energyPriceError ||
      bandwidthPriceError
    ) {
      return;
    }
    const energyDurationSec = getDurationInSeconds(energyDurationValue);
    const bandWidthDurationSec = getDurationInSeconds(bandwidthDurationValue);
    // Disable the button immediately
    setIsSubmitting(true);

    //base url :
    const baseURL = process.env.REACT_APP_BASE_URL;

    const settingPayload = {
      energyDurationSec: energyDurationSec,
      bandwidthDurationSec: bandWidthDurationSec,
      energyAmount: Number(energymount),
      bandwidthAmount: Number(bandwidthmount),
      energyPrice: Number(energyPrice),
      bandwidthPrice: Number(bandwidthPrice),
      profit: profit / 100,
      isActive: activeSell,
    };
    try {
      const settingResponse = await axios.post<AccountInfoResponse>(
        `${baseURL}/Buyer/updateAccountInfo`,
        settingPayload,
        {
          headers: {
            "Content-Type": "application/json",
            accesstoken: accessToken,
          },
          timeout: axiosTimeOut,
          validateStatus: (status: number) => status < 550,
        }
      );
      if (settingResponse.data.success === false) {
        if (settingResponse.data.code === undefined) {
          return 
        }
        const serverError = serverErrorMessageFunc(settingResponse.data.code)
        dispatch(
          showNotification({
            name: "setting-error1",
            message: `${serverError}`,
            severity: "error",
          })
        );
        return;
      } else {
        dispatch(
          showNotification({
            name: "form1-success",
            message: `${t("Text271")}`,
            severity: "success",
          })
        );
        onClose();
        return;
      }
    } catch (error) {
      dispatch(
        showNotification({
          name: "setting-error2",
          message: `${t("Text222")}`,
          severity: "error",
        })
      );
      return;
    } finally {
      // Re-enable the button after 300ms
      setTimeout(() => {
        setIsSubmitting(false);
      }, 300);
    }
  };
  //----------------------------------------------------------------------------
  useEffect(() => {
    if (isConnectedTrading === false) {
      handleCloseSetting();
    }
  }, [isConnectedTrading, handleCloseSetting]);
  return (
    <>
      <Dialog
        open={open}
        onClose={(event, reason) => {
          // Only close if the reason is not 'backdropClick'
          if (reason !== "backdropClick" && !isSubmitting) {
            handleCloseSetting();
          }
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
            "@media (max-width: 600px)": {
              margin: "0.5rem",
            },
            zIndex: 2000,
            marginTop: "5rem",
          },
        }}
      >
        <DialogContent sx={{ p: 1 }}>
          <Box>
            {/** energy header */}
            <FormHeaderSwitchWrapper>
              <FormHeaderIconWrapper>
                <FormIconWrapper>
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
                </FormIconWrapper>
                <FormHeaderWrapper>
                  <HeroGridCardHeader style={{ color: "#003543" }}>
                    {t("Text6")}
                  </HeroGridCardHeader>
                </FormHeaderWrapper>
              </FormHeaderIconWrapper>
            </FormHeaderSwitchWrapper>
            <Box>
              {/** energy min-duration */}
              <FormAddInputLabelWrapper style={{ marginBottom: "0" }}>
                <FormAddLabelWrapper>
                  <FormAddLabel>{t("Text199")}</FormAddLabel>
                  {energyDurationError && (
                    <FormErrorWrapper>
                      <FormError>{energyDurationError}</FormError>
                    </FormErrorWrapper>
                  )}
                </FormAddLabelWrapper>
                <FormControl fullWidth style={{ marginBottom: "0.5rem" }}>
                  <ClickAwayListener onClickAway={() => setEnergyOpen(false)}>
                    <Box>
                      <TextField
                        placeholder={`${t("Text50")}`}
                        value={energyDurationValue}
                        onChange={(e) => setEnergyDurationValue(e.target.value)}
                        onFocus={() => setEnergyOpen(true)}
                        inputRef={anchorRef1}
                        onBlur={() =>
                          setEnergyDurationError(
                            validateDuration(energyDurationValue)
                          )
                        }
                        fullWidth
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            height: "33px",
                            border: "2px solid #D9E1E3",
                            backgroundColor: "#ffffff",
                            color: "#003543",
                            borderRadius: "8px",

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
                        open={energyOpen}
                        anchorEl={anchorRef1.current}
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
                          <Typography fontWeight="bold">
                            {t("Text52")}
                          </Typography>
                          <Grid container spacing={1} mb={2}>
                            {minutes.map((min) => (
                              <Grid key={min}>
                                <Box
                                  sx={boxStyle}
                                  onClick={(e) => {
                                    e.stopPropagation(); // prevent triggering events on other components
                                    handleOptionClick1(`${min} ${t("Text53")}`);
                                  }}
                                >
                                  {min}
                                </Box>
                              </Grid>
                            ))}
                          </Grid>
                          <Typography fontWeight="bold">
                            {t("Text54")}
                          </Typography>
                          <Grid container spacing={1} mb={2}>
                            {hours.map((hr) => (
                              <Grid key={hr}>
                                <Box
                                  sx={boxStyle}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleOptionClick1(
                                      `${hr} ${
                                        hr === 1
                                          ? `${t("Text55")}`
                                          : `${t("Text56")}`
                                      }`
                                    );
                                  }}
                                >
                                  {hr}
                                </Box>
                              </Grid>
                            ))}
                          </Grid>
                          <Typography fontWeight="bold">
                            {t("Text57")}
                          </Typography>
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
                                    handleOptionClick1(
                                      `${day} ${
                                        day === 1
                                          ? `${t("Text58")}`
                                          : `${t("Text59")}`
                                      }`
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

              <Grid container spacing={1}>
                {/** energy min-amount */}
                <Grid size={{ xs: 6, sm: 6, md: 6, lg: 6 }}>
                  <FormAddInputLabelWrapper>
                    <FormAddLabelWrapper>
                      <FormAddLabel>{t("Text200")}</FormAddLabel>
                      {energyAmountError && (
                        <FormErrorWrapper>
                          <FormError>{energyAmountError}</FormError>
                        </FormErrorWrapper>
                      )}
                    </FormAddLabelWrapper>
                    <FormAddInputWrapper style={{ borderRadius: "8px" }}>
                      <FormAddInputIconWrapper>
                        <FormAddInputWrapper2 style={{ height: "20px" }}>
                          <FormAddInput
                            style={{ fontSize: "16px", marginLeft: "0.5rem" }}
                            value={Number(energymount).toLocaleString()}
                            onChange={amountHandleChange1}
                          />
                        </FormAddInputWrapper2>
                      </FormAddInputIconWrapper>
                    </FormAddInputWrapper>
                  </FormAddInputLabelWrapper>
                </Grid>
                {/** energy min-price */}
                <Grid size={{ xs: 6, sm: 6, md: 6, lg: 6 }}>
                  <FormAddInputLabelWrapper>
                    <FormAddLabelWrapper>
                      <FormAddLabel>{t("Text201")}</FormAddLabel>
                      {energyPriceError && (
                        <FormErrorWrapper>
                          <FormError>{energyPriceError}</FormError>
                        </FormErrorWrapper>
                      )}
                    </FormAddLabelWrapper>
                    <FormAddInputWrapper style={{ borderRadius: "8px" }}>
                      <FormAddInputIconWrapper>
                        <FormAddInputWrapper2 style={{ height: "20px" }}>
                          <FormAddInput
                            style={{ fontSize: "16px", marginLeft: "0.5rem" }}
                            value={Number(energyPrice).toLocaleString()}
                            onChange={priceHandleChange1}
                          />
                        </FormAddInputWrapper2>
                      </FormAddInputIconWrapper>
                    </FormAddInputWrapper>
                  </FormAddInputLabelWrapper>
                </Grid>
              </Grid>
            </Box>
          </Box>

          <Box>
            {/**bandwith energy header */}
            <FormHeaderSwitchWrapper>
              <FormHeaderIconWrapper>
                <FormIconWrapper>
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
                </FormIconWrapper>
                <FormHeaderWrapper>
                  <HeroGridCardHeader style={{ color: "#430E00" }}>
                    {t("Text9")}
                  </HeroGridCardHeader>
                </FormHeaderWrapper>
              </FormHeaderIconWrapper>
            </FormHeaderSwitchWrapper>
            <Box>
              {/** bandwidth min-duration */}
              <FormAddInputLabelWrapper style={{ marginBottom: "0" }}>
                <FormAddLabelWrapper>
                  <FormAddLabel>{t("Text199")}</FormAddLabel>
                  {bandwidthDurationError && (
                    <FormErrorWrapper>
                      <FormError>{bandwidthDurationError}</FormError>
                    </FormErrorWrapper>
                  )}
                </FormAddLabelWrapper>
                <FormControl fullWidth style={{ marginBottom: "0.5rem" }}>
                  <ClickAwayListener
                    onClickAway={() => setBandwidthOpen(false)}
                  >
                    <Box>
                      <TextField
                        placeholder={`${t("Text50")}`}
                        value={bandwidthDurationValue}
                        onChange={(e) =>
                          setBandwidthDurationValue(e.target.value)
                        }
                        onFocus={() => setBandwidthOpen(true)}
                        inputRef={anchorRef2}
                        onBlur={() =>
                          setBandwidthDurationError(
                            validateDuration(bandwidthDurationValue)
                          )
                        }
                        fullWidth
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            height: "33px",
                            border: "2px solid #D9E1E3",
                            backgroundColor: "#ffffff",
                            color: "#003543",
                            borderRadius: "8px",

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
                        open={bandwidthOpen}
                        anchorEl={anchorRef2.current}
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
                          <Typography fontWeight="bold">
                            {t("Text52")}
                          </Typography>
                          <Grid container spacing={1} mb={2}>
                            {minutes.map((min) => (
                              <Grid key={min}>
                                <Box
                                  sx={boxStyle}
                                  onClick={(e) => {
                                    e.stopPropagation(); // prevent triggering events on other components
                                    handleOptionClick2(`${min} ${t("Text53")}`);
                                  }}
                                >
                                  {min}
                                </Box>
                              </Grid>
                            ))}
                          </Grid>
                          <Typography fontWeight="bold">
                            {t("Text54")}
                          </Typography>
                          <Grid container spacing={1} mb={2}>
                            {hours.map((hr) => (
                              <Grid key={hr}>
                                <Box
                                  sx={boxStyle}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleOptionClick2(
                                      `${hr} ${
                                        hr === 1
                                          ? `${t("Text55")}`
                                          : `${t("Text56")}`
                                      }`
                                    );
                                  }}
                                >
                                  {hr}
                                </Box>
                              </Grid>
                            ))}
                          </Grid>
                          <Typography fontWeight="bold">
                            {t("Text57")}
                          </Typography>
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
                                    handleOptionClick2(
                                      `${day} ${
                                        day === 1
                                          ? `${t("Text58")}`
                                          : `${t("Text59")}`
                                      }`
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

              <Grid container spacing={1}>
                {/** bandwidth min-amount */}
                <Grid size={{ xs: 6, sm: 6, md: 6, lg: 6 }}>
                  <FormAddInputLabelWrapper>
                    <FormAddLabelWrapper>
                      <FormAddLabel>{t("Text200")}</FormAddLabel>
                      {bandwidthAmountError && (
                        <FormErrorWrapper>
                          <FormError>{bandwidthAmountError}</FormError>
                        </FormErrorWrapper>
                      )}
                    </FormAddLabelWrapper>
                    <FormAddInputWrapper style={{ borderRadius: "8px" }}>
                      <FormAddInputIconWrapper>
                        <FormAddInputWrapper2 style={{ height: "20px" }}>
                          <FormAddInput
                            style={{ fontSize: "16px", marginLeft: "0.5rem" }}
                            value={Number(bandwidthmount).toLocaleString()}
                            onChange={amountHandleChange2}
                          />
                        </FormAddInputWrapper2>
                      </FormAddInputIconWrapper>
                    </FormAddInputWrapper>
                  </FormAddInputLabelWrapper>
                </Grid>
                {/** bandwidth min-price */}
                <Grid size={{ xs: 6, sm: 6, md: 6, lg: 6 }}>
                  <FormAddInputLabelWrapper>
                    <FormAddLabelWrapper>
                      <FormAddLabel>{t("Text201")}</FormAddLabel>
                      {bandwidthPriceError && (
                        <FormErrorWrapper>
                          <FormError>{bandwidthPriceError}</FormError>
                        </FormErrorWrapper>
                      )}
                    </FormAddLabelWrapper>
                    <FormAddInputWrapper style={{ borderRadius: "8px" }}>
                      <FormAddInputIconWrapper>
                        <FormAddInputWrapper2 style={{ height: "20px" }}>
                          <FormAddInput
                            style={{ fontSize: "16px", marginLeft: "0.5rem" }}
                            value={Number(bandwidthPrice).toLocaleString()}
                            onChange={priceHandleChange2}
                          />
                        </FormAddInputWrapper2>
                      </FormAddInputIconWrapper>
                    </FormAddInputWrapper>
                  </FormAddInputLabelWrapper>
                </Grid>
              </Grid>
              <Divider
                orientation="horizontal"
                flexItem
                sx={{ my: 1, backgroundColor: "#D9E1E3" }}
              />
              <Grid container spacing={1}>
                {/** profit */}
                <Grid size={{ xs: 6, sm: 6, md: 6, lg: 6 }}>
                  <FormAddInputLabelWrapper
                    style={{ marginBottom: "0", marginTop: "0.6rem" }}
                  >
                    <FormAddLabelWrapper
                      style={{ width: "100%", justifyContent: "space-between" }}
                    >
                      <FormAddLabel>{t("Text202")}</FormAddLabel>
                      <FormAddLabel>{profit} %</FormAddLabel>
                    </FormAddLabelWrapper>
                    <Slider
                      size="small"
                      value={profit}
                      onChange={handleProfitChange}
                      aria-label="Small"
                      valueLabelDisplay="auto"
                      min={0}
                      max={100}
                      sx={{
                        "& .MuiSlider-valueLabel": {
                          backgroundColor: "#430E00",
                        },

                        "& .MuiSlider-track": {
                          backgroundColor: "#003543",
                        },

                        "& .MuiSlider-rail": {
                          backgroundColor: "#003543",
                        },

                        "& .MuiSlider-thumb": {
                          backgroundColor: "#430E00",

                          width: 16,
                          height: 16,
                          "&:hover, &.Mui-focusVisible, &.Mui-active": {
                            boxShadow: "none",
                          },
                        },
                      }}
                    />
                  </FormAddInputLabelWrapper>
                </Grid>
                {/** active sell */}
                <Grid size={{ xs: 6, sm: 6, md: 6, lg: 6 }}>
                  <FormAddInputLabelWrapper style={{ alignItems: "flex-end" }}>
                    <FormControlLabel
                      sx={{
                        marginTop: "1.2rem",
                        marginLeft: "1rem",
                      }}
                      control={
                        <Checkbox
                          checked={activeSell}
                          onChange={handleActiveSellChange}
                          sx={{
                            color: "#430E00",
                            "&.Mui-checked": {
                              color: "#430E00",
                            },
                            "& .MuiSvgIcon-root": {
                              fontSize: 26,
                            },
                            marginTop: "-2px",
                          }}
                        />
                      }
                      label={`${t("Text203")}`}
                    />
                  </FormAddInputLabelWrapper>
                </Grid>
              </Grid>
            </Box>
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
            onClick={handleSettingSubmit}
            variant="contained"
            sx={{
              backgroundColor: "#430E00",
              borderRadius: "10px",
              "&.Mui-disabled": {
                backgroundColor: "#430E00", // Keep the same background color when disabled
                color: "white",
              },
            }}
          >
            {" "}
            <LoadingButtonContent
              loading={isSubmitting}
              loadingText={`${t("Text162")}...`}
              normalText={`${t("Text204")}`}
            />
          </Button>
          <Button
            fullWidth
            onClick={handleCloseSetting}
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
          >
            {t("Text100")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default React.memo(PopUp11);
