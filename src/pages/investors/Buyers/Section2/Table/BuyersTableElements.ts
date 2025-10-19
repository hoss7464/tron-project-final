import styled from "styled-components";
import { ThemeColor } from "../../../../../core-UI/Theme";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FaExclamation } from "react-icons/fa";


export const BuyersTableContainer1 = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 730px;
  border: solid 2px ${ThemeColor.border1};
  padding: 0.5rem;

  @media only screen and (min-width: 280px) and (max-width: 576px) {
    border-radius: 16px;
  }

  @media only screen and (min-width: 577px) and (max-width: 992px) {
    border-radius: 16px;
  }

  @media only screen and (min-width: 993px) and (max-width: 1080px) {
    border-radius: 16px;
  }

  @media only screen and (min-width: 1081px) and (max-width: 1920px) {
    border-radius: 20px;
  }

  @media only screen and (min-width: 1921px) and (max-width: 2700px) {
    border-radius: 24px;
  }
`;

export const BuyersContentsWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const Table2MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

export const BuyerstCardTextWrap1 = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  width: 18%;
`;

export const BuyerSignWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
`

export const CheckedSign = styled(FaCheck)`
width: 16px;
height: 16px;
color: ${ThemeColor.text2};
`
export const CanceledSign = styled(IoClose)`
width: 16px;
height: 16px;
color: ${ThemeColor.text2};
`
export const ProcessSign = styled(FaExclamation)`
width: 16px;
height: 16px;
color: ${ThemeColor.text2};
`

export const BuyersAvailableNavbar = styled.div`
display: flex;
justify-content: space-between;
align-items: center;

width: 92%;
`


