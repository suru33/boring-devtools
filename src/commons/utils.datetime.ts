import dayjs from "dayjs";
import { DateFormatFunction } from "./types";

export const mergeDateTime = (date: Date, time: Date): dayjs.Dayjs =>
  dayjs(date)
    .hour(time.getHours())
    .minute(time.getMinutes())
    .second(time.getSeconds())
    .set("milliseconds", 0);

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

export const serializeDate = (d: Date): string => d.getTime().toString();
export const deserializeDate = (s: string): Date => new Date(parseInt(s));

export const datetimeRangeFromNow = (plusDays = 10): [Date, Date, Date, Date] => {
  const sd = dayjs().hour(0).minute(0).second(0).toDate();
  const st = dayjs().hour(0).minute(0).second(0).toDate();
  const ed = dayjs(sd).add(plusDays, "days").toDate();
  const et = dayjs().hour(23).minute(59).second(59).toDate();
  return [ sd, st, ed, et ];
};

export const setNowCallback = (dateFn: (_: Date) => void, timeFn: (_: Date) => void) => {
  const now = new Date();
  dateFn(now);
  timeFn(now);
};
