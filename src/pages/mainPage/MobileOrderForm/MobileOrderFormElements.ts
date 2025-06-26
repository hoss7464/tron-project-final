import styled from "styled-components";

export const MobileOrderFormContainer = styled.div`
  width: 100%;

  @media only screen and (min-width: 280px) and (max-width: 576px) {
    padding: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media only screen and (min-width: 577px) and (max-width: 768px) {
    padding: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media only screen and (min-width: 769px) and (max-width: 992px) {
    padding: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media only screen and (min-width: 993px) {
    display: none;
  }
`;

export const MobileOrderFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (min-width: 280px) and (max-width: 600px) {
    width: 100%;
  }

  @media only screen and (min-width: 601px) and (max-width: 768px) {
    width: 450px;
  }

  @media only screen and (min-width: 769px) and (max-width: 1080px) {
    width: 450px;
  }

  @media only screen and (min-width: 1081px) and (max-width: 1920px) {
  }

  @media only screen and (min-width: 1921px) {
  }
`;
