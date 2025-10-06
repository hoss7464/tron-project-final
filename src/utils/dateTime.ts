export const formatDateTime = (isoString: string) => {
  // Ensure the date is parsed in UTC to avoid timezone conversion
  const date = new Date(isoString);
  
  // Get UTC components to avoid local timezone interference
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  // Format date as MM/DD/YYYY (e.g., "08/08/2025")
  const formattedDate = `${month}/${day}/${year}`;

  // Format time as HH:MM:SS (e.g., "21:24:13")
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return {
    date: formattedDate,
    time: formattedTime,
    raw: date
  };
};

export const formatDateTime2 = (isoString: string) => {
  // Ensure the date is parsed in UTC to avoid timezone conversion
  const date = new Date(isoString);
  
  // Get UTC components to avoid local timezone interference
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  // Format date as MM/DD/YYYY (e.g., "08/08/2025")
  const formattedDate = `${month}/${day}/${year}`;

  // Format time as HH:MM:SS (e.g., "21:24:13")
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return {
    myDate: formattedDate,
    myTime: formattedTime,
    raw: date
  };
};