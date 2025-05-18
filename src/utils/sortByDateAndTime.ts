type ItemWithDateTime = {
  formDate: string;  
  formTime: string;  
};

export function sortByDateTime<T extends ItemWithDateTime>(data: T[]): T[] {
  return [...data].sort((a, b) => {
    const dateTimeA = new Date(`${a.formDate} ${a.formTime}`);
    const dateTimeB = new Date(`${b.formDate} ${b.formTime}`);
    return dateTimeB.getTime() - dateTimeA.getTime(); // Latest first
  });
}