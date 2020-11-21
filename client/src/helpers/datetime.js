const toLocalDatetime = (dt) => {
  const twoDigits = (i) => (i < 10 ? '0' : '') + i;
  return dt.getFullYear() + '-' +
  twoDigits(dt.getMonth() + 1) + '-' +
  twoDigits(dt.getDate()) + 'T' +
  twoDigits(dt.getHours())  + ':' +
  twoDigits(dt.getMinutes()) + ':' +
  twoDigits(dt.getSeconds());
};

export {
  toLocalDatetime
};