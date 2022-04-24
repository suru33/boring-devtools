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

type WordFunction = (length?: number) => string;

const wordCategories: WordFunction[] = [
  faker.word.adjective,
  faker.word.adverb,
  faker.word.interjection,
  faker.word.noun,
  faker.word.preposition,
  faker.word.verb
];

export const randomWords = (count: number): string => {
  return _.range(count)
    .map(() => chooseRandom<WordFunction>(wordCategories)())
    .join(NEW_LINE);
};
