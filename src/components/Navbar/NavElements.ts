import styled from "styled-components";
import { colors, ThemeColor } from "../../core-UI/Theme";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";

export const NavContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 95;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(6px);

  @media only screen and (min-width: 280px) and (max-width: 576px) {
    padding: 8px;
    width: 100%;
    border-radius: 0;
    border-bottom: solid 2px ${ThemeColor.border1};
  }

  @media only screen and (min-width: 577px) and (max-width: 768px) {
    padding: 8px;
    width: 100%;
    border-radius: 0;
    border-bottom: solid 2px ${ThemeColor.border1};
  }

  @media only screen and (min-width: 769px) and (max-width: 1080px) {
    padding: 4px;
    width: 80%;
    border-radius: 14px;
    border: solid 2px ${ThemeColor.border1};
  }

  @media only screen and (min-width: 1081px) and (max-width: 1920px) {
    padding: 4px;
    width: 60%;
    border-radius: 14px;
    border: solid 2px ${ThemeColor.border1};
  }

  @media only screen and (min-width: 1921px) {
    padding: 4px;
    width: 60%;
    border-radius: 14px;
    border: solid 2px ${ThemeColor.border1};
  }
`;

export const NavbarActiveArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

export const NavbarLeftSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const NavbarLogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: ${colors.primary1};
`;

export const NavbarRightSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-right: 4px;
`;

export const TranslateConnectWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const TranslateWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ConnectWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${ThemeColor.secondary1};
  border-radius: 10px;
  cursor: pointer;
  padding: 8px 12px;
`;

export const ConnectIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.3rem;
`;

export const ConnectIcon = styled(MdOutlineAccountBalanceWallet)`
  width: 20px;
  height: 20px;
  color: #ffffff;
`;

export const ConnectBtn = styled.div`
  cursor: pointer;
`;

export const ConnectText = styled.p`
  color: ${colors.text2};
  font-weight: 500;
  @media only screen and (min-width: 280px) and (max-width: 576px) {
    font-size: 12px;
  }

  @media only screen and (min-width: 577px) and (max-width: 768px) {
    font-size: 14px;
  }

  @media only screen and (min-width: 769px) and (max-width: 1080px) {
    font-size: 14px;
  }

  @media only screen and (min-width: 1081px) and (max-width: 1920px) {
    font-size: 14px;
  }

  @media only screen and (min-width: 1921px) and (max-width: 2700px) {
    font-size: 16px;
  }
`;
