import { useEffect, useState } from "react";
import { Button, Group, Mark, Select, SelectItem, Stack, Text } from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import { useInputState } from "@mantine/hooks";
import dayjs from "dayjs";
import Utc from "dayjs/plugin/utc";
import Timezone from "dayjs/plugin/timezone";
import { flatten, isEmpty } from "lodash";
import ComponentLabel from "../../ComponentLabel";
import { ToolProps } from "../../../commons/types";
import { allTimeZones } from "../../../resources/countries";
import { mergeDateTime } from "../../../commons/utils.datetime";
import { colors } from "../../../resources/colors";
import { fontWeight, timezoneSelect } from "../../../app-sx";
import __ from "../../../commons/constants";

const TimeZoneConverter = (props: ToolProps) => {
  dayjs.extend(Utc);
  dayjs.extend(Timezone);

  const now = new Date();
  const userTimezone = dayjs.tz.guess();
  const [ splitFormat, seperator ] = __.formats.splitTimestampWithTimeZone;
  const timezoneDropdownData: SelectItem[] = [
    { value: __.timezoneUtc, label: __.timezoneUtc },
    ...flatten(Object.entries(allTimeZones).map((i) => {
      const [ continent, timezones ] = i;
      return timezones.map((t) => ({ value: t, label: t, group: continent }));
    }))
  ];

  const getUserTimezone = () => isEmpty(userTimezone) ? __.timezoneUtc : userTimezone;

  const [ inputDate, onInputDateChange ] = useInputState(now);
  const [ inputTime, onInputTimeChange ] = useInputState(now);
  const [ inputTimezone, setInputTimezone ] = useInputState(getUserTimezone());
  const [ outputTimezone, setOutputTimezone ] = useInputState<string>(__.timezoneUtc);
  const [ input, setInput ] = useState<string[]>([]);
  const [ output, setOutput ] = useState<string[]>([]);

  const displayDatetime = (tz: string, datetime: string[]) => {
    const [ YYYY, MM, DD, HH, mm, ss, Z ] = datetime;
    return (
      <Text weight={fontWeight.semiBold}>
        <Text span color={colors.pink}>{YYYY}</Text>-
        <Text span color={colors.indigo}>{MM}</Text>-
        <Text span color={colors.darkgreen}>{DD}</Text>
        <Text span color={colors.grape}>{` ${HH}`}</Text>:
        <Text span color={colors.blue}>{mm}</Text>:
        <Text span color={colors.orange}>{ss}</Text>
        <Text span color={colors.lightgrey}>{` ${__.labels.utcOffset} `}</Text>
        <Text span color={colors.cyan}>{Z}</Text>
      </Text>);
  };

  const setNow = () => {
    const now = new Date();
    onInputDateChange(now);
    onInputTimeChange(now);
    setInputTimezone(getUserTimezone());
  };

  useEffect(() => {
    const formatted = mergeDateTime(inputDate, inputTime).format(__.formats.dateTimeConv);
    const i = dayjs.tz(formatted, inputTimezone);
    const o = i.tz(outputTimezone);
    setInput(i.format(splitFormat).split(seperator));
    setOutput(o.format(splitFormat).split(seperator));
  }, [ inputDate, inputTime, inputTimezone, outputTimezone ]);

  return (
    <Stack>
      {
        isEmpty(userTimezone) ?
          <Text color={colors.red} weight={fontWeight.bold}>{__.errmsg.timezoneGet}</Text> :
          <Text weight={fontWeight.bold}>
            {__.labels.yourTimezone}
            <Text span color={colors.blue}><Mark>{userTimezone}</Mark></Text>
          </Text>
      }
      <Group align="end">
        <DatePicker
          label={<ComponentLabel text={__.labels.date}/>}
          value={inputDate}
          clearable={false}
          onChange={v => onInputDateChange(v || now)}/>
        <TimeInput
          withSeconds
          label={<ComponentLabel text={__.labels.time}/>}
          value={inputTime}
          onChange={onInputTimeChange}/>
        <Select
          style={timezoneSelect}
          searchable
          nothingFound={__.labels.nothingFound}
          label={<ComponentLabel text={__.labels.timezone}/>}
          data={timezoneDropdownData}
          value={inputTimezone}
          onChange={setInputTimezone}/>
        <Button onClick={setNow}>{__.labels.now}</Button>
      </Group>
      {displayDatetime(inputTimezone, input)}
      <Select
        style={timezoneSelect}
        searchable
        nothingFound={__.labels.nothingFound}
        label={<ComponentLabel text={__.labels.outputTimezone}/>}
        data={timezoneDropdownData}
        value={outputTimezone}
        onChange={setOutputTimezone}/>
      {displayDatetime(outputTimezone, output)}
    </Stack>
  );
};
export default TimeZoneConverter;

