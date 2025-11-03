import React, { useState, useEffect } from "react";
import { useFetchData } from "../../../../../contexts/FetchDataContext";
import {
  BuyerstCardTextWrap1,
  BuyerSignWrapper,
  CheckedSign,
  CanceledSign,
  BuyersAvailableNavbar,
} from "../../../Buyers/Section2/Table/BuyersTableElements";
import { Link } from "@mui/material";
import {
  OrderMainWrapper,
  OrdersCarouselWrapper,
  MyOrdersScroll,
  AvailableNavWrapper,
  AvailableNavTextWrapper,
  OrderNavText,
  OedersPaginationWrapper,
  OrdersCard,
  OrdersDetail,
  OrdersCardTextWrapper2,
  OrdersCardText1,
  OrdersCardText2,
  MyOrdersNavWrapper,
  MyOrdersNavTextWrapper,
} from "../../../../mainPage/mainPageElements";
import { SellersWithdrawResponse } from "../../../../../services/requestService";
import Pagination from "@mui/material/Pagination";
import { formatDateTime, formatDateTime2 } from "../../../../../utils/dateTime";
import { truncateTxid2 } from "../../../../../utils/truncate";
import { Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";

const SellersTable2: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { sellersWithdrawInfo } = useFetchData();
  const [wholeSellersWithdrawInfo, setWholeSellersWithdrawInfo] =
    useState<SellersWithdrawResponse | null>(null);
  const tronscanUrl = process.env.REACT_APP_TRONSCAN_TXID_URL;
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = i18n.language === "en" ? 12 : 11;

  //to get data from server :
  useEffect(() => {
    if (sellersWithdrawInfo) {
      setWholeSellersWithdrawInfo(sellersWithdrawInfo);
    }
  }, [sellersWithdrawInfo]);
  //------------------------------------------------------------------------------------------------------------
  //Function for pagination :
  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  if (wholeSellersWithdrawInfo === null) {
    return;
  }

  const paginatedData = wholeSellersWithdrawInfo.data
    .slice()
    .reverse()
    .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  //Pagination
  const totalPages = Math.ceil(
    wholeSellersWithdrawInfo.data.length / rowsPerPage
  );
  //------------------------------------------------------------------------------------------------------------
  //Function to change sun to trx :
  const sunToTrx = (value: number) => {
    const trxValue = value / 1_000_000;
    return trxValue.toFixed(2);
  };

  return (
    <>
      <OrderMainWrapper style={{ padding: "0" }}>
        <OrdersCarouselWrapper>
          <MyOrdersScroll style={{ height: "662px" }}>
            <MyOrdersNavWrapper
              style={{ padding: "0.3rem 0.5rem 0.3rem 0.5rem" }}
            >
              <MyOrdersNavTextWrapper style={{  justifyContent: "space-between", width: "92%" }}>
                <AvailableNavTextWrapper
                  style={{ width: "20%", justifyContent: "flex-start" }}
                >
                  <OrderNavText>{t("Text80")}</OrderNavText>
                </AvailableNavTextWrapper>

                <AvailableNavTextWrapper
                  style={{ width: "20%", justifyContent: "flex-start" }}
                >
                  <OrderNavText>{t("Text71")}</OrderNavText>
                </AvailableNavTextWrapper>

                <AvailableNavTextWrapper
                  style={{ width: "20%", justifyContent: "flex-start" }}
                >
                  <OrderNavText>{t("Text81")}</OrderNavText>
                </AvailableNavTextWrapper>

                <AvailableNavTextWrapper
                  style={{ width: "20%", justifyContent: "flex-start" }}
                >
                  <OrderNavText>{t("Text151")}</OrderNavText>
                </AvailableNavTextWrapper>

                <AvailableNavTextWrapper
                  style={{ width: "20%", justifyContent: "flex-start" }}
                >
                  <OrderNavText>{t("Text153")}</OrderNavText>
                </AvailableNavTextWrapper>
              </MyOrdersNavTextWrapper>
            </MyOrdersNavWrapper>

            <OrdersCard>
              {paginatedData.map((myData, index) => {
                const { date, time } = formatDateTime(myData.createdAt);
                const { myDate, myTime } = formatDateTime2(myData.paidAt);
                const transactionUrl = `${tronscanUrl}/#/transaction/${myData.withdrawTxId}`;

                return (
                  <OrdersDetail
                    key={index}
                    style={{
                      justifyContent: "space-between",
                      padding: "5px 14px",
                    }}
                  >
                    <BuyerstCardTextWrap1>
                      <OrdersCardTextWrapper2>
                        <OrdersCardText1>{time}</OrdersCardText1>
                      </OrdersCardTextWrapper2>
                      <OrdersCardTextWrapper2>
                        <OrdersCardText2>{date}</OrdersCardText2>
                      </OrdersCardTextWrapper2>
                    </BuyerstCardTextWrap1>

                    <BuyerstCardTextWrap1>
                      <OrdersCardText2>
                        {truncateTxid2(myData.receiver)}
                      </OrdersCardText2>
                    </BuyerstCardTextWrap1>
                    <BuyerstCardTextWrap1>
                      <OrdersCardText1>
                        {sunToTrx(myData.withdrawAmount)} TRX
                      </OrdersCardText1>
                    </BuyerstCardTextWrap1>

                    {myData.withdrawTxId === undefined ? (
                      <BuyerstCardTextWrap1>
                        <OrdersCardText1>_ _</OrdersCardText1>
                      </BuyerstCardTextWrap1>
                    ) : (
                      <BuyerstCardTextWrap1>
                        <Link
                          href={transactionUrl}
                          target="_blank" // Opens in new tab
                          rel="noopener noreferrer" // Security best practice
                          sx={{
                            fontFamily: "monospace",
                            fontSize: "15px",
                            textDecoration: "none",
                            color: "#430E00",
                            "&:hover": {
                              textDecoration: "underline",
                              color: "#430E00",
                            },
                            cursor: "pointer",
                          }}
                        >
                          {truncateTxid2(myData.withdrawTxId)}
                        </Link>
                      </BuyerstCardTextWrap1>
                    )}

                    {myData.paidAt === null ? (
                      <BuyerstCardTextWrap1 style={{ marginRight: "2.5rem" }}>
                        <OrdersCardTextWrapper2>
                          <OrdersCardText1>_ _ </OrdersCardText1>
                        </OrdersCardTextWrapper2>

                        <OrdersCardTextWrapper2>
                          <OrdersCardText2>_ _</OrdersCardText2>
                        </OrdersCardTextWrapper2>
                      </BuyerstCardTextWrap1>
                    ) : (
                      <BuyerstCardTextWrap1 style={{ marginRight: "2.5rem" }}>
                        <OrdersCardTextWrapper2>
                          <OrdersCardText1>{myDate}</OrdersCardText1>
                        </OrdersCardTextWrapper2>
                        <OrdersCardTextWrapper2>
                          <OrdersCardText2>{myTime}</OrdersCardText2>
                        </OrdersCardTextWrapper2>
                      </BuyerstCardTextWrap1>
                    )}

                    {myData.status === "success" && (
                      <Tooltip title="success">
                        <BuyerSignWrapper
                          style={{
                            backgroundColor: "#003543",
                            padding: "0.4rem",
                            borderRadius: "6px",
                          }}
                        >
                          <CheckedSign />
                        </BuyerSignWrapper>
                      </Tooltip>
                    )}

                    {myData.status === "failed" && (
                      <Tooltip title="failed">
                        <BuyerSignWrapper
                          style={{
                            backgroundColor: "#430E00",
                            padding: "0.4rem",
                            borderRadius: "6px",
                          }}
                        >
                          <CanceledSign />
                        </BuyerSignWrapper>
                      </Tooltip>
                    )}
                  </OrdersDetail>
                );
              })}
            </OrdersCard>
          </MyOrdersScroll>
        </OrdersCarouselWrapper>
      </OrderMainWrapper>

      <OedersPaginationWrapper>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          size="small"
          sx={{
            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "#430E00",
              color: "white",
              "&:hover": {
                backgroundColor: "#430E00",
              },
            },
          }}
        />
      </OedersPaginationWrapper>
    </>
  );
};

export default SellersTable2;
