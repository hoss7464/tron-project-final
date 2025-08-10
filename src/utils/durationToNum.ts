// utils/durationToNumber.ts
export const durationToNumber = (seconds: number): number => {
  const MIN_15 = 900;     // 15 mins
  const HOUR_1 = 3600;    // 1 hour
  const HOUR_3 = 10800;   // 3 hours
  const DAY_1 = 86400;    // 1 day

  switch (seconds) {
    case MIN_15:  return 15 / (60 * 24);   // 15 mins → 0.0104167 (days)
    case HOUR_1:  return 1 / 24;    // 15 mins → 0.0104167 (days)
    case HOUR_3:  return 3 / 24;    // 3 hours → 0.125 (days)
    case DAY_1:   return 1;    // 86400s → 1 (day)
    default:
      // Handle day multiples (2 days → 2, 30 days → 30)
      if (seconds > DAY_1 && seconds % DAY_1 === 0) {
        return seconds / DAY_1;
      }
      throw new Error(`Unsupported duration: ${seconds} seconds`);
  }
};