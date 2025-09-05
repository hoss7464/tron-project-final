import styled from "styled-components";

export const BuyersContainer = styled.div`
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
`
export const BuyerssMainWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 100%;
`