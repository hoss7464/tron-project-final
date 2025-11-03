import styled from "styled-components";

export const BuyersContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
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

export const BuyerssMainWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  z-index: 10;
  margin-bottom: 1rem;
 
  @media only screen and (min-width: 280px) and (max-width: 576px) {
    padding: 0 4px 0 4px;
    margin-top: 3rem;
  }

  @media only screen and (min-width: 577px) and (max-width: 768px) {
    padding: 0 16px 0 16px;
    margin-top: 3rem;
  }

  @media only screen and (min-width: 769px) and (max-width: 1080px) {
    padding: 0 32px 0 32px;
    margin-top: 4rem;
  }

  @media only screen and (min-width: 1081px) and (max-width: 1920px) {
    padding: 0 32px 0 32px;
        margin-top: 5rem;
  }

  @media only screen and (min-width: 1921px) and (max-width: 2700px) {
    padding: 0 56px 0 56px;
    margin-top: 5rem;
  }
`;

export const Sec2Wrapper = styled.div`
width: 100%;
margin-top: 20px;
`
