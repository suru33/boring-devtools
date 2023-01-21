import {
  IconAddressBook,
  IconAlignJustified,
  IconArrowLeftCircle,
  IconArrowsSort,
  IconCalendarStats,
  IconCalendarTime,
  IconCheck,
  IconClipboard,
  IconCode,
  IconId,
  IconLetterCase,
  IconLetterCaseToggle,
  IconList,
  IconMoonStars,
  IconNumbers,
  IconRepeat,
  IconRuler2,
  IconSeparator,
  IconSun,
  IconTransform,
  IconWorld,
  IconWorldLongitude,
  IconWriting
} from "@tabler/icons";

const size = 16;

export const navbarIcons = {
  string: <IconLetterCase size={size}/>,
  words: <IconList size={size}/>,
  sentence: <IconSeparator size={size}/>,
  writing: <IconWriting size={size}/>,
  paragraph: <IconAlignJustified size={size}/>,
  numbers: <IconNumbers size={size}/>,
  ip: <IconWorld size={size}/>,
  dateTime: <IconCalendarTime size={size}/>,
  uuid: <IconId size={size}/>,
  address: <IconAddressBook size={size}/>,
  length: <IconRuler2 size={size}/>,
  caseConvert: <IconLetterCaseToggle size={size}/>,
  reverse: <IconArrowLeftCircle size={size}/>,
  repeat: <IconRepeat size={size}/>,
  sort: <IconArrowsSort size={size}/>,
  code: <IconCode size={size}/>,
  dateDifference: <IconCalendarStats size={size}/>,
  timeZone: <IconWorldLongitude size={size}/>,
  transform: <IconTransform size={size}/>
};

export const iconCheck = <IconCheck size={size}/>;
export const iconClipboard = <IconClipboard size={size}/>;

export const iconMoonStars = <IconMoonStars size={size}/>;
export const iconSun = <IconSun size={size}/>;
