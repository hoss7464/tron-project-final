type ItemWithDateTime = {
  date: string;  
  time: string;  
};

export function sortByDateTime<T extends ItemWithDateTime>(data: T[]): T[] {
  return [...data].sort((a, b) => {
    const parseDateTime = (dateStr: string, timeStr: string): number => {
      const [day, month] = dateStr.split("-").map(Number);
      const [hours, minutes] = timeStr.split(":").map(Number);
      const year = new Date().getFullYear(); 
      return new Date(year, month - 1, day, hours, minutes).getTime();
    };

    const dateTimeA = parseDateTime(a.date, a.time);
    const dateTimeB = parseDateTime(b.date, b.time);

    return dateTimeB - dateTimeA; // Latest first
  });
}