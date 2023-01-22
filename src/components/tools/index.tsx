import { ReactNode } from "react";
import { NavigateFunction } from "react-router-dom";
import { SpotlightAction } from "@mantine/spotlight";
import { MantineColor } from "@mantine/styles/lib/theme/types/MantineColor";
import { flatten, isEqual } from "lodash";
import StringsGenerator from "./generators/StringsGenerator";
import TextGenerator from "./generators/TextGenerator";
import NumbersGenerator from "./generators/NumbersGenerator";
import IPAddressGenerator from "./generators/IPAddressGenerator";
import DateTimeGenerator from "./generators/DateTimeGenerator";
import UUIDGenerator from "./generators/UUIDGenerator";
import AddressGenerator from "./generators/AddressGenerator";
import StringLengthCalculator from "./strings/StringLengthCalculator";
import StringCaseConverter from "./strings/StringCaseConverter";
import StringReverser from "./strings/StringReverser";
import StringRepeater from "./strings/StringRepeater";
import WordsSorter from "./strings/WordsSorter";
import TextToBase64Converter from "./strings/TextToBase64Converter";
import DateDifferenceCalculator from "./dates/DateDifferenceCalculator";
import TimeZoneConverter from "./dates/TimeZoneConverter";
import { navbarColors as colors } from "../../resources/colors";
import { navbarIcons as icons } from "../../resources/icons";

export interface Tool {
  label: string,
  path: string,
  component: ReactNode,
  icon: ReactNode,
  color: MantineColor
}

export interface ToolCategory {
  label: string,
  path: string,
  icon: ReactNode,
  tools: Tool[]
}

const randomToolsCategory: ToolCategory = {
  label: "Random Generators",
  path: "random-generators",
  icon: icons.randomBig,
  tools: [
    {
      label: "Strings Generator",
      path: "strings-generator",
      component: <StringsGenerator id="9d25"/>,
      icon: icons.string,
      color: colors.strings
    },
    {
      label: "Text Generator",
      path: "text-generator",
      component: <TextGenerator id="80fd"/>,
      icon: icons.paragraph,
      color: colors.strings
    },
    {
      label: "Numbers Generator",
      path: "numbers-generator",
      component: <NumbersGenerator id="412a"/>,
      icon: icons.numbers,
      color: colors.numbers
    },
    {
      label: "IP Address Generator",
      path: "ip-address-generator",
      component: <IPAddressGenerator id="4dd6"/>,
      icon: icons.ip,
      color: colors.world
    },
    {
      label: "Date Time Generator",
      path: "date-time-generator",
      component: <DateTimeGenerator id="4bc4"/>,
      icon: icons.dateTime,
      color: colors.dates
    },
    {
      label: "UUID Generator",
      path: "uuid-generator",
      component: <UUIDGenerator id="4ddc"/>,
      icon: icons.uuid,
      color: colors.ids
    },
    {
      label: "Address Generator",
      path: "address-generator",
      component: <AddressGenerator id="1e00"/>,
      icon: icons.address,
      color: colors.world
    }
  ]
};

const stringToolsCategory: ToolCategory = {
  label: "String Tools",
  path: "string-tools",
  icon: icons.languageBig,
  tools: [
    {
      label: "String Length Calculator",
      path: "string-length-calculator",
      component: <StringLengthCalculator id="4e38"/>,
      icon: icons.length,
      color: colors.numbers
    },
    {
      label: "String Case Converter",
      path: "string-case-converter",
      component: <StringCaseConverter id="cf0b"/>,
      icon: icons.caseConvert,
      color: colors.strings
    },
    {
      label: "String Reverser",
      path: "string-reverser",
      component: <StringReverser id="e347"/>,
      icon: icons.reverse,
      color: colors.strings
    },
    {
      label: "String Repeater",
      path: "string-repeater",
      component: <StringRepeater id="ab86"/>,
      icon: icons.repeat,
      color: colors.strings
    },
    {
      label: "Words Sorter",
      path: "words-sorter",
      component: <WordsSorter id="93a8"/>,
      icon: icons.sort,
      color: colors.strings
    },
    {
      label: "Text to Base64 Converter",
      path: "text-to-base64-converter",
      component: <TextToBase64Converter id="aa72"/>,
      icon: icons.transform,
      color: colors.code
    }
  ]
};

const dateToolsCategory: ToolCategory = {
  label: "Date Tools",
  path: "date-tools",
  icon: icons.calendarBig,
  tools: [
    {
      label: "Date Difference Calculator",
      path: "date-difference-calculator",
      component: <DateDifferenceCalculator id="aad8"/>,
      icon: icons.dateDifference,
      color: colors.dates
    },
    {
      label: "Time Zone Converter",
      path: "time-zone-converter",
      component: <TimeZoneConverter id="997f"/>,
      icon: icons.timeZone,
      color: colors.world
    }
  ]
};

export const allTools: ToolCategory[] = [
  randomToolsCategory,
  stringToolsCategory,
  dateToolsCategory
];

export const getToolPath = (tc: ToolCategory, t: Tool) => {
  if (tc.tools.find(i => isEqual(i, t))) {
    return `${tc.path}/${t.path}`;
  } else {
    throw new Error(`${t.label} does not belongs to ${tc.label}`);
  }
};

export const buildSpotlightActions = (navigateFn: NavigateFunction): SpotlightAction[] => flatten(
  allTools.map((tc) =>
    tc.tools.map(t => {
      const action: SpotlightAction = {
        id: `${tc.path}-${t.path}`,
        title: t.label,
        icon: t.icon,
        group: tc.label,
        onTrigger: () => navigateFn(getToolPath(tc, t))
      };
      return action;
    })
  ));
