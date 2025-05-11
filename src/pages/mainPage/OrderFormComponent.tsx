import React, { useState, useRef, useEffect } from "react";
import "./mainPage.css";
import {
  FormControl,
  TextField,
  Popper,
  Box,
  Typography,
  Grid,
  ClickAwayListener,
} from "@mui/material";
import {
  FormWrapper,
  Form,
  FormHeaderSwitchWrapper,
  FormHeaderIconWrapper,
  FormHeaderWrapper,
  FormIconWrapper,
  AccountIcon,
  AccountHeader,
  FormSwitchWrapper,
  FormAddInputLabelWrapper,
  FormAddLabelWrapper,
  FormAddLabel,
  FormAddInputWrapper,
  FormAddInputIconWrapper,
  FormAddIconWrapper,
  FormAddIcon,
  FormIcon2,
  FormAddInputWrapper2,
  FormAddInput,
  InputMiniBtnWrapper,
  InputMiniBtnWrapper2,
  InputMiniBtn,
} from "./mainPageElements";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { styled } from "@mui/material/styles";
import energyIcon from "../../assets/svg/EnergyIcon.svg";
import bandwidthIcon from "../../assets/svg/BandwidthIcon.svg";
import singleEnergy from "../../assets/svg/SingleEnergy.svg";
import singleBandwidth from "../../assets/svg/SingleBandwidth.svg";
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
  fontSize: "14px",
  border: "2px solid #1E650F",
  borderRadius: 24,
  padding: "6px 8px",
  "&.Mui-selected": {
    backgroundColor: "#1E650F",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#1E650F",
    },
  },
  "&:not(.Mui-selected)": {
    color: "#1E650F",
  },
}));
//-------------------------------------------------------------------------------------
//Dropdown menu material ui components:
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
      <span style={{ fontSize: "14px", color: "#000" }}>SUN</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#333"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  );
};
//-------------------------------------------------------------------------------------

