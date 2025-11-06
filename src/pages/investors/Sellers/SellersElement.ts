import styled from "styled-components";
import { ThemeColor } from "../../../core-UI/Theme";
import { IoMdSettings } from "react-icons/io";
import { RiNumbersFill } from "react-icons/ri";
import { FaEquals } from "react-icons/fa";
import { MdCurrencyExchange } from "react-icons/md";

export const SellersContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  position: relative;

  @media only screen and (min-width: 280px) and (max-width: 768px) {
    border-radius: 0;
    min-height: 700px;
  }

  @media only screen and (min-width: 769px) and (max-width: 1080px) {
    border-radius: 16px;
    min-height: 600px;
  }

  @media only screen and (min-width: 1081px) and (max-width: 1920px) {
    border-radius: 16px;
    min-height: 610px;
  }

  @media only screen and (min-width: 1921px) and (max-width: 2700px) {
    border-radius: 32px;
    min-height: 760px;
  }
`;
export const SellersMainWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
   width: 100%;
  z-index: 10;
  padding-top: 20px;
  padding-bottom: 20px;

  @media only screen and (min-width: 280px) and (max-width: 576px) {
    padding: 0 4px 0 4px;
    margin-top: 4.5rem;
  }

   @media only screen and (min-width: 577px) and (max-width: 768px) {
    padding: 0 16px 0 16px;
    margin-top: 3rem;
  }

  @media only screen and (min-width: 769px) and (max-width: 1080px) {
  padding: 0 32px 0 32px;
    margin-top: 3rem;
  }

  @media only screen and (min-width: 1081px) and (max-width: 1920px) {
     padding: 0 32px 0 32px;
    margin-top: 4rem;
  }

  @media only screen and (min-width: 1921px) and (max-width: 2700px) {
    padding: 0 56px 0 56px;
    margin-top: 4rem;
  }
`;

export const SellersMainHeaderBtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
`;
export const SellersMainHeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const SellersMainHeader = styled.p`
  color: ${ThemeColor.primary1};
  font-weight: 900;
    @media only screen and (min-width: 280px) and (max-width: 576px) {
    font-size: 20px;
  }

  @media only screen and (min-width: 577px) and (max-width: 768px) {
    font-size: 20px;
  }

  @media only screen and (min-width: 769px) and (max-width: 1080px) {
   font-size: 20px;
  }

  @media only screen and (min-width: 1081px) and (max-width: 1920px) {
    font-size: 22px;
  }

  @media only screen and (min-width: 1921px) and (max-width: 2700px) {
    font-size: 22px;
  }
`;

export const SellersBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  background-color: ${ThemeColor.secondary1};
    @media only screen and (min-width: 280px) and (max-width: 576px) {
     padding: 6px 8px;
  }

  @media only screen and (min-width: 577px) and (max-width: 768px) {
   padding: 6px 10px;
  }

  @media only screen and (min-width: 769px) and (max-width: 1080px) {
    padding: 8px 12px;
  }

  @media only screen and (min-width: 1081px) and (max-width: 1920px) {
    padding: 8px 12px;
  }

  @media only screen and (min-width: 1921px) and (max-width: 2700px) {
   padding: 8px 12px;
  }
`;

export const SelersSettingIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.2rem;
  cursor: pointer;
`
export const SelersSettingIcon = styled(IoMdSettings)`
color: ${ThemeColor.text2};
width: 22px;
height: 22px;
cursor: pointer;
`

export const SellersBtnText = styled.p`
  color: ${ThemeColor.text2};
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;

export const SellersTopWrapper = styled.div`
  width: 100%;
`;
export const SellersBottomWrapper = styled.div`
  width: 100%;
  margin-top: 1rem;
`;

export const SellersPropertyWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 70%;

  padding-left: 1rem;
`;
export const SellersPeopertyWrapper2 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  @media only screen and (min-width: 280px) and (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
  }
`;
export const SellersCardIconHeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const SellersCountIcon = styled(RiNumbersFill)`
  color: ${ThemeColor.text2};
  width: 22px;
  height: 22px;
`;
export const SellersTotalIcon = styled(FaEquals)`
  color: ${ThemeColor.text2};
  width: 22px;
  height: 22px;
`;
export const SellersEarnIcon = styled(MdCurrencyExchange)`
  color: ${ThemeColor.text2};
  width: 22px;
  height: 22px;
`;

export const SellersCardHeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 0.5rem;
`;
export const SellersCardHeader = styled.p`
  font-size: 20px;
  color: ${ThemeColor.primary1};
  font-weight: 800;
`;
export const SellersCardThingsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;
export const SellersCardThingsWrapper2 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
  width: 100%;
  margin-bottom: 1rem;
`;
export const SellersCardThingsNameIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const SellersCardThingsNameWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const SellersCardThingsName = styled.p`
  font-size: 18px;
  color: ${ThemeColor.primary1};
  font-weight: 600;
`;
export const SellersCardThingsNumberWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const SellersCardThingsNumber = styled.p`
  font-size: 17px;
  color: ${ThemeColor.primary1};
  font-weight: 500;
`;

export const SellersHistoryWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
`

export const SellersNavTextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
`;


