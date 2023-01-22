import { isEmpty, range, uniq } from "lodash";
import { faker } from "@faker-js/faker";
import { IPv, TextType } from "./types";
import { dateFormatFunction } from "./utils.datetime";
import __ from "./constants";

export const randomInt = (value: number | { min: number; max: number; }): number => {
  const fn = (a: number, b: number) => Math.floor(Math.random() * (b - a)) + a;

  return typeof value === "number" ? fn(0, value) : fn(value.min, value.max);
};

export const chooseRandom = <T>(array: T[]): T => array[randomInt(array.length)];

export const randomString = (
  length: number,
  upper: boolean,
  lower: boolean,
  numeric: boolean,
  symbols: boolean,
  extraChars: string
): string => {
  let charSet: string[] = [];
  charSet = upper ? [ ...charSet, ...__.charsets.uppercase ] : charSet;
  charSet = lower ? [ ...charSet, ...__.charsets.lowercase ] : charSet;
  charSet = numeric ? [ ...charSet, ...__.charsets.numeric ] : charSet;
  charSet = symbols ? [ ...charSet, ...__.charsets.symbol ] : charSet;
  charSet = isEmpty(extraChars.trim()) ? charSet : uniq([ ...charSet, ...extraChars.trim() ]);

  return range(length)
    .map(() => chooseRandom<string>(charSet))
    .join(__.emptyStr);
};

export const randomStrings = (
  length: number,
  upper: boolean,
  lower: boolean,
  numeric: boolean,
  symbols: boolean,
  extraChars: string,
  count: number): string =>
  range(count)
    .map(() => randomString(length, upper, lower, numeric, symbols, extraChars))
    .join(__.newLine);

export const randomText = (type: TextType, count: number): string => {
  switch (type) {
    case "words":
      return range(count).map(faker.random.word).join(__.newLine);
    case "sentences":
      return faker.lorem.sentences(count, __.newLine);
    case "paragraphs" :
      return faker.lorem.paragraphs(count, __.newLine);
  }
};

export const randomIPs = (version: IPv, count: number): string => {
  const fn = version === "v4" ? faker.internet.ipv4 : faker.internet.ipv6;
  return range(count)
    .map(fn)
    .join(__.newLine);
};

export const randomUUIDs = (count: number): string =>
  range(count)
    .map(faker.datatype.uuid)
    .join(__.newLine);

export const randomNumber = (min: number, max: number, floatValue: boolean, precision: number): number =>
  faker.datatype.number({ min: min, max: max, precision: floatValue ? 1 / Math.pow(10, precision) : 1 });

export const randomNumbers = (min: number, max: number, floatValue: boolean, count: number, precision: number): string =>
  range(count)
    .map(() => randomNumber(min, max, floatValue, precision))
    .join(__.newLine);

export const randomDates = (from: Date, to: Date, count: number, format: string = __.formats.dateTimeWithOutSeconds): string =>
  uniq(faker.date.betweens(from, to, count)
    .map(dateFormatFunction(format)))
    .join(__.newLine);
