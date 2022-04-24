import {
  AddressBook,
  AlignJustified,
  ArrowLeftCircle,
  ArrowsSort,
  CalendarStats,
  CalendarTime,
  Clipboard,
  Code,
  Id,
  LetterCase,
  LetterCaseToggle,
  List,
  Numbers,
  Repeat,
  Ruler2,
  Separator,
  World,
  WorldLongitude,
  Writing
} from "tabler-icons-react";

const navbarIconSize = 16;

export const navbarIcons = {
  string: <LetterCase size={navbarIconSize}/>,
  words: <List size={navbarIconSize}/>,
  sentence: <Separator size={navbarIconSize}/>,
  writing: <Writing size={navbarIconSize}/>,
  paragraph: <AlignJustified size={navbarIconSize}/>,
  numbers: <Numbers size={navbarIconSize}/>,
  ip: <World size={navbarIconSize}/>,
  dateTime: <CalendarTime size={navbarIconSize}/>,
  uuid: <Id size={navbarIconSize}/>,
  address: <AddressBook size={navbarIconSize}/>,
  length: <Ruler2 size={navbarIconSize}/>,
  caseConvert: <LetterCaseToggle size={navbarIconSize}/>,
  reverse: <ArrowLeftCircle size={navbarIconSize}/>,
  repeat: <Repeat size={navbarIconSize}/>,
  sort: <ArrowsSort size={navbarIconSize}/>,
  code: <Code size={navbarIconSize}/>,
  dateDifference: <CalendarStats size={navbarIconSize}/>,
  timeZone: <WorldLongitude size={navbarIconSize}/>,
};

export const clipboardIcon = <Clipboard size={16}/>;

