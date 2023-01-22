import {
  IconAddressBook,
  IconAlignJustified,
  IconArrowLeftCircle,
  IconArrowsShuffle,
  IconArrowsSort,
  IconCalendarEvent,
  IconCalendarStats,
  IconCalendarTime,
  IconCheck,
  IconHandClick,
  IconClipboard,
  IconCode,
  IconError404,
  IconId,
  IconLanguage,
  IconLetterCase,
  IconLetterCaseToggle,
  IconList,
  IconMoonStars,
  IconNumbers,
  IconRepeat,
  IconRuler2,
  IconSearch,
  IconSeparator,
  IconSun,
  IconTransform,
  IconWorld,
  IconWorldLongitude,
  IconWriting
} from "@tabler/icons";

const size = 16;
const sizeBig = 18;
const sizeFullPage = 150;

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
  transform: <IconTransform size={size}/>,
  randomBig : <IconArrowsShuffle size={sizeBig}/>,
  languageBig: <IconLanguage size={sizeBig}/>,
  calendarBig: <IconCalendarEvent size={sizeBig} />
};

export const iconCheck = <IconCheck size={size}/>;
export const iconClipboard = <IconClipboard size={size}/>;
export const iconMoonStars = <IconMoonStars size={size}/>;
export const iconSun = <IconSun size={size}/>;
export const iconSearch = <IconSearch size={size}/>;

export const iconSearchBig = <IconSearch size={sizeBig}/>;

export const pageIconNotFound = <IconError404 size={sizeFullPage} />;
export const pageIconHandClick = <IconHandClick size={sizeFullPage} />;
