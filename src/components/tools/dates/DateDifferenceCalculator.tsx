import { ReactNode, useEffect, useState } from "react";
import { Button, Group, Stack, Text } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { DatePicker, TimeInput } from "@mantine/dates";
import dayjs from "dayjs";
import * as durationPlugin from "dayjs/plugin/duration";
import ComponentLabel from "../../ComponentLabel";
import { combineDateTime } from "../../../commons/utils.datetime";

const DateDifferenceCalculator = () => {
  dayjs.extend(durationPlugin);

  const ERROR_MESSAGE = "* start date and time should be < end date time";
  const START_DATE = dayjs().hour(0).minute(0).second(0).toDate();
  const START_TIME = dayjs().hour(0).minute(0).second(0).toDate();
  const END_DATE = dayjs(START_DATE).add(10, "days").toDate();
  const END_TIME = dayjs().hour(23).minute(59).second(59).toDate();

  const suffixes= [ "Year", "Month", "Day", "Hour", "Minute", "Second" ];
  const suffix = (n: number, i: number) => n === 1 ? ` ${suffixes[i]} ` : ` ${suffixes[i]}s `;

  const [ startDate, onStartDateChange ] = useInputState(START_DATE);
  const [ startTime, onStartTimeChange ] = useState(START_TIME);
  const [ endDate, onEndDateChange ] = useState(END_DATE);
  const [ endTime, onEndTimeChange ] = useState(END_TIME);
  const [ output, setOutput ] = useState<ReactNode>(<></>);

  const setNow = (dateFn: (_:Date) => void, timeFn: (_:Date) => void) => {
    const now = new Date();
    dateFn(now);
    timeFn(now);
  };

  useEffect(() => {
    const flag = combineDateTime(startDate, startTime) > combineDateTime(endDate, endTime);
    if (flag) {
      setOutput(<Text color="red" weight={700}>{ERROR_MESSAGE}</Text>);
    } else {
      const d1 = dayjs(combineDateTime(startDate, startTime));
      const d2 = dayjs(combineDateTime(endDate, endTime));
      const diff = dayjs.duration(d2.diff(d1, "seconds"), "seconds")
        .format("Y;M;D;H;m;s")
        .split(";")
        .map(s => parseInt(s));
      setOutput(
        <Text weight={500}>
          <ComponentLabel text={"The difference is:"}/>
          {
            diff.map((v, i) =>
              <Text span key={i} color="blue">
                {v}
                <Text span color="grey">{suffix(v, i)}</Text>
              </Text>
            )
          }
        </Text>
      );
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
        <Button onClick={() => setNow(onStartDateChange, onStartTimeChange)}>Now</Button>
      </Group>
      <Group align="end">
        <DatePicker
          label={<ComponentLabel text="End date & time"/>}
          amountOfMonths={2}
          value={endDate}
          clearable={false}
          onChange={v => onEndDateChange(v || END_DATE)}/>
        <TimeInput withSeconds value={endTime} onChange={onEndTimeChange}/>
        <Button onClick={() => setNow(onEndDateChange, onEndTimeChange)}>Now</Button>
      </Group>
      {output}
    </Stack>
  );
};
export default DateDifferenceCalculator;

