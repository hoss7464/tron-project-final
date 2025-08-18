import React from "react";
import { PopUpContainer} from "./PopUpElements";

interface PopUpProps {
  children: React.ReactNode;
}

const PopUp: React.FC<PopUpProps> = ({children}) => {
    
    
  return (
    <>
      <PopUpContainer  >
        {children}
      </PopUpContainer>
    </>
  );
};

export default PopUp;
