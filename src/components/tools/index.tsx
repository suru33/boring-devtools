import { ReactNode } from "react";
import { MantineColor } from "@mantine/styles/lib/theme/types/MantineColor";

import StringsGenerator from "./generators/StringsGenerator";
import WordsGenerator from "./generators/WordsGenerator";
import SentencesGenerator from "./generators/SentencesGenerator";
import ParagraphGenerator from "./generators/ParagraphGenerator";
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
import HEXtoStringConverter from "./strings/HEXtoStringConverter";
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
  tools: Tool[]
}

const randomToolsCategory: ToolCategory = {
  label: "Random Generators",
  path: "random-generators",
  tools: [
    {
      label: "Strings Generator",
      path: "strings-generator",
      component: <StringsGenerator/>,
      icon: icons.string,
      color: colors.strings
    },
    {
      label: "Words Generator",
      path: "words-generator",
      component: <WordsGenerator/>,
      icon: icons.words,
      color: colors.strings
    },
    {
      label: "Sentence Generator",
      path: "sentence-generator",
      component: <SentencesGenerator/>,
      icon: icons.sentence,
      color: colors.strings
    },
    {
      label: "Paragraph Generator",
      path: "paragraph-generator",
      component: <ParagraphGenerator/>,
      icon: icons.paragraph,
      color: colors.strings
    },
    {
      label: "Numbers Generator",
      path: "numbers-generator",
      component: <NumbersGenerator/>,
      icon: icons.numbers,
      color: colors.numbers
    },
    {
      label: "IP Address Generator",
      path: "ip-address-generator",
      component: <IPAddressGenerator/>,
      icon: icons.ip,
      color: colors.world
    },
    {
      label: "Date Time Generator",
      path: "date-time-generator",
      component: <DateTimeGenerator/>,
      icon: icons.dateTime,
      color: colors.dates
    },
    {
      label: "UUID Generator",
      path: "uuid-generator",
      component: <UUIDGenerator/>,
      icon: icons.uuid,
      color: colors.ids
    },
    {
      label: "Address Generator",
      path: "address-generator",
      component: <AddressGenerator/>,
      icon: icons.address,
      color: colors.world
    }
  ]
};

const stringToolsCategory: ToolCategory = {
  label: "String Tools",
  path: "string-tools",
  tools: [
    {
      label: "String Length Calculator",
      path: "string-length-calculator",
      component: <StringLengthCalculator/>,
      icon: icons.length,
      color: colors.numbers
    },
    {
      label: "String Case Converter",
      path: "string-case-converter",
      component: <StringCaseConverter/>,
      icon: icons.caseConvert,
      color: colors.strings
    },
    {
      label: "String Reverser",
      path: "string-reverser",
      component: <StringReverser/>,
      icon: icons.reverse,
      color: colors.strings
    },
    {
      label: "String Repeater",
      path: "string-repeater",
      component: <StringRepeater/>,
      icon: icons.repeat,
      color: colors.strings
    },
    {
      label: "Words Sorter",
      path: "words-sorter",
      component: <WordsSorter/>,
      icon: icons.sort,
      color: colors.strings
    },
    {
      label: "HEX to String Converter",
      path: "hex-to-string-converter",
      component: <HEXtoStringConverter/>,
      icon: icons.code,
      color: colors.code
    }
  ]
};

const dateToolsCategory: ToolCategory = {
  label: "Date Tools",
  path: "date-tools",
  tools: [
    {

      label: "Date Difference Calculator",
      path: "date-difference-calculator",
      component: <DateDifferenceCalculator/>,
      icon: icons.dateDifference,
      color: colors.dates
    },
    {

      label: "Time Zone Converter",
      path: "time-zone-converter",
      component: <TimeZoneConverter/>,
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
