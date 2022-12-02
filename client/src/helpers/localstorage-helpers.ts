export const getItemFromLocalStorage = (key: string) => {
  const item = window.localStorage.getItem(key);

  return item ? JSON.parse(item) : null;
};

export const setItemToLocalStorage = (key: string, value: any) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};
