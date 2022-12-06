export const getLocalDate = (date: string) => {
  return new Date(date).toLocaleDateString();
};

export const getLocalTime = (date: string) => {
  const dateString = getLocalDate(date);
  const timeString = new Date(date).toLocaleTimeString();

  return dateString + ' ' + timeString;
};
