import { ComponentPropsWithoutRef, forwardRef, useEffect, useState } from "react";
import { Button, Group, Select, Stack, Text } from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import { useInputState } from "@mantine/hooks";
import ComponentLabel from "../../ComponentLabel";
import CopyTextArea from "../../CopyTextArea";
import HowMany from "../../HowMany";
import { useEmptyStringInputState } from "../../../commons/utils.strings";
import { ToolProps } from "../../../commons/types";
import { randomDates } from "../../../commons/utils.random";
import { datetimeRangeFromNow, mergeDateTime, setNowCallback } from "../../../commons/utils.datetime";
import { colors } from "../../../resources/colors";
import { useToolPropHowManyStorage, useToolPropsStorage } from "../../../commons/utils.storage";
import { numVals } from "../../../app-sx";
import __ from "../../../commons/constants";

const DateTimeGenerator = (props: ToolProps) => {
  const [ sd, st, ed, et ] = datetimeRangeFromNow();

  interface DateFormatSelectItemProps extends ComponentPropsWithoutRef<"div"> {
    label: string;
    value: string;
    description: string;
  }

  const defaultFormat = __.formats.dateTimeWithOutSeconds;

  const dateFormatsSelectData: DateFormatSelectItemProps[] = [
    { label: defaultFormat, value: defaultFormat, description: "2020-12-20 13:45" },
    { label: "YYYY-MM-DD hh:mm A", value: "YYYY-MM-DD hh:mm A", description: "2020-12-20 01:45 PM" },
    { label: "DD/MM/YYYY HH:mm", value: "DD/MM/YYYY HH:mm", description: "20/12/2020 13:45" },
    { label: "DD/MM/YYYY hh:mm A", value: "DD/MM/YYYY hh:mm A", description: "20/12/2020 01:45 PM" },
    { label: "MM-DD-YYYY HH:mm", value: "MM-DD-YYYY HH:mm", description: "12-20-2020 13:45" },
    { label: "MM-DD-YYYY hh:mm A", value: "MM-DD-YYYY hh:mm A", description: "12-20-2020 01:45 PM" },
    { label: "YYYY-MM-DD", value: "YYYY-MM-DD", description: "2020-12-20" },
    { label: "DD-MM-YYYY", value: "DD-MM-YYYY", description: "20-12-2020" },
    { label: "DD/MM/YYYY", value: "DD/MM/YYYY", description: "20/12/2020" },
    { label: "MM-DD-YYYY", value: "MM-DD-YYYY", description: "12-20-2020" },
    { label: "MMM D, YYYY", value: "MMM D, YYYY", description: "Dec 2, 2020" },
    { label: "Unix Timestamp (milliseconds)", value: "UNIX_MILLIS", description: "1674606313347" },
    { label: "Unix Timestamp", value: "UNIX", description: "1674540375" },
    { label: "ISO 8601", value: "ISO_8601", description: "2019-01-25T02:00:00.000Z" }
  ];

  const DateFormatSelectItem = forwardRef<HTMLDivElement, DateFormatSelectItemProps>(
    ({ label, description, ...others }: DateFormatSelectItemProps, ref) =>
      <div ref={ref} {...others}>
        <Group noWrap>
          <div>
            <Text size="sm">{label}</Text>
            <Text size="xs" opacity={0.65}>{description}</Text>
          </div>
        </Group>
      </div>
  );

  DateFormatSelectItem.displayName = DateFormatSelectItem.name;

  const [ startDate, onStartDateChange ] = useInputState(sd);
  const [ startTime, onStartTimeChange ] = useState(st);
  const [ endDate, onEndDateChange ] = useState(ed);
  const [ endTime, onEndTimeChange ] = useState(et);
  const [ errorFlag, setErrorFlag ] = useState(false);
  const [ count, setCount ] = useToolPropHowManyStorage({ tid: props.id });
  const [ output, setOutput ] = useEmptyStringInputState();
  const [ generateDisabled, setGenerateDisabled ] = useInputState(false);
  const [ format, setFormat ] = useToolPropsStorage({ tid: props.id, key: "format", defaultValue: defaultFormat });

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
          itemComponent={DateFormatSelectItem}
          data={dateFormatsSelectData}
          label={<ComponentLabel text={__.labels.format}/>}
          style={{ width: 330 }}
          value={format}
          onChange={v => setFormat(v || defaultFormat)}/>
        <HowMany value={count} onChange={v => setCount(v || numVals.defaultOutputItems)}/>
        <Button onClick={generateOutput} disabled={generateDisabled}>{__.labels.generate}</Button>
      </Group>
      <CopyTextArea value={output}/>
    </Stack>
  );
};

export default DateTimeGenerator;

