import React, {useMemo, useState, useEffect} from "react";
import "./mainPage.css";
import {
  MyOrdersWrapper,
  MyOrdersScroll,
  MyOrdersNavWrapper,
  MyOrdersNavTextWrapper,
  MyOrdersTextWrapper,
  MyOrderDetails,
  MyOrderCardTextWrap,
  OrderMainWrapper,
  OrdersNavHeaderWrapper,
  OrdersCarouselWrapper,
  OrderNavText,
  OrdersCard,
  OrdersCardTextWrapper2,
  OrdersCardText1,
  AvailableNavWrapper,
  AvailableNavTextWrapper,
  AvailableCard,
  AvailableDetails,
  AvailableCardTextWrap,
  OrderCardIconWrapper2,
  OrderCardIcon,
  AvailableRateIconWrapper,
} from "./mainPageElements";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

import { LegacyCardName } from "./LegacySection/LegacyElements";
import MyFilterComponent from "../../components/FilterComponent/MyFilterComponent";
import { useFetchData } from "../../contexts/FetchDataContext";
import energyIcon from "../../assets/svg/EnergyIcon.svg";
import bandwidthIcon from "../../assets/svg/BandwidthIcon.svg";
import { filterByResourceType } from "../../utils/sortByDateAndTime3";

interface RateItem {
  rate: number;
  avilable: number;
  resourceType: string;
  type?: string;
}

const AvailableResource: React.FC = () => {
  const { availableData } = useFetchData();
    const selectedFilter = useSelector(
    (state: RootState) => state.filters.availableResource|| "All"
  );

  // State to track if we have initial data
  const [hasInitialData, setHasInitialData] = useState(false);

  // Prepare data for filtering
  const prepareData = (): RateItem[] => {
    const result: RateItem[] = [];
    
    if (availableData?.energy) {
      result.push(
        ...availableData.energy.map((item) => ({
          ...item,
          resourceType: "energy",
          type: "energy",
        }))
      );
    }
    
    if (availableData?.bandwidth) {
      result.push(
        ...availableData.bandwidth.map((item) => ({
          ...item,
          resourceType: "bandwidth",
          type: "bandwidth",
        }))
      );
    }
    
    return result;
  };

  // Filter data based on selected filter
  const filteredData: RateItem[] = useMemo(() => {
    const allData = prepareData();
    return filterByResourceType(allData, selectedFilter as 'All' | 'energy' | 'bandwidth');
  }, [availableData, selectedFilter]);

  // Set initial data flag when data first arrives
  useEffect(() => {
    if (availableData && !hasInitialData) {
      setHasInitialData(true);
    }
  }, [availableData, hasInitialData]);

  // Function to render the appropriate icon based on type
  const renderIcon = (type: string | undefined) => {
    switch (type) {
      case "energy":
        return (
          <OrderCardIconWrapper2 style={{ backgroundColor: "#003543" }}>
            <OrderCardIcon alt="energy" src={energyIcon} />
          </OrderCardIconWrapper2>
        );
      case "bandwidth":
        return (
          <OrderCardIconWrapper2 style={{ backgroundColor: "#430E00" }}>
            <OrderCardIcon alt="bandwidth" src={bandwidthIcon} />
          </OrderCardIconWrapper2>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <MyOrdersWrapper className="resource-available-bg2">
        <OrderMainWrapper>
          <OrdersNavHeaderWrapper>
            <LegacyCardName>Available</LegacyCardName>
            <MyFilterComponent
              listKey="availableResource"
              options={["All","energy", "bandwidth"]}
              label="Product"
            />
          </OrdersNavHeaderWrapper>
          <OrdersCarouselWrapper>
            <MyOrdersScroll>
              <AvailableNavWrapper>
                <AvailableNavTextWrapper style={{marginLeft : "2.2rem"}}>
                  <OrderNavText>rate</OrderNavText>
                </AvailableNavTextWrapper>
                <AvailableNavTextWrapper style={{ marginRight: "2.5rem" }}>
                  <OrderNavText>available</OrderNavText>
                </AvailableNavTextWrapper>
              </AvailableNavWrapper>

              <AvailableCard>
                {filteredData.map((myData, index) => (
                  <MyOrderDetails
                    key={index}
                    style={{ justifyContent: "space-between" }}
                  >
                    <AvailableRateIconWrapper>
                      {renderIcon(myData.type)}
                      <AvailableCardTextWrap style={{marginLeft : "0.5rem"}} >
                        <OrdersCardTextWrapper2>
                          <OrdersCardText1>{myData.rate}</OrdersCardText1>
                        </OrdersCardTextWrapper2>
                      </AvailableCardTextWrap>
                    </AvailableRateIconWrapper>

                    <AvailableCardTextWrap>
                      <OrdersCardTextWrapper2>
                        <OrdersCardText1>
                          {myData.avilable.toLocaleString()}
                        </OrdersCardText1>
                      </OrdersCardTextWrapper2>
                    </AvailableCardTextWrap>
                  </MyOrderDetails>
                ))}
              </AvailableCard>
            </MyOrdersScroll>
          </OrdersCarouselWrapper>
        </OrderMainWrapper>
      </MyOrdersWrapper>
    </>
  );
};

export default AvailableResource;
