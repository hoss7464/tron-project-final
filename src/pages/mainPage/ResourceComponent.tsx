import React from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  ResourceWrapper,
  ResourceWrapper2,
  AccountHeaderIconWrapper,
  AccountHeaderWrapper,
  AccountHeader,
  ResourceIconTextWrapper,
  AccountIconWrapper,
  AccountIcon,
  ResourceTextWrapper,
  ResourceText,
} from "./mainPageElements";
import energyIcon from "../../assets/svg/EnergyIcon.svg";
import bandwidthIcon from "../../assets/svg/BandwidthIcon.svg";

const ResourceComponent: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <ResourceWrapper>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
            <ResourceWrapper2
              style={{
                backgroundColor: "#F8F8F8",
                borderRadius: "24px",
                padding: "0.5rem",
              }}
            >
              <AccountHeaderIconWrapper>
                <AccountHeaderWrapper style={{marginLeft : "0.5rem"}} >
                  <AccountHeader style={{ fontSize: "18px" }}>
                    {t("ready_resource")}
                  </AccountHeader>
                </AccountHeaderWrapper>
              </AccountHeaderIconWrapper>
              <ResourceIconTextWrapper>
                <AccountIconWrapper>
                  <AccountIcon alt="energy" src={energyIcon} />
                </AccountIconWrapper>
                <ResourceTextWrapper>
                  <ResourceText>
                    123,456,789
                    <span style={{ color: "#989898" }}>/123,456,789</span>
                  </ResourceText>
                </ResourceTextWrapper>
              </ResourceIconTextWrapper>
              <ResourceIconTextWrapper>
                <AccountIconWrapper>
                  <AccountIcon alt="bandwidth" src={bandwidthIcon} />
                </AccountIconWrapper>
                <ResourceTextWrapper>
                  <ResourceText>
                    123,456,789
                    <span style={{ color: "#989898" }}>/123,456,789</span>
                  </ResourceText>
                </ResourceTextWrapper>
              </ResourceIconTextWrapper>
            </ResourceWrapper2>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
            <ResourceWrapper2
              style={{
                backgroundColor: "#F8F8F8",
                borderRadius: "24px",
                padding: "0.5rem",
              }}
            >
              <AccountHeaderIconWrapper>
                <AccountHeaderWrapper style={{marginLeft : "0.5rem"}}>
                  <AccountHeader style={{ fontSize: "18px" }}>
                    {t("recovery_24h")}
                  </AccountHeader>
                </AccountHeaderWrapper>
              </AccountHeaderIconWrapper>
              <ResourceIconTextWrapper>
                <AccountIconWrapper>
                  <AccountIcon alt="energy" src={energyIcon} />
                </AccountIconWrapper>
                <ResourceTextWrapper>
                  <ResourceText>123,456,789</ResourceText>
                </ResourceTextWrapper>
              </ResourceIconTextWrapper>
              <ResourceIconTextWrapper>
                <AccountIconWrapper>
                  <AccountIcon alt="bandwidth" src={bandwidthIcon} />
                </AccountIconWrapper>
                <ResourceTextWrapper>
                  <ResourceText>123,456</ResourceText>
                </ResourceTextWrapper>
              </ResourceIconTextWrapper>
            </ResourceWrapper2>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
            <ResourceWrapper2
              style={{
                backgroundColor: "#F8F8F8",
                borderRadius: "24px",
                padding: "0.5rem",
              }}
            >
              <AccountHeaderIconWrapper>
                <AccountHeaderWrapper style={{marginLeft : "0.5rem"}}>
                  <AccountHeader style={{ fontSize: "18px" }}>
                    {t("apy_for_seller")}
                  </AccountHeader>
                </AccountHeaderWrapper>
              </AccountHeaderIconWrapper>
              <ResourceIconTextWrapper>
                <AccountIconWrapper>
                  <AccountIcon alt="energy" src={energyIcon} />
                </AccountIconWrapper>
                <ResourceTextWrapper>
                  <ResourceText>12.58 %</ResourceText>
                </ResourceTextWrapper>
              </ResourceIconTextWrapper>
              <ResourceIconTextWrapper>
                <AccountIconWrapper>
                  <AccountIcon alt="bandwidth" src={bandwidthIcon} />
                </AccountIconWrapper>
                <ResourceTextWrapper>
                  <ResourceText>74.32 %</ResourceText>
                </ResourceTextWrapper>
              </ResourceIconTextWrapper>
            </ResourceWrapper2>
          </Grid>
        </Grid>
      </ResourceWrapper>
    </>
  );
};

export default ResourceComponent;
