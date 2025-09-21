import React from "react";
import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import {
  Popup2HeaderWrapper,
  Popup2Header,
  Popup5TextWrapper,
  Popup5Text,
} from "./PopUpElements";
import { useDispatch } from "react-redux";
import { showNotification } from "../../redux/actions/notifSlice";

interface BuyerChangeApiProps {
  open: boolean;
  onClose: () => void;
}

const PopUp8: React.FC<BuyerChangeApiProps> = ({ open, onClose }) => {
  const changeApiReject = () => {
    onClose();
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
          <Popup2Header>Change API</Popup2Header>
        </Popup2HeaderWrapper>

        <DialogContent>
          <Popup5TextWrapper>
            <Popup5Text>Do you want to change your API ?</Popup5Text>
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
            sx={{
              backgroundColor: "#430E00",
              borderRadius: "10px",
            }}
          >
            {" "}
            Yes
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
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default React.memo(PopUp8);
