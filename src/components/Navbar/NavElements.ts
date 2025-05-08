import styled from "styled-components";
import { colors } from "../../core-UI/Theme";

export const NavContainer = styled.div`
  width: 100%;
  height: 80px;
  position: fixed;
  z-index: 1000;
  background-color: ${colors.bg1};
  @media only screen and (min-width: 280px) and (max-width: 768px) {
    padding: 0 24px 0 24px;
    height: 80px;
  }

  @media only screen and (min-width: 769px) and (max-width: 1920px) {
    padding: 0 32px 0 32px;
    height: 80px;
  }

  @media only screen and (min-width: 1921px) {
    padding: 0 56px 0 56px;
    height: 124px;
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
  width: 62px;
  height: 62px;
  border-radius: 50%;
  background-color: ${colors.primary1};
`;

export const NavbarRightSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: relative;
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
  background-color: ${colors.primary1};
  border-radius: 4px;
  border: solid 2px ${colors.primary1};
`;

export const ConnectBtn = styled.div`
  padding: 8px 12px;
  cursor: pointer;
`;

export const ConnectText = styled.p`
  color: ${colors.text2};
  font-weight: 600;
  font-size: 16px;
`;
