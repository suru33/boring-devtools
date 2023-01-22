import { Sx, TextProps } from "@mantine/core";
import { CSSProperties } from "react";

export const verticalGroupIndent: Sx = {
  marginLeft: 20,
  marginTop: 4
};

export const timezoneSelect: CSSProperties = {
  width: 300
};
export const fontWeight = {
  semiBold: 500,
  bold: 700,
  extraBold: 900
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
