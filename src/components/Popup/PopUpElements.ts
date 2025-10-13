import styled from "styled-components";
import { ThemeColor } from "../../core-UI/Theme";
import { IoSettingsSharp } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import { IoCopy } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";


export const PopUpContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
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
padding: 10px 8px;
border-radius: 8px;
border: none;
outline: none;
cursor: pointer;
background-color:${ThemeColor.secondary1};
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

export const Popup5TextWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
`

export const Popup5Text = styled.p`
color: ${ThemeColor.primary1};
font-size: 16px;
font-weight: 500;
text-align: center;
`

export const Popup6Container = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
flex-direction: column;
min-width: 30%;
background-color: ${ThemeColor.text2};
padding: 0.8rem;
border-radius: 15px;
border: solid 2px #D9E1E3;
`

export const Popup6HeaderWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
width: 100%;
`
export const Popup6ContentWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
width: 100%;
`

export const Popup6Icon = styled(FaLock)`
width: 24px;
height: 24px;
color: ${ThemeColor.text2};
`

export const PopUp6Wrapper1 = styled.div`
display: flex;
justify-content: center;
align-items: flex-start;
flex-direction: column;
`

export const PopUp6CopyIconWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
background-color:  ${ThemeColor.secondary1};
border-radius: 6px;
padding: 0.4rem;
cursor: pointer;
`
export const PopUp6CopyIcon = styled(IoCopy)`
width: 16px;
height: 16px;
color: ${ThemeColor.text2};
cursor: pointer;
`

export const Popup6TextWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
padding: 4px 10px;
background-color: ${ThemeColor.primary1};
border-radius: 6px;
margin-top: 0.5rem;

`
export const Popup6Text = styled.p`
font-size: 13px;
font-weight: 600;
color: ${ThemeColor.text2};
`

export const Popup11Icon = styled(IoMdSettings)`
width: 28px;
height: 28px;
color: ${ThemeColor.text2};
`


