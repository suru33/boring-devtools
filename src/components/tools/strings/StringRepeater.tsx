import { defaultMargin, textAreaDefaultRowsBig } from "../../../app-sx";
import { Group, NumberInput, SimpleGrid, Stack, Textarea } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { EMPTY_STRING } from "../../../commons/constants";
import { repeat } from "../../../commons/utils.strings";
import ComponentLabel from "../../ComponentLabel";
import CopyTextArea from "../../CopyTextArea";

const StringRepeater = () => {
  const [ times, setTimes ] = useInputState(3);
  const [ input, setInput ] = useInputState(EMPTY_STRING);
  const [ output, setOutput ] = useInputState(EMPTY_STRING);

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
    <Stack>
      <Group sx={defaultMargin} align="end">
        <NumberInput
          label={<ComponentLabel text="How many times?"/>}
          value={times}
          min={1}
          max={50}
          onChange={onTimesChanged}/>
      </Group>
      <SimpleGrid cols={2}>
        <Textarea
          spellCheck="false"
          minRows={textAreaDefaultRowsBig}
          label={<ComponentLabel text="Input"/>}
          value={input}
          onChange={e => onInputChanged(e.target.value)}/>
        <CopyTextArea
          readOnly
          spellCheck="false"
          minRows={textAreaDefaultRowsBig}
          variant="filled"
          label={<ComponentLabel text="Output"/>}
          value={output}/>
      </SimpleGrid>
    </Stack>
  );
};

export default StringRepeater;
