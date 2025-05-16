import React from "react";
import { PopUpContainer} from "./PopUpElements";
import { useDispatch } from "react-redux";
import { clickToggle } from "../../redux/actions/toggleSlice";

interface PopUpProps {
  children: React.ReactNode;
}

const PopUp: React.FC<PopUpProps> = ({children}) => {
    const dispatch = useDispatch()
    
  return (
    <>
      <PopUpContainer onClick={() => dispatch(clickToggle("popUp"))} >
        {children}
      </PopUpContainer>
    </>
  );
};

export default PopUp;
