import { StringCase } from "../types";
import { EMPTY_STRING, NO_SPACE } from "../constants";

export const reverse = (s: string): string =>
  s === EMPTY_STRING ? EMPTY_STRING : [...s].reverse().join(NO_SPACE);

export const changeCase = (stringCase: StringCase, s: string): string => {
  if(s === EMPTY_STRING) {
    return EMPTY_STRING;
  } else if(stringCase === "lower") {
    return s.toLowerCase();
  } else if (stringCase === "upper") {
    return s.toUpperCase();
  } else {
    return s.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
  }
};
