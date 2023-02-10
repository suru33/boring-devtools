import { useEffect, useState } from "react";
import { Button, Group, Mark, Select, SelectItem, Stack, Text } from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import { useInputState } from "@mantine/hooks";
import dayjs from "dayjs";
import Utc from "dayjs/plugin/utc";
import Timezone from "dayjs/plugin/timezone";
import { flatten, isEmpty } from "lodash";
import { useToolPropsStorage } from "../../../commons/utils.storage";
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
  const [ inputTimezone, setInputTimezone ] = useToolPropsStorage({ tid: props.id, key: "itz", defaultValue: getUserTimezone() });
  const [ outputTimezone, setOutputTimezone ] = useToolPropsStorage({ tid: props.id, key: "otz", defaultValue: __.timezoneUtc });
  const [ input, setInput ] = useState<string[]>([]);
  const [ output, setOutput ] = useState<string[]>([]);

  const displayDatetime = (datetime: string[], cDatetime?: string[]) => {
    const Segment = (p: { ix: number, color: string }) =>
      <Text span color={p.color}>
        {
          cDatetime ?
            cDatetime[p.ix] === datetime[p.ix] ? <>{datetime[p.ix]}</> : <Mark>{datetime[p.ix]}</Mark>
            : <>{datetime[p.ix]}</>
        }
      </Text>;
    return (
      <Text weight={fontWeight.medium}>
        <Segment ix={0} color={colors.pink}/>-<Segment ix={1} color={colors.indigo}/>-
        <Segment ix={2} color={colors.darkgreen}/> <Segment ix={3} color={colors.grape}/>:
        <Segment ix={4} color={colors.blue}/>:<Segment ix={5} color={colors.orange}/>
        <></> <Text span color={colors.gray}>{__.labels.utcOffset}</Text> <Segment ix={6} color={colors.cyan}/>
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
          <Text weight={fontWeight.extraBold}>
            {__.labels.yourTimezone}
            <Text span color={colors.blue}>{userTimezone}</Text>
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
          onChange={v => setInputTimezone(v || getUserTimezone)}/>
        <Button onClick={setNow}>{__.labels.now}</Button>
      </Group>
      {displayDatetime(input)}
      <Select
        style={timezoneSelect}
        searchable
        nothingFound={__.labels.nothingFound}
        label={<ComponentLabel text={__.labels.outputTimezone}/>}
        data={timezoneDropdownData}
        value={outputTimezone}
        onChange={v => setOutputTimezone(v || __.timezoneUtc)}/>
      {displayDatetime(output, input)}
    </Stack>
  );
};
export default TimeZoneConverter;

