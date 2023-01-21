import { ReactNode, useEffect, useState } from "react";
import { Group, Stack, Text } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { DatePicker, TimeInput } from "@mantine/dates";
import dayjs from "dayjs";
import * as duration from "dayjs/plugin/duration";
import ComponentLabel from "../../ComponentLabel";
import { combineDateTime } from "../../../commons/utils.datetime";

const DateDifferenceCalculator = () => {
  dayjs.extend(duration);

  const ERROR_MESSAGE = "* start date and time should be < end date time";
  const START_DATE = dayjs().hour(0).minute(0).second(0).toDate();
  const START_TIME = dayjs().hour(0).minute(0).second(0).toDate();
  const END_DATE = dayjs(START_DATE).add(10, "days").toDate();
  const END_TIME = dayjs().hour(23).minute(59).second(59).toDate();

  const [ startDate, onStartDateChange ] = useInputState(START_DATE);
  const [ startTime, onStartTimeChange ] = useState(START_TIME);
  const [ endDate, onEndDateChange ] = useState(END_DATE);
  const [ endTime, onEndTimeChange ] = useState(END_TIME);
  const [ output, setOutput ] = useState<ReactNode>(<></>);

  useEffect(() => {
    const flag = combineDateTime(startDate, startTime) > combineDateTime(endDate, endTime);
    if (flag) {
      setOutput(<Text color="red" weight={700}>{ERROR_MESSAGE}</Text>);
    } else {
      const d1 = dayjs(combineDateTime(startDate, startTime));
      const d2 = dayjs(combineDateTime(endDate, endTime));
      const diff = dayjs.duration(d2.diff(d1, "seconds"), "seconds");
      const years = parseInt(diff.format("Y"));
      const months = parseInt(diff.format("M"));
      const days = parseInt(diff.format("D"));
      const hours = parseInt(diff.format("H"));
      const minutes = parseInt(diff.format("m"));
      const seconds = parseInt(diff.format("s"));
      const suffix = (n: number, s: string) => n === 1 ? ` ${s} ` : ` ${s}s `;
      const comp =
                <Text weight={500}>
                  <ComponentLabel text={"The difference is:"}/>
                  <Text span color="blue">{years}</Text>{suffix(years, "Year")}
                  <Text span color="blue">{months}</Text>{suffix(months, "Month")}
                  <Text span color="blue">{days}</Text>{suffix(days, "Day")}
                  <Text span color="blue">{hours}</Text>{suffix(hours, "Hour")}
                  <Text span color="blue">{minutes}</Text>{suffix(minutes, "Minute")}
                  <Text span color="blue">{seconds}</Text>{suffix(seconds, "Second")}
                </Text>;
      setOutput(comp);
    }
  }, [ startDate, startTime, endDate, endTime ]);

  return (
    <Stack>
      <Group align="end">
        <DatePicker
          label={<ComponentLabel text="Start date & time"/>}
          amountOfMonths={2}
          value={startDate}
          clearable={false}
          onChange={v => onStartDateChange(v || START_DATE)}/>
        <TimeInput withSeconds value={startTime} onChange={onStartTimeChange}/>
      </Group>
      <Group align="end">
        <DatePicker
          label={<ComponentLabel text="End date & time"/>}
          amountOfMonths={2}
          value={endDate}
          clearable={false}
          onChange={v => onEndDateChange(v || END_DATE)}/>
        <TimeInput withSeconds value={endTime} onChange={onEndTimeChange}/>
      </Group>
      {output}
    </Stack>
  );
};
export default DateDifferenceCalculator;

