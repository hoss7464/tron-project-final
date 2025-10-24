import React from "react";
import "./Hero.css";
import {
  HeroContainer,
  HeroMainbgPhotoWrapper,
  HeroTextButtonHeaderWrapper,
  HeroHeaderWrapper,
  HeroHeader,
  HeroTextWrapper,
  HeroText,
  HeroButtonWrapper,
  HeroButtonWrapper2,
  HeroButtonText,
  HeroUniqueTextWrapper,
  HeroUniqueText,
} from "./HeroElements";
import uniqueText from "../../../assets/svg/unique/UniqueText11.svg";
import ResourceComponent from "./ResourceComponent";
import { useTranslation } from "react-i18next";

const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <HeroContainer>
        <HeroMainbgPhotoWrapper className="Hero-bg"></HeroMainbgPhotoWrapper>
        <HeroTextButtonHeaderWrapper>
          <HeroHeaderWrapper>
            <HeroHeader>
              {t("Text5")}{" "}
              <span style={{ color: "#416872" }}>{t("Text6")}</span> {t("Text8")}
              <span style={{ color: "#416872" }}> {t("Text9")}</span>.
            </HeroHeader>
          </HeroHeaderWrapper>
          <HeroTextWrapper>
            <HeroText>
              {t("Text11")}
            </HeroText>
          </HeroTextWrapper>
          <HeroButtonWrapper>
            <HeroButtonWrapper2>
              <HeroButtonText>{t("Text12")}</HeroButtonText>
            </HeroButtonWrapper2>
          </HeroButtonWrapper>
        </HeroTextButtonHeaderWrapper>
        <HeroUniqueTextWrapper>
          <HeroUniqueText alt="unique text" src={uniqueText} />
        </HeroUniqueTextWrapper>
        <ResourceComponent />
      </HeroContainer>
    </>
  );
};

export default Hero;
