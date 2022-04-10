import * as _ from "lodash";
import Chance from "chance";

const random = new Chance(Math.random);

const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numericLetters = "0123456789";
const symbolLetters = "!@#$%^&*()[]=";

export const generateRandomString = (length: number, upper: boolean, lower: boolean, numeric: boolean, symbols: boolean, pool: string): string => {
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
  return random.string({ length: length, pool: charSet });
};

export const generateRandomStrings = (length: number, upper: boolean, lower: boolean, numeric: boolean, symbols: boolean, pool: string, count: number): string => {
  return _.range(count).map(() => generateRandomString(length, upper, lower, numeric, symbols, pool)).join("\n");
};
