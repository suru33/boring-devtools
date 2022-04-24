import { useInputState } from "@mantine/hooks";
import { EMPTY_STRING } from "../../../constants";
import { randomParagraphs } from "../../../utils/random-utils";
import { Button, Group, NumberInput, Text, Textarea } from "@mantine/core";
import { defaultMargin, textAreaDefaultRows } from "../../../app-sx";
import ClipboardLabel from "../../ClipboardLabel";

const ParagraphGenerator = () => {

  const [ count, setCount ] = useInputState(5);
  const [ output, setOutput ] = useInputState(EMPTY_STRING);

  const generateOutput = () => {
    const result = randomParagraphs(count);
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
        readOnly
        spellCheck="false"
        sx={defaultMargin}
        minRows={textAreaDefaultRows}
        variant="filled"
        label={<ClipboardLabel label="Output" clipboardData={output}/>}
        value={output}/>
    </>
  );
};

export default ParagraphGenerator;
    
