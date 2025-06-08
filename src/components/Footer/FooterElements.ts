import styled from "styled-components";
import { ThemeColor } from "../../core-UI/Theme";
import { FaTelegram } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";

export const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  @media only screen and (min-width: 280px) and (max-width: 768px) {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    padding: 0 24px 24px 24px;
  }

  @media only screen and (min-width: 769px) and (max-width: 1920px) {
    border-bottom-right-radius: 16px;
    border-bottom-left-radius: 16px;
    padding: 0 32px 32px 32px;
  }

  @media only screen and (min-width: 1921px) and (max-width: 2700px) {
    border-bottom-right-radius: 32px;
    border-bottom-left-radius: 32px;
    padding: 0 56px 56px 56px;
  }
`;

export const FooterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
 

  @media only screen and (min-width: 280px) and (max-width: 1080px) {
    border-radius: 16px;
  }

  @media only screen and (min-width: 1081px) and (max-width: 1920px) {
    border-radius: 20px;
  }

  @media only screen and (min-width: 1921px) {
    border-radius: 24px;
  }
`;

export const CooperationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  background-color: ${ThemeColor.primary3};

  @media only screen and (min-width: 280px) and (max-width: 1080px) {
    border-top-right-radius: 16px;
    border-top-left-radius: 16px;
  }

  @media only screen and (min-width: 1081px) and (max-width: 1920px) {
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
  }

  @media only screen and (min-width: 1921px) {
    border-top-right-radius: 24px;
    border-top-left-radius: 24px;
  }
`;

export const FooterContentWrapper = styled.div`
  display: flex;
  width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-top: 1rem;

  @media only screen and (min-width: 280px) and (max-width: 576px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
  }

  @media only screen and (min-width: 577px) and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
  }

  @media only screen and (min-width: 769px) and (max-width: 1080px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 2rem;
  }

  @media only screen and (min-width: 1081px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 3rem;
  }
`;

export const FooterContentLeftSection = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;

  @media only screen and (min-width: 280px) and (max-width: 768px) {
    width: 100%;
    align-items: center;
    margin-bottom: 2rem;
  }

  @media only screen and (min-width: 769px) {
    align-items: flex-start;
  }

`;

export const FooterIconHeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  @media only screen and (min-width: 280px) and (max-width: 768px) {
    margin-bottom: 1.5rem;
  }

  @media only screen and (min-width: 769px) {
    margin-bottom: 0.5rem;
  }
`;
export const FooterIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (min-width: 280px) and (max-width: 768px) {
    margin-right: 0.2rem;
  }

  @media only screen and (min-width: 769px) {
    margin-right: 0.5rem;
  }

`;
export const FooterIcon = styled.div`
  width: 50px;
  height: 50px;
  background-color: ${ThemeColor.secondary1};
  border-radius: 55px;
`;
export const FooterHeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
export const FooterHeader = styled.p`
  color: ${ThemeColor.primary1};
  font-weight: 900;

  @media only screen and (min-width: 280px) and (max-width: 768px) {
    font-size: 16px;
    text-align: center;
  }

  @media only screen and (min-width: 769px) and (max-width: 1080px) {
    font-size: 19px;
    text-align: left;
  }

  @media only screen and (min-width: 1081px) and (max-width: 1920px) {
    font-size: 20px;
    text-align: left;
  }

  @media only screen and (min-width: 1921px) {
    font-size: 22px;
    text-align: left;
  }
`;
export const FooterSubheaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  @media only screen and (min-width: 280px) and (max-width: 576px) {
    max-width: 100%;
    margin-bottom: 1.5rem;
  }

  @media only screen and (min-width: 577px) and (max-width: 768px) {
    max-width: 450px;
    margin-bottom: 1.5rem;
  }

  @media only screen and (min-width: 769px) and (max-width: 1080px) {
    max-width: 520px;
    margin-bottom: 2rem;
  }

  @media only screen and (min-width: 1081px) {
    max-width: 650px;
    margin-bottom: 2rem;
  }

`;
export const FooterSubheader = styled.p`
  color: ${ThemeColor.primary1};
  font-weight: 400;

  @media only screen and (min-width: 280px) and (max-width: 768px) {
    font-size: 16px;
    text-align: center;
  }

  @media only screen and (min-width: 769px) and (max-width: 1920px) {
    font-size: 16px;
    text-align: left;
  }

  @media only screen and (min-width: 1921px) {
    font-size: 18px;
    text-align: left;
  }
`;

export const FooterSocialMediaWrapper1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const FooterSocialMediaWrapper2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.5rem;
`;
export const FooterSocialMediaWrapper3 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 4px;
  border: solid 1px ${ThemeColor.secondary1};
  cursor: pointer;
