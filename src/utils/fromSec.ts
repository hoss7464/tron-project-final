import i18next from "i18next";

//Function to calculate time in seconds to time in min , hour, day ...
 export const formatStrictDuration = (seconds: number) => {
    const MIN_15 = 900;
    const HOUR_1 = 3600;
    const HOUR_3 = 10800;
    const DAY_1 = 86400;
    const DAY_30 = 2592000;

    // Check for exact matches first
    switch (seconds) {
      case MIN_15:
        return `15 ${i18next.t("Text78")}`;
      case HOUR_1:
        return `1 ${i18next.t("Text55")}`;
      case HOUR_3:
        return `3 ${i18next.t("Text56")}`;
      case DAY_1:
        return `1 ${i18next.t("Text58")}`;
      case DAY_30:
        return `30 ${i18next.t("Text59")}`;
    }

    // Handle day multiples (2 days, 3 days... up to 30 days)
  if (seconds > DAY_1 && seconds <= DAY_30 && seconds % DAY_1 === 0) {
    const days = seconds / DAY_1;
    return `${days} ${days > 1 ? `${i18next.t("Text59")}` : `${i18next.t("Text58")}`}`;
  }
  };