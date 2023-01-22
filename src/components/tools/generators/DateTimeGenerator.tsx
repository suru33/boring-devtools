import { useEffect, useState } from "react";
import { Button, Group, Select, Stack, Text } from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import { useInputState } from "@mantine/hooks";
import ComponentLabel from "../../ComponentLabel";
import CopyTextArea from "../../CopyTextArea";
import HowMany, { useHowManyInputState } from "../../HowMany";
import { useEmptyStringInputState } from "../../../commons/utils.strings";
import { ToolProps } from "../../../commons/types";
import { randomDates } from "../../../commons/utils.random";
import { datetimeRangeFromNow, mergeDateTime, setNowCallback } from "../../../commons/utils.datetime";
import { colors } from "../../../resources/colors";
import __ from "../../../commons/constants";

const DateTimeGenerator = (props: ToolProps) => {
  const [ sd, st, ed, et ] = datetimeRangeFromNow();
  const formatsSelectData = [
    { value: __.formats.dateTimeWithOutSeconds, label: "2020-12-20 13:45" },
    { value: "YYYY-MM-DD hh:mm A", label: "2020-12-20 01:45 PM" },
    { value: "DD/MM/YYYY HH:mm", label: "20/12/2020 13:45" },
    { value: "DD/MM/YYYY hh:mm A", label: "20/12/2020 01:45 PM" },
    { value: "MM-DD-YYYY HH:mm", label: "12-20-2020 13:45" },
    { value: "MM-DD-YYYY hh:mm A", label: "12-20-2020 01:45 PM" },
    { value: "YYYY-MM-DD", label: "2020-12-20" },
    { value: "DD-MM-YYYY", label: "20-12-2020" },
    { value: "DD/MM/YYYY", label: "20/12/2020" },
    { value: "MM-DD-YYYY", label: "12-20-2020" },
    { value: "MMM D, YYYY", label: "Dec 2, 2020", description: "tes" },
    { value: "UNIX_MILLIS", label: "Unix Timestamp (milliseconds)" },
    { value: "UNIX", label: "Unix Timestamp" },
    { value: "ISO_8601", label: "ISO 8601 (2019-01-25T02:00:00.000Z)" }
  ];

  const [ startDate, onStartDateChange ] = useInputState(sd);
  const [ startTime, onStartTimeChange ] = useState(st);
  const [ endDate, onEndDateChange ] = useState(ed);
  const [ endTime, onEndTimeChange ] = useState(et);
  const [ errorFlag, setErrorFlag ] = useState(false);
  const [ count, setCount ] = useHowManyInputState();
  const [ output, setOutput ] = useEmptyStringInputState();
  const [ generateDisabled, setGenerateDisabled ] = useInputState(false);
  const [ format, setFormat ] = useState<string>(__.formats.dateTimeWithOutSeconds);

  useEffect(() => {
    const flag = mergeDateTime(startDate, startTime).isAfter(mergeDateTime(endDate, endTime));
    setGenerateDisabled(flag);
    setErrorFlag(flag);
  }, [ startDate, startTime, endDate, endTime ]);

  const generateOutput = () => {
    setOutput(randomDates(
      mergeDateTime(startDate, startTime).toDate(),
      mergeDateTime(endDate, endTime).toDate(),
      count,
      format
    ));
  };

  return (
    <Stack>
      <Group align="end">
        <DatePicker
          label={<ComponentLabel text={__.labels.startDate}/>}
          value={startDate}
          error={errorFlag}
          clearable={false}
          onChange={v => onStartDateChange(v || sd)}/>
        <TimeInput
          withSeconds
          label={<ComponentLabel text={__.labels.time}/>}
          value={startTime}
          error={errorFlag}
          onChange={onStartTimeChange}/>
        <Button onClick={() => setNowCallback(onStartDateChange, onStartTimeChange)}>{__.labels.now}</Button>
      </Group>
      {errorFlag && <Text color={colors.red} size="sm">{__.errmsg.dateRange}</Text>}
      <Group align="end">
        <DatePicker
          label={<ComponentLabel text={__.labels.endDate}/>}
          value={endDate}
          clearable={false}
          onChange={v => onEndDateChange(v || ed)}/>
        <TimeInput
          withSeconds
          label={<ComponentLabel text={__.labels.time}/>}
          value={endTime}
          onChange={onEndTimeChange}/>
        <Button onClick={() => setNowCallback(onEndDateChange, onEndTimeChange)}>{__.labels.now}</Button>
      </Group>
      <Group align="end">
        <Select
          data={formatsSelectData}
          label={<ComponentLabel text={__.labels.format}/>}
          style={{ width: 330 }}
          value={format}
          onChange={v => setFormat(v || __.formats.dateTimeWithOutSeconds)}/>
        <HowMany value={count} onChange={setCount}/>
        <Button onClick={generateOutput} disabled={generateDisabled}>{__.labels.generate}</Button>
      </Group>
      <CopyTextArea value={output}/>
    </Stack>
  );
};

export default DateTimeGenerator;

