import dayjs from "dayjs";

export const combineDateTime = (date: Date, time: Date): Date =>
  dayjs(date).hour(time.getHours()).minute(time.getMinutes()).toDate();
