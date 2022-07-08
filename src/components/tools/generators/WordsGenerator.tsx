import { useInputState } from "@mantine/hooks";
import { Button, Group, NumberInput, Textarea } from "@mantine/core";
import { defaultMargin, textAreaDefaultRows } from "../../../app-sx";
import { randomWords } from "../../../commons/utils.random";
import { EMPTY_STRING, MAX_OUTPUT_ITEMS, MIN_OUTPUT_ITEMS, OUTPUT_ITEMS } from "../../../commons/constants";
import ClipboardLabel from "../../ClipboardLabel";
import ComponentLabel from "../../ComponentLabel";

const WordsGenerator = () => {
  const [ count, setCount ] = useInputState(OUTPUT_ITEMS);
  const [ output, setOutput ] = useInputState(EMPTY_STRING);

  const generateOutput = () => {
    const result = randomWords(count);
    setOutput(result);
  };

  return (
    <>
      <Group align="end">
        <NumberInput
          label={<ComponentLabel text="How many?"/>}
          value={count}
          min={MIN_OUTPUT_ITEMS}
          max={MAX_OUTPUT_ITEMS}
          onChange={setCount}/>
        <Button onClick={generateOutput}>Generate</Button>
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

export default WordsGenerator;

