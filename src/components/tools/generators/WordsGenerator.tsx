import { Button, Group, NumberInput, Stack } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import ComponentLabel from "../../ComponentLabel";
import CopyTextArea from "../../CopyTextArea";
import { textAreaDefaultRows } from "../../../app-sx";
import { randomWords } from "../../../commons/utils.random";
import { EMPTY_STRING, MAX_OUTPUT_ITEMS, MIN_OUTPUT_ITEMS, OUTPUT_ITEMS } from "../../../commons/constants";

const WordsGenerator = () => {
  const [ count, setCount ] = useInputState(OUTPUT_ITEMS);
  const [ output, setOutput ] = useInputState(EMPTY_STRING);

  const generateOutput = () => {
    const result = randomWords(count);
    setOutput(result);
  };

  return (
    <Stack>
      <Group align="end" >
        <NumberInput
          label={<ComponentLabel text="How many?"/>}
          value={count}
          min={MIN_OUTPUT_ITEMS}
          max={MAX_OUTPUT_ITEMS}
          onChange={setCount}/>
        <Button onClick={generateOutput}>Generate</Button>
      </Group>
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

export default WordsGenerator;

