const getTwoChar = (input: Number) => {
  if (input < 10) return `0${input}`;
  else return input;
};

const getFullHours = (date: Date) => {
  return `${getTwoChar(date.getHours())}:${getTwoChar(
    date.getMinutes()
  )}:${getTwoChar(date.getSeconds())}`;
};
const getFullDate = (date: Date) => {
  return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
};

const getDayOfWeekMeaning = (day: number) => {
  switch (day) {
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Sartuday";
    default:
      return "Sunday";
  }
};

const getMonthOfWeekMeaning = (day: number) => {
  switch (day) {
    case 0:
      return "January";
    case 1:
      return "February";
    case 2:
      return "March";
    case 3:
      return "April";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return " October ";
    case 10:
      return "November";
    case 11:
      return "December";
    default:
      return "Sunday";
  }
};

const getDateMeaning = (date: Date) => {
  return `${getDayOfWeekMeaning(date.getDay())}, ${getMonthOfWeekMeaning(
    date.getMonth()
  )}, ${date.getFullYear()}`;
};

const dateUtil = {
  getFullHours,
  getFullDate,
  getDateMeaning,
};

export default dateUtil;
