import React, { useEffect, useState } from "react";
import "./mainPage.css";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
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
  OrderCardIconWrapper,
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
} from "./mainPageElements";
import { LegacyCardName } from "./LegacySection/LegacyElements";
import LinearProgress from "@mui/material/LinearProgress";
import useGetData from "../../hooks/useGetData";
import Pagination from "@mui/material/Pagination";
import energyIcon from "../../assets/svg/EnergyIcon.svg";
import bandwidthIcon from "../../assets/svg/BandwidthIcon.svg";
import { sortByDateTime2 } from "../../utils/sortByDateAndTime2";

type Post = {
  orderId: number;
  orderTime: string;
  orderDate: string;
  orderResource: string;
  orderRentTime: string;
  orderRentTimeNumber: number;
  orderRentTimeDate: string;
  orderPrice: string;
  orderAPY: string;
  orderPayment: string;
  orderFulfilled: number;
  orderProduct: string;
};

export const OrdersComponent: React.FC = () => {
  //States :
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;
  const { data, error, getData } = useGetData<Post>();
  //Selectors :
  const selectedFilter = useSelector(
    (state: RootState) => state.filters["orders"] || "All"
  );

  //Function for pagination :
  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };
  //Filter and sort data based on Date/Time & energy/bandwidth
  const sortedData = sortByDateTime2(data || []);
  const filteredData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  //Pagination
  const totalPages = Math.ceil((data?.length || 0) / rowsPerPage);
  //Function to get data from server :
  useEffect(() => {
    const filterParam =
      selectedFilter === "All" ? "" : `orderProduct=${selectedFilter}`;

    //Fetch all filtered data first
    getData(`http://localhost:3001/post?${filterParam}`);
  }, [selectedFilter]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;

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
              options={["All", "energy", "bandwidth"]}
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
                {filteredData.map((myData) => (
                  <>
                    <OrdersDetail key={myData.orderId}>
                      <OrdersCardTextWrap>
                        <OrdersCardTextWrapper2>
                          <OrdersCardText1>{myData.orderTime}</OrdersCardText1>
                        </OrdersCardTextWrapper2>
                        <OrdersCardTextWrapper2>
                          <OrdersCardText2>{myData.orderDate}</OrdersCardText2>
                        </OrdersCardTextWrapper2>
                      </OrdersCardTextWrap>

                      <OrdersCardTextWrap>
                        <OrdersCardTextWrapper2>
                          {myData.orderProduct === "energy" ? (
                            
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
                            {myData.orderResource}
                          </OrdersCardText1>
                        </OrdersCardTextWrapper2>
                        <OrdersCardTextWrapper2>
                          <OrdersCardText2>
                            {myData.orderRentTimeNumber}
                            {t(`${myData.orderRentTimeDate}`)}
                          </OrdersCardText2>
                        </OrdersCardTextWrapper2>
                      </OrdersCardTextWrap>

                      <OrdersCardTextWrap>
                        <OrdersCardTextWrapper2>
                          <OrdersCardText1>
                            {myData.orderPrice} SUN
                          </OrdersCardText1>
                        </OrdersCardTextWrapper2>
                        <OrdersCardTextWrapper2>
                          <OrdersCardText2>
                            APY: {myData.orderAPY} %
                          </OrdersCardText2>
                        </OrdersCardTextWrapper2>
                      </OrdersCardTextWrap>

                      <OrdersCardTextWrap>
                        <OrdersCardTextWrapper2>
                          <OrdersCardText1>
                            {myData.orderPayment}
                          </OrdersCardText1>
                        </OrdersCardTextWrapper2>
                      </OrdersCardTextWrap>

                      <OrderCardLinearWrapper2>
                        <OrderCardLineraPercentWrapper>
                          <OrderCardLineraPercent>
                            {myData.orderFulfilled}%
                          </OrderCardLineraPercent>
                        </OrderCardLineraPercentWrapper>
                        <OrderCardLinearWrapper>
                          <LinearProgress
                            variant="determinate"
                            value={myData.orderFulfilled}
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

                      <OrdersSellBtnWrapper>
                        <OrdersSell>Sell</OrdersSell>
                      </OrdersSellBtnWrapper>
                    </OrdersDetail>
                  </>
                ))}
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
    </>
  );
};

export default OrdersComponent;
