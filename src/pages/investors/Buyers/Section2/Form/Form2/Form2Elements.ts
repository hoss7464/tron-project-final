import styled from "styled-components";
import { ThemeColor } from "../../../../../../core-UI/Theme";

export const Form2Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
width: 100%;
height: 100%;
`

export const Form2BulkOrderTextWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
`

export const Form2BulkOrderText = styled.p`
font-size : 13px;
font-weight: 600;
color: ${ThemeColor.primary1};
cursor: pointer;

&:hover{
color: ${ThemeColor.secondary1};
}

`

export const Form2LableErrorWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
`

export const Form2IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  padding: 3px;
`;

