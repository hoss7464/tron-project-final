import styled from "styled-components";
import { colors, ThemeColor } from "../../core-UI/Theme";
import { IoCopy } from "react-icons/io5";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";

//--------------------------------------------------------------------------
//Main page styles :
export const MainPageContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  min-height: 720px;
  background-color: ${ThemeColor.bg2};

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

export const MainPageWrapper2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  @media only screen and (min-width: 280px) and (max-width: 576px) {
    padding: 0 24px 0 24px;
  }

  @media only screen and (min-width: 577px) and (max-width: 768px) {
    padding: 0 24px 0 24px;
  }

  @media only screen and (min-width: 769px) and (max-width: 1080px) {
    padding: 0 32px 0 32px;
  }

  @media only screen and (min-width: 1081px) and (max-width: 1920px) {
    padding: 0 32px 0 32px;
  }

  @media only screen and (min-width: 1921px) and (max-width: 2700px) {
    padding: 0 56px 0 56px;
  }
`;

export const MainPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  padding-top: 1rem;
`;

export const MainLeftSection = styled.div`
  @media only screen and (min-width: 280px) and (max-width: 992px) {
    display: none;
  }
  @media only screen and (min-width: 993px) and (max-width: 1200px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 35%;
  }
  @media only screen and (min-width: 1201px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 32.8%;
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
  @media only screen and (min-width: 993px) and (max-width: 1200px) {
    width: 65%;
    padding-left: 1rem;
  }
  @media only screen and (min-width: 1201px) {
    width: 68.2%;
    padding-left: 1rem;
  }
`;
//-------------------------------------------------------------------------
//Legacy section styles :
export const MobileAccountWrapper = styled.div`
  width: 100%;
  border: solid 2px ${colors.bg1};
  border-radius: 24px;
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
    width: 38px;
    height: 40px;
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
  color: ${colors.primary1};
`;
export const AccountTextNumberWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 0.2rem;
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
  border-radius: 32px;
  margin-top: 1.2rem;
  padding: 0.5rem;
  border: solid 2px ${colors.bg1};
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
  border-radius: 32px;
  margin-top: 1.2rem;
  padding: 0.5rem;
  border: solid 2px ${colors.bg1};
`;
//-------------------------------------------------------------------------
//Order Form section styles :
export const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const FormWrapper2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: solid 2px ${ThemeColor.border1};
  padding: 0.5rem;
  @media only screen and (min-width: 280px) and (max-width: 576px) {
    border-radius: 16px;
  }

  @media only screen and (min-width: 577px) and (max-width: 768px) {
    border-radius: 16px;
  }

  @media only screen and (min-width: 769px) and (max-width: 1080px) {
    border-radius: 16px;
  }

  @media only screen and (min-width: 1081px) and (max-width: 1920px) {
    border-radius: 20px;
  }

  @media only screen and (min-width: 1921px) {
    border-radius: 24px;
  }
`;

export const Form = styled.form`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  
  @media only screen and (min-width: 280px) and (max-width: 576px) {
    border-radius: 14px;
    padding: 8px;
  }

  @media only screen and (min-width: 577px) and (max-width: 768px) {
    border-radius: 14px;
    padding: 16px;
  }

  @media only screen and (min-width: 769px) and (max-width: 1080px) {
    border-radius: 14px;
    padding: 16px;
  }

  @media only screen and (min-width: 1081px) and (max-width: 1920px) {
    border-radius: 18px;
    padding: 16px;
  }

  @media only screen and (min-width: 1921px) {
    border-radius: 22px;
    padding: 16px;
  }
`;

export const FormHeaderSwitchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
 
`;
export const FormHeaderIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const FormHeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const FormIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.5rem;
`;
export const FormSwitchWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormAddInputLabelWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  margin-bottom: 0.5rem;
`;
export const FormAddLabelWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 0.5rem;
`;
export const FormAddLabel = styled.label`
  color: ${ThemeColor.primary1};
  font-weight: 700;
  font-size: 14px;
`;
export const FormAddInputWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  border-radius: 10px;
  border: solid 2px ${ThemeColor.border1};
  background-color: ${ThemeColor.bg2};
  padding-top: 0.3rem;
  padding-left: 0.3rem;
  padding-bottom: 0.3rem;
  padding-right: 0.7rem;
`;
export const FormAddInputIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
export const FormAddIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${colors.primary1};
  padding: 0.3rem;
  margin-right: 0.3rem;
`;
export const FormAddIcon = styled(MdOutlineAccountBalanceWallet)`
  width: 18px;
  height: 18px;
  color: ${colors.bg2};
`;

export const FormIcon2 = styled.img`
  width: 18px;
  height: 18px;
  color: ${colors.bg2};
`;
export const FormAddInputWrapper2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
export const FormAddInput = styled.input`
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
  background-color: transparent;

  color: ${ThemeColor.primary1};
  &:active {
    border: none;
    outline: none;
  }

  &:hover {
    border: none;
    outline: none;
  }
  &::placeholder {
    font-size: 13px;
    color: ${ThemeColor.border1};
  }
  @media only screen and (min-width: 280px) and (max-width: 1080px) {
    font-size: 12px;
  }

  @media only screen and (min-width: 1081px) {
    font-size: 13px;
  }
`;

export const InputMiniBtnWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 40px;
  padding-left: 0.5rem;
`;

export const InputMiniBtnWrapper2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.3rem;
`;