const OrderFormComponent: React.FC = () => {
  //States :
  //Switch button states:
  const [switchBtn, setSwitchBtn] = useState<string | null>("energy");
  //Amount input states:
  const [inputValue, setInputValue] = useState<string>("");
  const [amount, setAmount] = useState("");
  //Duration dropdown states :
  const [durationValue, setDurationValue] = useState("");
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLInputElement | null>(null);
  //Dynamic Price dropdown options state:
  const [priceOptions, setPriceOptions] = useState<any[]>([]);
  //--------------------------------------------------------------------------------------
  //Switch button handleChange function :
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    switchBtn: string | null
  ) => {
    if (switchBtn !== null) {
      setSwitchBtn(switchBtn);
    }
  };

  //--------------------------------------------------------------------------------------
  //Amount input handleChange function :
  const amountHandleChange = (
    value: string | React.ChangeEvent<HTMLInputElement>
  ) => {
    let rawValue = "";

    if (typeof value === "string") {
      rawValue = value;
    } else {
      rawValue = value.target.value;
    }

    // Optional: Allow commas for display but store as numeric
    const numericValue = Number(rawValue.replace(/,/g, ""));

    // You may also validate here if needed
    if (!isNaN(numericValue)) {
      setAmount(numericValue.toString()); // keep displaying it as string
      // Optionally store numericValue in another state if needed for sending
    }
    console.log(numericValue);
  };

  //--------------------------------------------------------------------------------------
  //Duration input functions :
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const hours = [1, 3];
  const minutes = [15];

  const handleOptionClick = (value: string) => {
    setDurationValue(value);
    setOpen(false);
  };

  //--------------------------------------------------------------------------------------
  //Price input functions :
  const minOption = Math.min(
    ...priceOptions.map((option) => parseInt(option.col1, 10))
  );
  const maxOption = Math.max(
    ...priceOptions.map((option) => parseInt(option.col1, 10))
  );

  const getOptionStyle = (option: string) => {
    const inputNum = parseInt(inputValue, 10);
    const optionNum = parseInt(option, 10);

    if (isNaN(inputNum)) {
      return { color: "black" }; // Default color
    }

    if (inputNum < minOption || inputNum > maxOption) {
      return { color: "gray" }; // Outside of range
    }

    const parsedOptions = priceOptions.map((o) => parseInt(o.col1, 10));
    const exactMatch = parsedOptions.includes(inputNum);

    if (exactMatch) {
      // Input exists in list
      if (optionNum === inputNum) {
        return { color: "green", fontWeight: "bold" };
      } else if (optionNum > inputNum) {
        return { color: "grey" }; // Fix: grey for greater numbers
      } else {
        return { color: "black" };
      }
    } else {
      // Input does not exist in list → highlight nearest smaller number
      const smallerOptions = parsedOptions
        .filter((num) => num < inputNum)
        .sort((a, b) => b - a); // Descending

      const nearestLess = smallerOptions[0];

      if (optionNum === nearestLess) {
        return { color: "green", fontWeight: "bold" };
      } else if (optionNum < inputNum) {
        return { color: "black" };
      } else {
        return { color: "grey" };
      }
    }
  };
  //--------------------------------------------------------------------------------------
  const fetchOptionsForDuration = async (duration: string) => {
    try {
      const res = await fetch(
        `http://localhost:3001/prices?duration=${encodeURIComponent(duration)}`
      );
      const data = await res.json();

      if (data.length > 0) {
        setPriceOptions(data[0].options); // options array inside matched duration
      } else {
        setPriceOptions([]); // No options found
      }
    } catch (err) {
      console.error("Failed to fetch price options:", err);
    }
  };

  useEffect(() => {
    if (durationValue) {
      fetchOptionsForDuration(durationValue);
    }
  }, [durationValue]);
  //--------------------------------------------------------------------------------------
  //Submit form function :
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <FormWrapper className="order-bg">
        <Form onSubmit={handleSubmit}>
          <FormHeaderSwitchWrapper>
            <FormHeaderIconWrapper>
              <FormIconWrapper>
                <AccountIcon
                  alt={switchBtn === "energy" ? "energy" : "bandwidth"}
                  src={switchBtn === "energy" ? energyIcon : bandwidthIcon}
                />
              </FormIconWrapper>
              <FormHeaderWrapper>
                {switchBtn === "energy" ? (
                  <AccountHeader style={{ color: "#1E650F" }}>
                    Energy
                  </AccountHeader>
                ) : (
                  <AccountHeader style={{ color: "#1E650F" }}>
                    Bandwidth
                  </AccountHeader>
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

          <FormAddInputLabelWrapper>
            <FormAddLabelWrapper>
              <FormAddLabel>Wallet Address</FormAddLabel>
            </FormAddLabelWrapper>
            <FormAddInputWrapper>
              <FormAddInputIconWrapper>
                <FormAddIconWrapper>
                  <FormAddIcon />
                </FormAddIconWrapper>
                <FormAddInputWrapper2>
                  <FormAddInput
                    readOnly
                    value="XzWPJDLR3jXzWPJDLR3jzWPJDLR3jzW"
                  />
                </FormAddInputWrapper2>
              </FormAddInputIconWrapper>
            </FormAddInputWrapper>
          </FormAddInputLabelWrapper>

          <FormAddInputLabelWrapper>
            <FormAddLabelWrapper>
              <FormAddLabel>Amount</FormAddLabel>
            </FormAddLabelWrapper>
            <FormAddInputWrapper>
              <FormAddInputIconWrapper>
                <FormAddIconWrapper>
                  <FormIcon2
                    alt={switchBtn === "energy" ? "energy" : "bandwidth"}
                    src={
                      switchBtn === "energy" ? singleEnergy : singleBandwidth
                    }
                  />
                </FormAddIconWrapper>
                <FormAddInputWrapper2>
                  <FormAddInput
                    style={{ fontSize: "16px" }}
                    value={amount}
                    onChange={amountHandleChange}
                    placeholder={`Amount of ${
                      switchBtn === "energy"
                        ? "energy (32,000 - 1,000,000)"
                        : "bandwidth (1000 - 10000)"
                    }`}
                  />
                </FormAddInputWrapper2>
              </FormAddInputIconWrapper>
            </FormAddInputWrapper>
            {switchBtn === "energy" ? (
              <InputMiniBtnWrapper>
                <InputMiniBtnWrapper2>
                  <InputMiniBtn
                    onClick={() => amountHandleChange("64,350")}
                    value="64,350"
                  >
                    USDT Tsf
                  </InputMiniBtn>
                </InputMiniBtnWrapper2>
                <InputMiniBtnWrapper2>
                  <InputMiniBtn
                    onClick={() => amountHandleChange("100,000")}
                    value="100,000"
                  >
                    100k
                  </InputMiniBtn>
                </InputMiniBtnWrapper2>
                <InputMiniBtnWrapper2>
                  <InputMiniBtn
                    onClick={() => amountHandleChange("1,000,000")}
                    value="1,000,000"
                  >
                    1m
                  </InputMiniBtn>
                </InputMiniBtnWrapper2>
                <InputMiniBtnWrapper2>
                  <InputMiniBtn
                    onClick={() => amountHandleChange("2,000,000")}
                    value="2,000,000"
                  >
                    2m
                  </InputMiniBtn>
                </InputMiniBtnWrapper2>
                <InputMiniBtnWrapper2>
                  <InputMiniBtn
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
                    onClick={() => amountHandleChange("1,000")}
                    value="1,000"
                  >
                    1k
                  </InputMiniBtn>
                </InputMiniBtnWrapper2>
                <InputMiniBtnWrapper2>
                  <InputMiniBtn
                    onClick={() => amountHandleChange("2,000")}
                    value="2,000"
                  >
                    2k
                  </InputMiniBtn>
                </InputMiniBtnWrapper2>
                <InputMiniBtnWrapper2>
                  <InputMiniBtn
                    onClick={() => amountHandleChange("5,000")}
                    value="5,000"
                  >
                    5k
                  </InputMiniBtn>
                </InputMiniBtnWrapper2>
                <InputMiniBtnWrapper2>
                  <InputMiniBtn
                    onClick={() => amountHandleChange("10,000")}
                    value="10,000"
                  >
                    10k
                  </InputMiniBtn>
                </InputMiniBtnWrapper2>
              </InputMiniBtnWrapper>
            )}
          </FormAddInputLabelWrapper>

          <FormAddInputLabelWrapper style={{ marginBottom: "0" }}>
            <FormAddLabelWrapper>
              <FormAddLabel>Duration</FormAddLabel>
            </FormAddLabelWrapper>
            <FormControl fullWidth style={{ marginBottom: "1rem" }}>
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <Box>
                  <TextField
                    placeholder="Duration"
                    value={durationValue}
                    onChange={(e) => setDurationValue(e.target.value)}
                    onFocus={() => setOpen(true)}
                    inputRef={anchorRef}
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        height: "52px",
                        border: "2px solid #1E650F",
                        borderRadius: "55px",

                        "&.Mui-focused fieldset": {
                          borderColor: "transparent",
                        },
                        "& fieldset": {
                          border: "none",
                        },
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
                        mt: 1,
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
                                handleOptionClick(`${hr} hours`);
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
                                handleOptionClick(`${day} days`);
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

          <FormAddInputLabelWrapper style={{ marginBottom: "0" }}>
            <FormAddLabelWrapper>
              <FormAddLabel>Price</FormAddLabel>
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
                getOptionLabel={(option) => {
                  if (typeof option === "string") return option;
                  return `${option.col1} - ${option.col2}`;
                }}
                filterOptions={(options) => options}
                renderOption={(props, option) => (
                  <li
                    {...props}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      ...getOptionStyle(option.col1),
                      pointerEvents: "none", // disable interaction
                    }}
                  >
                    <span>{option.col1}</span>
                    <span style={{ marginLeft: "auto" }}>{option.col2}</span>
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Price"
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        height: "52px",
                        border: "2px solid #1E650F",
                        borderRadius: "55px",

                        "&.Mui-focused fieldset": {
                          borderColor: "transparent",
                        },
                        "& fieldset": {
                          border: "none",
                        },
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
        </Form>
      </FormWrapper>
    </>
  );
};

export default OrderFormComponent;
