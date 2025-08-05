import styled from "styled-components";

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  position: fixed;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(6px);
  z-index: 1000;
`;
