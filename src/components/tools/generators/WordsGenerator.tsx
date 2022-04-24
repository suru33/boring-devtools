import { useInputState } from "@mantine/hooks";
import { Button, Group, NumberInput, Text, Textarea } from "@mantine/core";
import { defaultMargin, textAreaDefaultRows } from "../../../app-sx";
import { randomWords } from "../../../utils/random-utils";
import { EMPTY_STRING } from "../../../constants";

const WordsGenerator = () => {
  const [ count, setCount ] = useInputState(5);
  const [ output, setOutput ] = useInputState(EMPTY_STRING);

  const generateOutput = () => {
    const result = randomWords(count);
    setOutput(result);
  };

  return (
    <>
      <Group align="end">
        <NumberInput
          label={<Text weight={700}>Count</Text>}
          value={count}
          min={1}
          max={20}
          onChange={setCount}/>
        <Button onClick={() => generateOutput()}>Generate</Button>
      </Group>
      <Textarea
        spellCheck="false"
        sx={defaultMargin}
        minRows={textAreaDefaultRows}
        variant="filled"
        label={<Text weight={700}>Output</Text>}
        value={output}
        onChange={setOutput}>
      </Textarea>
    </>
  );
};

export default WordsGenerator;
    
