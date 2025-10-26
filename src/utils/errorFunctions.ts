import i18next from "i18next";

export const serverErrorMessageFunc = (myCode: string, resourceType?: string) => {
  let message = "";
  if (myCode) {
    switch (myCode) {
      case "AUTH_FAILD":
        message = `${i18next.t("Text218")}`;
        break;
      case "BAD_RECEIVER":
        message = `${i18next.t("Text219")}`;
        break;
      case "BAD_TOTAL_PRICE":
        message = `${i18next.t("Text220")}`;
        break;
      case "INSUFFICIENT_BALANCE":
        message = `${i18next.t("Text221")}`;
        break;
      case "INTERNAL_ERROR":
        message = `${i18next.t("Text222")}`;
        break;
      case "VALIDATION_FAILED":
        message = `${i18next.t("Text223")}`;
        break;
      case "MARKET_SETTINGS_MISSING":
        message = `${i18next.t("Text224")}`;
        break;
      case "RATE_LOW":
        message = `${i18next.t("Text226")}`;
        break;
      case "RATE_NOT_FOUND":
        message = `${i18next.t("Text227")}`;
        break;
      case "RATE_RESOURCE_MISSING":
        message = `${i18next.t("Text228")}`;
        break;
      case "AMOUNT_TOO_LOW":
        message = `${i18next.t("Text229")}`;
        break;
      case "PRICE_NOT_MATCH":
        message = `${i18next.t("Text230")}`;
        break;
      case "INPROCESS":
        message = `${i18next.t("Text231")}`;
        break;

      default:
        message = `${i18next.t("Text225")}`;
        break;
    }
  }
  return message;
};
