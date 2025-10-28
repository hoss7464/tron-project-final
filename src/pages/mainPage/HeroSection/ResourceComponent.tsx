import React, { useEffect, useState } from "react";
import "./Hero.css";
import { useFetchData } from "../../../contexts/FetchDataContext";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store/store";
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
import { useTranslation } from "react-i18next";
import { showNotification } from "../../../redux/actions/notifSlice";
//----------------------------------------------------------------------------------------
const ResourceComponent: React.FC = () => {
  //states :
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const { resourceData, fetchData } = useFetchData();

  const refreshTrigger = useSelector(
    (state: RootState) => state.refresh.refreshTrigger
  );
  //ready resources states :
  const [energyReady, setEnergyReady] = useState<string | null>(null);
  const [bandwidthReady, setBandwidthReady] = useState<string | null>(null);
  //24 hours recovery states :
  const [energy24, setEnergy24] = useState<string | null>(null);
  const [bandwidth24, setBandwidth24] = useState<string | null>(null);
  //apy states :
  const [energyApySeller, setEnergyApySeller] = useState<string | null>(null);
  const [bandwidthApySeller, setBandwidthApySeller] = useState<string | null>(
    null
  );

  //Helper formatter :
  const formatNumber = (num: number | string | undefined) =>
    Number(num).toLocaleString();

  // Effect to refresh data when refreshTrigger changes
  useEffect(() => {
    const refreshData = async () => {
      try {
        await fetchData();
      } catch (error) {
        dispatch(
          showNotification({
            name: "error1",
            message: `${t("Text215")}`,
            severity: "error",
          })
        );
      }
    };

    if (refreshTrigger) {
      refreshData();
    }
  }, [refreshTrigger, fetchData]);
  // This effect runs whenever resourceData changes

  useEffect(() => {
    if (resourceData && resourceData.success) {
      // Extract data from resourceData
      const energyReadyResource = resourceData.data.readyResource.energy;
      const bandwidthReadyResource = resourceData.data.readyResource.bandwidth;
      const energyDailyRecovery = resourceData.data.dailyRecovery.energy;
      const bandwidthDailyRecovery = resourceData.data.dailyRecovery.bandwidth;
      const energyApy = resourceData.data.apy.energy;
      const bandwidthApy = resourceData.data.apy.bandwidth;

      // Set states
      setEnergyReady(formatNumber(energyReadyResource));
      setBandwidthReady(formatNumber(bandwidthReadyResource));
      setEnergy24(formatNumber(energyDailyRecovery));
      setBandwidth24(formatNumber(bandwidthDailyRecovery));
      setEnergyApySeller(formatNumber(energyApy));
      setBandwidthApySeller(formatNumber(bandwidthApy));
    }
  }, [resourceData]);

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
                    <HeroGridCardHeader>{t("Text13")}</HeroGridCardHeader>
                  </HeroGridCardHeaderWrapper>
                </HeroGridCardIconHeaderWrapper>

                <HeroGridCardSubHeaderWrapper>
                  <HeroGridCardSubHeader>{t("Text14")}</HeroGridCardSubHeader>
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
                    <HeroGridCardHeader>{t("Text15")}</HeroGridCardHeader>
                  </HeroGridCardHeaderWrapper>
                </HeroGridCardIconHeaderWrapper>

                <HeroGridCardSubHeaderWrapper>
                  <HeroGridCardSubHeader>{t("Text16")}</HeroGridCardSubHeader>
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
                    <HeroGridCardHeader>{t("Text17")}</HeroGridCardHeader>
                  </HeroGridCardHeaderWrapper>
                </HeroGridCardIconHeaderWrapper>

                <HeroGridCardSubHeaderWrapper>
                  <HeroGridCardSubHeader>{t("Text18")}</HeroGridCardSubHeader>
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
