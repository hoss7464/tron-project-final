import styled from "styled-components";
import { ThemeColor } from "../../core-UI/Theme";

export const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
  background-color: ${ThemeColor.bg2};

  @media only screen and (min-width: 280px) and (max-width: 576px) {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  @media only screen and (min-width: 577px) and (max-width: 768px) {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  @media only screen and (min-width: 769px) and (max-width: 1080px) {
    border-bottom-right-radius: 16px;
    border-bottom-left-radius: 16px;
  }

  @media only screen and (min-width: 1081px) and (max-width: 1920px) {
    border-bottom-right-radius: 16px;
    border-bottom-left-radius: 16px;
  }

  @media only screen and (min-width: 1921px) and (max-width: 2700px) {
    border-bottom-right-radius: 32px;
    border-bottom-left-radius: 32px;
  }
`;
