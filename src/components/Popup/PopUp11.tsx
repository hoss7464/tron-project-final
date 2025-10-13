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
  ToggleButton,
  ToggleButtonGroup,
  Checkbox,
  FormControlLabel,
  Menu,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Popup2HeaderWrapper, Popup2Header } from "./PopUpElements";
import {
  Form,
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
} from "../../pages/mainPage/mainPageElements";
import { Popup11Icon } from "./PopUpElements";
import { AccountInfoResponse } from "../../services/requestService";
import energyIcon from "../../assets/svg/EnergyIcon.svg";
import bandwidthIcon from "../../assets/svg/BandwidthIcon.svg";
import {
  LegacyCardIconWrapper1,
  LegacyCardIconWrapper2,
  LegacyCardIconWrapper3,
} from "../../pages/mainPage/LegacySection/LegacyElements";
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
import Autocomplete from "@mui/material/Autocomplete";
import { useLocation } from "react-router-dom";
import LoadingButtonContent from "../LoadingBtnContent/LoadingBtnContent";

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
//Custom switch btn 1:
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

const PopUp11: React.FC<SettingPopupProps> = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const { tradingAccountInfo, resourceData, fetchData } = useFetchData();
  const { isConnectedTrading, address, accessToken } = useTronWallet();
  const refreshTrigger = useSelector(
    (state: RootState) => state.refresh.refreshTrigger
  );
  //Switch button states:
  const [switchBtn, setSwitchBtn] = useState<string | null>("energy");
  //Amount input states:
  const [amount, setAmount] = useState("");
  const [minAmount, setMinAmount] = useState<{
    energy: number;
    bandwidth: number;
  }>({ energy: 0, bandwidth: 0 });
  const [maxAmount, setMaxAmount] = useState<{
    energy: number;
    bandwidth: number;
  }>({ energy: 0, bandwidth: 0 });
  const [info, setInfo] = useState<{
    duration: number;
    isActive: boolean;
    minPriceBandwidth: number;
    minPriceEnergy: number;
    minUnitBandwidth: number;
    minUnitEnergy: number;
    profit: number;
  }>({
    duration: 0,
    isActive: false,
    minPriceBandwidth: 0,
    minPriceEnergy: 0,
    minUnitBandwidth: 0,
    minUnitEnergy: 0,
    profit: 0,
  });
  const [amountError, setAmountError] = useState("");
  //Duration dropdown states :
  const [durationValue, setDurationValue] = useState("");
  const [durationInSec, setDurationInSec] = useState<number | null>(2592000);
  const [myOpen, setMyOpen] = useState(false);
  const anchorRef = useRef<HTMLInputElement | null>(null); //to get a refrence to the actual dom node
  const [durationError, setDurationError] = useState("");
  //price states :
  const [price, setPrice] = useState("");
  const [priceError, setPriceError] = useState("");
  const [priceValue, setPriceValue] = useState<{
    energy: number;
    bandwidth: number;
  }>({ energy: 0, bandwidth: 0 });
  //Profit states :
  const [profit, setProfit] = useState<number>(0);
  const [profitValue, setProfitValue] = useState<number>(0);
  //states for active sell :
  const [activeSell, setActiveSell] = useState<boolean>(false);
  const [activeSellValue, setActiveSellValue] = useState<boolean>(false);
  //State for disabling the button after submitting for 300 ms :
  const [isSubmitting, setIsSubmitting] = useState(false);
  //to get axios timeout :
  const axiosTimeOut = Number(process.env.AXIOS_TIME_OUT);

  const durationWasManuallyChanged = useRef(false);
  const isUserInput = useRef(false);
  const userEditedRef = useRef(false);
  const initialSetRef = useRef(false);
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
    setAmountError("");
    setDurationError("");
  };
  //----------------------------------------------------------------------------
  //Function to refresh the data when data changes on database:
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
      setPriceValue(resourceData.data.minSellersPrice);
    }
  }, [resourceData]);
  //Function to get data from accountInfo request :
  useEffect(() => {
    if (!tradingAccountInfo) return;

    const settings = tradingAccountInfo?.data?.settings;
    if (!settings || settings.profit == null) return;

    const newInfo = {
      duration: settings.duration ?? info.duration,
      isActive: settings.isActive ?? info.isActive,
      minPriceBandwidth:
        settings.minPriceBandwidth ?? settings.minPriceBandwidth,
      minPriceEnergy: settings.minPriceEnergy ?? settings.minPriceEnergy,
      minUnitBandwidth: settings.minUnitBandwidth ?? settings.minUnitBandwidth,
      minUnitEnergy: settings.minUnitEnergy ?? settings.minUnitEnergy,
      profit: settings.profit ?? info.profit,
    };

    // set info from server
    setInfo(newInfo);

    const percentageProfit = settings.profit * 100;
    setProfitValue(percentageProfit);

    if (!initialSetRef.current || profit === 0) {
      setProfit(percentageProfit);
    }

    setActiveSellValue(settings.isActive)
    if (userEditedRef.current) {
      setActiveSell(activeSellValue)
    }
    
  }, [tradingAccountInfo]);
  //--------------------------------------------------------------------------------------
  //Amount input functions :
  useEffect(() => {
    isUserInput.current = false;
  }, [switchBtn]);

  useEffect(() => {
    // Only update from server if user hasn't started typing
    if (!isUserInput.current) {
      if (switchBtn === "energy") {
        setAmount(info.minUnitEnergy.toString());
      } else {
        setAmount(info.minUnitBandwidth.toString());
      }
    }
  }, [switchBtn, info]);
  //Function for amount validation :
  const validateAmount = (
    rawValue: string,
    switchBtn: string | null,
    minAmount: { energy: number; bandwidth: number },
    maxAmount: { energy: number; bandwidth: number }
  ) => {
    const numericValue = Number(rawValue.replace(/,/g, ""));

    if (rawValue.trim() === "") {
      return "required";
    } else if (isNaN(numericValue)) {
      return "required";
    }

    if (switchBtn === "energy") {
      if (numericValue < minAmount.energy) {
        return `Less than ${minAmount.energy}`;
      } else if (numericValue > maxAmount.energy) {
        return `More than ${maxAmount.energy}`;
      }
    } else if (switchBtn === "bandwidth") {
      if (numericValue < minAmount.bandwidth) {
        return `Less than ${minAmount.bandwidth}`;
      } else if (numericValue > maxAmount.bandwidth) {
        return `More than ${maxAmount.bandwidth}`;
      }
    } else {
    }

    return "";
  };
  const amountHandleChange = (
    value: string | React.ChangeEvent<HTMLInputElement>
  ) => {
    let rawValue = typeof value === "string" ? value : value.target.value;

    // Mark as user input
    isUserInput.current = true;

    //Allow commas for display but store as numeric
    const numericValue = Number(rawValue.replace(/,/g, ""));

    // You may also validate here if needed
    if (!isNaN(numericValue)) {
      setAmount(numericValue.toString()); // just display it as a string
    }

    // Validate input
    const errorMessage = validateAmount(
      rawValue,
      switchBtn,
      minAmount,
      maxAmount
    );
    setAmountError(errorMessage);
  };

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

    setMyOpen(false);
    anchorRef.current?.blur();

    const errorMessage = validateDuration(value);
    setDurationError(errorMessage);

    durationWasManuallyChanged.current = true;
  };
  //----------------------------------------------------------------------------
  //Functions for price :
  useEffect(() => {
    isUserInput.current = false;

    const defaultDuration = "30 days";
    const durationInSeconds = getDurationInSeconds(defaultDuration);

    // Set duration immediately
    setDurationValue(defaultDuration);
    setDurationInSec(durationInSeconds);
  }, [switchBtn]);

  useEffect(() => {
    // Only update from server if user hasn't started typing
    if (!isUserInput.current) {
      if (switchBtn === "energy") {
        setPrice(priceValue.energy.toString());
      } else {
        setPrice(priceValue.bandwidth.toString());
      }
    }
  }, [switchBtn, priceValue]);

  const maxPriceValue = Number(process.env.REACT_APP_SELLERS_SETTING_MAX_PRICE);
  const priceValidation = (
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

    console.log(maxPriceValue);
    if (switchBtn === "energy") {
      if (numericValue < priceValue.energy) {
        return `< ${priceValue.energy}`;
      } else if (numericValue > maxPriceValue) {
        return `> ${maxPriceValue}`;
      } else {
      }
    } else {
      if (numericValue < priceValue.bandwidth) {
        return `< ${priceValue.bandwidth}`;
      } else if (numericValue > maxPriceValue) {
        return `> ${maxPriceValue}`;
      } else {
      }
    }

    return "";
  };
  const handlePriceChange = (
    value: string | React.ChangeEvent<HTMLInputElement>
  ) => {
    let rawValue = typeof value === "string" ? value : value.target.value;

    // Mark as user input
    isUserInput.current = true;

    //Allow commas for display but store as numeric
    const numericValue = Number(rawValue.replace(/,/g, ""));

    // You may also validate here if needed
    if (!isNaN(numericValue)) {
      setPrice(rawValue); // just display it as a string
    }

    // Validate input
    const errorMessage = priceValidation(rawValue, switchBtn, priceValue);
    setPriceError(errorMessage);
  };
  //----------------------------------------------------------------------------
  //Function for profit component:
  useEffect(() => {
    initialSetRef.current = false;
  }, [switchBtn]);
  // Slider change handler
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
    initialSetRef.current = true;
    let activeValue = event.target.checked;
    setActiveSell(activeValue);
  };
  //----------------------------------------------------------------------------

  //Function to close the popup :
  const handleCloseSetting = () => {
    onClose();
    setSwitchBtn("energy");
    if (switchBtn === "energy") {
      setAmount(info.minUnitEnergy.toString());
      setPrice(priceValue.energy.toString());
    } else {
      setAmount(info.minUnitBandwidth.toString());
      setPrice(priceValue.bandwidth.toString());
    }

    isUserInput.current = false;

    const defaultDuration = "30 days";
    const durationInSeconds = getDurationInSeconds(defaultDuration);

    // Set duration immediately
    setDurationValue(defaultDuration);
    setDurationInSec(durationInSeconds);
    setProfit(0);
    setActiveSell(info.isActive)
  };
  //----------------------------------------------------------------------------
  //Function for submit data :
  const handleSettingSubmit = async () => {
    if (amountError || durationError || priceError) {
      return;
    }

    // Disable the button immediately
    setIsSubmitting(true);

    //base url :
    const baseURL = process.env.REACT_APP_BASE_URL;

    const settingPayload = {
      resourceType: switchBtn,
      requester: address,
      resourceAmount: Number(amount),
      durationSec: Number(durationInSec),
      price: Number(price),
      isActive: activeSell,
    };
    console.log(settingPayload)

    try {
      const settingResponse = await axios.post<AccountInfoResponse>(
        ``,
        settingPayload,
        {
          headers: {
            "Content-Type": "application/json",
            accesstoken: accessToken,
          },
          timeout: axiosTimeOut,
          validateStatus: (status: number) => status < 500,
        }
      );
      if (settingResponse.data.success === false) {
        dispatch(
          showNotification({
            name: "setting-error1",
            message: "Error in sending data.",
            severity: "error",
          })
        );
        return;
      } else {
        dispatch(
          showNotification({
            name: "form1-success",
            message: "Data has been sent successfully.",
            severity: "success",
          })
        );
        handleCloseSetting();
        return;
      }
    } catch (error) {
      dispatch(
        showNotification({
          name: "setting-error2",
          message: `${error}`,
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
            zIndex: 2000,
          },
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
                  Energy
                </HeroGridCardHeader>
              ) : (
                <HeroGridCardHeader style={{ color: "#003543" }}>
                  Bandwidth
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
              <CustomToggleButton value="energy">Energy</CustomToggleButton>
              <CustomToggleButton value="bandwidth">
                Bandwidth
              </CustomToggleButton>
            </ToggleButtonGroup>
          </FormSwitchWrapper>
        </FormHeaderSwitchWrapper>
        <DialogContent>
          {/*min-amount component */}
          <FormAddInputLabelWrapper>
            <FormAddLabelWrapper>
              <FormAddLabel>Min-Amount</FormAddLabel>
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
          </FormAddInputLabelWrapper>
          {/*min-duration component */}
          <FormAddInputLabelWrapper style={{ marginBottom: "0" }}>
            <FormAddLabelWrapper>
              <FormAddLabel>Min-Duration</FormAddLabel>
              {durationError && (
                <FormErrorWrapper>
                  <FormError>{durationError}</FormError>
                </FormErrorWrapper>
              )}
            </FormAddLabelWrapper>
            <FormControl fullWidth style={{ marginBottom: "0.5rem" }}>
              <ClickAwayListener onClickAway={() => setMyOpen(false)}>
                <Box>
                  <TextField
                    placeholder="Duration"
                    value={durationValue}
                    onChange={(e) => setDurationValue(e.target.value)}
                    onFocus={() => setMyOpen(true)}
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
                    open={myOpen}
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
          {/*min-price component */}
          <FormAddInputLabelWrapper style={{ marginBottom: "0" }}>
            <FormAddLabelWrapper>
              <FormAddLabel>Min-Price</FormAddLabel>
              {priceError && (
                <FormErrorWrapper>
                  <FormError>{priceError}</FormError>
                </FormErrorWrapper>
              )}
            </FormAddLabelWrapper>
            <FormAddInputWrapper>
              <FormAddInputIconWrapper>
                <FormAddInputWrapper2 style={{ height: "27px" }}>
                  <FormAddInput
                    value={price}
                    onChange={handlePriceChange}
                    style={{ fontSize: "16px", marginLeft: "0.5rem" }}
                  />
                </FormAddInputWrapper2>
              </FormAddInputIconWrapper>
            </FormAddInputWrapper>
          </FormAddInputLabelWrapper>
          {/*profit component */}
          <FormAddInputLabelWrapper
            style={{ marginBottom: "0", marginTop: "0.6rem" }}
          >
            <FormAddLabelWrapper
              style={{ width: "100%", justifyContent: "space-between" }}
            >
              <FormAddLabel>Profit</FormAddLabel>
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
          {/*active sell component */}
          <FormAddInputLabelWrapper>
            <FormAddLabelWrapper style={{ marginTop: "0" }}>
              <FormAddLabel>Active-Sell</FormAddLabel>
            </FormAddLabelWrapper>

            <FormControlLabel
              sx={{
                alignItems: "flex-start",
                marginTop: "4px",
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
                    marginTop: "-8px",
                  }}
                />
              }
              label={activeSell === false ? "deactive" : "active"}
            />
          </FormAddInputLabelWrapper>
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
            onClick={handleSettingSubmit}
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
              loadingText="Changing..."
              normalText="Change"
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
            cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default React.memo(PopUp11);
