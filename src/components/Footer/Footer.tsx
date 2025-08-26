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

const Footer: React.FC = () => {
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
                    Optimizing Bandwidth, Energy, and Innovation.
                  </FooterHeader>
                </FooterHeaderWrapper>
              </FooterIconHeaderWrapper>
              <FooterSubheaderWrapper>
                <FooterSubheader>
                  Powered by TRON — where bandwidth and energy drive smart,
                  seamless transactions.
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
                  <FooterFeatureHeader>Company</FooterFeatureHeader>
                </FooterFeatureHeaderWrapper>
                <FooterFeatureTextWrapper1>
                  <FooterFeatureTextWrapper2>
                    <FooterFeatureText>About Us</FooterFeatureText>
                  </FooterFeatureTextWrapper2>
                  <FooterFeatureTextWrapper2>
                    <FooterFeatureText>Careers</FooterFeatureText>
                  </FooterFeatureTextWrapper2>
                  <FooterFeatureTextWrapper2>
                    <FooterFeatureText>News</FooterFeatureText>
                  </FooterFeatureTextWrapper2>
                  <FooterFeatureTextWrapper2>
                    <FooterFeatureText>Contract</FooterFeatureText>
                  </FooterFeatureTextWrapper2>
                </FooterFeatureTextWrapper1>
              </FooterFeatureWrapper>
              <FooterFeatureWrapper>
                <FooterFeatureHeaderWrapper>
                  <FooterFeatureHeader>Business</FooterFeatureHeader>
                </FooterFeatureHeaderWrapper>
                <FooterFeatureTextWrapper1>
                  <FooterFeatureTextWrapper2>
                    <FooterFeatureText>Telebot</FooterFeatureText>
                  </FooterFeatureTextWrapper2>
                  <FooterFeatureTextWrapper2>
                    <FooterFeatureText>Buy API</FooterFeatureText>
                  </FooterFeatureTextWrapper2>
                  <FooterFeatureTextWrapper2>
                    <FooterFeatureText>API Example</FooterFeatureText>
                  </FooterFeatureTextWrapper2>
                  <FooterFeatureTextWrapper2>
                    <FooterFeatureText>System Status</FooterFeatureText>
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
              <PrivacyTermsText>Privacy Policy</PrivacyTermsText>
            </PrivacyWrapper>
            <TermsWrapper>
              <PrivacyTermsText>Terms of Services</PrivacyTermsText>
            </TermsWrapper>
          </PrivacyTermsWrapper>
        </FooterWrapper>
      </FooterContainer>
    </>
  );
};

export default Footer;
