import React from "react";
import { useTranslation } from "react-i18next";
import {
  MainPageContainer,
  MainPageWrapper,
  MainLeftSection,
  MainRightSection,
  AccountWrapper,
  AccountHeaderIconWrapper,
  AccountIconWrapper,
  AccountIcon,
  AccountHeaderWrapper,
  AccountHeader,
  AccountAddCopyWrapper,
  AccountAddWrapper,
  AccountAdd,
  AccountCopyWrapper,
  AccountCopyIcon,
  AccountTextNumberWrapper,
  AccountTextWrapper,
  AccountText,
  AccountNumberWrapper,
  AccountNumber,
  EnergyWrapper,
  EnergyResourceWrapper,
  BandwidthWrapper,
  FormWrapper,
  Form,
  ResourceWrapper,
  ResourceWrapper2,
  ResourceIconTextWrapper,
  ResourceTextWrapper,
  ResourceText,
  OrdersWrapper,
  MyOrdersWrapper,
} from "./mainPageElements";
import accountIcon from "../../assets/svg/AccountIcon.svg";
import energyIcon from "../../assets/svg/EnergyIcon.svg";
import bandwidthIcon from "../../assets/svg/BandwidthIcon.svg";
import Grid from "@mui/material/Grid";

const MainPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <MainPageContainer>
        <MainPageWrapper>
          <MainLeftSection>
            <AccountWrapper>
              <AccountHeaderIconWrapper>
                <AccountIconWrapper>
                  <AccountIcon alt="account" src={accountIcon} />
                </AccountIconWrapper>
                <AccountHeaderWrapper>
                  <AccountHeader style={{ color: "#241DB6" }}>
                    {t("account")}
                  </AccountHeader>
                </AccountHeaderWrapper>
              </AccountHeaderIconWrapper>
              <AccountAddCopyWrapper>
                <AccountAddWrapper>
                  <AccountAdd>XzWPJDLR3jXzWPJDLR3j zWPJDLR3jzW</AccountAdd>
                </AccountAddWrapper>
                <AccountCopyWrapper>
                  <AccountCopyIcon />
                </AccountCopyWrapper>
              </AccountAddCopyWrapper>
              <AccountTextNumberWrapper>
                <AccountTextWrapper>
                  <AccountText style={{ color: "#8CA1ED" }}>
                    {t("balance_trx")}
                  </AccountText>
                </AccountTextWrapper>
                <AccountNumberWrapper>
                  <AccountNumber style={{ color: "#241DB6" }}>0</AccountNumber>
                </AccountNumberWrapper>
              </AccountTextNumberWrapper>
              <AccountTextNumberWrapper>
                <AccountTextWrapper>
                  <AccountText style={{ color: "#8CA1ED" }}>
                    {t("freeze_trx")}
                  </AccountText>
                </AccountTextWrapper>
                <AccountNumberWrapper>
                  <AccountNumber style={{ color: "#241DB6" }}>0</AccountNumber>
                </AccountNumberWrapper>
              </AccountTextNumberWrapper>
              <AccountTextNumberWrapper>
                <AccountTextWrapper>
                  <AccountText style={{ color: "#8CA1ED" }}>
                    {t("all_trx")}
                  </AccountText>
                </AccountTextWrapper>
                <AccountNumberWrapper>
                  <AccountNumber style={{ color: "#241DB6" }}>0</AccountNumber>
                </AccountNumberWrapper>
              </AccountTextNumberWrapper>
            </AccountWrapper>

            <EnergyWrapper>
              <AccountHeaderIconWrapper>
                <AccountIconWrapper>
                  <AccountIcon alt="energy" src={energyIcon} />
                </AccountIconWrapper>
                <AccountHeaderWrapper>
                  <AccountHeader style={{ color: "#1E650F" }}>
                    {t("energy")}
                  </AccountHeader>
                </AccountHeaderWrapper>
              </AccountHeaderIconWrapper>
              <EnergyResourceWrapper>
                <AccountNumberWrapper style={{ marginLeft: "0.5rem" }}>
                  <AccountNumber style={{ color: "#1E650F" }}>
                    0/0
                  </AccountNumber>
                </AccountNumberWrapper>
              </EnergyResourceWrapper>
              <AccountTextNumberWrapper>
                <AccountTextWrapper>
                  <AccountText style={{ color: "#8B8B8B" }}>
                    {t("delegable_energy")}
                  </AccountText>
                </AccountTextWrapper>
                <AccountNumberWrapper>
                  <AccountNumber style={{ color: "#1E650F" }}>0</AccountNumber>
                </AccountNumberWrapper>
              </AccountTextNumberWrapper>
              <AccountTextNumberWrapper>
                <AccountTextWrapper>
                  <AccountText style={{ color: "#8B8B8B" }}>
                    {t("delegated_energy")}
                  </AccountText>
                </AccountTextWrapper>
                <AccountNumberWrapper>
                  <AccountNumber style={{ color: "#1E650F" }}>0</AccountNumber>
                </AccountNumberWrapper>
              </AccountTextNumberWrapper>
            </EnergyWrapper>

            <BandwidthWrapper>
              <AccountHeaderIconWrapper>
                <AccountIconWrapper>
                  <AccountIcon alt="bandwidth" src={bandwidthIcon} />
                </AccountIconWrapper>
                <AccountHeaderWrapper>
                  <AccountHeader style={{ color: "#89580A" }}>
                    {t("bandwidth")}
                  </AccountHeader>
                </AccountHeaderWrapper>
              </AccountHeaderIconWrapper>
              <EnergyResourceWrapper>
                <AccountNumberWrapper style={{ marginLeft: "0.5rem" }}>
                  <AccountNumber style={{ color: "#89580A" }}>
                    0/0
                  </AccountNumber>
                </AccountNumberWrapper>
              </EnergyResourceWrapper>
              <AccountTextNumberWrapper>
                <AccountTextWrapper>
                  <AccountText style={{ color: "#8B8B8B" }}>
                    {t("delegable_bandwidth")}
                  </AccountText>
                </AccountTextWrapper>
                <AccountNumberWrapper>
                  <AccountNumber style={{ color: "#89580A" }}>0</AccountNumber>
                </AccountNumberWrapper>
              </AccountTextNumberWrapper>
              <AccountTextNumberWrapper>
                <AccountTextWrapper>
                  <AccountText style={{ color: "#8B8B8B" }}>
                    {t("delegated_bandwidth")}
                  </AccountText>
                </AccountTextWrapper>
                <AccountNumberWrapper>
                  <AccountNumber style={{ color: "#89580A" }}>0</AccountNumber>
                </AccountNumberWrapper>
              </AccountTextNumberWrapper>
            </BandwidthWrapper>
            <FormWrapper>
              <Form></Form>
            </FormWrapper>
          </MainLeftSection>
          <MainRightSection>
            <ResourceWrapper>
              <Grid container spacing={2}>
                <Grid size={4}>
                  <ResourceWrapper2
                    style={{
                      backgroundColor: "#F0F5FF",
                      borderRadius: "24px",
                      padding: "0.5rem",
                    }}
                  >
                    <AccountHeaderIconWrapper>
                      <AccountHeaderWrapper>
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
                        <ResourceText>123,456,789/123,456,789</ResourceText>
                      </ResourceTextWrapper>
                    </ResourceIconTextWrapper>
                    <ResourceIconTextWrapper>
                      <AccountIconWrapper>
                        <AccountIcon alt="bandwidth" src={bandwidthIcon} />
                      </AccountIconWrapper>
                      <ResourceTextWrapper>
                        <ResourceText>123,456,789/123,456,789</ResourceText>
                      </ResourceTextWrapper>
                    </ResourceIconTextWrapper>
                  </ResourceWrapper2>
                </Grid>

                <Grid size={4}>
                  <ResourceWrapper2
                    style={{
                      backgroundColor: "#F0F5FF",
                      borderRadius: "24px",
                      padding: "0.5rem",
                    }}
                  >
                    <AccountHeaderIconWrapper>
                      <AccountHeaderWrapper>
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
                <Grid size={4}>
                  <ResourceWrapper2
                    style={{
                      backgroundColor: "#F0F5FF",
                      borderRadius: "24px",
                      padding: "0.5rem",
                    }}
                  >
                    <AccountHeaderIconWrapper>
                      <AccountHeaderWrapper>
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

            <OrdersWrapper></OrdersWrapper>
            <MyOrdersWrapper></MyOrdersWrapper>
          </MainRightSection>
        </MainPageWrapper>
      </MainPageContainer>
    </>
  );
};

export default MainPage;
