import React, { useState, useEffect } from "react";
import "../BuyersTable.css";
import { useFetchData } from "../../../../../../contexts/FetchDataContext";
import { BuyerstCardTextWrap1, BuyerSignWrapper,CheckedSign, CanceledSign, ProcessSign  } from "../BuyersTableElements";
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
      <OrderMainWrapper>
        <OrdersCarouselWrapper>
          <MyOrdersScroll style={{ height: "575px" }}>
            <AvailableNavWrapper  >
              <AvailableNavTextWrapper  >
                <OrderNavText>Date/Time</OrderNavText>
              </AvailableNavTextWrapper>

              <AvailableNavTextWrapper>
                <OrderNavText>ID</OrderNavText>
              </AvailableNavTextWrapper>

              <AvailableNavTextWrapper >
                <OrderNavText>Requester</OrderNavText>
              </AvailableNavTextWrapper>

              <AvailableNavTextWrapper>
                <OrderNavText>Amount</OrderNavText>
              </AvailableNavTextWrapper>

              <AvailableNavTextWrapper>
                <OrderNavText>Paid-At</OrderNavText>
              </AvailableNavTextWrapper>

              <AvailableNavTextWrapper>
                <OrderNavText>Status</OrderNavText>
              </AvailableNavTextWrapper>
            </AvailableNavWrapper>

            <OrdersCard>
              {paginatedData.map((myData, index) => {
                const { date, time } = formatDateTime(myData.createdAt);
                const { myDate, myTime } = formatDateTime2(myData.paidAt);

                return (
                  <OrdersDetail
                    key={index}
                    style={{ justifyContent: "space-between" }}
                  >
                    <BuyerstCardTextWrap1 >
                      <OrdersCardTextWrapper2>
                        <OrdersCardText1>{time}</OrdersCardText1>
                      </OrdersCardTextWrapper2>
                      <OrdersCardTextWrapper2>
                        <OrdersCardText2>{date}</OrdersCardText2>
                      </OrdersCardTextWrapper2>
                    </BuyerstCardTextWrap1>

                    <BuyerstCardTextWrap1 >
                      <OrdersCardText1>
                        {truncateTxid2(myData._id)}
                      </OrdersCardText1>
                    </BuyerstCardTextWrap1>
                    <BuyerstCardTextWrap1 >
                      <OrdersCardText2>
                        {truncateTxid2(myData.requester)}
                      </OrdersCardText2>
                    </BuyerstCardTextWrap1>
                    <BuyerstCardTextWrap1 >
                      <OrdersCardText1>
                        {sunToTrx(myData.depositAmount)} TRX
                      </OrdersCardText1>
                    </BuyerstCardTextWrap1>

                    {myData.paidAt === null ? (
                      <BuyerstCardTextWrap1 style={{marginRight : "1rem"}}>
                        <OrdersCardTextWrapper2>
                          <OrdersCardText1>_ _ </OrdersCardText1>
                        </OrdersCardTextWrapper2>

                        <OrdersCardTextWrapper2>
                          <OrdersCardText2>_ _</OrdersCardText2>
                        </OrdersCardTextWrapper2>
                      </BuyerstCardTextWrap1>
                    ) : (
                      <BuyerstCardTextWrap1 style={{marginRight : "1rem"}}>
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
                        <BuyerSignWrapper style={{backgroundColor : "#003543", padding : "0.4rem", borderRadius : "6px"}} >
                          <CheckedSign />
                        </BuyerSignWrapper>
                      </Tooltip>
                    )}

                    {myData.status === "CANCELED" && (
                      <Tooltip title="canceled">
                        <BuyerSignWrapper style={{backgroundColor : "#430E00", padding : "0.4rem", borderRadius : "6px"}}>
                          <CanceledSign />
                        </BuyerSignWrapper>
                      </Tooltip>
                    )}

                    {myData.status === "AWAITING_PAYMENT" && (
                      <Tooltip title="awaiting">
                        <BuyerSignWrapper style={{backgroundColor : "#430E00", padding : "0.4rem", borderRadius : "6px"}}>
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
