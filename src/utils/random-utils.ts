import * as _ from "lodash";
import faker from "@faker-js/faker";
import { IPv } from "../types";
import {
  LOWERCASE_LETTERS,
  NEW_LINE,
  NO_SPACE,
  NUMERIC_LETTERS,
  SYMBOL_LETTERS,
  UPPERCASE_LETTERS
} from "../constants";

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
  charSet = upper ? [ ...charSet, ...UPPERCASE_LETTERS ] : charSet;
  charSet = lower ? [ ...charSet, ...LOWERCASE_LETTERS ] : charSet;
  charSet = numeric ? [ ...charSet, ...NUMERIC_LETTERS ] : charSet;
  charSet = symbols ? [ ...charSet, ...SYMBOL_LETTERS ] : charSet;
  charSet = _.isEmpty(extraChars.trim()) ? charSet : _.uniq([ ...charSet, ...extraChars.trim() ]);

  return _.range(length)
    .map(() => chooseRandom<string>(charSet))
    .join(NO_SPACE);
};

export const randomStrings = (
  length: number,
  upper: boolean,
  lower: boolean,
  numeric: boolean,
  symbols: boolean,
  extraChars: string,
  count: number): string =>
  _.range(count)
    .map(() => randomString(length, upper, lower, numeric, symbols, extraChars))
    .join(NEW_LINE);

export const randomWords = (count: number): string =>
  _.range(count)
    .map(() => faker.random.word())
    .join(NEW_LINE);

export const randomSentences = (count: number): string => faker.lorem.sentences(count, NEW_LINE);

export const randomParagraphs = (count: number): string => faker.lorem.paragraphs(count);

export const randomIPs = (version: IPv, count: number): string => {
  const fn = version === "v4" ? faker.internet.ipv4 : faker.internet.ipv6;
  return _.range(count)
    .map(() => fn())
    .join(NEW_LINE);
};

export const randomUUIDs = (count: number): string =>
  _.range(count)
    .map(() => faker.datatype.uuid())
    .join(NEW_LINE);

export const randomNumber = (min: number, max: number, floatValue: boolean): number =>
  faker.datatype.number({ min: min, max: max, precision: floatValue ? 1/10000 : 1 });

export const randomNumbers = (min: number, max: number, floatValue: boolean, count: number): string =>
  _.range(count)
    .map(() => randomNumber(min, max, floatValue))
    .join(NEW_LINE);
