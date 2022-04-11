import * as _ from "lodash";

const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numericLetters = "0123456789";
const symbolLetters = "!@#$%^&*()[]=";

export const randomNumber = (value: number | { min: number; max: number; }): number => {
  const fn = (a: number, b: number) => Math.floor(Math.random() * (b - a)) + a;

  return typeof value === "number" ? fn(0, value) : fn(value.min, value.max);
};

export const chooseRandom = <T>(items: string | T[]): string | T => items[randomNumber(items.length)];

const randomString = (length: number, upper: boolean, lower: boolean, numeric: boolean, symbols: boolean, pool: string): string => {
  let charSet = "";
  if (upper) {
    charSet += upperCaseLetters;
  }
  if (lower) {
    charSet += lowerCaseLetters;
  }
  if (numeric) {
    charSet += numericLetters;
  }
  if (symbols) {
    charSet += symbolLetters;
  }
  const poolTrim = pool.trim();
  if (!_.isEmpty(poolTrim)) {
    charSet += poolTrim;
    charSet = _.uniq(charSet).join("");
  }
  return _.range(length)
    .map(() => chooseRandom(charSet))
    .join("");
};

export const randomStrings = (length: number, upper: boolean, lower: boolean, numeric: boolean, symbols: boolean, pool: string, count: number): string => {
  return _.range(count)
    .map(() => randomString(length, upper, lower, numeric, symbols, pool))
    .join("\n");
};
