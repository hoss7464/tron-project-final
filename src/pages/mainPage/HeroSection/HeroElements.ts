import styled from "styled-components";
import { ThemeColor } from "../../../core-UI/Theme";
//---------------------------------------------------------------------
export const HeroContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  position: relative;
  margin-bottom: 1rem;

  @media only screen and (min-width: 280px) and (max-width: 576px) {
    border-radius: 0;
    min-height: 700px;
  }

  @media only screen and (min-width: 577px) and (max-width: 768px) {
    border-radius: 0;
    min-height: 700px;
  }

  @media only screen and (min-width: 769px) and (max-width: 1080px) {
    border-radius: 16px;
    min-height: 600px;
  }

  @media only screen and (min-width: 1081px) and (max-width: 1920px) {
    border-radius: 16px;
    min-height: 700px;
  }

  @media only screen and (min-width: 1921px) and (max-width: 2700px) {
    border-radius: 32px;
    min-height: 760px;
  }
`;

export const HeroMainbgPhotoWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 70%;
  z-index: 1;

  @media only screen and (min-width: 280px) and (max-width: 576px) {
    border-top-right-radius: 0;
    border-top-left-radius: 0;
  }

  @media only screen and (min-width: 577px) and (max-width: 768px) {
    border-top-right-radius: 0;
    border-top-left-radius: 0;
  }

  @media only screen and (min-width: 769px) and (max-width: 1080px) {
    border-top-right-radius: 16px;
    border-top-left-radius: 16px;
  }

  @media only screen and (min-width: 1081px) and (max-width: 1920px) {
    border-top-right-radius: 16px;
    border-top-left-radius: 16px;
  }

  @media only screen and (min-width: 1921px) and (max-width: 2700px) {
    border-top-right-radius: 32px;
    border-top-left-radius: 32px;
  }
`;

export const HeroTextButtonHeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  z-index: 3;

  @media only screen and (min-width: 280px) and (max-width: 576px) {
    max-width: 290px;
    margin-top: 5rem;
  }

  @media only screen and (min-width: 577px) and (max-width: 768px) {
    margin-top: 5rem;
  }

  @media only screen and (min-width: 769px) and (max-width: 1080px) {
    margin-top: 5rem;
  }

  @media only screen and (min-width: 1081px) and (max-width: 1920px) {
    margin-top: 6rem;
  }

  @media only screen and (min-width: 1921px) and (max-width: 2700px) {
    margin-top: 6rem;
  }
`;

export const HeroHeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
`;
export const HeroHeader = styled.p`
  font-weight: 800;
  color: ${ThemeColor.text1};
  text-align: center;
  @media only screen and (min-width: 280px) and (max-width: 576px) {
    font-size: 16px;
  }

  @media only screen and (min-width: 577px) and (max-width: 768px) {
    font-size: 20px;
  }

  @media only screen and (min-width: 769px) and (max-width: 1080px) {
    font-size: 20px;
  }

  @media only screen and (min-width: 1081px) and (max-width: 1920px) {
    font-size: 28px;
  }

  @media only screen and (min-width: 1921px) and (max-width: 2700px) {
    font-size: 44px;
  }
`;
export const HeroTextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  width: 100%;

  @media only screen and (min-width: 280px) and (max-width: 576px) {
    max-width: 290px;
  }

  @media only screen and (min-width: 577px) and (max-width: 768px) {
    max-width: 580px;
  }

  @media only screen and (min-width: 769px) and (max-width: 1080px) {
    max-width: 580px;
  }

  @media only screen and (min-width: 1081px) and (max-width: 1920px) {
    max-width: 720px;
  }

  @media only screen and (min-width: 1921px) and (max-width: 2700px) {
    max-width: 1100px;
  }
`;
export const HeroText = styled.p`
  font-weight: 300;
  font-style: italic;
  color: ${ThemeColor.text1};
  text-align: center;
  @media only screen and (min-width: 280px) and (max-width: 576px) {
    font-size: 14px;
  }

  @media only screen and (min-width: 577px) and (max-width: 768px) {
    font-size: 18px;
  }

  @media only screen and (min-width: 769px) and (max-width: 1080px) {
    font-size: 18px;
  }

  @media only screen and (min-width: 1081px) and (max-width: 1920px) {
    font-size: 22px;
  }

  @media only screen and (min-width: 1921px) and (max-width: 2700px) {
    font-size: 38px;
  }
`;
export const HeroButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HeroButtonWrapper2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${ThemeColor.secondary1};
  padding: 12px 24px;
  border-radius: 55px;
  cursor: pointer;
`;
export const HeroButtonText = styled.p`
  color: ${ThemeColor.text2};
  font-weight: 500;
  font-size: 16px;
`;

export const HeroUniqueTextWrapper = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  z-index: 2;

  @media only screen and (min-width: 280px) and (max-width: 576px) {
    display: none;
  }

  @media only screen and (min-width: 577px) and (max-width: 768px) {
    display: none;
  }

  @media only screen and (min-width: 768px) and (max-width: 900px) {
    display: none;
  }

  @media only screen and (min-width: 901px) and (max-width: 1080px) {
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 11rem;
  }
  @media only screen and (min-width: 1081px) and (max-width: 1220px) {
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 12rem;
  }

  @media only screen and (min-width: 1221px) and (max-width: 1440px) {
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 10rem;
  }

  @media only screen and (min-width: 1441px) and (max-width: 1660px) {
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 8rem;
  }

  @media only screen and (min-width: 1661px) and (max-width: 1920px) {
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 6rem;
  }

  @media only screen and (min-width: 1921px) and (max-width: 2700px) {
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 0;
  }
