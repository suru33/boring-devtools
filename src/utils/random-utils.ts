import { IPv } from "../types";
import * as _ from "lodash";
import faker from "@faker-js/faker";
import {
  LOWERCASE_LETTERS,
  NUMERIC_LETTERS,
  SYMBOL_LETTERS,
  UPPERCASE_LETTERS,
  NO_SPACE,
  NEW_LINE,
  EMPTY_STRING
} from "../constants";

export const randomNumber = (value: number | { min: number; max: number; }): number => {
  const fn = (a: number, b: number) => Math.floor(Math.random() * (b - a)) + a;

  return typeof value === "number" ? fn(0, value) : fn(value.min, value.max);
};

export const chooseRandom = <T>(array: T[]): T => array[randomNumber(array.length)];

export const randomString = (length: number, upper: boolean, lower: boolean, numeric: boolean, symbols: boolean, extraChars: string): string => {
  let set = EMPTY_STRING;
  set += upper ? UPPERCASE_LETTERS : EMPTY_STRING;
  set += lower ? LOWERCASE_LETTERS : EMPTY_STRING;
  set += numeric ? NUMERIC_LETTERS : EMPTY_STRING;
  set += symbols ? SYMBOL_LETTERS : EMPTY_STRING;
  set = _.isEmpty(extraChars.trim()) ? set : _.uniq(set + extraChars.trim()).join(NO_SPACE);

  return _.range(length)
    .map(() => chooseRandom<string>(Array.from(set)))
    .join(NO_SPACE);
};

export const randomStrings = (length: number, upper: boolean, lower: boolean, numeric: boolean, symbols: boolean, extraChars: string, count: number): string => {
  return _.range(count)
    .map(() => randomString(length, upper, lower, numeric, symbols, extraChars))
    .join(NEW_LINE);
};

export const randomWords = (count: number): string => {
  return _.range(count)
    .map(() => faker.random.word())
    .join(NEW_LINE);
};

export const randomSentences = (count: number): string => {
  return faker.lorem.sentences(count, NEW_LINE);
};

export const randomParagraphs = (count: number): string => {
  return faker.lorem.paragraphs(count);
};

export const randomIPs = (version: IPv, count: number): string => {
  if (version === "v4") {
    return _.range(count)
      .map(() => faker.internet.ipv4())
      .join(NEW_LINE);
  } else if (version === "v6") {
    return _.range(count)
      .map(() => faker.internet.ipv6())
      .join(NEW_LINE);
  }
  return "";
};

export const randomUUIDs = (count: number): string => {
  return _.range(count)
    .map(() => faker.datatype.uuid())
    .join(NEW_LINE);
};
