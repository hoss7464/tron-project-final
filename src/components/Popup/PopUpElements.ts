import styled from "styled-components";
import { colors } from "../../core-UI/Theme";
import { IoClose } from "react-icons/io5";

export const PopUpContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 100;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(6px);
`;


