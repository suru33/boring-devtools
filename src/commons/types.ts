export type IPv = "v4" | "v6"

export type StringCase =
  "lower"
  | "upper"
  | "capitalize"
  | "camel"
  | "kebab"
  | "snake"
  | "upper-first"
  | "lower-first"
  | "deburr"

export type StringCaseFunction = Record<StringCase, ((s?: string) => string)>;

export type DateFormatFunction = (d: Date) => string