export const InputMiniBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px 4px;
  font-size: 12px;
  font-weight: 400;
  color: ${ThemeColor.primary1};
  border: solid 0.5px ${ThemeColor.border1};
  background-color: ${ThemeColor.bg2};
  cursor: pointer;
  border-radius: 6px;

  &:hover {
    background-color: ${ThemeColor.secondary1};
    color: ${ThemeColor.bg2};
    border: solid 0.3px ${ThemeColor.secondary1};
  }
`;

export const OrderInfoWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

export const OrderInfoHeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

export const OrderInfoTextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const OrderInfoTextWrapper2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const OrderInfoText = styled.p`
  font-size: 16px;
`;

export const OrderSubmitBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
`;
export const OrderSubmitBtn = styled.button`
  border: none;
  font-size: 18px;
  font-weight: 700;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
  border-radius: 10px;
  background-color: ${ThemeColor.secondary1};
  color: ${ThemeColor.text2};
  cursor: pointer;
`;

export const FormErrorWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0.5rem;
`;
export const FormError = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: red;
`;

export const FormSettingWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
`;
export const FormSettingIconWrapper1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  border: solid 1px ${ThemeColor.secondary1};
  border-radius: 10px;
  cursor: pointer;
`;
export const FormSettingIconWrapper2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px;
  background-color: ${ThemeColor.secondary1};
  border-radius: 8px;
`;
export const FormSettingIcon = styled(IoMdSettings)`
  color: ${ThemeColor.bg2};
  width: 24px;
  height: 24px;
`;

//-------------------------------------------------------------------------
//Orders section styles
export const OrdersWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 0.5rem;
  border: solid 2px ${ThemeColor.border1};
  @media only screen and (min-width: 280px) and (max-width: 576px) {
    border-radius: 16px;
  }

  @media only screen and (min-width: 577px) and (max-width: 768px) {
    border-radius: 16px;
  }

  @media only screen and (min-width: 769px) and (max-width: 1080px) {
    border-radius: 16px;
  }

  @media only screen and (min-width: 1081px) and (max-width: 1920px) {
    border-radius: 20px;
  }

  @media only screen and (min-width: 1921px) {
    border-radius: 24px;
  }
`;

export const OrderMainWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  padding: 0.5rem;
`;

export const OrdersCarouselWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  overflow-x: auto;
  position: relative;
`;

export const OrdersScroll = styled.div`
  overflow-x: auto;
  width: 100%;
  height: 550px;
`;

export const OrdersCard = styled.div`
  width: 100%;
  min-width: 750px;
  color: white;
  border-radius: 10px;
  flex-shrink: 0;
`;

export const OrdersDetail = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  padding: 6px 14px;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(6px);
`;

export const OrdersNavHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: ${ThemeColor.bg2};
  padding: 0.5rem;
  border-radius: 8px;
`;

export const OrderNavWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  min-width: 700px;
  padding: 0.5rem;
  background-color: ${ThemeColor.bg2};
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
  border-radius: 8px;
`;

export const OrderNavTextWrapper1 = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

export const OrderNavTextWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 20%;
`;

export const OrderCardIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.2rem;
  padding: 4px;
  border-radius: 8px;
`;
export const OrderCardIconWrapper2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  border-radius: 6px;
  margin-right: 0.2rem;
  margin-bottom: 0.2rem;
`;
export const OrderCardIcon = styled.img`
  width: 15px;
  height: 15px;
`;

export const OrderNavText = styled.p`
  font-size: 14px;
  font-weight: 700;
  color: ${ThemeColor.text3};
`;

export const OrdersCardTextWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 20%;
`;

export const OrdersCardTextWrapper2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const OrdersCardText1 = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${ThemeColor.primary1};
`;
export const OrdersCardText2 = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${ThemeColor.secondary1};
`;

export const OrderCardLinearWrapper = styled.div`
  width: 80px;
  @media only screen and (min-width: 280px) and (max-width: 1120px) {
    margin-right: 1rem;
    width: 65px;
  }
`;

export const OrderCardLinearWrapper2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const OrderCardLineraPercentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.2rem;
`;
export const OrderCardLineraPercent = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${ThemeColor.primary1};
`;

export const OrdersSellBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px 12px;
  background-color: ${ThemeColor.secondary1};
  border-radius: 6px;
  cursor: pointer;
  position: absolute;
  right: 0.7rem;
`;

export const OrdersSell = styled.p`
  font-size: 14px;
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
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin-top: 1.2rem;
  padding: 0.5rem;
  border: solid 2px ${ThemeColor.border1};
  @media only screen and (min-width: 280px) and (max-width: 576px) {
    border-radius: 16px;
  }

  @media only screen and (min-width: 577px) and (max-width: 768px) {
    border-radius: 16px;
  }

  @media only screen and (min-width: 769px) and (max-width: 1080px) {
    border-radius: 16px;
  }

  @media only screen and (min-width: 1081px) and (max-width: 1920px) {
    border-radius: 20px;
  }

  @media only screen and (min-width: 1921px) {
    border-radius: 24px;
  }
`;

export const MyOrdersNavWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  min-width: 700px;
  padding: 0.5rem;
  border-radius: 8px;
  background-color: ${ThemeColor.bg2};
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
`;

export const MyOrdersScroll = styled.div`
  overflow-x: auto;
  width: 100%;
  height: 330px;
`;

export const MyOrdersNavTextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const MyOrdersCarouselWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  overflow-x: auto;
  position: relative;
`;

export const MyOrdersTextWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 25%;
  height: 100%;
`;

export const MyOrderDetails = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  padding: 6px 14px;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(6px);
`;

export const MyOrderCardTextWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 25%;
  height: 100%;
`;

