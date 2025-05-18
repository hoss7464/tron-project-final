type ItemWithDateTime = {
  orderDate: string;  
  orderTime: string; 
};

export function sortByDateTime2<T extends ItemWithDateTime>(data: T[]): T[] {
  return [...data].sort((a, b) => {
    const parseDateTime = (dateStr: string, timeStr: string): number => {
      const [day, month] = dateStr.split("/").map(Number);
      const [hours, minutes] = timeStr.split(":").map(Number);
      const year = new Date().getFullYear(); 
      return new Date(year, month - 1, day, hours, minutes).getTime();
    };

    const dateTimeA = parseDateTime(a.orderDate, a.orderTime);
    const dateTimeB = parseDateTime(b.orderDate, b.orderTime);

    return dateTimeB - dateTimeA; // Latest first
  });
}
