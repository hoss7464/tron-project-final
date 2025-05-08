import styled from "styled-components";
import { colors } from "../../core-UI/Theme";
import { IoCopy } from "react-icons/io5";
//--------------------------------------------------------------------------
//Main page styles :
export const MainPageContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  min-height: 720px;
  background-color: ${colors.bg1};
  @media only screen and (min-width: 280px) and (max-width: 768px) {
    padding: 0 24px 0 24px;
  }

  @media only screen and (min-width: 769px) and (max-width: 1920px) {
    padding: 0 32px 0 32px;
  }

  @media only screen and (min-width: 1921px) {
    padding: 0 56px 0 56px;
  }
`;

export const MainPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;

  @media only screen and (min-width: 280px) and (max-width: 1920px) {
    margin-top: 6rem;
  }
  @media only screen and (min-width: 1921px) {
    margin-top: 9rem;
  }
`;

export const MainLeftSection = styled.div`
  @media only screen and (min-width: 280px) and (max-width: 992px) {
    display: none;
  }
  @media only screen and (min-width: 993px) and (max-width: 1080px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 30%;
  }
  @media only screen and (min-width: 1081px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 27%;
  }
`;

export const MainRightSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-bottom: 1rem;

  @media only screen and (min-width: 280px) and (max-width: 992px) {
    width: 100%;
    padding-left: 0;
  }
  @media only screen and (min-width: 993px) and (max-width: 1080px) {
    width: 70%;
    padding-left: 1rem;
  }
  @media only screen and (min-width: 1081px) {
    width: 73%;
    padding-left: 1rem;
  }
`;
//-------------------------------------------------------------------------
//Legacy section styles :
export const LegacyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;
export const AccountWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  background-color: ${colors.navbar};
  border-radius: 32px;
  border: solid 1px ${colors.border1};
  padding: 0.5rem;
`;

export const MobileAccountWrapper = styled.div`
  width: 100%;
  background-color: ${colors.navbar};
  border-radius: 24px;
  border: solid 1px ${colors.border1};
  padding: 0.5rem;
  margin-bottom: 1rem;

  @media only screen and (min-width: 280px) and (max-width: 992px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  @media only screen and (min-width: 993px) {
    display: none;
  }
`;

export const AccountHeaderIconWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;
export const AccountIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5rem;
`;

export const AccountIcon = styled.img`
  @media only screen and (min-width: 280px) and (max-width: 992px) {
    width: 30px;
    height: 32px;
  }
  @media only screen and (min-width: 993px) {
    width: 40px;
    height: 42px;
  }
`;

export const AccountHeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AccountHeader = styled.p`
  font-weight: 800;
  @media only screen and (min-width: 280px) and (max-width: 768px) {
    font-size: 16px;
  }
  @media only screen and (min-width: 769px) {
    font-size: 20px;
  }
`;
export const AccountAddCopyWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
export const AccountAddWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0.5rem;
`;

export const AccountAdd = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: ${colors.primary1};
`;
export const AccountCopyWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 2rem;
`;

export const AccountCopyIcon = styled(IoCopy)`
  width: 16px;
  height: 16px;
  color: ${colors.text3};
`;
export const AccountTextNumberWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 0.5rem;
`;
export const AccountTextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0.5rem;
`;

export const AccountText = styled.p`
  font-size: 16px;
  font-weight: 600;
`;
export const AccountNumberWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 2rem;
`;

export const AccountNumber = styled.p`
  font-size: 18px;
  font-weight: 800;
`;

export const EnergyWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  background-color: ${colors.bg3};
  border-radius: 32px;
  border: solid 1px ${colors.border2};
  margin-top: 1.2rem;
  padding: 0.5rem;
`;

export const EnergyResourceWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;
export const BandwidthWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  background-color: ${colors.bg4};
  border-radius: 32px;
  border: solid 1px ${colors.border3};
  margin-top: 1.2rem;
  padding: 0.5rem;
`;
//-------------------------------------------------------------------------
//Order Form section styles :
export const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 1.2rem;
`;

export const Form = styled.form`
  width: 100%;
  height: 600px;
  background-color: ${colors.bg2};
  border-radius: 32px;
`;
//-------------------------------------------------------------------------
//Resource section styles
export const ResourceWrapper = styled.div`
  width: 100%;
  border-radius: 32px;
`;

export const ResourceWrapper2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const ResourceIconTextWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

export const ResourceTextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ResourceText = styled.p`
  font-weight: 400;
  @media only screen and (min-width: 280px) and (max-width: 992px) {
    font-size: 14px;
  }
  @media only screen and (min-width: 993px) {
    font-size: 16px;
  }
`;
//-------------------------------------------------------------------------
//Orders section styles
export const OrdersWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  background-color: ${colors.bg2};
  border-radius: 32px;
  width: 100%;
  margin-top: 1.2rem;
  padding: 0.5rem;
`;

export const OrderNavWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 0.5rem;
  border-radius: 24px;
  background-color: ${colors.bg1};
  border: solid 1px ${colors.border4};
`;

export const OrdersNavHeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
`;

export const OrderNavTextWrapper1 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-left: 1rem;
  padding-right: 2rem;
`;

export const OrderNavTextWrapper2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 380px) {
    display: none;
  }
`;

export const OrderNavTextWrapper3 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const OrderNavTextWrapper4 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const OrderNavTextWrapper5 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const OrderNavTextWrapper6 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 430px) {
    display: none;
  }
`;

export const OrderNavTextWrapper7 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 630px) {
    display: none;
  }
`;

export const OrderNavText = styled.p`
  font-size: 14px;
  font-weight: 700;
  color: ${colors.text2};
`;

export const OrdersWrapper2 = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 500px;
  border-radius: 24px;
  margin-top: 0.5rem;
`;

export const OrdersCardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 75px;
  border-radius: 24px;
  border: solid 1px ${colors.border6};
  margin-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
`;

export const OrdersCardTextWrap1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const OrdersCardTextWrap2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const OrdersCardTextWrap3 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media only screen and (max-width: 380px) {
    display: none;
  }
`;

export const OrdersCardTextWrap4 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media only screen and (max-width: 430px) {
    display: none;
  }
`;

export const OrdersCardTextWrapper2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const OrdersCardText1 = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.text1};
`;
export const OrdersCardText2 = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.text7};
`;

export const OrderCardLinearWrapper = styled.div`

  width: 90px;
  @media only screen and (max-width: 630px) {
    display: none;
  }
`;

export const OrdersSellBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 24px;
  background-color: ${colors.primary1};
  border-radius: 8px;
  cursor: pointer;
`;

export const OrdersSell = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.text9};
`;

export const OedersPaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 0.5rem;
`;

//-------------------------------------------------------------------------
//My orders section styles
export const MyOrdersWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.bg2};
  border-radius: 32px;
  width: 100%;
  height: 300px;
  margin-top: 1.2rem;
`;
//-------------------------------------------------------------------------
//Footer section styles
