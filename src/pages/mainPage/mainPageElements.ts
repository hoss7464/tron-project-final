import styled from "styled-components";
import { colors } from "../../core-UI/Theme";
import { IoCopy } from "react-icons/io5";

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
  margin-top: 6rem;
`;

export const MainLeftSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 27%;
  @media only screen and (min-width: 280px) and (max-width: 992px) {
    display: none;
  }
`;
export const MainRightSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-left: 1rem;
  padding-bottom: 1rem;
  width: 73%;
  @media only screen and (min-width: 280px) and (max-width: 992px) {
    width: 100%;
  }
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
  width: 40px;
  height: 42px;
`;

export const AccountHeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AccountHeader = styled.p`
  font-size: 24px;
  font-weight: 900;
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
  font-size: 18px;
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
  font-weight: 200;
  @media only screen and (min-width: 280px) and (max-width: 992px) {
    font-size: 14px;
  }
  @media only screen and (min-width: 993px) {
    font-size: 16px;
  }
`;

export const OrdersWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.bg2};
  border-radius: 32px;
  width: 100%;
  height: 500px;
  margin-top: 1.2rem;
`;

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