`;
export const FooterSocialMediaWrapper4 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: ${ThemeColor.secondary1};
  padding: 6px;
`;
export const FooterTelegramIcon = styled(FaTelegram)`
  color: ${ThemeColor.bg2};

  @media only screen and (min-width: 280px) and (max-width: 768px) {
    width: 14px;
    height: 14px;
  }

  @media only screen and (min-width: 769px) and (max-width: 1080px) {
    width: 16px;
    height: 16px;
  }

  @media only screen and (min-width: 1081px) {
    width: 19px;
    height: 19px;
  }

`;

export const FooterWhatsAppIcon = styled(IoLogoWhatsapp)`
  color: ${ThemeColor.bg2};
  @media only screen and (min-width: 280px) and (max-width: 768px) {
    width: 14px;
    height: 14px;
  }

  @media only screen and (min-width: 769px) and (max-width: 1080px) {
    width: 16px;
    height: 16px;
  }

  @media only screen and (min-width: 1081px) {
    width: 19px;
    height: 19px;
  }

`;

export const FooterLinkedInIcon = styled(FaLinkedin)`
  color: ${ThemeColor.bg2};
  @media only screen and (min-width: 280px) and (max-width: 768px) {
    width: 14px;
    height: 14px;
  }

  @media only screen and (min-width: 769px) and (max-width: 1080px) {
    width: 16px;
    height: 16px;
  }

  @media only screen and (min-width: 1081px) {
    width: 19px;
    height: 19px;
  }

`;
export const FooterContentRightSection = styled.div`
  display: flex;

  @media only screen and (min-width: 280px) and (max-width: 576px) {
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  @media only screen and (min-width: 577px) and (max-width: 768px) {
    width: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  @media only screen and (min-width: 769px) {
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
  }

`;
export const FooterFeatureWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media only screen and (min-width: 280px) and (max-width: 576px) {
    align-items: center;
    justify-content: center;
    min-width: 200px;
    margin-bottom: 1rem;
  }

  @media only screen and (min-width: 577px) and (max-width: 768px) {
    align-items: center;
    justify-content: center;
    min-width: 200px;
  }

  @media only screen and (min-width: 769px) and (max-width: 1920px) {
    align-items: flex-start;
    justify-content: flex-start;
    min-width: 150px;
  }

  @media only screen and (min-width: 1921px) {
    align-items: flex-start;
    justify-content: flex-start;
    min-width: 200px;
  }
`;
export const FooterFeatureHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 0.5rem;

  @media only screen and (min-width: 280px) and (max-width: 768px) {
    margin-right: 0;
    justify-content: center;
  }

  @media only screen and (min-width: 769px) {
    margin-right: 1rem;
    justify-content: flex-start;
  }

`;
export const FooterFeatureHeader = styled.p`
  color: ${ThemeColor.primary1};
  font-weight: 800;
  @media only screen and (min-width: 280px) and (max-width: 768px) {
    font-size: 14px;
  }

  @media only screen and (min-width: 769px) and (max-width: 1080px) {
    font-size: 16px;
  }

  @media only screen and (min-width: 1081px) and (max-width: 1920px) {
    font-size: 18px;
  }

  @media only screen and (min-width: 1921px) {
    font-size: 20px;
  }
`;
export const FooterFeatureTextWrapper1 = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
`;
export const FooterFeatureTextWrapper2 = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.3rem;
  width: 100%;

  @media only screen and (min-width: 280px) and (max-width: 768px) {
    justify-content: center;
  }

  @media only screen and (min-width: 769px) {
    justify-content: flex-start;
  }

`;
export const FooterFeatureText = styled.p`
  color: ${ThemeColor.primary1};
  font-weight: 500;
  @media only screen and (min-width: 280px) and (max-width: 768px) {
    font-size: 13px;
  }

  @media only screen and (min-width: 769px) and (max-width: 1920px) {
    font-size: 14px;
  }

  @media only screen and (min-width: 1921px) {
    font-size: 18px;
  }
`;

export const PrivacyTermsWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
padding-top: 1rem;
padding-bottom: 1rem;
`
export const PrivacyWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-right: 2rem;
`
export const TermsWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
`
export const PrivacyTermsText = styled.div`
color: ${ThemeColor.primary1};
font-weight: 700;
  @media only screen and (min-width: 280px) and (max-width: 768px) {
    font-size: 13px;
  }

  @media only screen and (min-width: 769px) and (max-width: 1920px) {
    font-size: 14px;
  }

  @media only screen and (min-width: 1921px) {
    font-size: 18px;
  }
`
