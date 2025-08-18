import styled from "styled-components";
import { ThemeColor } from "../../core-UI/Theme";
import { IoClose } from "react-icons/io5";

export const ConnectContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (min-width: 280px) and (max-width: 576px) {
    width: 900px;
  }

  @media only screen and (min-width: 577px) and (max-width: 768px) {
    width: 900px;
  }

  @media only screen and (min-width: 769px) {
    width: 900px;
    height: 550px;
  }

`;

export const ConnectMainWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;

  @media only screen and (min-width: 280px) and (max-width: 768px) {
    flex-direction: column;
    border-radius: 16px;
    padding: 16px;
  }

  @media only screen and (min-width: 769px) and (max-width: 1080px) {
    flex-direction: row;
    border-radius: 16px;
    padding: 20px;
  }

  @media only screen and (min-width: 1081px) and (max-width: 1920px) {
    flex-direction: row;
    border-radius: 20px;
    padding: 20px;
  }

  @media only screen and (min-width: 1921px) {
    flex-direction: row;
    border-radius: 24px;
    padding: 20px;
  }
`;

export const ConnectUniqueTextWrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 1rem;
  width: 100%;
  z-index: 2;


  @media only screen and (min-width: 280px) and (max-width: 768px) {
    display: none;
  }

  @media only screen and (min-width: 769px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }

`;
export const ConnectUniqueText = styled.img`
  width: 100%;
`;

export const ConnectRightWrapper = styled.div`
  width: 50%;
  height: 100%;

  @media only screen and (min-width: 280px) and (max-width: 768px) {
    display: none;
  }

  @media only screen and (min-width: 769px) {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
  }

`;
export const ConnectLeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;


  @media only screen and (min-width: 280px) and (max-width: 768px) {
    width: 100%;
    justify-content: center;
    align-items: center;
  }

  @media only screen and (min-width: 769px){
    width: 50%;
    justify-content: flex-start;
    align-items: flex-start;
  }

`;

export const ConnectLeftHeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-bottom: 0.2rem;
`;
export const ConnectLeftHeader = styled.p`
  font-weight: 800;
  color: ${ThemeColor.primary1};

  @media only screen and (min-width: 280px) and (max-width: 576px) {
    font-size: 20px;
  }

  @media only screen and (min-width: 577px) {
    font-size: 24px;
  }

`;
export const ConnectLeftSubheaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;

  margin-bottom: 1.5rem;
`;
export const ConnectLeftSubheader = styled.p`
  font-weight: 500;
  color: ${ThemeColor.primary1};

  @media only screen and (min-width: 280px) and (max-width: 576px) {
    font-size: 15px;
  }

  @media only screen and (min-width: 577px) {
    font-size: 16px;
  }

`;

export const ConnectBoxBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 95%;
`;
export const ConnectBoxWrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const ConnectBox = styled.div<{ deactivated?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${ThemeColor.primary4};
  flex-shrink: 0;
  border-radius: 10px;
  cursor: ${({ deactivated }) => (deactivated ? "not-allowed" : "pointer")};

  @media only screen and (min-width: 280px) and (max-width: 768px) {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }

  @media only screen and (min-width: 769px){
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

`;

export const ConnectBoxImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.8rem;
`;
export const ConnectBoxImg = styled.img<{ deactivated?: boolean }>`
  width: 42px;
  height: 42px;
  object-fit: cover;
  opacity: ${({ deactivated }) => (deactivated ? 0.2 : 1)};
`;
export const ConnectBoxTextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ConnectBoxText = styled.p<{ deactivated?: boolean }>`
  color: ${ThemeColor.primary1};
  font-weight: 600;
  opacity: ${({ deactivated }) => (deactivated ? 0.2 : 1)};

  @media only screen and (min-width: 280px) and (max-width: 1080px) {
    font-size: 13px;
  }

  @media only screen and (min-width: 1081px) {
    font-size: 15px;
  }
`;

export const ConnectBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${ThemeColor.secondary1};
  width: 100%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-radius: 8px;
  margin-top: 1rem;
`;
export const ConnectBtnText = styled.p`
  font-size: 17px;
  font-weight: 500;
  color: ${ThemeColor.bg2};
`;

export const ConnectCloseBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${ThemeColor.secondary1};
  padding: 0.3rem;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`;
export const ConnectCloseBtn = styled(IoClose)`
  color: ${ThemeColor.bg2};
  width: 20px;
  height: 20px;
`;

export const ConnectRightIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 5rem;
  margin-bottom: 1rem;
`;
export const ConnectRightIcon = styled.img`
  width: 124x;
  height: 124px;
  object-fit: cover;
`;
export const ConnectRightNameWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 5rem;
`;
export const ConnectRightName = styled.p`
  font-size: 24px;
  font-weight: 800;
  color: ${ThemeColor.border1};
`;
export const ConnectRightTextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
export const ConnectRightText = styled.p`
  font-size: 17px;
  font-weight: 400;
  color: ${ThemeColor.border1};
  text-align: center;
`;
