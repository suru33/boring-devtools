import { CSSProperties } from "react";
import { Sx, TextProps } from "@mantine/core";

export const verticalGroupIndent: Sx = {
  marginLeft: 20,
  marginTop: 4
};

export const timezoneSelect: CSSProperties = {
  width: 300
};
export const fontWeight = {
  medium: 500,
  semiBold: 600,
  bold: 700,
  extraBold: 800
};

export const numVals = {
  minOutputItems: 1,
  maxOutputItems: 100,
  defaultOutputItems: 25,
  textAreaRows: 20,
  tooltipWidth: 280,
  timezoneSelectWidth: 300
};

export const globalProps = {
  fullPageTextProps: {
    size: 50,
    weight: 900,
    ta: "center"
  } as TextProps
};
