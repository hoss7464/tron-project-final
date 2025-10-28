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
      case "ORDER_NOT_FOUND":
        message = `${i18next.t("Text243")}`;
        break;
      case "TX_ALREADY_USED":
        message = `${i18next.t("Text244")}`;
        break;
      case "ALREADY_VERIFIED":
        message = `${i18next.t("Text245")}`;
        break;
      case "INVALID_TX":
        message = `${i18next.t("Text246")}`;
        break;
      case "STATE_CONFLICT":
        message = `${i18next.t("Text247")}`;
        break;
      case "VALIDATION_FAILED":
        message = `${i18next.t("Text248")}`;
        break;
      case "VALIDATION_ERROR":
        message = `${i18next.t("Text248")}`;
        break;
      case "ORDER_NOT_FOUND":
        message = `${i18next.t("Text249")}`;
        break;
      case "ORDER_CLOSED":
        message = `${i18next.t("Text250")}`;
        break;
      case "HAVED_LOCK":
        message = `${i18next.t("Text251")}`;
        break;
      case "NO_CAPACITY":
        message = `${i18next.t("Text252")}`;
        break;
      case "TXID_PROCESS":
        message = `${i18next.t("Text253")}`;
        break;
      case "RESID_PROCESS":
        message = `${i18next.t("Text254")}`;
        break;
      case "INVALID_TXID":
        message = `${i18next.t("Text255")}`;
        break;
      case "ORDER_INVALID":
        message = `${i18next.t("Text256")}`;
        break;
      case "HOLD_NOT_FOUND":
        message = `${i18next.t("Text257")}`;
        break;
      case "INVALID_AMOUNT":
        message = `${i18next.t("Text258")}`;
        break;
      case "STATE_CONFLICT":
        message = `${i18next.t("Text259")}`;
        break;
      case "VALIDATION_ERROR":
        message = `${i18next.t("Text264")}`;
        break;
      case "ORDER_ID_INVALID":
        message = `${i18next.t("Text265")}`;
        break;
      case "NOT_CANCELABLE":
        message = `${i18next.t("Text266")}`;
        break;
      case "BALANCE":
        message = `${i18next.t("Text266")}`;
        break;
      case "REFUND_FAILED":
        message = `${i18next.t("Text266")}`;
        break;

      default:
        message = `${i18next.t("Text225")}`;
        break;
    }
  }
  return message;
};
