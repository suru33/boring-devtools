import { ChangeEvent } from "react";
import { defaultMargin, textAreaDefaultRowsBig } from "../../../app-sx";
import { Group, NumberInput, SimpleGrid, Text, Textarea } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { EMPTY_STRING } from "../../../constants";
import { repeat } from "../../../utils/string-utils";
import ClipboardLabel from "../../ClipboardLabel";

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

  const onInputChanged = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const s = e.target.value;
    setInput(s);
    updateOutput(s, times);
  };

  return(
    <>
      <Group sx={defaultMargin} align="end">
        <NumberInput
          label={<Text weight={700}>How many times?</Text>}
          value={times}
          min={1}
          max={50}
          onChange={onTimesChanged}/>
      </Group>
      <SimpleGrid sx={defaultMargin} cols={2}>
        <Textarea
          spellCheck="false"
          minRows={textAreaDefaultRowsBig}
          label={<Text weight={700}>Input</Text>}
          value={input}
          onChange={onInputChanged}/>
        <Textarea
          readOnly
          spellCheck="false"
          minRows={textAreaDefaultRowsBig}
          variant="filled"
          label={<ClipboardLabel label="Output" clipboardData={output}/>}
          value={output}/>
      </SimpleGrid>
    </>
  );
};

export default StringRepeater;
    
