import styled from "styled-components";
import { ThemeColor } from "../../../../../core-UI/Theme";

export const BuyersTableContainer1 = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 700px;
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
`


