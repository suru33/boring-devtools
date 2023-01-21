import { Button, Group, Stack } from "@mantine/core";
import ComponentLabel from "../../ComponentLabel";
import CopyTextArea from "../../CopyTextArea";
import HowMany, { useHowManyInputState } from "../../HowMany";
import { useEmptyStringInputState } from "../../../commons/utils.strings";
import { randomUUIDs } from "../../../commons/utils.random";
import { textAreaDefaultRows } from "../../../app-sx";

const UUIDGenerator = () => {

  const [ count, setCount ] = useHowManyInputState();
  const [ output, setOutput ] = useEmptyStringInputState();

  const generateOutput = () => {
    const result = randomUUIDs(count);
    setOutput(result);
  };

  return (
    <Stack>
      <Group align="end">
        <HowMany value={count} onChange={setCount} />
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

export default UUIDGenerator;

