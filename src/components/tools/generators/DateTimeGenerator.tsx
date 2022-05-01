import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Button, Group, NumberInput, Select, Text, Textarea } from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import { useInputState } from "@mantine/hooks";
import ComponentLabel from "../../ComponentLabel";
import ClipboardLabel from "../../ClipboardLabel";
import { defaultMargin, textAreaDefaultRows } from "../../../app-sx";
import { EMPTY_STRING } from "../../../constants";
import { randomDates } from "../../../utils/random-utils";

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
    { value: "MMM D, YYYY", label: "Dec 2, 2020" }
  ];

  const [ startDate, onStartDateChange ] = useState(START_DATE);
  const [ startTime, onStartTimeChange ] = useState(START_TIME);
  const [ endDate, onEndDateChange ] = useState(END_DATE);
  const [ endTime, onEndTimeChange ] = useState(END_TIME);
  const [ count, setCount ] = useInputState(5);
  const [ errorFlag, setErrorFlag ] = useState(false);
  const [ output, setOutput ] = useState(EMPTY_STRING);
  const [ generateDisabled, setGenerateDisabled ] = useInputState(false);
  const [ format, setFormat ] = useState(DEFAULT_FORMAT);

  const combineDateTime = (date: Date, time: Date): Date =>
    dayjs(date).hour(time.getHours()).minute(time.getMinutes()).toDate();

  useEffect(() => {
    const flag = combineDateTime(startDate, startTime) > combineDateTime(endDate, endTime);
    setGenerateDisabled(flag);
    setErrorFlag(flag);
  }, [ startDate, startTime, endDate, endTime ]);

  const generateOutput = () => {
    setOutput(randomDates(combineDateTime(startDate, startTime), combineDateTime(endDate, endTime), count, format));
  };

  return (
    <>
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
      </Group>
      <Group align="end" sx={defaultMargin}>
        <DatePicker
          label={<ComponentLabel text="End date & time"/>}
          amountOfMonths={2}
          value={endDate}
          clearable={false}
          onChange={v => onEndDateChange(v || END_DATE)}/>
        <TimeInput value={endTime} onChange={onEndTimeChange}/>
      </Group>
      <Group sx={defaultMargin} align="end">
        <Select
          data={FORMATS}
          label={<ComponentLabel text="Format"/>}
          value={format}
          onChange={v => setFormat(v || DEFAULT_FORMAT)}/>
        <NumberInput
          label={<ComponentLabel text="How many?"/>}
          value={count}
          min={1}
          max={25}
          onChange={setCount}/>
        <Button onClick={() => generateOutput()} disabled={generateDisabled}>Generate</Button>
      </Group>
      <Textarea
        readOnly
        spellCheck="false"
        sx={defaultMargin}
        minRows={textAreaDefaultRows}
        variant="filled"
        label={<ClipboardLabel title="Output" clipboardData={output}/>}
        value={output}/>
    </>
  );
};

export default DateTimeGenerator;

