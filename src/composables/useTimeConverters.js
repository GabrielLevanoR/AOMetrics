export default function useConvertTimeISO() {
  const toFormatDate = (dateISO) => {
    const newDate = new Date(dateISO);
    return {
      date: `${String(newDate.getDate()).padStart(2, "0")}/${String(
        newDate.getMonth() + 1
      ).padStart(2, "0")}/${String(newDate.getUTCFullYear()).padStart(2, "0")}`,
      time: `${String(newDate.getUTCHours()).padStart(2, "0")}:${String(
        newDate.getUTCMinutes()
      ).padStart(2, "0")}:${String(newDate.getUTCSeconds()).padStart(2, "0")}`,
    };
  };
  const timeBetweenDates = (date1, date2) => {
    const difference = date1.getTime() - date2.getTime();
    const minutes = Math.floor(difference / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    let suf;
    if (minutes < 1) {
      suf = "less than 1 minute";
    } else if (minutes < 60) {
      suf = "minute(s)";
    } else {
      suf = "hour(s)";
    }
    const timeRet = minutes < 60 ? minutes : hours;
    return `${timeRet} ${suf}`;
  };
  return {
    toFormatDate,
    timeBetweenDates,
  };
}
