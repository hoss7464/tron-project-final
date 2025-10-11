import React, { useEffect, useState, useCallback } from "react";
import "./mainPage.css";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { showNotification } from "../../redux/actions/notifSlice";
import { RootState } from "../../redux/store/store";
import MyFilterComponent from "../../components/FilterComponent/MyFilterComponent";
import {
  OrdersWrapper,
  OrderMainWrapper,
  OrderNavWrapper,
  OedersPaginationWrapper,
  OrdersNavHeaderWrapper,
  OrderNavTextWrapper1,
  OrderNavTextWrapper,
  OrderCardIconWrapper2,
  OrderCardIcon,
  OrderNavText,
  OrdersCarouselWrapper,
  OrdersScroll,
  OrdersCard,
  OrdersDetail,
  OrdersCardTextWrap,
  OrdersCardTextWrapper2,
  OrdersCardText1,
  OrdersCardText2,
  OrderCardLinearWrapper,
  OrderCardLinearWrapper2,
  OrderCardLineraPercentWrapper,
  OrderCardLineraPercent,
  OrdersSellBtnWrapper,
  OrdersSell,
  CheckedSignWrapper,
  CheckedSign,
} from "./mainPageElements";
import { useTronWallet } from "../../contexts/TronWalletContext";
import { LegacyCardName } from "./LegacySection/LegacyElements";
import LinearProgress from "@mui/material/LinearProgress";
import Pagination from "@mui/material/Pagination";
import energyIcon from "../../assets/svg/EnergyIcon.svg";
import bandwidthIcon from "../../assets/svg/BandwidthIcon.svg";
import {
  sortAndFilterOrders,
  SortOption,
} from "../../utils/sortByDateAndTime2";
import { formatDateTime } from "../../utils/dateTime";
import { formatStrictDuration } from "../../utils/fromSec";
import { durationToNumber } from "../../utils/durationToNum";
import PopUp3 from "../../components/Popup/PopUp3";
import { useFetchData } from "../../contexts/FetchDataContext";

interface ServerResponse {
  success: boolean;
  data: MarketOrder[];
}
export interface MarketOrder {
  _id: string;
  createdAt: string;
  durationSec: number;
  freeze: number;
  frozen: number;
  energyPairTrx: number | null;
  lock: boolean;
  options: {
    allow_partial: boolean;
    bulk_order: boolean;
    partial_min: number;
    partial_min_trx: number;
  };
  price: number;
  receiver: string;
  resourceAmount: number;
  resourceType: string;
  status: "pending" | "processing" | "completed" | "failed" | "cancelled";
  totalPrice: number;
  type: string;
}

