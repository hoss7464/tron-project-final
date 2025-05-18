type ItemWithDateTime = {
  formDate: string;  
  formTime: string;  
};

export function sortByDateTime<T extends ItemWithDateTime>(data: T[]): T[] {
  return [...data].sort((a, b) => {
    const parseDateTime = (dateStr: string, timeStr: string): number => {
      const [day, month] = dateStr.split("-").map(Number);
      const [hours, minutes] = timeStr.split(":").map(Number);
      const year = new Date().getFullYear(); 
      return new Date(year, month - 1, day, hours, minutes).getTime();
    };

    const dateTimeA = parseDateTime(a.formDate, a.formTime);
    const dateTimeB = parseDateTime(b.formDate, b.formTime);

    return dateTimeB - dateTimeA; // Latest first
  });
}