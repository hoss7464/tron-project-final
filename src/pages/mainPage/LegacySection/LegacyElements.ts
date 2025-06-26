import styled from "styled-components";
import { ThemeColor } from "../../../core-UI/Theme";
import { IoCopy } from "react-icons/io5";

export const LegacyContainer = styled.div`
  width: 100%;

  @media only screen and (min-width: 280px) and (max-width: 600px) {
    display: none;
  }

  @media only screen and (min-width: 601px) and (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 24px 0 24px;
  }

  @media only screen and (min-width: 769px) and (max-width: 1920px) {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 32px 0 32px;
  }

  @media only screen and (min-width: 1921px) {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 56px 0 56px;
  }
`;

export const LegacyWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

export const LegacyHeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;
export const LegacyHeader = styled.p`
  font-weight: 800;
  color: ${ThemeColor.primary1};

  @media only screen and (min-width: 280px) and (max-width: 576px) {
    font-size: 16px;
  }

  @media only screen and (min-width: 577px) and (max-width: 768px) {
    font-size: 18px;
  }

  @media only screen and (min-width: 769px) and (max-width: 1080px) {
    font-size: 16px;
  }

  @media only screen and (min-width: 1081px) and (max-width: 1920px) {
    font-size: 18px;
  }

  @media only screen and (min-width: 1921px) {
    font-size: 30px;
  }
`;
export const LegacyCardWrapper = styled.div`
  width: 100%;
  margin-top: 1rem;
`;
export const LegacyCardWrapper2 = styled.div`
  border: solid 2px ${ThemeColor.border1};
  padding: 4px;

  @media only screen and (min-width: 280px) and (max-width: 600px) {
    border-radius: 16px;
  }

  @media only screen and (min-width: 601px) and (max-width: 768px) {
    border-radius: 16px;
    height: 270px;
  }

  @media only screen and (min-width: 769px) and (max-width: 1080px) {
    border-radius: 16px;
    height: 260px;
  }

  @media only screen and (min-width: 1081px) and (max-width: 1920px) {
    border-radius: 20px;
    height: 270px;
  }

  @media only screen and (min-width: 1921px) {
    border-radius: 24px;
    height: 270px;
  }
`;

export const LegacyCardWrapper3 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 4px;
  border-radius: 16px;
`;

export const LegacyCardIconNameWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

export const LegacyCardIconWrapper1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
`;
export const LegacyCardIconWrapper2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 2px ${ThemeColor.secondary1};
  border-radius: 55px;

  @media only screen and (min-width: 280px) and (max-width: 576px) {
    padding: 0.2rem;
  }

  @media only screen and (min-width: 577px) and (max-width: 768px) {
    padding: 0.3rem;
  }

  @media only screen and (min-width: 769px) {
    padding: 0.4rem;
  }
`;
export const LegacyCardIconWrapper3 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 55px;
  background-color: ${ThemeColor.secondary1};

  @media only screen and (min-width: 280px) and (max-width: 576px) {
    padding: 0.7rem;
  }

  @media only screen and (min-width: 577px) and (max-width: 1080px) {
    padding: 0.8rem;
  }

  @media only screen and (min-width: 1081px) {
    padding: 0.9rem;
  }
`;
export const LegacyCardIcon = styled.img`
  @media only screen and (min-width: 280px) and (max-width: 576px) {
    width: 18px;
    height: 18px;
  }

  @media only screen and (min-width: 577px) and (max-width: 768px) {
    width: 20px;
    height: 20px;
  }

  @media only screen and (min-width: 769px) and (max-width: 1080px) {
    width: 22px;
    height: 22px;
  }

  @media only screen and (min-width: 1081px) and (max-width: 1920px) {
    width: 24px;
    height: 24px;
  }

  @media only screen and (min-width: 1921px) {
    width: 24px;
    height: 24px;
  }
`;
export const LegacyCardNameWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 0.5rem;
`;

export const LegacyCardName = styled.p`
  color: ${ThemeColor.primary1};
  font-weight: 900;
  font-size: 20px;
  @media only screen and (min-width: 280px) and (max-width: 1080px) {
    font-size: 18px;
  }

  @media only screen and (min-width: 1081px) {
    font-size: 20px;
  }
`;

export const LegacyAccountInfoWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 0.5rem;

  @media only screen and (min-width: 280px) and (max-width: 1080px) {
    border-radius: 0.7rem;
  }

  @media only screen and (min-width: 1081px) {
    border-radius: 1rem;
  }
`;

export const LegacyAddCopyWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(6px);
  border-radius: 8px;
  margin-bottom: 1.5rem;
  padding: 3px;

  @media only screen and (min-width: 280px) and (max-width: 1080px) {
    align-items: flex-start;
  }

  @media only screen and (min-width: 1081px) {
    align-items: center;
  }
`;

export const LegacyIconAddWrapper = styled.div`
  display: flex;
  justify-content: center;

  @media only screen and (min-width: 280px) and (max-width: 768px) {
    align-items: center;
  }

  @media only screen and (min-width: 769px) and (max-width: 1080px) {
    align-items: flex-start;
  }

  @media only screen and (min-width: 1081px) {
    align-items: center;
  }