export const OrdersComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { orderData, fetchData } = useFetchData();
  //States :
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;
  const { address } = useTronWallet();
  
  const [selectedOrder, setSelectedOrder] = useState<MarketOrder | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [delegateValue, setDelegateValue] = useState<number | null>(null);
  const [pairTrx, setPairTrx] = useState<number | null>(null);

  //Selectors :
  const selectedFilter = useSelector(
    (state: RootState) => state.filters["orders"] || "All"
  );
  const refreshTrigger = useSelector(
    (state: RootState) => state.refresh.refreshTrigger
  );
  //------------------------------------------------------------------------------------------------------------
  // Effect to refresh data when refreshTrigger changes
  useEffect(() => {
    const refreshData = async () => {
      try {
        await fetchData();
      } catch (error) {
        console.error("Error refreshing data:", error);
      }
    };

    if (refreshTrigger) {
      refreshData();
    }
  }, [refreshTrigger, fetchData]);



  //------------------------------------------------------------------------------------------------------------
  //Function for pagination :
  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };
  //------------------------------------------------------------------------------------------------------------
  //Filter and sort data :

  // Filter by status first (only processing and completed)
  const statusFilteredData = orderData?.data
    ? orderData.data.filter(
        (order) => order.status === "processing" || order.status === "completed"
      )
    : [];

  // Then sort the filtered data
  const filteredAndSortedData = sortAndFilterOrders(
    statusFilteredData,
    selectedFilter === "All" ? "price" : (selectedFilter as SortOption)
  );

  const paginatedData = filteredAndSortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  //Pagination
  const totalPages = Math.ceil(filteredAndSortedData.length / rowsPerPage);
  //------------------------------------------------------------------------------------------------------------
  //Function to calculate APY :
  const calcAPY = (
    myTotal: number,
    myFreeze: number,
    myDuration: number,
    opts?: { compoundCapPerYear?: number }
  ): number => {
    let days = durationToNumber(myDuration);
    if (!myFreeze || !days) return 0;
    if (days > 0 && days < 1) {
      days = 1;
    }
    const rPeriod = myTotal / (myFreeze / 1e6 );
    const rawN = 365 / days;
    const n =
      opts?.compoundCapPerYear != null
        ? Math.min(rawN, opts.compoundCapPerYear)
        : rawN;
    const APY = Number((Math.expm1(Math.log1p(rPeriod) * n) * 100).toFixed(2));
    return APY;
  };
  //------------------------------------------------------------------------------------------------------------
  //Functions for popup :
  const handleSellClick = (order: MarketOrder) => {
    if (!address) {
      dispatch(
        showNotification({
          name: "error6",
          message: "Connect your wallet.",
          severity: "error",
        })
      );
      return;
    }
    const value = order.freeze - order.frozen;
    const myPairTrx = order.energyPairTrx;
    setDelegateValue(value);
    setSelectedOrder(order);
    setIsModalOpen(true);
    setPairTrx(myPairTrx);
  };
  //------------------------------------------------------------------------------------------------------------
  //Function to calculate total price :
  const handleTotal = (myFreeze: number, myPair: number | null) => {
    if (myPair === null) {
      return 0;
    }
    const calcTotal = myFreeze * myPair;
    return calcTotal;
  };
  //------------------------------------------------------------------------------------------------------------
  const handleClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <OrdersWrapper className="order-bg">
        <OrderMainWrapper>
          
          <OrdersNavHeaderWrapper>
            <LegacyCardName style={{ color: "#003543" }}>
              {t("orders")}
            </LegacyCardName>
            <MyFilterComponent
              listKey="orders"
              options={["price", "energy", "bandwidth", "latest", "oldest"]}
              label="Product"
            />
          </OrdersNavHeaderWrapper>

          <OrdersCarouselWrapper>
            <OrdersScroll>
              <OrderNavWrapper>
                <OrderNavTextWrapper1>
                  <OrderNavTextWrapper>
                    <OrderNavText>{t("date")}</OrderNavText>
                  </OrderNavTextWrapper>

                  <OrderNavTextWrapper>
                    <OrderNavText>amount</OrderNavText>
                  </OrderNavTextWrapper>

                  <OrderNavTextWrapper>
                    <OrderNavText>{t("price")}</OrderNavText>
                  </OrderNavTextWrapper>

                  <OrderNavTextWrapper>
                    <OrderNavText>{t("payment")}</OrderNavText>
                  </OrderNavTextWrapper>

                  <OrderNavTextWrapper>
                    <OrderNavText>{t("fulfilled")}</OrderNavText>
                  </OrderNavTextWrapper>
                </OrderNavTextWrapper1>
              </OrderNavWrapper>

              <OrdersCard>
                {paginatedData.map((myData, index) => {
                  const { date, time } = formatDateTime(myData.createdAt);

                  return (
                    <OrdersDetail key={index}>
                      
                      <OrdersCardTextWrap>
                        <OrdersCardTextWrapper2>
                          <OrdersCardText1>{time}</OrdersCardText1>
                        </OrdersCardTextWrapper2>
                        <OrdersCardTextWrapper2>
                          <OrdersCardText2>{date}</OrdersCardText2>
                        </OrdersCardTextWrapper2>
                      </OrdersCardTextWrap>

                      <OrdersCardTextWrap>
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
                      </OrdersCardTextWrap>

                      <OrdersCardTextWrap>
                        <OrdersCardTextWrapper2>
                          <OrdersCardText1>{myData.price} SUN</OrdersCardText1>
                        </OrdersCardTextWrapper2>
                        <OrdersCardTextWrapper2>
                          <OrdersCardText2>
                            APY:{" "}
                            {calcAPY(
                              myData.totalPrice,
                              myData.freeze,
                              myData.durationSec
                            )}{" "}
                            %
                          </OrdersCardText2>
                        </OrdersCardTextWrapper2>
                      </OrdersCardTextWrap>

                      <OrdersCardTextWrap>
                        <OrdersCardTextWrapper2>
                          <OrdersCardText1>
                            {Number(
                              handleTotal(
                                myData.freeze,
                                myData.energyPairTrx
                              ).toFixed(3)
                            )}{" "}
                            TRX
                          </OrdersCardText1>
                        </OrdersCardTextWrapper2>
                      </OrdersCardTextWrap>

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
                            value={Math.min(
                              (myData.frozen / myData.freeze) * 100,
                              100
                            )}
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

                      {myData.status === "completed" ? (
                        <CheckedSignWrapper>
                          <CheckedSign />
                        </CheckedSignWrapper>
                      ) : (
                        <OrdersSellBtnWrapper
                          onClick={() => handleSellClick(myData)}
                        >
                          <OrdersSell>Sell</OrdersSell>
                        </OrdersSellBtnWrapper>
                      )}
                    </OrdersDetail>
                  );
                })}
              </OrdersCard>
            </OrdersScroll>
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

      </OrdersWrapper>
      {isModalOpen && (
        <PopUp3
          open={isModalOpen}
          onClose={handleClose}
          order={selectedOrder}
          myDelegate={delegateValue}
          pairTrx={pairTrx}
        />
      )}
    </>
  );
};

export default OrdersComponent;
