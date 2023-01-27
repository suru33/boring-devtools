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

export type Base64Conv = "text" | "base64"

export type StringCaseFunction = Record<StringCase, ((s?: string) => string)>;

export type DateFormatFunction = (d: Date) => string

export type ToolId =
  "9d25" | "80fd" | "412a" | "4dd6" | "4bc4" |
  "4ddc" | "1e00" | "4e38" | "cf0b" | "e347" |
  "ab86" | "93a8" | "aa72" | "aad8" | "997f"

export interface ToolProps {
  id: ToolId,
}

export type TextType = "words" | "sentences" | "paragraphs" | "slug"
