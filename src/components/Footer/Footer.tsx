import React from "react";
import "./Footer.css";
import {
  FooterContainer,
  FooterWrapper,
  CooperationWrapper,
  FooterContentWrapper,
  FooterContentLeftSection,
  FooterIconHeaderWrapper,
  FooterIconWrapper,
  FooterLogo,
  FooterHeaderWrapper,
  FooterHeader,
  FooterSubheaderWrapper,
  FooterSubheader,
  FooterSocialMediaWrapper1,
  FooterSocialMediaWrapper2,
  FooterSocialMediaWrapper3,
  FooterSocialMediaWrapper4,
  FooterTelegramIcon,
  FooterWhatsAppIcon,
  FooterLinkedInIcon,
  FooterContentRightSection,
  FooterFeatureWrapper,
  FooterFeatureHeaderWrapper,
  FooterFeatureHeader,
  FooterFeatureTextWrapper1,
  FooterFeatureTextWrapper2,
  FooterFeatureText,
  PrivacyTermsWrapper,
  PrivacyWrapper,
  TermsWrapper,
  PrivacyTermsText,
} from "./FooterElements";
import { Divider } from "@mui/material";
import Logo from "../../assets/svg/Logo/Logo3.svg"
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <FooterContainer>
        <FooterWrapper className="footer-bg1">
          <CooperationWrapper></CooperationWrapper>
          <FooterContentWrapper>
            <FooterContentLeftSection>
              <FooterIconHeaderWrapper>
                <FooterIconWrapper>
                  <FooterLogo alt="Logo" src={Logo} />
                </FooterIconWrapper>
                <FooterHeaderWrapper>
                  <FooterHeader>
                    {t("Text115")}
                  </FooterHeader>
                </FooterHeaderWrapper>
              </FooterIconHeaderWrapper>
              <FooterSubheaderWrapper>
                <FooterSubheader>
                 {t("Text116")}
                </FooterSubheader>
              </FooterSubheaderWrapper>
              <FooterSocialMediaWrapper1>
                <FooterSocialMediaWrapper2>
                  <FooterSocialMediaWrapper3>
                    <FooterSocialMediaWrapper4>
                      <FooterTelegramIcon />
                    </FooterSocialMediaWrapper4>
                  </FooterSocialMediaWrapper3>
                </FooterSocialMediaWrapper2>
                <FooterSocialMediaWrapper2>
                  <FooterSocialMediaWrapper3>
                    <FooterSocialMediaWrapper4>
                      <FooterWhatsAppIcon />
                    </FooterSocialMediaWrapper4>
                  </FooterSocialMediaWrapper3>
                </FooterSocialMediaWrapper2>
                <FooterSocialMediaWrapper2>
                  <FooterSocialMediaWrapper3>
                    <FooterSocialMediaWrapper4>
                      <FooterLinkedInIcon />
                    </FooterSocialMediaWrapper4>
                  </FooterSocialMediaWrapper3>
                </FooterSocialMediaWrapper2>
              </FooterSocialMediaWrapper1>
            </FooterContentLeftSection>

            <FooterContentRightSection>
              <FooterFeatureWrapper>
                <FooterFeatureHeaderWrapper>
                  <FooterFeatureHeader>{t("Text117")}</FooterFeatureHeader>
                </FooterFeatureHeaderWrapper>
                <FooterFeatureTextWrapper1>
                  <FooterFeatureTextWrapper2>
                    <FooterFeatureText>{t("Text118")}</FooterFeatureText>
                  </FooterFeatureTextWrapper2>
                  <FooterFeatureTextWrapper2>
                    <FooterFeatureText>{t("Text119")}</FooterFeatureText>
                  </FooterFeatureTextWrapper2>
                  <FooterFeatureTextWrapper2>
                    <FooterFeatureText>{t("Text120")}</FooterFeatureText>
                  </FooterFeatureTextWrapper2>
                  <FooterFeatureTextWrapper2>
                    <FooterFeatureText>{t("Text121")}</FooterFeatureText>
                  </FooterFeatureTextWrapper2>
                </FooterFeatureTextWrapper1>
              </FooterFeatureWrapper>
              <FooterFeatureWrapper>
                <FooterFeatureHeaderWrapper>
                  <FooterFeatureHeader>{t("Text122")}</FooterFeatureHeader>
                </FooterFeatureHeaderWrapper>
                <FooterFeatureTextWrapper1>
                  <FooterFeatureTextWrapper2>
                    <FooterFeatureText>{t("Text123")}</FooterFeatureText>
                  </FooterFeatureTextWrapper2>
                  <FooterFeatureTextWrapper2>
                    <FooterFeatureText>{t("Text124")}</FooterFeatureText>
                  </FooterFeatureTextWrapper2>
                  <FooterFeatureTextWrapper2>
                    <FooterFeatureText>{t("Text125")}</FooterFeatureText>
                  </FooterFeatureTextWrapper2>
                  <FooterFeatureTextWrapper2>
                    <FooterFeatureText>{t("Text126")}</FooterFeatureText>
                  </FooterFeatureTextWrapper2>
                </FooterFeatureTextWrapper1>
              </FooterFeatureWrapper>
            </FooterContentRightSection>
          </FooterContentWrapper>
          <Divider
            orientation="horizontal"
            flexItem
            sx={{
              backgroundColor: "#B0C0C5",
              width: "85%",
              height: "2px",
              mx: "auto",
            }}
          />
          <PrivacyTermsWrapper>
            <PrivacyWrapper>
              <PrivacyTermsText>{t("Text127")}</PrivacyTermsText>
            </PrivacyWrapper>
            <TermsWrapper>
              <PrivacyTermsText>{t("Text128")}</PrivacyTermsText>
            </TermsWrapper>
          </PrivacyTermsWrapper>
        </FooterWrapper>
      </FooterContainer>
    </>
  );
};

export default Footer;
