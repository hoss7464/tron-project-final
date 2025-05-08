import React, { useEffect, useState } from "react";
import "./mainPage.css";
import { colors } from "../../core-UI/Theme";
import { useTranslation } from "react-i18next";
import {
  OrdersWrapper,
  OrderNavWrapper,
  OrdersWrapper2,
  OedersPaginationWrapper,
  OrdersNavHeaderWrapper,
  AccountHeader,
  OrderNavTextWrapper1,
  OrderNavTextWrapper2,
  OrderNavTextWrapper3,
  OrderNavTextWrapper4,
  OrderNavTextWrapper5,
  OrderNavTextWrapper6,
  OrderNavTextWrapper7,
  OrderNavText,
  OrdersCardWrapper,
  OrdersCardTextWrap1,
  OrdersCardTextWrap2,
  OrdersCardTextWrap3,
  OrdersCardTextWrap4,
  OrdersCardTextWrapper2,
  OrdersCardText1,
  OrdersCardText2,
  OrderCardLinearWrapper,
  OrdersSellBtnWrapper,
  OrdersSell,
} from "./mainPageElements";
import LinearProgress from "@mui/material/LinearProgress";
import useGetData from "../../hooks/useGetData";
import Pagination from "@mui/material/Pagination";

type Post = {
  orderId: number;
  orderTime: string;
  orderDate: string;
  orderResource: string;
  orderRentTime: string;
  orderPrice: string;
  orderAPY: string;
  orderPayment: string;
  orderFulfilled: number;
};

export const OrdersComponent: React.FC = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;
  const { data, isLoading, error, getData, totalCount } = useGetData<Post>();

  useEffect(() => {
    getData(
      `http://localhost:3001/post?_page=${currentPage}&_limit=${rowsPerPage}`
    );
  }, [currentPage]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.max(10, Math.ceil(totalCount / rowsPerPage));

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
      <OrdersWrapper>
        <OrderNavWrapper>
          <OrdersNavHeaderWrapper>
            <AccountHeader>{t("orders")}</AccountHeader>
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

            <OrderNavTextWrapper6>
              <OrderNavText>{t("fulfilled")}</OrderNavText>
            </OrderNavTextWrapper6>

            <OrderNavTextWrapper7>
              <OrderNavText>{t("operate")}</OrderNavText>
            </OrderNavTextWrapper7>
          </OrderNavTextWrapper1>
        </OrderNavWrapper>

        <OrdersWrapper2>
          {data?.map((myData) => (
            <OrdersCardWrapper key={myData.orderId}>
              <OrdersCardTextWrap1>
                <OrdersCardTextWrapper2>
                  <OrdersCardText1>{myData.orderTime}</OrdersCardText1>
                </OrdersCardTextWrapper2>
                <OrdersCardTextWrapper2>
                  <OrdersCardText2>{myData.orderDate}</OrdersCardText2>
                </OrdersCardTextWrapper2>
              </OrdersCardTextWrap1>

              <OrdersCardTextWrap2>
                <OrdersCardTextWrapper2>
                  <OrdersCardText1>{myData.orderResource}</OrdersCardText1>
                </OrdersCardTextWrapper2>
                <OrdersCardTextWrapper2>
                  <OrdersCardText2>{myData.orderRentTime}</OrdersCardText2>
                </OrdersCardTextWrapper2>
              </OrdersCardTextWrap2>

              <OrdersCardTextWrap3>
                <OrdersCardTextWrapper2>
                  <OrdersCardText1>{myData.orderPrice} SUN</OrdersCardText1>
                </OrdersCardTextWrapper2>
                <OrdersCardTextWrapper2>
                  <OrdersCardText2>APY: {myData.orderAPY} %</OrdersCardText2>
                </OrdersCardTextWrapper2>
              </OrdersCardTextWrap3>

              <OrdersCardTextWrap4>
                <OrdersCardTextWrapper2>
                  <OrdersCardText1>{myData.orderPayment}</OrdersCardText1>
                </OrdersCardTextWrapper2>
              </OrdersCardTextWrap4>

              <OrderCardLinearWrapper>
                <LinearProgress
                  variant="determinate"
                  value={myData.orderFulfilled}
                  sx={{
                    height: 5,
                    borderRadius: 5,
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#433BFF",
                    },
                  }}
                />
              </OrderCardLinearWrapper>
              <OrdersSellBtnWrapper>
                <OrdersSell>Sell</OrdersSell>
              </OrdersSellBtnWrapper>
            </OrdersCardWrapper>
          ))}
        </OrdersWrapper2>

        <OedersPaginationWrapper>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            sx={{
              '& .Mui-selected': {
                backgroundColor: '#433BFF', // or any custom color
                color: 'white',
                '&:hover': {
                  backgroundColor: 'primary.dark',
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
