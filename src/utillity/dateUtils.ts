const getTwoChar = (input: Number) => {
  if (input < 10) return `0${input}`;
  else return input;
};

const getFullHours = (date: Date) => {
  return `${getTwoChar(date.getHours())}: ${getTwoChar(
    date.getMinutes()
  )}:${getTwoChar(date.getSeconds())}`;
};
const getFullDate = (date: Date) => {
  return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
};

const dateUtil = {
  getFullHours,
  getFullDate,
};

export default dateUtil;
