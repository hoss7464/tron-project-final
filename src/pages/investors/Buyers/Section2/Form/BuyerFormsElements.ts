import styled from "styled-components";

export const BuyersFormsContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;

 
`

export const BuyersForm = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;

  @media only screen and (min-width: 280px) and (max-width: 576px) {
    border-radius: 14px;
    
  }

  @media only screen and (min-width: 577px) and (max-width: 768px) {
    border-radius: 14px;
    
  }

  @media only screen and (min-width: 769px) and (max-width: 1080px) {
    border-radius: 14px;
    
  }

  @media only screen and (min-width: 1081px) and (max-width: 1920px) {
    border-radius: 18px;
    
  }

  @media only screen and (min-width: 1921px) {
    border-radius: 22px;
    
  }
`

export const FormSwitchBtnWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
`

export const BuyerFormContentWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
width: 100%;
height: 100%;

`