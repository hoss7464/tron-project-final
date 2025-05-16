import styled from "styled-components";
import { colors } from "../../core-UI/Theme";

export const SelectContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
background-color: ${colors.bg2};
border:solid 2px ${colors.primary1};
width: 350px;
border-radius: 24px;
padding: 16px;
`

export const SelectHeaderWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
margin-bottom: 1rem;
`
export const SelectHeader = styled.p`
font-size: 24px;
font-weight: 800;
`
export const SelectWalletWrapper = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
flex-direction: column;
width: 100%;
height: 450px;

`
export const SelectWalletWrapper2 = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
margin-bottom: 1rem;
border-radius: 8px;
padding: 0.5rem;
background-color: #F8F8F8;
border: solid 2px ${colors.primary1};
`
export const SelectWalletIconTextWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
`
export const SelectWalletIconWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-right: 1rem;
`
export const SelectWalletIcon = styled.img`
width: 39px;
height: 39px;
`
export const SelectWalletTextWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
`
export const SelectWalletText = styled.p`
font-size: 20px;
font-weight: 500;
`
export const SelectWalletConnectBtnWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
`
export const SelectWalletConnectBtn = styled.button`
font-size: 16px;
border: none;
background-color: ${colors.primary1};
border-radius: 8px;
padding: 6px 16px;
cursor: pointer;
color: ${colors.bg2};

`
