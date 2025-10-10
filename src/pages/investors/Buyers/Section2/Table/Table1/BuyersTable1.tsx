import React, { useState, useEffect, useCallback } from "react";
import "../BuyersTable.css";
import { useFetchData } from "../../../../../../contexts/FetchDataContext";
import {
  GetOrderResoponse,
  GetOrderData,
} from "../../../../../../services/requestService";
import {
  OrderMainWrapper,
  OrdersCarouselWrapper,
  MyOrdersScroll,
  MyOrdersNavWrapper,
  MyOrdersNavTextWrapper,
  MyOrdersTextWrapper,
  MyOrderDetails,
  MyOrdersInfoWrapper,
  MyOrdersInfoIcon,
  OrdersScroll,
  OrderNavWrapper,
  OrderNavTextWrapper1,
  OrderNavTextWrapper,
  OrderNavText,
  AvailableNavWrapper,
  AvailableNavTextWrapper,
  OrdersCard,
  OrdersDetail,
  OrdersCardTextWrap,
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
  CheckedSign,
  MyOrdersSellBtnWrapper,
  MyOrdersSell,
  CanceledSignWrapper,
  CanceledSign,
  MyOrderCardTextWrap,
  OedersPaginationWrapper,
} from "../../../../../mainPage/mainPageElements";
import LinearProgress from "@mui/material/LinearProgress";
import { Tooltip } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { formatDateTime } from "../../../../../../utils/dateTime";
import { formatStrictDuration } from "../../../../../../utils/fromSec";
import energyIcon from "../../../../../../assets/svg/EnergyIcon.svg";
import bandwidthIcon from "../../../../../../assets/svg/BandwidthIcon.svg";
import PopUp9 from "../../../../../../components/Popup/PopUp9";
import PopUp10 from "../../../../../../components/Popup/PopUp10";

