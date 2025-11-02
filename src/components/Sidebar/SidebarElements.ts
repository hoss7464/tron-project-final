import styled from "styled-components";

export const SidebarContainer = styled.div`
  z-index: 95;
  position: fixed;
  top: 0;
  right: 0;
  width: 200px;
  height: 100%;
  background-color: khaki;
  z-index: 2500;

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

export const SidebarMainWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
