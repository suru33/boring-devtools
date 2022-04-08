import RandomStringsGenerator from "./random/RandomStringsGenerator";
import RandomWordsGenerator from "./random/RandomWordsGenerator";
import RandomParagraphGenerator from "./random/RandomParagraphGenerator";
import RandomNumbersGenerator from "./random/RandomNumbersGenerator";
import RandomIPAddressGenerator from "./random/RandomIPAddressGenerator";
import RandomDateGenerator from "./random/RandomDateGenerator";
import RandomUUIDGenerator from "./random/RandomUUIDGenerator";
import RandomAddressGenerator from "./random/RandomAddressGenerator";
import StringLengthCalculator from "./string/StringLengthCalculator";
import StringCaseConverter from "./string/StringCaseConverter";
import StringReverser from "./string/StringReverser";
import WordsSorter from "./string/WordsSorter";
import StringRepeater from "./string/StringRepeater";
import HEXtoStringConverter from "./string/HEXtoStringConverter";
import DateDifferenceCalculator from "./date/DateDifferenceCalculator";
import TimeZoneConverter from "./date/TimeZoneConverter";
import { ReactNode } from "react";
import { Writing } from "tabler-icons-react";
import { MantineColor } from "@mantine/styles/lib/theme/types/MantineColor";
import RandomSentenceGenerator from "./random/RandomSentenceGenerator";

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

const writingIcon = <Writing size={16}/>;

const randomToolsCategory: ToolCategory = {
  label: "Random Tools",
  path: "random-tools",
  tools: [
    {
      label: "Random Strings Generator",
      path: "random-strings-generator",
      component: <RandomStringsGenerator/>,
      icon: writingIcon,
      color: "red"
    },
    {
      label: "Random Words Generator",
      path: "random-words-generator",
      component: <RandomWordsGenerator/>,
      icon: writingIcon,
      color: "red"
    },
    {
      label: "Random Sentence Generator",
      path: "random-sentence-generator",
      component: <RandomSentenceGenerator/>,
      icon: writingIcon,
      color: "red"
    },
    {
      label: "Random Paragraph Generator",
      path: "random-paragraph-generator",
      component: <RandomParagraphGenerator/>,
      icon: writingIcon,
      color: "red"
    },
    {
      label: "Random Numbers Generator",
      path: "random-numbers-generator",
      component: <RandomNumbersGenerator/>,
      icon: writingIcon,
      color: "red"
    },
    {
      label: "Random IP Address Generator",
      path: "random-ip-address-generator",
      component: <RandomIPAddressGenerator/>,
      icon: writingIcon,
      color: "red"
    },
    {
      label: "Random Date Generator",
      path: "random-date-generator",
      component: <RandomDateGenerator/>,
      icon: writingIcon,
      color: "red"
    },
    {
      label: "Random UUID Generator",
      path: "random-uuid-generator",
      component: <RandomUUIDGenerator/>,
      icon: writingIcon,
      color: "red"
    },
    {
      label: "Random Address Generator",
      path: "random-address-generator",
      component: <RandomAddressGenerator/>,
      icon: writingIcon,
      color: "red"
    },
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
      icon: writingIcon,
      color: "red"
    },
    {
      label: "String Case Converter",
      path: "string-case-converter",
      component: <StringCaseConverter/>,
      icon: writingIcon,
      color: "red"
    },
    {
      label: "String Reverser",
      path: "string-reverser",
      component: <StringReverser/>,
      icon: writingIcon,
      color: "red"
    },
    {
      label: "String Repeater",
      path: "string-repeater",
      component: <StringRepeater/>,
      icon: writingIcon,
      color: "red"
    },
    {
      label: "Words Sorter",
      path: "words-sorter",
      component: <WordsSorter/>,
      icon: writingIcon,
      color: "red"
    },
    {
      label: "HEXtoString Converter",
      path: "hex-to-string-converter",
      component: <HEXtoStringConverter/>,
      icon: writingIcon,
      color: "red"
    },
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
      icon: writingIcon,
      color: "red"
    },
    {

      label: "Time Zone Converter",
      path: "time-zone-converter",
      component: <TimeZoneConverter/>,
      icon: writingIcon,
      color: "red"
    },
  ]
};

export const allTools: ToolCategory[] = [
  randomToolsCategory,
  stringToolsCategory,
  dateToolsCategory
];