`;
export const HeroUniqueText = styled.img`
  width: 100%;
`;

//------------------------------------------------------------------

export const HeroResourceContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 3;
    @media only screen and (min-width: 280px) and (max-width: 576px) {
    padding: 0 24px 0 24px;
    margin-top: 2rem;
  }

  @media only screen and (min-width: 577px) and (max-width: 768px) {
    padding: 0 24px 0 24px;
    margin-top: 2rem;
  }

  @media only screen and (min-width: 769px) and (max-width: 1080px) {
    padding: 0 32px 0 32px;
       margin-top: 3rem;

  }

  @media only screen and (min-width: 1081px) and (max-width: 1920px) {
    padding: 0 32px 0 32px;

  }

  @media only screen and (min-width: 1921px) and (max-width: 2700px) {
    padding: 0 56px 0 56px;
  }


`;

export const HeroResourceWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const HeroGridCard = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
`;

export const HeroGridCardIconHeaderWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-bottom: 1rem;
`;
export const HeroGridCardIconWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-right: 0.5rem;
`;
export const HeroGridCardIcon = styled.img`
  @media only screen and (min-width: 280px) and (max-width: 576px) {
    width: 34px;
    height: 34px;
  }

  @media only screen and (min-width: 577px) and (max-width: 768px) {
     width: 36px;
    height: 36px;
  }

  @media only screen and (min-width: 769px) and (max-width: 1080px) {
     width: 34px;
    height: 34px;
  }

  @media only screen and (min-width: 1081px) and (max-width: 1920px) {
     width: 36px;
    height: 36px;
  }

  @media only screen and (min-width: 1921px) and (max-width: 2700px) {
    width: 46px;
    height: 46px;
  }

`;
export const HeroGridCardHeaderWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;

`;
export const HeroGridCardHeader = styled.p`
font-weight: 800;
color: ${ThemeColor.primary1};
text-align: left;

  @media only screen and (min-width: 280px) and (max-width: 576px) {
    font-size: 16px;
  }

  @media only screen and (min-width: 577px) and (max-width: 768px) {
    font-size: 20px;
  }

  @media only screen and (min-width: 769px) and (max-width: 1080px) {
    font-size: 16px;
  }

  @media only screen and (min-width: 1081px) and (max-width: 1920px) {
    font-size: 22px;
  }

  @media only screen and (min-width: 1921px) and (max-width: 2700px) {
    font-size: 32px;
  }
`;
export const HeroGridCardSubHeaderWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-bottom: 1rem;
  @media only screen and (min-width: 280px) and (max-width: 576px) {
   max-width: 100%;
  }

  @media only screen and (min-width: 577px) and (max-width: 768px) {
   max-width: 100%;
  }

  @media only screen and (min-width: 769px) and (max-width: 1080px) {
    max-width: 90%;
  }

  @media only screen and (min-width: 1081px) and (max-width: 1920px) {
   max-width: 85%;
  }

  @media only screen and (min-width: 1921px) and (max-width: 2700px) {
   max-width: 70%;
  }
`;
export const HeroGridCardSubHeader = styled.p`
font-weight: 400;
color: ${ThemeColor.primary1};
text-align: left;

@media only screen and (min-width: 280px) and (max-width: 576px) {
    font-size: 16px;
  }

  @media only screen and (min-width: 577px) and (max-width: 768px) {
    font-size: 16px;
  }

  @media only screen and (min-width: 769px) and (max-width: 1080px) {
    font-size: 16px;
  }

  @media only screen and (min-width: 1081px) and (max-width: 1920px) {
    font-size: 18px;
  }

  @media only screen and (min-width: 1921px) and (max-width: 2700px) {
    font-size: 22px;
  }
`;
export const HeroGridCardNumberIconTextWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-bottom: 0.5rem;
`;
export const HeroGridCardNumberIconWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-right: 0.5rem;
`;
export const HeroGridCardNumberIconWrapper2 = styled.div`
display: flex;
justify-content: center;
align-items: center;
border-radius: 10px;
padding: 4px;
`;
export const HeroGridCardNumberIconWrapper3 = styled.div`
display: flex;
justify-content: center;
align-items: center;
border-radius: 8px;
padding: 6px;
`;
export const HeroGridCardNumberIcon = styled.img`
width: 16px;
height: 16px;
`;
export const HeroGridCardNumberTextWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
`;
export const HeroGridCardNumberText = styled.p`
font-weight: 400;
color: ${ThemeColor.primary1};
text-align: left;

@media only screen and (min-width: 280px) and (max-width: 576px) {
    font-size: 16px;
  }

  @media only screen and (min-width: 577px) and (max-width: 768px) {
    font-size: 16px;
  }

  @media only screen and (min-width: 769px) and (max-width: 1080px) {
    font-size: 16px;
  }

  @media only screen and (min-width: 1081px) and (max-width: 1920px) {
    font-size: 18px;
  }

  @media only screen and (min-width: 1921px) and (max-width: 2700px) {
    font-size: 22px;
  }
`;
