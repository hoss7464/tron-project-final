import styled from "styled-components";
import { ThemeColor } from "../../core-UI/Theme";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

export const HambergerContainer = styled.div`
  z-index: 94;
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;

  @media only screen and (min-width: 280px) and (max-width: 576px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media only screen and (min-width: 577px) and (max-width: 892px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media only screen and (min-width: 893px) and (max-width: 1080px) {
    display: none;
  }

  @media only screen and (min-width: 1081px) and (max-width: 1920px) {
    display: none;
  }

  @media only screen and (min-width: 1921px) {
    display: none;
  }
`;
export const HambergurWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
padding: 0.5rem;
background-color: ${ThemeColor.secondary1};
border-radius: 55px;
cursor: pointer;
`

export const HambergurIcon = styled(HiOutlineMenuAlt3)`
width: 22px;
height: 22px;
color: ${ThemeColor.text2};
cursor: pointer;
`
