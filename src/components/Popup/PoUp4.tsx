import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Link,
} from "@mui/material";
import {
  Popup2HeaderWrapper,
  Popup2Header,
  Popup2ImgWrapper,
  Popup2ItemNameWrapper,
  Popup2ItemName,
} from "./PopUpElements";
import energyIcon from "../../assets/svg/EnergyIcon.svg";
import bandwidthIcon from "../../assets/svg/BandwidthIcon.svg";
import {
  LegacyCardIconWrapper1,
  LegacyCardIconWrapper2,
  LegacyCardIconWrapper3,
  LegacyCardIcon,
} from "../../pages/mainPage/LegacySection/LegacyElements";
import { MyMarketOrder} from "../../services/requestService";
import { formatDateTime } from "../../utils/dateTime";
import { truncateTxid } from "../../utils/truncate";
import { useTranslation } from "react-i18next";


interface MyOrderSuccessPopupProps {
  open: boolean;
  onClose: () => void;
  orderData: MyMarketOrder | null;
}

const PopUp4: React.FC<MyOrderSuccessPopupProps> = ({
  open,
  onClose,
  orderData,
}) => {
  const { t } = useTranslation();
  const tronscanUrl = process.env.REACT_APP_TRONSCAN_TXID_URL
  const MyHandleReject = () => {
    onClose();
  };

  if (!orderData) return null;
  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          MyHandleReject();
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
            maxHeight: "80vh",
          },
        }}
      >
        <Popup2HeaderWrapper>
          <Popup2Header>{t("Text105")}</Popup2Header>
        </Popup2HeaderWrapper>
        <Popup2ImgWrapper style={{ marginBottom: "1rem" }}>
          <LegacyCardIconWrapper1>
            <LegacyCardIconWrapper2
              style={
                orderData.resourceType === "energy"
                  ? { border: "solid 2px #003543" }
                  : { border: "solid 2px #430E00" }
              }
            >
              <LegacyCardIconWrapper3
                style={
                  orderData.resourceType === "energy"
                    ? { backgroundColor: "#003543" }
                    : { backgroundColor: "#430E00" }
                }
              >
                <LegacyCardIcon
                  alt="account icon"
                  src={
                    orderData.resourceType === "energy"
                      ? energyIcon
                      : bandwidthIcon
                  }
                />
              </LegacyCardIconWrapper3>
            </LegacyCardIconWrapper2>
          </LegacyCardIconWrapper1>
          <Popup2ItemNameWrapper>
            <Popup2ItemName
              style={
                orderData.resourceType === "energy"
                  ? { color: "#003543" }
                  : { color: "#430E00" }
              }
            >
              {orderData.resourceType === "energy" ? `${t("Text6")}` : `${t("Text9")}`}
            </Popup2ItemName>
          </Popup2ItemNameWrapper>
        </Popup2ImgWrapper>
        <DialogContent>
          <Box>
            <TableContainer
              sx={{
                maxHeight: 400,
                overflow: "auto",
              }}
            >
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        backgroundColor: "#CBD5D8",
                        color: "#003543",
                      }}
                    >
                      {t("Text106")}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        backgroundColor: "#CBD5D8",
                        color: "#003543",
                      }}
                    >
                      {t("Text107")} ({t("Text151")})
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        backgroundColor: "#CBD5D8",
                        color: "#003543",
                      }}
                    >
                      {t("Text80")}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        backgroundColor: "#CBD5D8",
                        color: "#003543",
                      }}
                    >
                      {t("Text108")}
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {orderData.holds.map((holdData, index) => {
                    const { date, time } = formatDateTime(holdData.settledAt);
                    const transactionUrl = `${tronscanUrl}/#/transaction/${holdData.txid}`;
                    return (
                      <TableRow
                        key={index}
                        sx={{
                          "&:nth-of-type(even)": {
                            backgroundColor: "#fafafa",
                          },
                        }}
                      >
                        <TableCell sx={{ color: "#003543" }}>
                          {(holdData.qty / 1e6).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Link
                            href={transactionUrl}
                            target="_blank" // Opens in new tab
                            rel="noopener noreferrer" // Security best practice
                            sx={{
                              fontFamily: "monospace",
                              textDecoration: "none",
                              color: "#430E00",
                              "&:hover": {
                                textDecoration: "underline",
                                color: "#430E00",
                              },
                              cursor: "pointer",
                            }}
                          >
                            {truncateTxid(holdData.txid)}
                          </Link>
                        </TableCell>
                        <TableCell sx={{ color: "#003543" }}>{date}</TableCell>
                        <TableCell sx={{ color: "#003543" }}>{time}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            fullWidth
            onClick={MyHandleReject}
            color="primary"
            variant="contained"
            sx={{
              backgroundColor: "#430E00",
              borderRadius: "10px",
            }}
          >
            {" "}
            {t("Text109")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default React.memo(PopUp4) ;
