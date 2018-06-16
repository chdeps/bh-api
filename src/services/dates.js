export default class dates {
  static extractFromDateAndHour = (date, hour) => {
    const now = new Date();
    const nowMonth = now.getUTCMonth();
    const nowYear = now.getUTCFullYear();
    const nowDate = now.getUTCDate();
    if(nowDate > date)  return new Date(nowYear, nowMonth + 1, date, hour);
    return new Date(year, month, date, hour);
  }
}
