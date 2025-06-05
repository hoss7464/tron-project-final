import styled from "styled-components";
import { ThemeColor } from "../core-UI/Theme";

export const MainContainerWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  background-color: ${ThemeColor.bg1};

  @media only screen and (min-width: 280px) and (max-width: 768px) {
    padding: 0;
  }

  @media only screen and (min-width: 769px) {
    padding: 0.5rem;
  }


`;

export const LightMainContainerWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  min-height: 720px;
  background-color: ${ThemeColor.bg3};

  @media only screen and (min-width: 280px) and (max-width: 1080px) {
    padding: 0;
  }

  @media only screen and (min-width: 1081px) and (max-width: 1920px) {
    border-radius: 24px;
    padding: 0.5rem;
  }

  @media only screen and (min-width: 1921px) {
    border-radius: 48px;
    padding: 0.5rem;
  }
`;

export const PrimeMainContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  background-color: ${ThemeColor.bg2};

  @media only screen and (min-width: 280px) and (max-width: 576px) {
    border-radius: 0;
  }

  @media only screen and (min-width: 577px) and (max-width: 768px) {
    border-radius: 0;
  }

  @media only screen and (min-width: 769px) and (max-width: 1080px) {
    border-radius: 16px;
  }

  @media only screen and (min-width: 1081px) and (max-width: 1920px) {
    border-radius: 16px;
  }

  @media only screen and (min-width: 1921px) and (max-width: 2700px) {
    border-radius: 32px;
  }

  
`;
