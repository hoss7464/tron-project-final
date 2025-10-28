import React, { useState, useCallback, useEffect } from "react";
import "./Section1.css";
import axios from "axios";
import { useTronWallet } from "../../../../contexts/TronWalletContext";
import { useFetchData } from "../../../../contexts/FetchDataContext";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store/store";
import {
  Sec1Contrainer,
  SecSummaryIcon,
  SecKeyIcon,
  Sec1ButtonWrapper,
  Sec1ButtonText,
  Sec1CardThingsWrapper,
  Sec1CopyIcon,
} from "./Section1Elements";
import {
  FormErrorWrapper,
  FormError,
  OrderSubmitBtnWrapper,
  OrderSubmitBtn,
} from "../../../mainPage/mainPageElements";
import {
  LegacyCardWrapper,
  LegacyCardWrapper2,
  LegacyCardWrapper3,
  LegacyCardIconNameWrapper,
  LegacyCardIconWrapper1,
  LegacyCardIconWrapper2,
  LegacyCardIconWrapper3,
  LegacyCardNameWrapper,
  LegacyCardName,
  LegacyCardIcon,
} from "../../../mainPage/LegacySection/LegacyElements";
import {
  SellersCardThingsWrapper,
  SellersCardThingsWrapper2,
  SellersCardThingsNameIconWrapper,
  SellersCardThingsNameWrapper,
  SellersCardThingsName,
  SellersCardThingsNumberWrapper,
  SellersCardThingsNumber,
} from "../../Sellers/SellersElement";
import {
  FormAddInputWrapper,
  FormAddInputIconWrapper,
  FormAddInputWrapper2,
  FormAddInput,
} from "../../../mainPage/mainPageElements";
import { Grid } from "@mui/material";
import balanceIcon from "../../../../assets/svg/BalanceIcon.svg";
import PopUp8 from "../../../../components/Popup/PopUp8";
import { useDispatch } from "react-redux";
import { showNotification } from "../../../../redux/actions/notifSlice";
import { useTranslation } from "react-i18next";
import LoadingButtonContent from "../../../../components/LoadingBtnContent/LoadingBtnContent";
import { serverErrorMessageFunc } from "../../../../utils/errorFunctions";

interface depositTrxData {
  success: boolean;
  code: string;
  depositId: string;
}

interface depositTrxConfirmation {
  success: boolean;
  code: string;
  data: {
    txId: string;
    depositId: string;
  };
}

