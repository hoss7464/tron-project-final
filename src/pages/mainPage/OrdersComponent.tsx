import React, { useEffect, useState } from "react";
import "./mainPage.css";
import { useTranslation } from "react-i18next";
import {
  OrdersWrapper,
  OrderMainWrapper,
  OrderNavWrapper,
  OedersPaginationWrapper,
  OrdersNavHeaderWrapper,
  AccountHeader,
  OrderNavTextWrapper1,
  OrderNavTextWrapper,
  OrderCardIconWrapper,
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
import LinearProgress from "@mui/material/LinearProgress";
import useGetData from "../../hooks/useGetData";
import Pagination from "@mui/material/Pagination";
import singleEnergy2 from "../../assets/svg/SingleEnergy2.svg";
import singleBandwidth2 from "../../assets/svg/SingleBandwidth2.svg";

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
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;
  const { data, error, getData, totalCount } = useGetData<Post>();

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.max(10, Math.ceil(totalCount / rowsPerPage));

  useEffect(() => {
    getData(
      `http://localhost:3001/post?_page=${currentPage}&_limit=${rowsPerPage}`
    );
  }, [currentPage]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
      <OrdersWrapper className="order-bg">
        <OrderMainWrapper>
          <OrdersNavHeaderWrapper>
            <AccountHeader>{t("orders")}</AccountHeader>
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
                {data?.map((myData) => (
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
                          <OrderCardIconWrapper>
                            <OrderCardIcon
                              alt="energy"
                              src={
                                myData.orderProduct === "energy"
                                  ? singleEnergy2
                                  : singleBandwidth2
                              }
                            />
                          </OrderCardIconWrapper>
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
                              backgroundColor: "#8DB186",
                              "& .MuiLinearProgress-bar": {
                                backgroundColor: "#1E650F",
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
                  backgroundColor: "#1E650F",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#1E650F",
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
