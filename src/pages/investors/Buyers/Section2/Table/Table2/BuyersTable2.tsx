import React, { useState, useEffect } from "react";
import "../BuyersTable.css";
import { useFetchData } from "../../../../../../contexts/FetchDataContext";
import {
  BuyerstCardTextWrap1,
  BuyerSignWrapper,
  CheckedSign,
  CanceledSign,
  ProcessSign,
  BuyersAvailableNavbar,
} from "../BuyersTableElements";
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
} from "../../../../../mainPage/mainPageElements";
import { RefundResponse } from "../../../../../../services/requestService";
import Pagination from "@mui/material/Pagination";
import {
  formatDateTime,
  formatDateTime2,
} from "../../../../../../utils/dateTime";
import { truncateTxid2 } from "../../../../../../utils/truncate";
import { Tooltip } from "@mui/material";

const BuyersTable2: React.FC = () => {
  const { tradingRefundInfo } = useFetchData();
  const [wholeRefundInfo, setWholeRefundInfo] = useState<RefundResponse | null>(
    null
  );
  const tronscanUrl = process.env.REACT_APP_TRONSCAN_TXID_URL;

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 9;

  //to get data from server :
  useEffect(() => {
    if (tradingRefundInfo) {
      setWholeRefundInfo(tradingRefundInfo);
    }
  }, [tradingRefundInfo]);

  //------------------------------------------------------------------------------------------------------------
  //Function for pagination :
  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  if (wholeRefundInfo === null) {
    return;
  }

  const paginatedData = wholeRefundInfo.data
    .slice()
    .reverse()
    .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  //Pagination
  const totalPages = Math.ceil(wholeRefundInfo.data.length / rowsPerPage);
  //------------------------------------------------------------------------------------------------------------
  //Function to change sun to trx :
  const sunToTrx = (value: number) => {
    const trxValue = value / 1_000_000;
    return trxValue.toFixed(2);
  };
  //------------------------------------------------------------------------------------------------------------
  return (
    <>
      <OrderMainWrapper style={{ padding: "0" }}>
        <OrdersCarouselWrapper>
          <MyOrdersScroll style={{ height: "575px" }}>
            <AvailableNavWrapper >
              <BuyersAvailableNavbar>
                <AvailableNavTextWrapper style={{width: "20%", justifyContent: "flex-start"}} >
                  <OrderNavText>Date/Time</OrderNavText>
                </AvailableNavTextWrapper>

                <AvailableNavTextWrapper style={{width: "20%", justifyContent: "flex-start"}}>
                  <OrderNavText>Requester</OrderNavText>
                </AvailableNavTextWrapper>

                <AvailableNavTextWrapper style={{width: "20%", justifyContent: "flex-start"}}>
                  <OrderNavText>Amount</OrderNavText>
                </AvailableNavTextWrapper>

                <AvailableNavTextWrapper style={{width: "20%", justifyContent: "flex-start"}}>
                  <OrderNavText>TxId</OrderNavText>
                </AvailableNavTextWrapper>

                <AvailableNavTextWrapper style={{width: "20%", justifyContent: "flex-start"}}>
                  <OrderNavText>Paid-At</OrderNavText>
                </AvailableNavTextWrapper>

               
              </BuyersAvailableNavbar>
            </AvailableNavWrapper>

            <OrdersCard>
              {paginatedData.map((myData, index) => {
                const { date, time } = formatDateTime(myData.createdAt);
                const { myDate, myTime } = formatDateTime2(myData.paidAt);
                const transactionUrl = `${tronscanUrl}/#/transaction/${myData.depositTxId}`;

                return (
                  <OrdersDetail
                    key={index}
                    style={{ justifyContent: "space-between" }}
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
                        {truncateTxid2(myData.requester)}
                      </OrdersCardText2>
                    </BuyerstCardTextWrap1>
                    <BuyerstCardTextWrap1>
                      <OrdersCardText1>
                        {sunToTrx(myData.depositAmount)} TRX
                      </OrdersCardText1>
                    </BuyerstCardTextWrap1>

                    {myData.depositTxId === undefined ? (
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
                          {truncateTxid2(myData.depositTxId)}
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

                    {myData.status === "SUCCESS" && (
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

                    {myData.status === "CANCELED" && (
                      <Tooltip title="canceled">
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

                    {myData.status === "AWAITING_PAYMENT" && (
                      <Tooltip title="awaiting">
                        <BuyerSignWrapper
                          style={{
                            backgroundColor: "#430E00",
                            padding: "0.4rem",
                            borderRadius: "6px",
                          }}
                        >
                          <ProcessSign />
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

export default BuyersTable2;
