import styled from "styled-components";
import { colors, ThemeColor } from "../../core-UI/Theme";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { Link } from "react-router-dom";
import { BsShopWindow } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";

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
    width: 85%;
    border-radius: 14px;
    border: solid 2px ${ThemeColor.border1};
  }

  @media only screen and (min-width: 1081px) and (max-width: 1920px) {
    padding: 4px;
    width: 65%;
    border-radius: 14px;
    border: solid 2px ${ThemeColor.border1};
  }

  @media only screen and (min-width: 1921px) {
    padding: 4px;
    width: 65%;
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
  margin-left: 0.2rem;
`;

export const NavbarLogo = styled.img`
  box-sizing: border-box;
  height: 42px;
`;

export const NavbarLinkWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1rem;
`;

export const NavLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  border-radius: 8px;
  font-weight: 600;
  padding: 8px 12px;
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
    font-size: 1px;
  }
`;

export const NavLinkIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.3rem;
`;
export const NavMarketIcon = styled(BsShopWindow)`
  width: 20px;
  height: 20px;
`;

export const NavBuyersIcon = styled(FaShoppingCart)`
  width: 20px;
  height: 20px;
`;

export const NavSellersIcon = styled(FaHandshake)`
  width: 20px;
  height: 20px;
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