const BuyersTable1: React.FC = () => {
  const { tradingOrderInfo } = useFetchData();
  const [wholeOrderInfo, setWholeOrderInfo] =
    useState<GetOrderResoponse | null>(null);
  const [myModalOpen, setMyModalOpen] = useState(false);
  const [myCancelOpen, setMyCancelOpen] = useState(false);
  const tronscanUrl = process.env.REACT_APP_TRONSCAN_TXID_URL;

  const [selectedOrder, setSelectedOrder] = useState<GetOrderData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  //to get data from server :
  useEffect(() => {
    if (tradingOrderInfo) {
      setWholeOrderInfo(tradingOrderInfo);
    }
  }, [tradingOrderInfo]);
  //------------------------------------------------------------------------------------------------------------

  //Functions for info popup :
  const handleInfoClick = () => {
    setMyModalOpen(true);
  };

  const handleCancelClick = (order: GetOrderData) => {
    setMyCancelOpen(true);
    setSelectedOrder(order);
  };

  const handlePopup9Close = useCallback(() => {
    setMyModalOpen(false);
  }, []);

  const handlePopup10Close = useCallback(() => {
    setMyCancelOpen(false);
  }, []);
  //------------------------------------------------------------------------------------------------------------
  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  if (wholeOrderInfo === null) {
    return;
  }
  const paginatedData = wholeOrderInfo.data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  //Pagination
  const totalPages = Math.ceil(wholeOrderInfo.data.length / rowsPerPage);
  //------------------------------------------------------------------------------------------------------------

  return (
    <>
      <OrderMainWrapper style={{ padding: "0" }}>
        <OrdersCarouselWrapper>
          <MyOrdersScroll style={{ height: "575px" }}>
            <MyOrdersNavWrapper>
              <MyOrdersNavTextWrapper>
                <MyOrdersTextWrapper style={{ marginLeft: "3rem" }}>
                  <OrderNavText>Date</OrderNavText>
                </MyOrdersTextWrapper>

                <MyOrdersTextWrapper>
                  <OrderNavText>amount</OrderNavText>
                </MyOrdersTextWrapper>

                <MyOrdersTextWrapper>
                  <OrderNavText>Price</OrderNavText>
                </MyOrdersTextWrapper>

                <MyOrdersTextWrapper>
                  <OrderNavText>Payment</OrderNavText>
                </MyOrdersTextWrapper>

                <MyOrdersTextWrapper>
                  <OrderNavText>Fulfilled</OrderNavText>
                </MyOrdersTextWrapper>
              </MyOrdersNavTextWrapper>
            </MyOrdersNavWrapper>

            <OrdersCard>
              {paginatedData.map((myData, index) => {
                const { date, time } = formatDateTime(myData.createdAt);
                const progressValue = Math.min(
                  (myData.frozen / myData.freeze) * 100,
                  100
                );
                const isDisabled = progressValue === 0;
                return (
                  <OrdersDetail key={index}>
                    <MyOrdersInfoWrapper
                      onClick={isDisabled ? undefined : () => handleInfoClick()}
                      style={{
                        cursor: isDisabled ? "not-allowed" : "pointer",
                        backgroundColor: isDisabled ? "#BECBCF" : "#430E00",
                      }}
                    >
                      <MyOrdersInfoIcon
                        style={{
                          cursor: isDisabled ? "not-allowed" : "pointer",
                        }}
                      />
                    </MyOrdersInfoWrapper>

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
                          {myData.resourceAmount.toLocaleString()}
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
                        <OrdersCardText1>{myData.price} SUN</OrdersCardText1>
                      </OrdersCardTextWrapper2>
                    </MyOrderCardTextWrap>

                    <MyOrderCardTextWrap>
                      <OrdersCardTextWrapper2>
                        <OrdersCardText1>
                          {Number(myData.totalPrice.toFixed(3))} TRX
                        </OrdersCardText1>
                      </OrdersCardTextWrapper2>
                    </MyOrderCardTextWrap>

                    <OrderCardLinearWrapper2>
                      <OrderCardLineraPercentWrapper>
                        <OrderCardLineraPercent>
                          {(() => {
                            const percent =
                              (myData.frozen / myData.freeze) * 100;
                            const cappedPercent = Math.min(percent, 100);

                            if (cappedPercent >= 100) return "100%";
                            if (Number.isInteger(cappedPercent))
                              return `${cappedPercent}%`;
                            return `${cappedPercent.toFixed(2)}%`;
                          })()}
                        </OrderCardLineraPercent>
                      </OrderCardLineraPercentWrapper>
                      <OrderCardLinearWrapper>
                        <LinearProgress
                          variant="determinate"
                          value={progressValue}
                          valueBuffer={myData.freeze}
                          sx={{
                            height: 5,
                            borderRadius: 5,
                            backgroundColor: "#C5B4B0",
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "#430E00",
                            },
                          }}
                        />
                      </OrderCardLinearWrapper>
                    </OrderCardLinearWrapper2>

                    {myData.status === "completed" && (
                      <Tooltip title="completed">
                        <CheckedSignWrapper>
                          <CheckedSign />
                        </CheckedSignWrapper>
                      </Tooltip>
                    )}

                    {myData.status === "processing" && (
                      <MyOrdersSellBtnWrapper
                        onClick={() => handleCancelClick(myData)}
                      >
                        <MyOrdersSell>Cancel</MyOrdersSell>
                      </MyOrdersSellBtnWrapper>
                    )}

                    {myData.status === "cancelled" && (
                      <Tooltip title="canceled">
                        <CanceledSignWrapper>
                          <CanceledSign />
                        </CanceledSignWrapper>
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

      {myModalOpen && (
        <PopUp9
          open={myModalOpen}
          onClose={handlePopup9Close}
          orderData={
            selectedOrder
              ? tradingOrderInfo?.data?.find(
                  (order) => order._id === selectedOrder._id
                ) || selectedOrder
              : null
          }
        />
      )}

      {myCancelOpen && (
        <PopUp10
          open={myCancelOpen}
          onClose={handlePopup10Close}
          orderData={selectedOrder}
        />
      )}
    </>
  );
};

export default BuyersTable1;
