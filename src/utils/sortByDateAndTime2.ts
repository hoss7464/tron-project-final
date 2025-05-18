type ItemWithDateTime = {
  orderDate: string;  
  orderTime: string;  
};

export function sortByDateTime2<T extends ItemWithDateTime>(data: T[]): T[] {
  return [...data].sort((a, b) => {
    const dateTimeA = new Date(`${a.orderDate} ${a.orderTime}`);
    const dateTimeB = new Date(`${b.orderDate} ${b.orderTime}`);
    return dateTimeB.getTime() - dateTimeA.getTime(); // Latest first
  });
}