const Section1: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { address, isConnectedTrading, accessToken, transferTrx } =
    useTronWallet();
  const { tradingAccountInfo, resourceData, fetchData } = useFetchData();
  const [deposit, setDeposit] = useState<string>("");
  const [depositError, setDepositError] = useState<string>("");
  const [changeApiOpen, setChangeApiOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");
  //State for disabling the button after submitting for 300 ms :
  const [isSubmitting, setIsSubmitting] = useState(false);

  const refreshTrigger = useSelector(
    (state: RootState) => state.refresh.refreshTrigger
  );

  //to get data from server :
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

  useEffect(() => {
    if (tradingAccountInfo) {
      setApiKey(tradingAccountInfo.data.apiKey);
    }
  }, [tradingAccountInfo]);
  //Function for deposit botton :
  const handleDepositChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Allow only numbers and empty string
    if (value === "" || /^\d+$/.test(value)) {
      setDeposit(value);

      // Validate immediately after setting the allowed value
      if (value && Number(value) < 10) {
        setDepositError(`${t("Text155")}: 10 TRX`);
      } else {
        setDepositError("");
      }
    }
  };

  const handleDepositClick = async () => {
    if (!address || isConnectedTrading === false) {
      dispatch(
        showNotification({
          name: "deposit-error-5",
          message: `${t("Text39")}`,
          severity: "error",
        })
      );
      return;
    }

    if (depositError) {
      return;
    }

    const baseUrl = process.env.REACT_APP_BASE_URL;
    const axiosTimeOut = Number(process.env.AXIOS_TIME_OUT);
    const numericDepositAmount = Number(deposit);
    setIsSubmitting(true);
    try {
      //payload for checking data towards the server :
      const depositPayload = {
        amount: numericDepositAmount,
      };
      //Send request to check the data towards the server
      const depositResponse = await axios.post<depositTrxData>(
        `${baseUrl}/Buyer/Deposit`,
        depositPayload,
        {
          headers: {
            "Content-Type": "application/json",
            accesstoken: accessToken,
          },
          timeout: axiosTimeOut,
          validateStatus: (status: number) => status < 500,
        }
      );

      if (depositResponse.data.success === true) {
        //if depositResponse.data.success === true  ----> perform send TRX in tronLink

        if (resourceData?.data.DappAddress === undefined) {
          return;
        }
        //make transaction operation :
        const depositTransferTrx = await transferTrx(
          resourceData?.data.DappAddress,
          numericDepositAmount
        );
        //if transaction in tronlink was successfull
        if (depositTransferTrx.success === true) {
          //send data towards the server :
          const confirmDepostTrxPayload = {
            depositId: depositResponse.data.depositId,
            txId: depositTransferTrx.txId,
          };
          const confirmDepostTrx = await axios.post<depositTrxConfirmation>(
            `${baseUrl}/Buyer/ConfirmDeposit`,
            confirmDepostTrxPayload,
            {
              headers: {
                "Content-Type": "application/json",
                accesstoken: accessToken,
              },
              timeout: axiosTimeOut,
              validateStatus: (status: number) => status < 500,
            }
          );

          if (confirmDepostTrx.data.success === true) {
            dispatch(
              showNotification({
                name: "deposit-success",
                message: `${t("Text217")}`,
                severity: "success",
              })
            );
            setDeposit("");
            return;
          } else {
            const serverError = serverErrorMessageFunc(confirmDepostTrx.data.code)
            dispatch(
              showNotification({
                name: "deposit-error-",
                message: `${serverError}`,
                severity: "error",
              })
            );
            return;
          }
        } else {
          dispatch(
            showNotification({
              name: "deposit-error-8",
              message: `${t("Text267")}`,
              severity: "error",
            })
          );
          return;
        }
      } else {
        //if depositResponse.data.success === false ----> make an error
        const serverError = serverErrorMessageFunc(depositResponse.data.code)
        dispatch(
          showNotification({
            name: "deposit-error-7",
            message: `${serverError}`,
            severity: "error",
          })
        );
        return;
      }
    } catch (error) {
      dispatch(
        showNotification({
          name: "deposit-error-6",
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
  //Function for showing the popup for API key:
  const handlePopUp8Click = () => {
    if (!address || isConnectedTrading === false) {
      dispatch(
        showNotification({
          name: "deposit-error-1",
          message: `${t("Text39")}`,
          severity: "error",
        })
      );
      return;
    }
    setChangeApiOpen(true);
  };
  //Function for close the popup for API key:
  const handlePopup8Close = useCallback(() => {
    setChangeApiOpen(false);
  }, []);
  //Function to copy API key
  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(apiKey);
      dispatch(
        showNotification({
          name: "copy-notif",
          message: `${t("Text19")}`,
          severity: "success",
        })
      );
    }
  };
  //Function to change sun to trx :
  const sunToTrx = (value: number) => {
    const trxValue = value / 1_000_000;
    return trxValue.toFixed(2);
  };

  if (tradingAccountInfo?.data.buyerCredit === undefined) {
    return;
  }

  return (
    <>
      <Sec1Contrainer>
        <LegacyCardWrapper>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
              <LegacyCardWrapper2>
                <LegacyCardWrapper3 className="card-bg">
                  <LegacyCardIconNameWrapper>
                    <LegacyCardIconWrapper1>
                      <LegacyCardIconWrapper2>
                        <LegacyCardIconWrapper3>
                          <SecSummaryIcon />
                        </LegacyCardIconWrapper3>
                      </LegacyCardIconWrapper2>
                    </LegacyCardIconWrapper1>
                    <LegacyCardNameWrapper>
                      <LegacyCardName>{t("Text156")}</LegacyCardName>
                    </LegacyCardNameWrapper>
                  </LegacyCardIconNameWrapper>
                  <SellersCardThingsWrapper>
                    {/*put input here */}
                    <Sec1CardThingsWrapper
                      style={{
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                      }}
                    >
                      {depositError && (
                        <FormErrorWrapper>
                          <FormError>{depositError}</FormError>
                        </FormErrorWrapper>
                      )}
                      <FormAddInputWrapper style={{ marginBottom: "1rem" }}>
                        <FormAddInputIconWrapper>
                          <FormAddInputWrapper2>
                            <FormAddInput
                              value={deposit}
                              placeholder={`${t("Text155")}: 10 TRX`}
                              style={{ height: "25px" }}
                              onChange={handleDepositChange}
                            />
                          </FormAddInputWrapper2>
                        </FormAddInputIconWrapper>
                      </FormAddInputWrapper>
                      <OrderSubmitBtnWrapper style={{ marginTop: "0" }}>
                        <OrderSubmitBtn
                          onClick={handleDepositClick}
                          disabled={isSubmitting}
                          style={{ fontWeight: "600" }}
                        >
                          <LoadingButtonContent
                            loading={isSubmitting}
                            loadingText={`${t("Text157")}...`}
                            normalText={`${t("Text156")}`}
                          />
                        </OrderSubmitBtn>
                      </OrderSubmitBtnWrapper>
                    </Sec1CardThingsWrapper>
                    {/*put botton here */}
                  </SellersCardThingsWrapper>
                </LegacyCardWrapper3>
              </LegacyCardWrapper2>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
              <LegacyCardWrapper2>
                <LegacyCardWrapper3 className="card-bg">
                  <LegacyCardIconNameWrapper>
                    <LegacyCardIconWrapper1>
                      <LegacyCardIconWrapper2>
                        <LegacyCardIconWrapper3>
                          <LegacyCardIcon alt="balance" src={balanceIcon} />
                        </LegacyCardIconWrapper3>
                      </LegacyCardIconWrapper2>
                    </LegacyCardIconWrapper1>
                    <LegacyCardNameWrapper>
                      <LegacyCardName>{t("Text158")}</LegacyCardName>
                    </LegacyCardNameWrapper>
                  </LegacyCardIconNameWrapper>
                  <Sec1CardThingsWrapper>
                    <SellersCardThingsWrapper2 style={{ padding: "0" }}>
                      <SellersCardThingsNameIconWrapper>
                        <SellersCardThingsNameWrapper>
                          <SellersCardThingsName>
                            {t("Text148")}
                          </SellersCardThingsName>
                        </SellersCardThingsNameWrapper>
                      </SellersCardThingsNameIconWrapper>
                      <SellersCardThingsNumberWrapper>
                        {isConnectedTrading === true ? (
                          <SellersCardThingsNumber>
                            {sunToTrx(
                              tradingAccountInfo?.data.buyerCredit
                            ).toLocaleString()}{" "}
                            TRX
                          </SellersCardThingsNumber>
                        ) : (
                          <SellersCardThingsNumber>_ _</SellersCardThingsNumber>
                        )}
                      </SellersCardThingsNumberWrapper>
                    </SellersCardThingsWrapper2>
                  </Sec1CardThingsWrapper>
                </LegacyCardWrapper3>
              </LegacyCardWrapper2>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
              <LegacyCardWrapper2>
                <LegacyCardWrapper3 className="card-bg">
                  <LegacyCardIconNameWrapper>
                    <LegacyCardIconWrapper1>
                      <LegacyCardIconWrapper2>
                        <LegacyCardIconWrapper3>
                          <SecKeyIcon />
                        </LegacyCardIconWrapper3>
                      </LegacyCardIconWrapper2>
                    </LegacyCardIconWrapper1>
                    <LegacyCardNameWrapper>
                      <LegacyCardName>{t("Text159")}</LegacyCardName>
                    </LegacyCardNameWrapper>
                  </LegacyCardIconNameWrapper>
                  <Sec1CardThingsWrapper>
                    <FormAddInputWrapper style={{ marginBottom: "1rem" }}>
                      <FormAddInputIconWrapper>
                        <FormAddInputWrapper2>
                          <FormAddInput
                            value={apiKey}
                            placeholder={`${t("Text159")}`}
                          />
                        </FormAddInputWrapper2>

                        <Sec1CopyIcon onClick={handleCopy} />
                      </FormAddInputIconWrapper>
                    </FormAddInputWrapper>
                    <Sec1ButtonWrapper onClick={handlePopUp8Click}>
                      <Sec1ButtonText>{t("Text160")}</Sec1ButtonText>
                    </Sec1ButtonWrapper>
                  </Sec1CardThingsWrapper>
                </LegacyCardWrapper3>
              </LegacyCardWrapper2>
            </Grid>
          </Grid>
        </LegacyCardWrapper>
      </Sec1Contrainer>
      {changeApiOpen && (
        <PopUp8 open={changeApiOpen} onClose={handlePopup8Close} />
      )}
    </>
  );
};

export default Section1;
