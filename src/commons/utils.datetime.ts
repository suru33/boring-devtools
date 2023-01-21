import dayjs from "dayjs";
import { DateFormatFunction } from "./types";

export const DEFAULT_DATETIME_FORMAT = "YYYY-MM-DD HH:mm";

export const combineDateTime = (date: Date, time: Date): Date =>
  dayjs(date).hour(time.getHours()).minute(time.getMinutes()).set("milliseconds", 0).toDate();

export const dateFormatFunction = (format: string): DateFormatFunction => {
  if (format === "UNIX_MILLIS") {
    return d => dayjs(d).valueOf().toString();
  } else if (format === "UNIX") {
    return d => dayjs(d).unix().toString();
  } else if (format === "ISO_8601") {
    return d => dayjs(d).toISOString();
  } else {
    return d => dayjs(d).format(format);
  }
};
