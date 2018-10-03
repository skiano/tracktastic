exports.create = () => {
  return new Date().toUTCString();
}

exports.parse = (timestamp) => {
  const d = new Date(timestamp);
  return {
    unix: d.valueOf(),
    year: d.getUTCFullYear(),
    month: d.getUTCMonth(),
    date: d.getUTCDate(),
    day: d.getUTCDay(),
    hours: d.getUTCHours(),
    minutes: d.getUTCMinutes(),
    seconds: d.getUTCSeconds()
  };
};

const padNum = (v, digits = 2) => (`${v}`).padStart(digits, 0);

exports.display = ({
  year,
  month,
  date,
  hours,
  minutes,
}) => {
  // return `${year}-${padNum(month)}-${padNum(date)} ${padNum(hours)}:${padNum(minutes)}`
  return `${padNum(month)}-${padNum(date)}`
}
