import styled from "styled-components";
import { ThemeColor } from "../../core-UI/Theme";

export const ErrorContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 100vh;
`

export const ErrorTextWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
`

export const ErrorText = styled.p`
font-size: 24px;
font-weight: 800;
color: ${ThemeColor.primary1};
`