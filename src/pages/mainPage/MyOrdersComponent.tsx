import React, { useEffect } from "react";
import "./mainPage.css";
import { useTranslation } from "react-i18next";
import useGetData from "../../hooks/MyOrdersSection/useGetData";
import { useSelector } from "react-redux";
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
  AccountHeader,
  MyOrdersNavTextWrapper,
  OrderNavText,
  OrderCardIconWrapper,
  OrderCardIcon,
  OrdersCardTextWrapper2,
  OrdersCardText1,
  OrdersCardText2,
  MyOrdersTextWrapper,
} from "./mainPageElements";
import { LegacyCardName } from "./LegacySection/LegacyElements";
import singleEnergy2 from "../../assets/svg/SingleEnergy2.svg";
import singleBandwidth2 from "../../assets/svg/SingleBandwidth2.svg";
import { sortByDateTime } from "../../utils/sortByDateAndTime";
import MyFilterComponent from "../../components/FilterComponent/MyFilterComponent";

type Post = {
  id: number;
  formDate: string;
  formTime: string;
  formTotalPrice: number;
  formAmount: number;
  formHeader: string;
  formDuration: number;
  formPrice: number;
  formDurationUnit: string;
};

const MyOrdersComponent: React.FC = () => {
  const { t } = useTranslation();
  const { data, error, getData } = useGetData<Post[]>();
  const refreshTrigger = useSelector(
    (state: RootState) => state.refresh.refreshTrigger
  );
  const selectedFilter = useSelector(
    (state: RootState) => state.filters["myOrders"] || "All"
  );

  useEffect(() => {
    getData("http://localhost:3001/formData");
  }, [refreshTrigger]);

  const sortedData = sortByDateTime(data || []);
  const filteredData =
    selectedFilter === "All"
      ? sortedData
      : sortedData.filter((item) => item.formHeader === selectedFilter);

  if (error) return <p style={{ color: "red" }}>{error}</p>;

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
                          <OrdersCardText1>{myData.formDate}</OrdersCardText1>
                        </OrdersCardTextWrapper2>
                        <OrdersCardTextWrapper2>
                          <OrdersCardText2>{myData.formTime}</OrdersCardText2>
                        </OrdersCardTextWrapper2>
                      </MyOrderCardTextWrap>

                      <MyOrderCardTextWrap>
                        <OrdersCardTextWrapper2>
                          <OrderCardIconWrapper>
                            <OrderCardIcon
                              alt="energy"
                              src={
                                myData.formHeader === "energy"
                                  ? singleEnergy2
                                  : singleBandwidth2
                              }
                            />
                          </OrderCardIconWrapper>
                          <OrdersCardText1>{myData.formAmount}</OrdersCardText1>
                        </OrdersCardTextWrapper2>
                        <OrdersCardTextWrapper2>
                          <OrdersCardText2>
                            {myData.formDuration}/ {myData.formDurationUnit}
                          </OrdersCardText2>
                        </OrdersCardTextWrapper2>
                      </MyOrderCardTextWrap>

                      <MyOrderCardTextWrap>
                        <OrdersCardTextWrapper2>
                          <OrdersCardText1>{myData.formPrice}</OrdersCardText1>
                        </OrdersCardTextWrapper2>
                      </MyOrderCardTextWrap>

                      <MyOrderCardTextWrap>
                        <OrdersCardTextWrapper2>
                          <OrdersCardText1>
                            {myData.formTotalPrice} TRX
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
