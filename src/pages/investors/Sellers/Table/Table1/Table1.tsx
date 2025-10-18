import React, { useState, useEffect, useCallback } from "react";
import { useFetchData } from "../../../../../contexts/FetchDataContext";
import { SellersOrdersResponse } from "../../../../../services/requestService";
import {CanceledSign, CheckedSign, BuyerSignWrapper} from "../../../Buyers/Section2/Table/BuyersTableElements"
import {
  OrderMainWrapper,
  OrdersCarouselWrapper,
  MyOrdersScroll,
  MyOrdersNavWrapper,
  MyOrdersNavTextWrapper,
  MyOrdersTextWrapper,
  MyOrdersInfoWrapper,
  MyOrdersInfoIcon,
  OrderNavText,
  OrdersCard,
  OrdersDetail,
  OrdersCardTextWrapper2,
  OrdersCardText1,
  OrdersCardText2,
  OrderCardIconWrapper2,
  OrderCardIcon,
  OrderCardLinearWrapper2,
  OrderCardLineraPercentWrapper,
  OrderCardLineraPercent,
  OrderCardLinearWrapper,
  CheckedSignWrapper,
  MyOrdersSellBtnWrapper,
  MyOrdersSell,
  CanceledSignWrapper,
  MyOrderCardTextWrap,
  OedersPaginationWrapper,
} from "../../../../mainPage/mainPageElements";
import { LoopSign } from "../SellersTablesElements";
import { Tooltip } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { formatDateTime, formatDateTime2 } from "../../../../../utils/dateTime";
import { formatStrictDuration } from "../../../../../utils/fromSec";
import energyIcon from "../../../../../assets/svg/EnergyIcon.svg";
import bandwidthIcon from "../../../../../assets/svg/BandwidthIcon.svg";

const SellersTable1: React.FC = () => {
  const { sellersOrderInfo } = useFetchData();
  const [wholeSellersOrderInfo, setWholeSellersOrderInfo] =
    useState<SellersOrdersResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  //to get data from server :
  useEffect(() => {
    if (sellersOrderInfo) {
      setWholeSellersOrderInfo(sellersOrderInfo);
    }
  }, [sellersOrderInfo]);
  //---------------------------------------------------------------------------------
  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  if (wholeSellersOrderInfo === null) {
    return;
  }

  const paginatedData = wholeSellersOrderInfo.data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  //Pagination
  const totalPages = Math.ceil(wholeSellersOrderInfo.data.length / rowsPerPage);

  return (
    <>
      <OrderMainWrapper style={{ padding: "0" }}>
        <OrdersCarouselWrapper>
          <MyOrdersScroll style={{ height: "575px" }}>
            <MyOrdersNavWrapper>
              <MyOrdersNavTextWrapper
                style={{ justifyContent: "space-between", width: "88%" }}
              >
                <MyOrdersTextWrapper>
                  <OrderNavText>Date</OrderNavText>
                </MyOrdersTextWrapper>

                <MyOrdersTextWrapper>
                  <OrderNavText>Amount</OrderNavText>
                </MyOrdersTextWrapper>

                <MyOrdersTextWrapper>
                  <OrderNavText>Profit</OrderNavText>
                </MyOrdersTextWrapper>

                <MyOrdersTextWrapper>
                  <OrderNavText>Expired</OrderNavText>
                </MyOrdersTextWrapper>
              </MyOrdersNavTextWrapper>
            </MyOrdersNavWrapper>

            <OrdersCard style={{ justifyContent: "space-between" }}>
              {paginatedData.map((myData, index) => {
                const { date, time } = formatDateTime(myData.createdAt);
                const { myDate, myTime } = formatDateTime2(myData.expiredAt);

                return (
                  <OrdersDetail
                    key={index}
                    style={{ justifyContent: "space-between" }}
                  >
                    <MyOrderCardTextWrap>
                      <OrdersCardTextWrapper2>
                        <OrdersCardText1>{date}</OrdersCardText1>
                      </OrdersCardTextWrapper2>
                      <OrdersCardTextWrapper2>
                        <OrdersCardText2>{time}</OrdersCardText2>
                      </OrdersCardTextWrapper2>
                    </MyOrderCardTextWrap>

                    <MyOrderCardTextWrap>
                      <OrdersCardTextWrapper2>
                        {myData.resourceType === "energy" ? (
                          <OrderCardIconWrapper2
                            style={{ backgroundColor: "#003543" }}
                          >
                            <OrderCardIcon alt="energy" src={energyIcon} />
                          </OrderCardIconWrapper2>
                        ) : (
                          <OrderCardIconWrapper2
                            style={{ backgroundColor: "#430E00" }}
                          >
                            <OrderCardIcon
                              alt="bandwidth"
                              src={bandwidthIcon}
                            />
                          </OrderCardIconWrapper2>
                        )}
                        <OrdersCardText1>
                          {myData.amount.toLocaleString()}
                        </OrdersCardText1>
                      </OrdersCardTextWrapper2>
                      <OrdersCardTextWrapper2>
                        <OrdersCardText2>
                          {formatStrictDuration(myData.durationSec)}
                        </OrdersCardText2>
                      </OrdersCardTextWrapper2>
                    </MyOrderCardTextWrap>

                    <MyOrderCardTextWrap>
                      <OrdersCardTextWrapper2>
                        <OrdersCardText1>
                          {(myData.profitSun / 1_000_000).toLocaleString()} TRX
                        </OrdersCardText1>
                      </OrdersCardTextWrapper2>
                    </MyOrderCardTextWrap>

                    <MyOrderCardTextWrap>
                      <OrdersCardTextWrapper2>
                        <OrdersCardText1>{myDate}</OrdersCardText1>
                      </OrdersCardTextWrapper2>
                      <OrdersCardTextWrapper2>
                        <OrdersCardText2>{myTime}</OrdersCardText2>
                      </OrdersCardTextWrapper2>
                    </MyOrderCardTextWrap>

                    {myData.status === "recycled" && (
                      <Tooltip title="recycled">
                        <BuyerSignWrapper  style={{
                            backgroundColor: "#003543",
                            padding: "0.4rem",
                            borderRadius: "6px",
                          }} >
                          <CheckedSign />
                        </BuyerSignWrapper>
                      </Tooltip>
                    )}

                    {myData.status === "problem" && (
                      <Tooltip title="problem">
                        <BuyerSignWrapper
                          style={{
                            backgroundColor: "#430E00",
                            padding: "0.4rem",
                            borderRadius: "6px",
                          }}
                        >
                          <CanceledSign
                            
                          />
                        </BuyerSignWrapper>
                      </Tooltip>
                    )}

                    {myData.status === "completed" && (
                      <Tooltip title="completed">
                        <BuyerSignWrapper
                          style={{
                            backgroundColor: "#003543",
                            padding: "0.2rem",
                            borderRadius: "6px",
                          }}
                        >
                          <LoopSign />
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

export default SellersTable1;
