import React, { useState, useEffect } from "react";
import { useFetchData } from "../../../../../contexts/FetchDataContext";
import { SellersOrdersResponse } from "../../../../../services/requestService";
import {
  CanceledSign,
  CheckedSign,
  BuyerSignWrapper,
} from "../../../Buyers/Section2/Table/BuyersTableElements";
import {
  OrderMainWrapper,
  OrdersCarouselWrapper,
  MyOrdersScroll,
  MyOrdersNavWrapper,
  MyOrdersNavTextWrapper,
  MyOrdersTextWrapper,
  OrderNavText,
  OrdersCard,
  OrdersDetail,
  OrdersCardTextWrapper2,
  OrdersCardText1,
  OrdersCardText2,
  OrderCardIconWrapper2,
  OrderCardIcon,
  MyOrderCardTextWrap,
  OedersPaginationWrapper,
} from "../../../../mainPage/mainPageElements";
import { BuyerstCardTextWrap1 } from "../../../Buyers/Section2/Table/BuyersTableElements";
import { LoopSign } from "../SellersTablesElements";
import { Tooltip } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { formatDateTime, formatDateTime2 } from "../../../../../utils/dateTime";
import { formatStrictDuration } from "../../../../../utils/fromSec";
import energyIcon from "../../../../../assets/svg/EnergyIcon.svg";
import bandwidthIcon from "../../../../../assets/svg/BandwidthIcon.svg";
import { truncateTxid2 } from "../../../../../utils/truncate";
import { Link } from "@mui/material";
import { useTranslation } from "react-i18next";

const SellersTable1: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { sellersOrderInfo } = useFetchData();
  const [wholeSellersOrderInfo, setWholeSellersOrderInfo] =
    useState<SellersOrdersResponse | null>(null);
  const tronscanUrl = process.env.REACT_APP_TRONSCAN_TXID_URL;
  const [currentPage, setCurrentPage] = useState(1);
  
  const rowsPerPage = i18n.language === "en" ? 10 : 9;

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
        <OrdersCarouselWrapper  >
          <MyOrdersScroll style={{ height: "659px" }}>
            <MyOrdersNavWrapper style={{ padding: "0.3rem 0.5rem 0.3rem 0.5rem" }}>
              <MyOrdersNavTextWrapper
                style={{ justifyContent: "space-between", width: "97%" }}
              >
                <MyOrdersTextWrapper>
                  <OrderNavText>{t("Text80")}</OrderNavText>
                </MyOrdersTextWrapper>

                <MyOrdersTextWrapper>
                  <OrderNavText>{t("Text71")}</OrderNavText>
                </MyOrdersTextWrapper>

                <MyOrdersTextWrapper>
                  <OrderNavText>{t("Text81")}</OrderNavText>
                </MyOrdersTextWrapper>

                <MyOrdersTextWrapper>
                  <OrderNavText>{t("Text150")}</OrderNavText>
                </MyOrdersTextWrapper>

                <MyOrdersTextWrapper>
                  <OrderNavText>{t("Text151")}</OrderNavText>
                </MyOrdersTextWrapper>

                <MyOrdersTextWrapper>
                  <OrderNavText>{t("Text152")}</OrderNavText>
                </MyOrdersTextWrapper>
              </MyOrdersNavTextWrapper>
            </MyOrdersNavWrapper>

            <OrdersCard style={{ justifyContent: "space-between" }}>
              {paginatedData.map((myData, index) => {
                const { date, time } = formatDateTime(myData.createdAt);
                const { myDate, myTime } = formatDateTime2(myData.expiredAt);
                const transactionUrl = `${tronscanUrl}/#/transaction/${myData.delegatedTxId}`;

                return (
                  <OrdersDetail
                    key={index}
                    style={{ justifyContent: "space-between", padding: "5px 14px" }}
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
                        <OrdersCardText1>
                          {truncateTxid2(myData.receiver)}
                        </OrdersCardText1>
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

                    {myData.delegatedTxId === undefined ? (
                      <BuyerstCardTextWrap1>
                        <OrdersCardText1>_ _</OrdersCardText1>
                      </BuyerstCardTextWrap1>
                    ) : (
                      <BuyerstCardTextWrap1>
                        <Link
                          href={transactionUrl}
                          target="_blank" // Opens in new tab
                          rel="noopener noreferrer" // Security best practice
                          sx={{
                            fontFamily: "monospace",
                            fontSize: "15px",
                            textDecoration: "none",
                            color: "#430E00",
                            "&:hover": {
                              textDecoration: "underline",
                              color: "#430E00",
                            },
                            cursor: "pointer",
                          }}
                        >
                          {truncateTxid2(myData.delegatedTxId)}
                        </Link>
                      </BuyerstCardTextWrap1>
                    )}

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
                        <BuyerSignWrapper
                          style={{
                            backgroundColor: "#003543",
                            padding: "0.4rem",
                            borderRadius: "6px",
                          }}
                        >
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
                          <CanceledSign />
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
          size="small"
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
