import React, { useEffect } from "react";
import "./mainPage.css";
import { useTranslation } from "react-i18next";
import useGetData from "../../hooks/MyOrdersSection/useGetData";
import {
  MyOrdersWrapper,
  MyOrdersWrapper2,
  OrderNavWrapper,
  OrdersNavHeaderWrapper,
  AccountHeader,
  OrderNavTextWrapper1,
  OrderNavTextWrapper2,
  OrderNavText,
  OrderNavTextWrapper3,
  OrderNavTextWrapper4,
  OrderNavTextWrapper5,
  OrdersCardWrapper,
  OrdersCardTextWrap1,
  OrdersCardTextWrapper2,
  OrdersCardText1,
  OrdersCardText2,
  OrdersCardTextWrap2,
  OrdersCardTextWrap3,
  OrdersCardTextWrap4,
} from "./mainPageElements";

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
};

const MyOrdersComponent: React.FC = () => {
  const { t } = useTranslation();
  const { data, error, getData } = useGetData<Post[]>();

  useEffect(() => {
    getData("http://localhost:3001/post");
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
      <MyOrdersWrapper className="order-bg">
        <OrderNavWrapper>
          <OrdersNavHeaderWrapper>
            <AccountHeader>{t("my_orders")}</AccountHeader>
          </OrdersNavHeaderWrapper>
          <OrderNavTextWrapper1>
            <OrderNavTextWrapper2>
              <OrderNavText>{t("date")}</OrderNavText>
            </OrderNavTextWrapper2>

            <OrderNavTextWrapper3>
              <OrderNavText>{t("resource")}</OrderNavText>
            </OrderNavTextWrapper3>

            <OrderNavTextWrapper4>
              <OrderNavText>{t("price")}</OrderNavText>
            </OrderNavTextWrapper4>

            <OrderNavTextWrapper5>
              <OrderNavText>{t("payment")}</OrderNavText>
            </OrderNavTextWrapper5>
          </OrderNavTextWrapper1>
        </OrderNavWrapper>
        <MyOrdersWrapper2>
          {data?.map((myData2) => (
            <OrdersCardWrapper
              key={myData2.orderId}
              style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
            >
              <OrdersCardTextWrap1>
                <OrdersCardTextWrapper2>
                  <OrdersCardText1>{myData2.orderTime}</OrdersCardText1>
                </OrdersCardTextWrapper2>
                <OrdersCardTextWrapper2>
                  <OrdersCardText2>{myData2.orderDate}</OrdersCardText2>
                </OrdersCardTextWrapper2>
              </OrdersCardTextWrap1>

              <OrdersCardTextWrap2>
                <OrdersCardTextWrapper2>
                  <OrdersCardText1>{myData2.orderResource}</OrdersCardText1>
                </OrdersCardTextWrapper2>
                <OrdersCardTextWrapper2>
                  <OrdersCardText2>
                    {myData2.orderRentTimeNumber}
                    {t(`${myData2.orderRentTimeDate}`)}
                  </OrdersCardText2>
                </OrdersCardTextWrapper2>
              </OrdersCardTextWrap2>

              <OrdersCardTextWrap3>
                <OrdersCardTextWrapper2>
                  <OrdersCardText1>{myData2.orderPrice} SUN</OrdersCardText1>
                </OrdersCardTextWrapper2>
                <OrdersCardTextWrapper2>
                  <OrdersCardText2>APY: {myData2.orderAPY} %</OrdersCardText2>
                </OrdersCardTextWrapper2>
              </OrdersCardTextWrap3>

              <OrdersCardTextWrap4>
                <OrdersCardTextWrapper2>
                  <OrdersCardText1>{myData2.orderPayment}</OrdersCardText1>
                </OrdersCardTextWrapper2>
              </OrdersCardTextWrap4>
            </OrdersCardWrapper>
          ))}
        </MyOrdersWrapper2>
      </MyOrdersWrapper>
    </>
  );
};

export default MyOrdersComponent;
