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
        return "15 mins";
      case HOUR_1:
        return "1 hour";
      case HOUR_3:
        return "3 hours";
      case DAY_1:
        return "1 day";
      case DAY_30:
        return "30 days";
    }

    // Handle day multiples (2 days, 3 days... up to 30 days)
  if (seconds > DAY_1 && seconds <= DAY_30 && seconds % DAY_1 === 0) {
    const days = seconds / DAY_1;
    return `${days} day${days > 1 ? 's' : ''}`;
  }
  };