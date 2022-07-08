import { defaultMargin, textAreaDefaultRowsBig } from "../../../app-sx";
import { Group, NumberInput, SimpleGrid, Textarea } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { EMPTY_STRING } from "../../../commons/constants";
import { repeat } from "../../../commons/utils.strings";
import ClipboardLabel from "../../ClipboardLabel";
import ComponentLabel from "../../ComponentLabel";

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
    <>
      <Group sx={defaultMargin} align="end">
        <NumberInput
          label={<ComponentLabel text="How many times?"/>}
          value={times}
          min={1}
          max={50}
          onChange={onTimesChanged}/>
      </Group>
      <SimpleGrid sx={defaultMargin} cols={2}>
        <Textarea
          spellCheck="false"
          minRows={textAreaDefaultRowsBig}
          label={<ComponentLabel text="Input"/>}
          value={input}
          onChange={e => onInputChanged(e.target.value)}/>
        <Textarea
          readOnly
          spellCheck="false"
          minRows={textAreaDefaultRowsBig}
          variant="filled"
          label={<ClipboardLabel title="Output" clipboardData={output}/>}
          value={output}/>
      </SimpleGrid>
    </>
  );
};

export default StringRepeater;
