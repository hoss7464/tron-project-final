import React from "react";
import { HambergerContainer , HambergurWrapper, HambergurIcon} from "./HambergurElements";

interface HamburgerBtnProps {
  onClick?: () => void;
}

const HamburgerBtn : React.FC<HamburgerBtnProps> = ({ onClick }) => {
    return (
        <>
        <HambergerContainer>
            <HambergurWrapper onClick={onClick}>
                <HambergurIcon />
            </HambergurWrapper>
        </HambergerContainer>
        </>
    )
}

export default HamburgerBtn