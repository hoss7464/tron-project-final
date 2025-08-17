import React, { useEffect, useState } from "react";
import "./Hero.css";
import axios from "axios";
import {
  HeroResourceContainer,
  HeroResourceWrapper,
  HeroGridCard,
  HeroGridCardIconHeaderWrapper,
  HeroGridCardIconWrapper,
  HeroGridCardIcon,
  HeroGridCardHeaderWrapper,
  HeroGridCardHeader,
  HeroGridCardSubHeaderWrapper,
  HeroGridCardSubHeader,
  HeroGridCardNumberIconTextWrapper,
  HeroGridCardNumberIconWrapper,
  HeroGridCardNumberIconWrapper2,
  HeroGridCardNumberIconWrapper3,
  HeroGridCardNumberIcon,
  HeroGridCardNumberTextWrapper,
  HeroGridCardNumberText,
} from "./HeroElements";
import { Grid } from "@mui/material";
import readyResourceIcon from "../../../assets/svg/ReadyResourceIcon.svg";
import energyIcon from "../../../assets/svg/EnergyIcon.svg";
import bandwidthIcon from "../../../assets/svg/BandwidthIcon.svg";
import recoveryIcon from "../../../assets/svg/RecoveryIcon.svg";
import apyForSellersIcon from "../../../assets/svg/ApyForSellersIcon.svg";

//----------------------------------------------------------------------------------------
type ResourceResponse = {
  data: {
    readyResource: {
      energy: number | string;
      bandwidth: number | string;
    };
    dailyRecovery: {
      energy: number | string;
      bandwidth: number | string;
    };
    apy: {
      energy: number | string;
      bandwidth: number | string;
    };
  };
};

