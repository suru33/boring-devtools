import * as _ from "lodash";

const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numericLetters = "0123456789";
const symbolLetters = "!@#$%^&*()[]=";

export const randomNumber = (value: number | { min: number; max: number; }): number => {
  const fn = (a: number, b: number) => Math.floor(Math.random() * (b - a)) + a;

  return typeof value === "number" ? fn(0, value) : fn(value.min, value.max);
};

export const chooseRandom = <T>(array: string | T[]): string | T => array[randomNumber(array.length)];

export const randomString = (length: number, upper: boolean, lower: boolean, numeric: boolean, symbols: boolean, extraChars: string): string => {
  let set = "";
  set += upper ? upperCaseLetters : "";
  set += lower ? lowerCaseLetters : "";
  set += numeric ? numericLetters : "";
  set += symbols ? symbolLetters : "";
  set = _.isEmpty(extraChars.trim()) ? set : _.uniq(set + extraChars.trim()).join("");

  return _.range(length)
    .map(() => chooseRandom(set))
    .join("");
};

export const randomStrings = (length: number, upper: boolean, lower: boolean, numeric: boolean, symbols: boolean, extraChars: string, count: number): string => {
  return _.range(count)
    .map(() => randomString(length, upper, lower, numeric, symbols, extraChars))
    .join("\n");
};
