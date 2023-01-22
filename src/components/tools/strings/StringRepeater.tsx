import { NumberInput, SimpleGrid, Stack } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { repeat } from "lodash";
import ComponentLabel from "../../ComponentLabel";
import CopyTextArea from "../../CopyTextArea";
import InputTextArea from "../../InputTextArea";
import { ToolProps } from "../../../commons/types";
import { useEmptyStringInputState } from "../../../commons/utils.strings";
import __ from "../../../commons/constants";

const StringRepeater = (props: ToolProps) => {
  const [ times, setTimes ] = useInputState(3);
  const [ input, setInput ] = useEmptyStringInputState();
  const [ output, setOutput ] = useEmptyStringInputState();

  const updateOutput = (s: string, n: number) => {
    setOutput(repeat(s, n));
  };

  const onTimesChanged = (n: number) => {
    setTimes(n);
    updateOutput(input, n);
  };

  const onInputChanged = (value: string) => {
    setInput(value);
    updateOutput(value, times);
  };

  return (
    <Stack align="flex-start">
      <NumberInput
        label={<ComponentLabel text={__.labels.howManyTimesQ}/>}
        value={times}
        min={1}
        max={50}
        onChange={onTimesChanged}/>
      <SimpleGrid cols={2} sx={{ width: "100%" }}>
        <InputTextArea value={input} onChange={e => onInputChanged(e.target.value)}/>
        <CopyTextArea value={output}/>
      </SimpleGrid>
    </Stack>
  );
};

export default StringRepeater;
