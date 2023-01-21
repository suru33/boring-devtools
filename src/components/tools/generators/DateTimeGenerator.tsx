import { useEffect, useState } from "react";
import { Button, Grid, Group, NumberInput, Select, Stack, Text } from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import { useInputState } from "@mantine/hooks";
import dayjs from "dayjs";
import ComponentLabel from "../../ComponentLabel";
import CopyTextArea from "../../CopyTextArea";
import { textAreaDefaultRows } from "../../../app-sx";
import { randomDates } from "../../../commons/utils.random";
import { combineDateTime } from "../../../commons/utils.datetime";
import { EMPTY_STRING, MAX_OUTPUT_ITEMS, MIN_OUTPUT_ITEMS, OUTPUT_ITEMS } from "../../../commons/constants";

const DateTimeGenerator = () => {
  const ERROR_MESSAGE = "* start date and time should be < end date time";
  const START_DATE = dayjs().hour(0).minute(0).second(0).toDate();
  const START_TIME = dayjs().hour(0).minute(0).second(0).toDate();
  const END_DATE = dayjs().add(10, "days").toDate();
  const END_TIME = dayjs().hour(23).minute(59).second(59).toDate();
  const DEFAULT_FORMAT = "YYYY-MM-DD HH:mm";
  const FORMATS = [
    { value: DEFAULT_FORMAT, label: "2020-12-20 13:45" },
    { value: "YYYY-MM-DD hh:mm A", label: "2020-12-20 01:45 PM" },
    { value: "DD/MM/YYYY HH:mm", label: "20/12/2020 13:45" },
    { value: "DD/MM/YYYY hh:mm A", label: "20/12/2020 01:45 PM" },
    { value: "MM-DD-YYYY HH:mm", label: "12-20-2020 13:45" },
    { value: "MM-DD-YYYY hh:mm A", label: "12-20-2020 01:45 PM" },
    { value: "YYYY-MM-DD", label: "2020-12-20" },
    { value: "DD-MM-YYYY", label: "20-12-2020" },
    { value: "DD/MM/YYYY", label: "20/12/2020" },
    { value: "MM-DD-YYYY", label: "12-20-2020" },
    { value: "MMM D, YYYY", label: "Dec 2, 2020" },
    { value: "UNIX_MILLIS", label: "Unix Timestamp (milliseconds)" },
    { value: "UNIX", label: "Unix Timestamp" },
    { value: "ISO_8601", label: "ISO 8601 (2019-01-25T02:00:00.000Z)" }
  ];

  const [ startDate, onStartDateChange ] = useInputState(START_DATE);
  const [ startTime, onStartTimeChange ] = useState(START_TIME);
  const [ endDate, onEndDateChange ] = useState(END_DATE);
  const [ endTime, onEndTimeChange ] = useState(END_TIME);
  const [ count, setCount ] = useInputState(OUTPUT_ITEMS);
  const [ errorFlag, setErrorFlag ] = useState(false);
  const [ output, setOutput ] = useState(EMPTY_STRING);
  const [ generateDisabled, setGenerateDisabled ] = useInputState(false);
  const [ format, setFormat ] = useState(DEFAULT_FORMAT);

  useEffect(() => {
    const flag = combineDateTime(startDate, startTime) > combineDateTime(endDate, endTime);
    setGenerateDisabled(flag);
    setErrorFlag(flag);
  }, [ startDate, startTime, endDate, endTime ]);

  const generateOutput = () => {
    setOutput(randomDates(combineDateTime(startDate, startTime), combineDateTime(endDate, endTime), count, format));
  };

  return (
    <Stack>
      <Group align="end">
        <DatePicker
          label={<ComponentLabel text="Start date & time"/>}
          amountOfMonths={2}
          value={startDate}
          error={errorFlag}
          clearable={false}
          onChange={v => onStartDateChange(v || START_DATE)}/>
        <TimeInput value={startTime} error={errorFlag} onChange={onStartTimeChange}/>
        <Text color="red" size="sm">{errorFlag ? ERROR_MESSAGE : EMPTY_STRING}</Text>
        <DatePicker
          label={<ComponentLabel text="End date & time"/>}
          amountOfMonths={2}
          value={endDate}
          clearable={false}
          onChange={v => onEndDateChange(v || END_DATE)}/>
        <TimeInput value={endTime} onChange={onEndTimeChange}/>
      </Group>
      <Grid align="end">
        <Grid.Col span={3}>
          <Select
            data={FORMATS}
            label={<ComponentLabel text="Format"/>}
            value={format}
            onChange={v => setFormat(v || DEFAULT_FORMAT)}/>
        </Grid.Col>
        <Grid.Col span={2}>
          <NumberInput
            label={<ComponentLabel text="How many?"/>}
            value={count}
            min={MIN_OUTPUT_ITEMS}
            max={MAX_OUTPUT_ITEMS}
            onChange={setCount}/>
        </Grid.Col>
        <Grid.Col span={1}>
          <Button onClick={generateOutput} disabled={generateDisabled}>Generate</Button>
        </Grid.Col>
      </Grid>
      <CopyTextArea
        readOnly
        spellCheck="false"
        minRows={textAreaDefaultRows}
        variant="filled"
        label={<ComponentLabel text="Output"/>}
        value={output}/>
    </Stack>
  );
};

export default DateTimeGenerator;

