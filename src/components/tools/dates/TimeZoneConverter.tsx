import { useEffect, useState } from "react";
import { Button, Group, Mark, Select, SelectItem, Stack, Text } from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import { useInputState } from "@mantine/hooks";
import dayjs from "dayjs";
import * as utcPlugin from "dayjs/plugin/utc";
import * as timezonePlugin from "dayjs/plugin/timezone";
import { flatten, isEmpty } from "lodash";
import ComponentLabel from "../../ComponentLabel";
import { allTimeZones } from "../../../resources/countries";
import { combineDateTime } from "../../../commons/utils.datetime";

const TimeZoneConverter = () => {
  dayjs.extend(utcPlugin);
  dayjs.extend(timezonePlugin);

  const now = new Date();
  const userTimezone = dayjs.tz.guess();
  const utc = "UTC";
  const displayFormat = "YYYY;MM;DD; HH;mm;ss;Z";
  const timezoneDropdownData: SelectItem[] = [
    { value: utc, label: utc },
    ...flatten(Object.entries(allTimeZones).map((i) => {
      const [ continent, timezones ] = i;
      return timezones.map((t) => ({ value: t, label: t, group: continent }));
    }))
  ];

  const getUserTimezone = () => isEmpty(userTimezone) ? utc : userTimezone;

  const [ inputDate, onInputDateChange ] = useInputState(now);
  const [ inputTime, onInputTimeChange ] = useState(now);
  const [ inputTimezone, setInputTimezone ] = useInputState(getUserTimezone());
  const [ outputTimezone, setOutputTimezone ] = useInputState(utc);
  const [ input, setInput ] = useState<string[]>([]);
  const [ output, setOutput ] = useState<string[]>([]);

  const displayDatetime = (tz: string, datetime: string[]) => {
    const [ YYYY, MM, DD, HH, mm, ss, Z ] = datetime;
    return (
      <Text weight={500}>
        <Text span color="pink">{YYYY}</Text>-
        <Text span color="indigo">{MM}</Text>-
        <Text span color="darkgreen">{DD}</Text>
        <Text span color="grape">{HH}</Text>:
        <Text span color="blue">{mm}</Text>:
        <Text span color="orange">{ss}</Text>
        <Text span color="lightgrey">{" UTC Offset "}</Text>
        <Text span color="cyan">{Z}</Text>
      </Text>);
  };

  const setNow = () => {
    const now = new Date();
    onInputDateChange(now);
    onInputTimeChange(now);
    setInputTimezone(getUserTimezone());
  };

  useEffect(() => {
    const formatted = dayjs(combineDateTime(inputDate, inputTime)).format("YYYY-MM-DDTHH:mm:ss");
    const i = dayjs.tz(formatted, inputTimezone);
    const o = i.tz(outputTimezone);
    setInput(i.format(displayFormat).split(";"));
    setOutput(o.format(displayFormat).split(";"));
  }, [ inputDate, inputTime, inputTimezone, outputTimezone ]);

  return (
    <Stack>
      {
        isEmpty(userTimezone) ?
          <Text color="red" weight={700}>Failed to get your timezone</Text> :
          <Text weight={700}>
            {"Your timezone: "}
            <Text span color="blue"><Mark>{userTimezone}</Mark></Text>
          </Text>
      }
      <Group align="end">
        <DatePicker
          label={<ComponentLabel text="Date"/>}
          value={inputDate}
          clearable={false}
          onChange={v => onInputDateChange(v || now)}/>
        <TimeInput
          withSeconds
          label={<ComponentLabel text="Time"/>}
          value={inputTime}
          onChange={onInputTimeChange}/>
        <Select
          style={{ width: 300 }}
          searchable
          clearButtonLabel="Clear selection"
          nothingFound="Nothing found"
          label={<ComponentLabel text="Timezone"/>}
          data={timezoneDropdownData}
          value={inputTimezone}
          onChange={setInputTimezone}/>
        <Button onClick={setNow}>Now</Button>
      </Group>
      {displayDatetime(inputTimezone, input)}
      <Select
        style={{ width: 300 }}
        searchable
        clearButtonLabel="Clear selection"
        nothingFound="Nothing found"
        label={<ComponentLabel text="Output timezone"/>}
        data={timezoneDropdownData}
        value={outputTimezone}
        onChange={setOutputTimezone}/>
      {displayDatetime(outputTimezone, output)}
    </Stack>
  );
};
export default TimeZoneConverter;

