import { ReactNode, useEffect, useState } from "react";
import { Button, Group, Space, Stack, Table, Text } from "@mantine/core";
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

  const DateSegment = (props: { value: number, name: string }) =>
    <Text span color={colors.blue}>
      {props.value}
      <Text span color={colors.gray}>{props.name}</Text>
    </Text>;

  useEffect(() => {
    const d1 = mergeDateTime(startDate, startTime);
    const d2 = mergeDateTime(endDate, endTime);
    if (d1.isAfter(d2, "seconds")) {
      setOutput(<Text color={colors.red} weight={fontWeight.bold}>{__.errmsg.dateRange}</Text>);
    } else {
      const [ fmt, separator ] = __.formats.splitTimestamp;
      const totalSeconds = d2.diff(d1, "seconds");
      const byUnit = [
        d2.diff(d1, "years"),
        d2.diff(d1, "months"),
        d2.diff(d1, "days"),
        d2.diff(d1, "hours"),
        d2.diff(d1, "minutes"),
        totalSeconds
      ];
      console.log(dayjs.duration(d2.diff(d1)));
      const diff = dayjs.duration(d2.diff(d1))
        .format(fmt)
        .split(separator)
        .map(s => parseInt(s));
      setOutput(
        <Text weight={fontWeight.medium}>
          <ComponentLabel text={__.labels.differenceIs}/>
          <Space h="sm"/>
          { diff.map((v, ix) => <DateSegment key={ix} value={v} name={suffix(v, ix)}/>) }
          <Space h="xl"/>
          <ComponentLabel text={"By Chrono Unit"}/>
          <Space h="sm"/>
          <Table
            sx={{ width: "400px" }}
            withBorder
            withColumnBorders
            striped
            verticalSpacing="sm">
            <thead>
              <tr>
                <th>Total</th>
                <th>Unit</th>
              </tr>
            </thead>
            <tbody>
              {
                byUnit.map((v, ix) =>
                  <tr key={ix}>
                    <td>{v}</td>
                    <td>{suffix(v, ix)}</td>
                  </tr>
                )
              }
            </tbody>
          </Table>
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

