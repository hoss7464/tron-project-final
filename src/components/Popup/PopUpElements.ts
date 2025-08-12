import styled from "styled-components";
import { ThemeColor } from "../../core-UI/Theme";
import { IoSettingsSharp } from "react-icons/io5";


export const PopUpContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  position: fixed;

  z-index: 100;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(6px);
`;

export const Popup2HeaderWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
padding-top: 0.5rem;
padding-bottom: 0.5rem;
`

export const Popup2Header = styled.p`
font-size: 22px;
color: ${ThemeColor.primary1};
font-weight: 800;
`

export const Popup2ImgWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
width: 100%;

`

export const Popup2ItemNameWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;


`
export const Popup2ItemName = styled.p`
color: ${ThemeColor.primary1};
font-size: 20px;
font-weight: 800;
`

export const Popup2SubheaderWrapper = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
width: 100%;
margin-bottom: 0.3rem;
`
export const Popup2Subheader = styled.p`
color: ${ThemeColor.secondary1};
font-size: 18px;
font-weight: 700;
`

export const Popup2NameItemWrapper = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
margin-top: 0.3rem;

`
export const Popup2NameWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
`
export const Popup2Name = styled.p`
color: ${ThemeColor.text1};
font-size: 15px;
font-weight: 600;
`
export const Popup2ItemWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;

`
export const Popup2Item = styled.p`
color: ${ThemeColor.primary1};
font-size: 15px;
font-weight: 500;
`

export const Pop3Form = styled.div`
display: flex;
justify-content: center;
align-items: center;
`

export const  PopupFormInputWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
`

export const FormMaxBtn = styled.div`
display: flex;
justify-content: center;
align-items: center;
padding: 10px 16px;
border-radius: 8px;
cursor: pointer;
background-color: ${ThemeColor.secondary1};
margin-left: 0.5rem;
`
export const FormMaxBtnText = styled.p`
color: ${ThemeColor.text2};
font-size: 16px;
font-weight: 500;
`

export const FormMaxCandleBtn = styled.button`
display: flex;
justify-content: center;
align-items: center;
padding: 10px 16px;
border-radius: 8px;
border: none;
outline: none;
cursor: pointer;
background-color: ${ThemeColor.secondary1};
margin-left: 0.5rem;
color: ${ThemeColor.text2};
font-size: 16px;
font-weight: 500;
`

export const SettingIcon = styled(IoSettingsSharp)`
color: ${ThemeColor.text2};
width: 16px;
height: 16px;
`


