import React, { useState, useEffect  } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";
import {
  Popup2HeaderWrapper,
  Popup2Header,
  Popup2ImgWrapper,
  Popup2ItemNameWrapper,
  Popup2ItemName,
  Popup5TextWrapper,
  Popup5Text,
} from "../../../../../../components/Popup/PopUpElements";
import {
  LegacyCardIconWrapper1,
  LegacyCardIconWrapper2,
  LegacyCardIconWrapper3,
  LegacyCardIcon,
} from "../../../../../mainPage/LegacySection/LegacyElements";
import { useDispatch } from "react-redux";
import { showNotification } from "../../../../../../redux/actions/notifSlice";

interface bulkOrderPopupProps {
  open: boolean;
  onClose: () => void;
  walletAdd: string;
  setWalletAdd: React.Dispatch<React.SetStateAction<string>>;
  setBulkOrder: React.Dispatch<React.SetStateAction<boolean>>;
}

const Form2PopUp1: React.FC<bulkOrderPopupProps> = ({
  open,
  onClose,
  walletAdd,
  setWalletAdd,
  setBulkOrder,
}) => {
  const dispatch = useDispatch();
  const [bulkOrderAdds, setBulkOrderAdds] = useState<string>("");
  const [errorLines, setErrorLines] = useState<Set<number>>(new Set());

  const textAreaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const [scrollTop, setScrollTop] = React.useState(0);

  //-----------------------------------------------------------------------------
  const validateAddressLine = (line: string): boolean => {
    const regex = /^T[a-zA-Z0-9]{33}$/;
    return regex.test(line.trim());
  };

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newValue = event.target.value;
    setBulkOrderAdds(newValue);

    // Validate each line and track errors
    const lines = newValue.split("\n");
    const newErrorLines = new Set<number>();

    // Track seen addresses to detect duplicates
    const seenAddresses = new Set<string>();

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      let hasError = false;

      // Skip empty lines for validation but still track them
      if (trimmedLine === "") return;

      // Check if line exceeds 34 characters or fails validation
      if (trimmedLine.length > 34 || !validateAddressLine(trimmedLine)) {
        hasError = true;
      }

      // Check for duplicates (case-sensitive comparison)
      if (seenAddresses.has(trimmedLine)) {
        hasError = true;
      } else if (trimmedLine !== "") {
        seenAddresses.add(trimmedLine);
      }

      if (hasError) {
        newErrorLines.add(index);
      }
    });

    setErrorLines(newErrorLines);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    // Access the textarea value through the event target
    const target = event.target as HTMLTextAreaElement;
    const currentLine = target.value.split("\n").pop() ?? "";

    // Prevent typing if the current line is 34 characters or longer, but allow command keys
    if (
      currentLine.length >= 34 &&
      event.key !== "Enter" &&
      event.key !== "Backspace" &&
      event.key !== "Delete" &&
      event.key !== "ArrowLeft" &&
      event.key !== "ArrowRight" &&
      event.key !== "Tab"
    ) {
      event.preventDefault();
    }
  };

  const handleScroll = () => {
    if (textAreaRef.current) {
      setScrollTop(textAreaRef.current.scrollTop);
    }
  };

