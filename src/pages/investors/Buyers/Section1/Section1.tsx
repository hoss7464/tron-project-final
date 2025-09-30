import React, { useState, useCallback, useEffect } from "react";
import "./Section1.css";
import { useTronWallet } from "../../../../contexts/TronWalletContext";
import { useFetchData } from "../../../../contexts/FetchDataContext";
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

const Section1: React.FC = () => {
  const dispatch = useDispatch();
  const { address, isConnectedTrading } = useTronWallet();
  const { tradingAccountInfo, fetchData } = useFetchData();
  const [deposit, setDeposit] = useState<string>("");
  const [depositError, setDepositError] = useState<string>("");
  const [changeApiOpen, setChangeApiOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");


  useEffect(() => {
    if (tradingAccountInfo) {
      setApiKey(tradingAccountInfo.data.apiKey);
    }
  }, [tradingAccountInfo]);

  const handleDepositChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Allow only numbers and empty string
    if (value === "" || /^\d+$/.test(value)) {
      setDeposit(value);

      // Validate immediately after setting the allowed value
      if (value && Number(value) < 10) {
        setDepositError("Minimum deposit: 10 TRX");
      } else {
        setDepositError("");
      }
    }
  };

  const handlePopUp8Click = () => {
    if (!address || isConnectedTrading === false) {
      dispatch(
        showNotification({
          name: "deposit-error-1",
          message: "Connect your wallet.",
          severity: "error",
        })
      );
      return;
    }
    setChangeApiOpen(true);
  };

  const handlePopup8Close = useCallback(() => {
    setChangeApiOpen(false);
  }, []);

  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(apiKey);
      dispatch(
        showNotification({
          name: "copy-notif",
          message: "Copied to clipboard",
          severity: "success",
        })
      );
    }
  };

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
                      <LegacyCardName>Deposit</LegacyCardName>
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
                              placeholder="min-amount: 10 TRX"
                              style={{ height: "25px" }}
                              onChange={handleDepositChange}
                            />
                          </FormAddInputWrapper2>
                        </FormAddInputIconWrapper>
                      </FormAddInputWrapper>
                      <Sec1ButtonWrapper>
                        <Sec1ButtonText>Deposit</Sec1ButtonText>
                      </Sec1ButtonWrapper>
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
                      <LegacyCardName>API balance</LegacyCardName>
                    </LegacyCardNameWrapper>
                  </LegacyCardIconNameWrapper>
                  <Sec1CardThingsWrapper>
                    <SellersCardThingsWrapper2 style={{ padding: "0" }}>
                      <SellersCardThingsNameIconWrapper>
                        <SellersCardThingsNameWrapper>
                          <SellersCardThingsName>Credit </SellersCardThingsName>
                        </SellersCardThingsNameWrapper>
                      </SellersCardThingsNameIconWrapper>
                      <SellersCardThingsNumberWrapper>
                        {isConnectedTrading === true ? (<SellersCardThingsNumber>
                          {(tradingAccountInfo?.data.buyerCredit)?.toLocaleString()}
                        </SellersCardThingsNumber>) : (<SellersCardThingsNumber>
                          _ _
                        </SellersCardThingsNumber>)}
                        
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
                      <LegacyCardName>API key</LegacyCardName>
                    </LegacyCardNameWrapper>
                  </LegacyCardIconNameWrapper>
                  <Sec1CardThingsWrapper>
                    <FormAddInputWrapper style={{ marginBottom: "1rem" }}>
                      <FormAddInputIconWrapper>
                        <FormAddInputWrapper2>
                          <FormAddInput value={apiKey} placeholder="API key" />
                        </FormAddInputWrapper2>

                        <Sec1CopyIcon onClick={handleCopy} />
                      </FormAddInputIconWrapper>
                    </FormAddInputWrapper>
                    <Sec1ButtonWrapper onClick={handlePopUp8Click}>
                      <Sec1ButtonText>Change API</Sec1ButtonText>
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
