import { useInputState } from "@mantine/hooks";
import { camelCase, capitalize, deburr, kebabCase, lowerFirst, snakeCase, toLower, toUpper, upperFirst } from "lodash";
import { StringCase, StringCaseFunction } from "./types";
import __ from "./constants";

export const useEmptyStringInputState = () => useInputState<string>(__.emptyStr);

export const reverse = (s: string): string =>
  s === __.emptyStr ? __.emptyStr : [...s].reverse().join(__.emptyStr);

const caseFunctions: StringCaseFunction = {
  "camel": camelCase,
  "capitalize": capitalize,
  "kebab": kebabCase,
  "lower": toLower,
  "lower-first": lowerFirst,
  "snake": snakeCase,
  "upper": toUpper,
  "upper-first": upperFirst,
  "deburr": deburr
};

export const changeCase = (stringCase: StringCase, s: string): string =>
  s === __.emptyStr ? __.emptyStr : caseFunctions[stringCase](s);

export const sortLines = (s: string): string =>
  s.split(__.newLine).map(s => s.trim()).sort().join(__.newLine);

export const base64ToString = (s: string): string => atob(s);

export const stringToBase64 = (s: string): string => btoa(s);
