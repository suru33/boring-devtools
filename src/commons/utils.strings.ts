import * as _ from "lodash";
import { StringCase, StringCaseFunction } from "./types";
import { EMPTY_STRING, NO_SPACE } from "./constants";

export const reverse = (s: string): string =>
  s === EMPTY_STRING ? EMPTY_STRING : [...s].reverse().join(NO_SPACE);

const caseFunctions: StringCaseFunction = {
  "camel": _.camelCase,
  "capitalize": _.capitalize,
  "kebab": _.kebabCase,
  "lower": _.toLower,
  "lower-first": _.lowerFirst,
  "snake": _.snakeCase,
  "upper": _.toUpper,
  "upper-first": _.upperFirst,
  "deburr": _.deburr
};

export const changeCase = (stringCase: StringCase, s: string): string =>
  s === EMPTY_STRING ? EMPTY_STRING : caseFunctions[stringCase](s);

export const repeat = (s: string, n: number): string => _.repeat(s, n);

export const uniqueCharacters = (s: string) => _.uniq(s);

export const sortLines = (s: string): string =>
  s.split("\n").map(s => s.trim()).sort().join("\n");

export const base64ToString = (s: string): string => atob(s);

export const stringToBase64 = (s: string): string => btoa(s);
