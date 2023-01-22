import { ReactNode, useEffect, useState } from "react";
import { Button, Group, Stack, Text } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { DatePicker, TimeInput } from "@mantine/dates";
import dayjs from "dayjs";
import Duration from "dayjs/plugin/duration";
import ComponentLabel from "../../ComponentLabel";
import { ToolProps } from "../../../commons/types";
import { datetimeRangeFromNow, mergeDateTime, setNowCallback } from "../../../commons/utils.datetime";
import { colors } from "../../../resources/colors";
import { fontWeight } from "../../../app-sx";
import __ from "../../../commons/constants";

const DateDifferenceCalculator = (props: ToolProps) => {
  dayjs.extend(Duration);

  const [ sd, st, ed, et ] = datetimeRangeFromNow();
  const suffix = (n: number, i: number) =>
    n === 1 ? ` ${__.labels.timestampSuffixes[i]} ` : ` ${__.labels.timestampSuffixes[i]}s `;

  const [ startDate, onStartDateChange ] = useInputState(sd);
  const [ startTime, onStartTimeChange ] = useInputState(st);
  const [ endDate, onEndDateChange ] = useInputState(ed);
  const [ endTime, onEndTimeChange ] = useInputState(et);
  const [ output, setOutput ] = useState<ReactNode>(<></>);

  useEffect(() => {
    const d1 = mergeDateTime(startDate, startTime);
    const d2 = mergeDateTime(endDate, endTime);
    if (d1.isAfter(d2, "seconds")) {
      setOutput(<Text color={colors.red} weight={fontWeight.bold}>{__.errmsg.dateRange}</Text>);
    } else {
      const [ fmt, seperator ] = __.formats.splitTimestamp;
      const diff = dayjs.duration(d2.diff(d1, "seconds"), "seconds")
        .format(fmt)
        .split(seperator)
        .map(s => parseInt(s));
      setOutput(
        <Text weight={fontWeight.semiBold}>
          <ComponentLabel text={__.labels.differenceIs}/>
          {
            diff.map((v, i) =>
              <Text span key={i} color={colors.blue}>
                {v}
                <Text span color={colors.gray}>{suffix(v, i)}</Text>
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
          label={<ComponentLabel text={__.labels.endDateTime}/>}
          value={startDate}
          clearable={false}
          onChange={v => onStartDateChange(v || sd)}/>
        <TimeInput withSeconds value={startTime} onChange={onStartTimeChange}/>
        <Button onClick={() => setNowCallback(onStartDateChange, onStartTimeChange)}>{__.labels.now}</Button>
      </Group>
      <Group align="end">
        <DatePicker
          label={<ComponentLabel text={__.labels.endDateTime}/>}
          value={endDate}
          clearable={false}
          onChange={v => onEndDateChange(v || ed)}/>
        <TimeInput withSeconds value={endTime} onChange={onEndTimeChange}/>
        <Button onClick={() => setNowCallback(onEndDateChange, onEndTimeChange)}>{__.labels.now}</Button>
      </Group>
      {output}
    </Stack>
  );
};
export default DateDifferenceCalculator;

