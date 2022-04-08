import { ReactNode } from "react";
import { MantineColor } from "@mantine/styles/lib/theme/types/MantineColor";
import { Writing } from "tabler-icons-react";
import StringsGenerator from "./generators/StringsGenerator";
import WordsGenerator from "./generators/WordsGenerator";
import SentencesGenerator from "./generators/SentencesGenerator";
import ParagraphGenerator from "./generators/ParagraphGenerator";
import NumbersGenerator from "./generators/NumbersGenerator";
import IPAddressGenerator from "./generators/IPAddressGenerator";
import DateGenerator from "./generators/DateGenerator";
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
  label: "Random Generators",
  path: "random-generators",
  tools: [
    {
      label: "Strings Generator",
      path: "strings-generator",
      component: <StringsGenerator/>,
      icon: writingIcon,
      color: "red"
    },
    {
      label: "Words Generator",
      path: "words-generator",
      component: <WordsGenerator/>,
      icon: writingIcon,
      color: "red"
    },
    {
      label: "Sentence Generator",
      path: "sentence-generator",
      component: <SentencesGenerator/>,
      icon: writingIcon,
      color: "red"
    },
    {
      label: "Paragraph Generator",
      path: "paragraph-generator",
      component: <ParagraphGenerator/>,
      icon: writingIcon,
      color: "red"
    },
    {
      label: "Numbers Generator",
      path: "random-numbers-generator",
      component: <NumbersGenerator/>,
      icon: writingIcon,
      color: "red"
    },
    {
      label: "IP Address Generator",
      path: "ip-address-generator",
      component: <IPAddressGenerator/>,
      icon: writingIcon,
      color: "red"
    },
    {
      label: "Date Generator",
      path: "date-generator",
      component: <DateGenerator/>,
      icon: writingIcon,
      color: "red"
    },
    {
      label: "UUID Generator",
      path: "uuid-generator",
      component: <UUIDGenerator/>,
      icon: writingIcon,
      color: "red"
    },
    {
      label: "Address Generator",
      path: "address-generator",
      component: <AddressGenerator/>,
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
