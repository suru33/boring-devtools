import { EMPTY_STRING, NO_SPACE } from "../constants";

export const reverse = (s: string): string =>
  s === EMPTY_STRING ? EMPTY_STRING : [...s].reverse().join(NO_SPACE);
