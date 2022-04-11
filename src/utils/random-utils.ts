import * as _ from "lodash";
import { faker } from "@faker-js/faker";

const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numericLetters = "0123456789";
const symbolLetters = "!@#$%^&*()[]=";

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
    .map(() => charSet[faker.datatype.number(charSet.length - 1)])
    .join("");
};

export const randomStrings = (length: number, upper: boolean, lower: boolean, numeric: boolean, symbols: boolean, pool: string, count: number): string => {
  return _.range(count)
    .map(() => randomString(length, upper, lower, numeric, symbols, pool))
    .join("\n");
};
