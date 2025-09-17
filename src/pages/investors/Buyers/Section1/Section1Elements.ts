import styled from "styled-components"
import { ThemeColor } from "../../../../core-UI/Theme";
import { GrDocumentText } from "react-icons/gr";
import { IoIosKey } from "react-icons/io";
import { IoCopy } from "react-icons/io5";

export const Sec1Contrainer = styled.div`
display: flex;
justify-content: center;
align-items: flex-start;
width: 100%;
`

export const SecSummaryIcon = styled(GrDocumentText)`
width: 22px;
height: 22px;
color: ${ThemeColor.text2};
`

export const SecKeyIcon = styled(IoIosKey)`
width: 22px;
height: 22px;
color: ${ThemeColor.text2};
`

export const Sec1ButtonWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
background-color: ${ThemeColor.secondary1};
border-radius: 10px;
cursor: pointer;
padding: 10px;
width: 100%;

`
export const Sec1ButtonText = styled.p`
color: ${ThemeColor.text2};
font-size: 16px;
font-weight: 600;
`

export const Sec1CardThingsWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
width: 92%;
margin-bottom: 1.2rem;
`

export const Sec1CopyIconWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
background-color: ${ThemeColor.primary3};
padding: 5px;
border-radius: 6px;
cursor: pointer;
`
export const Sec1CopyIcon = styled(IoCopy)`
width: 22px;
height: 22px;
color: ${ThemeColor.secondary1};
cursor: pointer;
margin-top: 0.1rem;
margin-bottom: 0.1rem;
`

