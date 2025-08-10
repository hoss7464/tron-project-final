import React, { useEffect } from "react";
import "./mainPage.css";
import { useTranslation } from "react-i18next";
import useGetData from "../../hooks/MyOrdersSection/useGetData";
import { useSelector, useDispatch } from "react-redux";
import { showNotification } from "../../redux/actions/notifSlice";
import { RootState } from "../../redux/store/store";
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
} from "./mainPageElements";
import { OrderCardIconWrapper2 } from "./mainPageElements";
import { LegacyCardName } from "./LegacySection/LegacyElements";
import { sortByDateTime } from "../../utils/sortByDateAndTime";
import MyFilterComponent from "../../components/FilterComponent/MyFilterComponent";
import energyIcon from "../../assets/svg/EnergyIcon.svg";
import bandwidthIcon from "../../assets/svg/BandwidthIcon.svg";
import axios from "axios";

type Post = {
  id: number;
  date: string;
  time: string;
  totalPrice: number;
  resourceAmount: number;
  resourceType: string;
  durationSec: number;
  price: number;
};

const MyOrdersComponent: React.FC = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation();
  const { data, error, getData } = useGetData<Post[]>();
  const refreshTrigger = useSelector(
    (state: RootState) => state.refresh.refreshTrigger
  );
  const selectedFilter = useSelector(
    (state: RootState) => state.filters["myOrders"] || "All"
  );

   useEffect(() => {
      const baseUrl = process.env.REACT_APP_BASE_URL;
      
      const getOrderList = async () => {
        try {
          const response = await axios.get(
            `${baseUrl}/order/myOrder`,
            {
              headers: { "Content-Type": "application/json" },
              timeout: 1000,
              withCredentials : true 
            }
          );
  
          console.log(response)
        } catch (error) {
          console.error("Failed to fetch setting UI:", error);
        } 
      };
      getOrderList();
    }, [refreshTrigger]);

  const sortedData = sortByDateTime(data || []);
  const filteredData =
    selectedFilter === "All"
      ? sortedData
      : sortedData.filter((item) => item.resourceType === selectedFilter);

  if (error) {
    dispatch(showNotification({
    name: "error4", 
    message: "Error Fetching Data.", 
    severity: "error" 
  }));
  return null
  }

  return (
    <>
      <MyOrdersWrapper className="my-orders-bg2">
        <OrderMainWrapper>
          <OrdersNavHeaderWrapper>
            <LegacyCardName>My Orders</LegacyCardName>
            <MyFilterComponent
              listKey="myOrders"
              options={["All", "energy", "bandwidth"]}
              label="Product"
            />
          </OrdersNavHeaderWrapper>
          <OrdersCarouselWrapper>
            <MyOrdersScroll>
              <MyOrdersNavWrapper>
                <MyOrdersNavTextWrapper>
                  <MyOrdersTextWrapper>
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
                </MyOrdersNavTextWrapper>
              </MyOrdersNavWrapper>
              <OrdersCard>
                {filteredData.map((myData) => (
                  <>
                    <MyOrderDetails key={myData.id}>
                      <MyOrderCardTextWrap>
                        <OrdersCardTextWrapper2>
                          <OrdersCardText1>{myData.date}</OrdersCardText1>
                        </OrdersCardTextWrapper2>
                        <OrdersCardTextWrapper2>
                          <OrdersCardText2>{myData.time}</OrdersCardText2>
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
                          <OrdersCardText1>{myData.resourceAmount}</OrdersCardText1>
                        </OrdersCardTextWrapper2>
                        <OrdersCardTextWrapper2>
                          <OrdersCardText2>
                            {myData.durationSec}
                          </OrdersCardText2>
                        </OrdersCardTextWrapper2>
                      </MyOrderCardTextWrap>

                      <MyOrderCardTextWrap>
                        <OrdersCardTextWrapper2>
                          <OrdersCardText1>{myData.price}</OrdersCardText1>
                        </OrdersCardTextWrapper2>
                      </MyOrderCardTextWrap>

                      <MyOrderCardTextWrap>
                        <OrdersCardTextWrapper2>
                          <OrdersCardText1>
                            {myData.totalPrice} TRX
                          </OrdersCardText1>
                        </OrdersCardTextWrapper2>
                      </MyOrderCardTextWrap>
                    </MyOrderDetails>
                  </>
                ))}
              </OrdersCard>
            </MyOrdersScroll>
          </OrdersCarouselWrapper>
        </OrderMainWrapper>
      </MyOrdersWrapper>
    </>
  );
};

export default MyOrdersComponent;