const handleBulkOrderClick = () => {
  const lines = bulkOrderAdds
    .split("\n")
    .filter((line) => line.trim() !== "");

  // Get all addresses to check for duplicates
  const addresses = lines.map((line) => line.trim());
  const uniqueAddresses = new Set(addresses);

  // Check if there are any duplicates
  const hasDuplicates = addresses.length !== uniqueAddresses.size;

  // Check if there are any invalid lines (including duplicates)
  if (errorLines.size > 0 || hasDuplicates) {
    let errorMessage = "Please fix all invalid addresses before confirming.";

    if (hasDuplicates) {
      errorMessage = "Please remove duplicate wallet addresses before confirming.";
    }

    dispatch(
      showNotification({
        name: "error1",
        message: errorMessage,
        severity: "error",
      })
    );
    return;
  }

  // Check if there are any valid addresses
  if (lines.length === 0) {
    dispatch(
      showNotification({
        name: "error1",
        message: "Please enter at least one valid wallet address.",
        severity: "error",
      })
    );
    return;
  }

  // All addresses are valid and unique - JOIN THEM WITH COMMAS AND SET TO walletAdd
  const formattedAddresses = lines.join(","); // Join with commas, no spaces
  setWalletAdd(formattedAddresses); // This updates the walletAdd in Form2 component
  setBulkOrder(true); // Enable bulk order mode

  dispatch(
    showNotification({
      name: "error1",
      message: `Bulk order confirmed for ${lines.length} unique addresses.`,
      severity: "success",
    })
  );

  console.log("Valid addresses:", formattedAddresses);

  // Reset and close
  setBulkOrderAdds("");
  setErrorLines(new Set());
  onClose();
};

  const bulkOrderPopupReject = () => {
    setBulkOrderAdds("");
    setErrorLines(new Set());
    onClose();
    setBulkOrder(false)
  };

  // Function to check if a specific line has error
  const hasLineError = (lineIndex: number): boolean => {
    return errorLines.has(lineIndex);
  };

  // Function to get error type for a specific line (for more detailed error display)
  const getLineErrorType = (lineIndex: number): string => {
    const lines = bulkOrderAdds.split("\n");
    const currentLine = lines[lineIndex]?.trim();

    if (!currentLine || currentLine === "") return "";

    // Check if line is too long or invalid format
    if (currentLine.length > 34 || !validateAddressLine(currentLine)) {
      return "invalid";
    }

    // Check if line is duplicate
    const previousLines = lines.slice(0, lineIndex);
    if (previousLines.some((line) => line.trim() === currentLine)) {
      return "duplicate";
    }

    return "";
  };

   useEffect(() => {
    if (open) {
      // If walletAdd exists, set it as the first line
      if (walletAdd && walletAdd.trim() !== "") {
        // Convert existing addresses to newline format for the textarea
        const formattedAddresses = walletAdd
          .split(/[\s,]+/)
          .filter(addr => addr.trim() !== "")
          .map(addr => addr.trim())
          .join('\n');
        
        setBulkOrderAdds(formattedAddresses);
        
        // Validate the pre-populated addresses
        const lines = formattedAddresses.split('\n');
        const newErrorLines = new Set<number>();
        const seenAddresses = new Set<string>();

        lines.forEach((line, index) => {
          const trimmedLine = line.trim();
          if (trimmedLine === "") return;

          if (trimmedLine.length > 34 || !validateAddressLine(trimmedLine)) {
            newErrorLines.add(index);
          }

          if (seenAddresses.has(trimmedLine)) {
            newErrorLines.add(index);
          } else if (trimmedLine !== "") {
            seenAddresses.add(trimmedLine);
          }
        });

        setErrorLines(newErrorLines);
      } else {
        // If no existing addresses, clear the textarea
        setBulkOrderAdds("");
        setErrorLines(new Set());
      }
    }
  }, [open, walletAdd]); // This runs when popup opens or walletAdd changes

  return (
    <>
      <Dialog
        open={open}
        onClose={(event, reason) => {
          // Only close if the reason is not 'backdropClick'
          if (reason !== "backdropClick") {
            bulkOrderPopupReject();
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
          },
        }}
      >
        <Popup2HeaderWrapper>
          <Popup2Header>Bulk Order Mode</Popup2Header>
        </Popup2HeaderWrapper>

        <DialogContent>
          <Popup5TextWrapper>
            <Popup5Text>
              You are in bulk order mode
              <br />
              enter the list of your wallet addresses.
            </Popup5Text>
          </Popup5TextWrapper>

          <Box sx={{ mt: 2, position: "relative", maxHeight: "300px" }}>
            <TextField
              fullWidth
              multiline
              minRows={10}
              maxRows={200}
              value={bulkOrderAdds}
              onChange={handleTextAreaChange}
              onKeyDown={handleKeyDown}
              variant="outlined"
              inputRef={textAreaRef}
              onScroll={handleScroll}
              error={errorLines.size > 0}
              helperText={
                errorLines.size > 0
                  ? `${errorLines.size} invalid address(es) detected`
                  : ""
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  lineHeight: "1.2",
                  paddingLeft: "2.5rem", // Space for line numbers

                  "& fieldset": {
                    borderColor: errorLines.size > 0 ? "#f44336" : "#D9E1E3",
                  },
                  "&:hover fieldset": {
                    borderColor: errorLines.size > 0 ? "#f44336" : "#D9E1E3",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errorLines.size > 0 ? "#f44336" : "#D9E1E3",
                  },
                },
              }}
              autoFocus={open}
            />

            {/* Line numbers display */}
            <Box
              sx={{
                position: "absolute",
                left: "8px",
                top: "16px",
                bottom: "12px",
                paddingRight: "0.5rem",
                textAlign: "right",
                fontFamily: "monospace",
                fontSize: "14px",
                lineHeight: "1.4",
                userSelect: "none",
                pointerEvents: "none",
                height: "100%",
                transform: `translateY(-${scrollTop}px)`,
              }}
            >
              {bulkOrderAdds.split("\n").map((_, index) => {
                const errorType = getLineErrorType(index);
                let color = "#003543";
                let title = "";

                if (errorType === "invalid") {
                  color = "#f44336"; // Red for invalid format
                  title = "Invalid wallet address format";
                } else if (errorType === "duplicate") {
                  color = "#ff9800"; // Orange for duplicates
                  title = "Duplicate wallet address";
                }

                return (
                  <div
                    key={index}
                    style={{
                      color: color,
                      fontWeight: errorType ? "bold" : "normal",
                    }}
                    title={title}
                  >
                    {index + 1}
                  </div>
                );
              })}
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
            onClick={handleBulkOrderClick}
            color="primary"
            variant="contained"
            sx={{
              backgroundColor: "#430E00",
              borderRadius: "10px",
            }}
          >
            {" "}
            Confirm
          </Button>
          <Button
            fullWidth
            onClick={bulkOrderPopupReject}
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

export default React.memo(Form2PopUp1);