const ResourceComponent: React.FC = () => {
  //states :
  //ready resources states :
  const [energyReady, setEnergyReady] = useState<string | null>(null);
  const [bandwidthReady, setBandwidthReady] = useState<string | null>(null);
  //24 hours recovery states :
  const [energy24, setEnergy24] = useState<string | null>(null);
  const [bandwidth24, setBandwidth24] = useState<string | null>(null);
  //apy states :
  const [energyApySeller, setEnergyApySeller] = useState<string | null>(null);
  const [bandwidthApySeller, setBandwidthApySeller] = useState<string | null>(null);

  //Helper formatter :
  const formatNumber = (num: number | string) => Number(num).toLocaleString();

  //To get data from server :
  const resourceData = async () => {
    const baseURL = process.env.REACT_APP_BASE_URL;
    //to get axios timeout :
    const axiosTimeOut = Number(process.env.AXIOS_TIME_OUT)

    try{
      const response = await axios.get<ResourceResponse>(`${baseURL}/Setting/UI`, {
        headers: { "Content-Type": "application/json" },timeout :axiosTimeOut 
      })

      const myData = response.data 

    //To extract ready resource :
    const energyReadyResource = myData.data.readyResource.energy;
    const bandwidthReadyResource = myData.data.readyResource.bandwidth;
    //To extract 24 hours recovery :
    const energyDailyRecovery = myData.data.dailyRecovery.energy;
    const bandwidthDailyRecovery = myData.data.dailyRecovery.bandwidth;
    //To extract apy for sellers :
    const energyApy = myData.data.apy.energy;
    const bandwidthApy = myData.data.apy.bandwidth;

    //set states :
    setEnergyReady(formatNumber(energyReadyResource));
    setBandwidthReady(formatNumber(bandwidthReadyResource));
    setEnergy24(formatNumber(energyDailyRecovery));
    setBandwidth24(formatNumber(bandwidthDailyRecovery));
    setEnergyApySeller(formatNumber(energyApy));
    setBandwidthApySeller(formatNumber(bandwidthApy));
    }catch(error){
      console.log("error fetching data : ", error)
    } 
  };

  useEffect(() => {
    const timeToRefreshData = Number(process.env.REACT_APP_RESOURCE_REQ_TIME);
    //Make the initial request immediately when the component mounts

    //Then make subsequent requests every 3 seconds
    const intervalId = setInterval(resourceData, timeToRefreshData); 
    //Clean up the interval when the component unmounts to prevent memory leaks
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <HeroResourceContainer>
        <HeroResourceWrapper>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
              <HeroGridCard className="border">
                <HeroGridCardIconHeaderWrapper>
                  <HeroGridCardIconWrapper>
                    <HeroGridCardIcon
                      alt="ready resource"
                      src={readyResourceIcon}
                    />
                  </HeroGridCardIconWrapper>
                  <HeroGridCardHeaderWrapper>
                    <HeroGridCardHeader>Ready Resource</HeroGridCardHeader>
                  </HeroGridCardHeaderWrapper>
                </HeroGridCardIconHeaderWrapper>

                <HeroGridCardSubHeaderWrapper>
                  <HeroGridCardSubHeader>
                    Your flexible energy and bandwidth,ready when you are.
                  </HeroGridCardSubHeader>
                </HeroGridCardSubHeaderWrapper>

                <HeroGridCardNumberIconTextWrapper>
                  <HeroGridCardNumberIconWrapper>
                    <HeroGridCardNumberIconWrapper2
                      style={{ border: "solid 1px #003543" }}
                    >
                      <HeroGridCardNumberIconWrapper3
                        style={{ backgroundColor: "#003543" }}
                      >
                        <HeroGridCardNumberIcon
                          alt="energy icon"
                          src={energyIcon}
                        />
                      </HeroGridCardNumberIconWrapper3>
                    </HeroGridCardNumberIconWrapper2>
                  </HeroGridCardNumberIconWrapper>
                  <HeroGridCardNumberTextWrapper>
                    <HeroGridCardNumberText>
                      {energyReady}
                    </HeroGridCardNumberText>
                  </HeroGridCardNumberTextWrapper>
                </HeroGridCardNumberIconTextWrapper>

                <HeroGridCardNumberIconTextWrapper>
                  <HeroGridCardNumberIconWrapper>
                    <HeroGridCardNumberIconWrapper2
                      style={{ border: "solid 1px #430E00" }}
                    >
                      <HeroGridCardNumberIconWrapper3
                        style={{ backgroundColor: "#430E00" }}
                      >
                        <HeroGridCardNumberIcon
                          alt="bandwidth icon"
                          src={bandwidthIcon}
                        />
                      </HeroGridCardNumberIconWrapper3>
                    </HeroGridCardNumberIconWrapper2>
                  </HeroGridCardNumberIconWrapper>
                  <HeroGridCardNumberTextWrapper>
                    <HeroGridCardNumberText>
                      {bandwidthReady}
                    </HeroGridCardNumberText>
                  </HeroGridCardNumberTextWrapper>
                </HeroGridCardNumberIconTextWrapper>
              </HeroGridCard>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
              <HeroGridCard className="border">
                <HeroGridCardIconHeaderWrapper>
                  <HeroGridCardIconWrapper>
                    <HeroGridCardIcon alt="recovery icon" src={recoveryIcon} />
                  </HeroGridCardIconWrapper>
                  <HeroGridCardHeaderWrapper>
                    <HeroGridCardHeader>24h Recovery</HeroGridCardHeader>
                  </HeroGridCardHeaderWrapper>
                </HeroGridCardIconHeaderWrapper>

                <HeroGridCardSubHeaderWrapper>
                  <HeroGridCardSubHeader>
                    Your energy and bandwidth are restored every 24 hours.
                  </HeroGridCardSubHeader>
                </HeroGridCardSubHeaderWrapper>

                <HeroGridCardNumberIconTextWrapper>
                  <HeroGridCardNumberIconWrapper>
                    <HeroGridCardNumberIconWrapper2
                      style={{ border: "solid 1px #003543" }}
                    >
                      <HeroGridCardNumberIconWrapper3
                        style={{ backgroundColor: "#003543" }}
                      >
                        <HeroGridCardNumberIcon
                          alt="energy icon"
                          src={energyIcon}
                        />
                      </HeroGridCardNumberIconWrapper3>
                    </HeroGridCardNumberIconWrapper2>
                  </HeroGridCardNumberIconWrapper>
                  <HeroGridCardNumberTextWrapper>
                    <HeroGridCardNumberText>{energy24}</HeroGridCardNumberText>
                  </HeroGridCardNumberTextWrapper>
                </HeroGridCardNumberIconTextWrapper>

                <HeroGridCardNumberIconTextWrapper>
                  <HeroGridCardNumberIconWrapper>
                    <HeroGridCardNumberIconWrapper2
                      style={{ border: "solid 1px #430E00" }}
                    >
                      <HeroGridCardNumberIconWrapper3
                        style={{ backgroundColor: "#430E00" }}
                      >
                        <HeroGridCardNumberIcon
                          alt="bandwidth icon"
                          src={bandwidthIcon}
                        />
                      </HeroGridCardNumberIconWrapper3>
                    </HeroGridCardNumberIconWrapper2>
                  </HeroGridCardNumberIconWrapper>
                  <HeroGridCardNumberTextWrapper>
                    <HeroGridCardNumberText>
                      {bandwidth24}
                    </HeroGridCardNumberText>
                  </HeroGridCardNumberTextWrapper>
                </HeroGridCardNumberIconTextWrapper>
              </HeroGridCard>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
              <HeroGridCard>
                <HeroGridCardIconHeaderWrapper>
                  <HeroGridCardIconWrapper>
                    <HeroGridCardIcon
                      alt="apy for sellers icon"
                      src={apyForSellersIcon}
                    />
                  </HeroGridCardIconWrapper>
                  <HeroGridCardHeaderWrapper>
                    <HeroGridCardHeader>APY for sellers</HeroGridCardHeader>
                  </HeroGridCardHeaderWrapper>
                </HeroGridCardIconHeaderWrapper>

                <HeroGridCardSubHeaderWrapper>
                  <HeroGridCardSubHeader>
                    Earn passive APY by supplying energy and bandwidth.
                  </HeroGridCardSubHeader>
                </HeroGridCardSubHeaderWrapper>

                <HeroGridCardNumberIconTextWrapper>
                  <HeroGridCardNumberIconWrapper>
                    <HeroGridCardNumberIconWrapper2
                      style={{ border: "solid 1px #003543" }}
                    >
                      <HeroGridCardNumberIconWrapper3
                        style={{ backgroundColor: "#003543" }}
                      >
                        <HeroGridCardNumberIcon
                          alt="energy icon"
                          src={energyIcon}
                        />
                      </HeroGridCardNumberIconWrapper3>
                    </HeroGridCardNumberIconWrapper2>
                  </HeroGridCardNumberIconWrapper>
                  <HeroGridCardNumberTextWrapper>
                    <HeroGridCardNumberText>
                      {energyApySeller} %
                    </HeroGridCardNumberText>
                  </HeroGridCardNumberTextWrapper>
                </HeroGridCardNumberIconTextWrapper>

                <HeroGridCardNumberIconTextWrapper>
                  <HeroGridCardNumberIconWrapper>
                    <HeroGridCardNumberIconWrapper2
                      style={{ border: "solid 1px #430E00" }}
                    >
                      <HeroGridCardNumberIconWrapper3
                        style={{ backgroundColor: "#430E00" }}
                      >
                        <HeroGridCardNumberIcon
                          alt="bandwidth icon"
                          src={bandwidthIcon}
                        />
                      </HeroGridCardNumberIconWrapper3>
                    </HeroGridCardNumberIconWrapper2>
                  </HeroGridCardNumberIconWrapper>
                  <HeroGridCardNumberTextWrapper>
                    <HeroGridCardNumberText>
                      {bandwidthApySeller} %
                    </HeroGridCardNumberText>
                  </HeroGridCardNumberTextWrapper>
                </HeroGridCardNumberIconTextWrapper>
              </HeroGridCard>
            </Grid>
          </Grid>
        </HeroResourceWrapper>
      </HeroResourceContainer>
    </>
  );
};

export default ResourceComponent;
