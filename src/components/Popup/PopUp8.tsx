import React, { useState } from "react";
import axios from "axios";
import { useTronWallet } from "../../contexts/TronWalletContext";
import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import {
  Popup2HeaderWrapper,
  Popup2Header,
  Popup5TextWrapper,
  Popup5Text,
} from "./PopUpElements";
import { useDispatch } from "react-redux";
import { showNotification } from "../../redux/actions/notifSlice";
import LoadingButtonContent from "../LoadingBtnContent/LoadingBtnContent";
import { useTranslation } from "react-i18next";

interface BuyerChangeApiProps {
  open: boolean;
  onClose: () => void;
}

interface BuyerChangeApiData {
  success: boolean;
  data: {
    ApiKey: string;
  };
}

const PopUp8: React.FC<BuyerChangeApiProps> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { accessToken } = useTronWallet();

  //State for disabling the button after submitting for 300 ms :
  const [isSubmitting, setIsSubmitting] = useState(false);

  const changeApiReject = () => {
    onClose();
  };

  const handleChangeApi = async () => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const axiosTimeOut = Number(process.env.AXIOS_TIME_OUT);
    try {
      setIsSubmitting(true);
      const changeApiResponse = await axios.post<BuyerChangeApiData>(
        `${baseUrl}/Buyer/reGenerate`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            accesstoken: accessToken,
          },
          timeout: axiosTimeOut,
          validateStatus: (status: number) => status < 500,
        }
      );

      if (changeApiResponse.data.success === true) {
        dispatch(
          showNotification({
            name: "change-api-success",
            message: `API has been change successfully`,
            severity: "success",
          })
        );
        onClose();
        return;
      } else {
        dispatch(
          showNotification({
            name: "change-api-error1",
            message: `Something went wrong in changing API operation`,
            severity: "error",
          })
        );
        onClose();
        return;
      }
    } catch (error) {
      dispatch(
        showNotification({
          name: "change-api-error2",
          message: `Change API Error: ${error}`,
          severity: "error",
        })
      );
      onClose();
      return;
    } finally {
      // Re-enable the button after 300ms
      setTimeout(() => {
        setIsSubmitting(false);
      }, 300);
    }
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          changeApiReject();
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
          },
        }}
      >
        <Popup2HeaderWrapper>
          <Popup2Header>{t("Text160")}</Popup2Header>
        </Popup2HeaderWrapper>

        <DialogContent>
          <Popup5TextWrapper>
            <Popup5Text>{t("Text161")}</Popup5Text>
          </Popup5TextWrapper>
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
            onClick={handleChangeApi}
            disabled={isSubmitting}
            sx={{
              backgroundColor: "#430E00",
              borderRadius: "10px",
              "&.Mui-disabled": {
                backgroundColor: "#430E00", // Keep the same background color when disabled
                color: "white"
              },
            }}
          >
            {" "}
            <LoadingButtonContent
              loading={isSubmitting}
              loadingText={`${t("Text162")}...`}
              normalText={`${t("Text163")}`}
            />
          </Button>
          <Button
            fullWidth
            onClick={changeApiReject}
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
            {t("Text164")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default React.memo(PopUp8);
