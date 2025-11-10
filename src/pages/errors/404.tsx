import React from "react";
import { ErrorContainer, ErrorTextWrapper, ErrorText } from "./errorElements";
import { useTranslation } from "react-i18next";

const ErrorPage : React.FC = () => {
    const {t} = useTranslation()
    return (
        <>
        <ErrorContainer>
            <ErrorTextWrapper>
                <ErrorText>404 - {t("Text288")}</ErrorText>
            </ErrorTextWrapper>
        </ErrorContainer>
        </>
    )
}

export default ErrorPage