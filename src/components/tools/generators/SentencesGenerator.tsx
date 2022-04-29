import { useInputState } from "@mantine/hooks";
import { EMPTY_STRING } from "../../../constants";
import { randomSentences } from "../../../utils/random-utils";
import { Button, Group, NumberInput, Textarea } from "@mantine/core";
import { defaultMargin, textAreaDefaultRows } from "../../../app-sx";
import ClipboardLabel from "../../ClipboardLabel";
import ComponentLabel from "../../ComponentLabel";

const SentencesGenerator = () => {

  const [ count, setCount ] = useInputState(5);
  const [ output, setOutput ] = useInputState(EMPTY_STRING);

  const generateOutput = () => {
    const result = randomSentences(count);
    setOutput(result);
  };

  return (
    <>
      <Group align="end">
        <NumberInput
          label={<ComponentLabel text="How many?"/>}
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
        label={<ClipboardLabel title="Output" clipboardData={output}/>}
        value={output} />
    </>
  );
};

export default SentencesGenerator;

