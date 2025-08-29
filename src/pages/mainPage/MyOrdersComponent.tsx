import React, { useEffect, useState } from "react";
import "./mainPage.css";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { showNotification } from "../../redux/actions/notifSlice";
import { RootState } from "../../redux/store/store";
import { toggleRefresh } from "../../redux/actions/refreshSlice";
import {
  MyOrdersWrapper,
  OrderMainWrapper,
  OrdersCarouselWrapper,
  MyOrdersScroll,
  MyOrderDetails,
  MyOrderCardTextWrap,
  OrdersCard,
  MyOrdersNavWrapper,
  OrdersNavHeaderWrapper,
  MyOrdersNavTextWrapper,
  OrderNavText,
  OrderCardIcon,
  OrdersCardTextWrapper2,
  OrdersCardText1,
  OrdersCardText2,
  MyOrdersTextWrapper,
  CheckedSignWrapper,
  CheckedSign,
  MyOrdersSellBtnWrapper,
  MyOrdersSell,
  CanceledSignWrapper,
  CanceledSign,
  OrderCardLinearWrapper2,
  OrderCardLineraPercentWrapper,
  OrderCardLineraPercent,
  OrderCardLinearWrapper,
  MyOrdersInfoWrapper,
  MyOrdersInfoIcon,
} from "./mainPageElements";

import LinearProgress from "@mui/material/LinearProgress";
import { OrderCardIconWrapper2 } from "./mainPageElements";
import { LegacyCardName } from "./LegacySection/LegacyElements";
import {
  sortAndFilterOrders2,
  SortOption,
} from "../../utils/sortByDateAndTime";
import MyFilterComponent from "../../components/FilterComponent/MyFilterComponent";
import energyIcon from "../../assets/svg/EnergyIcon.svg";
import bandwidthIcon from "../../assets/svg/BandwidthIcon.svg";
import { useTronWallet } from "../../contexts/TronWalletContext";
import { formatDateTime } from "../../utils/dateTime";
import { formatStrictDuration } from "../../utils/fromSec";
import { useFetchData } from "../../contexts/FetchDataContext";
import { MyMarketOrder } from "../../services/requestService";
import PopUp4 from "../../components/Popup/PoUp4";
import PopUp5 from "../../components/Popup/PopUp5";
import { Tooltip } from "@mui/material";

interface ServerResponse {
  success: boolean;
  data: MyInfoOrder[];
}

interface Hold {
  qty: number;
  txid: string;
  settledAt: string; // or Date if you plan to convert to Date objects
}

export interface MyInfoOrder {
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
  };
  price: number;
  receiver: string;
  resourceAmount: number;
  resourceType: string;
  status: "pending" | "processing" | "completed" | "failed" | "cancelled";
  totalPrice: number;
  type: string;
  holds: Hold[];
}

const MyOrdersComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { address } = useTronWallet();
  const { myOrderData, fetchData } = useFetchData();
  const [myModalOpen, setMyModalOpen] = useState(false);
  const [myCancelOpen, setMyCancelOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<MyMarketOrder | null>(
    null
  );

  const refreshTrigger = useSelector(
    (state: RootState) => state.refresh.refreshTrigger
  );
  const selectedFilter = useSelector(
    (state: RootState) => state.filters["myOrders"] || "All"
  );

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

  // Filter by status first (only processing and completed)
  const statusFilteredData2 = myOrderData?.data
    ? myOrderData.data.filter(
        (myOrder) =>
          myOrder.status === "processing" ||
          myOrder.status === "completed" ||
          myOrder.status === "cancelled"
      )
    : [];

  // Then sort the filtered data
  const filteredAndSortedData = sortAndFilterOrders2(
    statusFilteredData2,
    selectedFilter === "All" ? "latest" : (selectedFilter as SortOption)
  );

  //Function to calculate total price :
  const handleTotal = (myFreeze: number, myPair: number | null) => {
    if (myPair === null) {
      return 0;
    }
    const calcTotal = myFreeze * myPair;
    return calcTotal;
  };

  //Functions for info popup :
  const handleInfoClick = (order: MyMarketOrder) => {
    setMyModalOpen(true);
    setSelectedOrder(order);
  };

  //Functions for info popup :
  const handleCancelClick = (order: MyMarketOrder) => {
    setMyCancelOpen(true);
    setSelectedOrder(order);
  };

  return (
    <>
      <MyOrdersWrapper className="my-orders-bg2">
        <OrderMainWrapper>
          <OrdersNavHeaderWrapper>
            <LegacyCardName>My Orders</LegacyCardName>
            <MyFilterComponent
              listKey="myOrders"
              options={["latest", "energy", "bandwidth", "price", "oldest"]}
              label="Product"
            />
          </OrdersNavHeaderWrapper>
          <OrdersCarouselWrapper>
            <MyOrdersScroll>
              <MyOrdersNavWrapper>
                <MyOrdersNavTextWrapper>
                  <MyOrdersTextWrapper style={{ marginLeft: "3rem" }}>
                    <OrderNavText>{t("date")}</OrderNavText>
                  </MyOrdersTextWrapper>

                  <MyOrdersTextWrapper>
                    <OrderNavText>amount</OrderNavText>
                  </MyOrdersTextWrapper>

                  <MyOrdersTextWrapper>
                    <OrderNavText>{t("price")}</OrderNavText>
                  </MyOrdersTextWrapper>

                  <MyOrdersTextWrapper>
                    <OrderNavText>{t("payment")}</OrderNavText>
                  </MyOrdersTextWrapper>

                  <MyOrdersTextWrapper>
                    <OrderNavText>{t("fulfilled")}</OrderNavText>
                  </MyOrdersTextWrapper>
                </MyOrdersNavTextWrapper>
              </MyOrdersNavWrapper>
              <OrdersCard>
                {filteredAndSortedData.map((myData, index) => {
                  const { date, time } = formatDateTime(myData.createdAt);
                  const progressValue = Math.min(
                    (myData.frozen / myData.freeze) * 100,
                    100
                  );
                  const isDisabled = progressValue === 0;

                  return (
                    <MyOrderDetails key={index}>
                      <MyOrdersInfoWrapper
                        onClick={
                          isDisabled ? undefined : () => handleInfoClick(myData)
                        }
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
                            {Number(
                              handleTotal(
                                myData.freeze,
                                myData.energyPairTrx
                              ).toFixed(3)
                            )}{" "}
                            TRX
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
                        <CanceledSignWrapper  >
                          <CanceledSign />
                        </CanceledSignWrapper>
                        </Tooltip>
                      )}
                    </MyOrderDetails>
                  );
                })}
              </OrdersCard>
            </MyOrdersScroll>
          </OrdersCarouselWrapper>
        </OrderMainWrapper>
      </MyOrdersWrapper>

      <PopUp4
        open={myModalOpen}
        onClose={() => setMyModalOpen(false)}
        orderData={
          selectedOrder
            ? myOrderData?.data?.find(
                (order) => order._id === selectedOrder._id
              ) || selectedOrder
            : null
        }
      />

      <PopUp5
        open={myCancelOpen}
        onClose={() => setMyCancelOpen(false)}
        orderData={selectedOrder}
      />
    </>
  );
};

export default MyOrdersComponent;
