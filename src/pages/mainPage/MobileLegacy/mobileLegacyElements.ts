import styled from "styled-components";

export const MobileLegacyContainer = styled.div`
  width: 100%;

  @media only screen and (min-width: 280px) and (max-width: 600px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  @media only screen and (min-width: 601px){
    display: none;

  }
`;