`;

export const LegacyIconWrapper1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.3rem;
`;
export const LegacyIconWrapper2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: solid 1px ${ThemeColor.secondary1};
  padding: 3px;
`;
export const LegacyIconWrapper3 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  background-color: ${ThemeColor.secondary1};
  padding: 0.3rem;
`;
export const LegacyAddIcon = styled.img`
  @media only screen and (min-width: 280px) and (max-width: 576px) {
    width: 16px;
    height: 16px;
  }

  @media only screen and (min-width: 577px) and (max-width: 768px) {
    width: 17px;
    height: 17px;
  }

  @media only screen and (min-width: 769px) and (max-width: 1080px) {
    width: 16px;
    height: 16px;
  }

  @media only screen and (min-width: 1081px) {
    width: 17px;
    height: 17px;
  }
`;
export const LegacyAccountInfoAddWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  max-width: 100%;
  overflow-wrap: break-word;
  word-break: break-all;
  white-space: normal;
  height: 100%;
`;

export const LegacyAccountInfoAdd = styled.p`
  color: ${ThemeColor.primary1};
  font-weight: 300;

  @media only screen and (min-width: 280px) and (max-width: 1080px) {
    font-size: 12px;
  }

  @media only screen and (min-width: 1081px) {
    font-size: 13px;
  }
`;
export const LegacyAccountInfoCopyWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 6px;
`;

export const LegacyAccountInfoCopyIcon = styled(IoCopy)`
  color: ${ThemeColor.secondary1};

  @media only screen and (min-width: 280px) and (max-width: 576px) {
    width: 18px;
    height: 18px;
  }

  @media only screen and (min-width: 577px) and (max-width: 1080px) {
    width: 20px;
    height: 20px;
  }

  @media only screen and (min-width: 1081px) {
    width: 22px;
    height: 22px;
  }
`;

export const LegacyIconBalanceNumberWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(6px);
  padding: 3px;
  border-radius: 8px;
`;
export const LegacyIconBalanceWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const LegacyIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.3rem;
`;
export const LegacyBalanceWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const LegacyBalance = styled.p`
  color: ${ThemeColor.primary1};
  font-weight: 500;

  @media only screen and (min-width: 280px) and (max-width: 576px) {
    font-size: 14px;
  }

  @media only screen and (min-width: 577px) and (max-width: 1080px) {
    font-size: 15px;
  }

  @media only screen and (min-width: 1081px) {
    font-size: 18px;
  }
`;
export const LegacyNumberWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;
export const LegacyNumber = styled.p`
  color: ${ThemeColor.primary1};
  font-weight: 800;

  @media only screen and (min-width: 280px) and (max-width: 576px) {
    font-size: 14px;
  }

  @media only screen and (min-width: 577px) and (max-width: 1080px) {
    font-size: 15px;
  }

  @media only screen and (min-width: 1081px) {
    font-size: 18px;
  }
`;

export const LegacyBandwidthEnergyPropertyWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 0.5rem;
`;

export const LegacyBandwidthEnergyProperty = styled.p`
  font-weight: 800;

  @media only screen and (min-width: 280px) and (max-width: 576px) {
    font-size: 18px;
  }

  @media only screen and (min-width: 577px) and (max-width: 1080px) {
    font-size: 20px;
  }

  @media only screen and (min-width: 1081px) {
    font-size: 22px;
  }
`;
//------------------------------------------------------------------------
export const LegacyCardPropertyWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const LegacyPropertyWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(6px);

  border-radius: 8px;

  @media only screen and (min-width: 280px) and (max-width: 768px) {
    padding: 8px 12px;
  }

  @media only screen and (min-width: 769px) {
    padding: 12px 16px;
  }
`;

export const LegacyPropertyHeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-bottom: 0.5rem;
`;

export const LegacyPropertyNumberWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

export const LegacyPropertyNumber = styled.p`
  color: ${ThemeColor.primary1};
  font-weight: 500;

  @media only screen and (min-width: 280px) and (max-width: 576px) {
    font-size: 14px;
  }

  @media only screen and (min-width: 577px) and (max-width: 768px) {
    font-size: 15px;
  }

  @media only screen and (min-width: 769px) and (max-width: 1920px) {
    font-size: 16px;
  }

  @media only screen and (min-width: 1921px) {
    font-size: 18px;
  }
`;

export const LegacyCircleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 2px;

  @media only screen and (min-width: 280px) and (max-width: 576px) {
    width: 70px;
    height: 70px;
    margin-right: 0;
    margin-bottom: 0;
  }

  @media only screen and (min-width: 577px) and (max-width: 768px) {
    width: 80px;
    height: 80px;
    margin-right: 0;
    margin-bottom: 0;
  }

  @media only screen and (min-width: 769px) and (max-width: 1080px) {
    width: 90px;
    height: 90px;
    margin-right: 0;
    margin-bottom: 0;
  }

  @media only screen and (min-width: 1081px) and (max-width: 1920px) {
    width: 95px;
    height: 95px;
    margin-right: 12px;
    margin-bottom: 12px;
  }

  @media only screen and (min-width: 1921px) and (max-width: 2700px) {
    width: 100px;
    height: 100px;
    margin-right: 12px;
    margin-bottom: 12px;
  }
`;
