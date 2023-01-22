import { Button, Group, Stack } from "@mantine/core";
import CopyTextArea from "../../CopyTextArea";
import HowMany, { useHowManyInputState } from "../../HowMany";
import { useEmptyStringInputState } from "../../../commons/utils.strings";
import { ToolProps } from "../../../commons/types";
import { randomUUIDs } from "../../../commons/utils.random";
import __ from "../../../commons/constants";

const UUIDGenerator = (props: ToolProps) => {
  const [ count, setCount ] = useHowManyInputState();
  const [ output, setOutput ] = useEmptyStringInputState();

  return (
    <Stack>
      <Group align="end">
        <HowMany value={count} onChange={setCount}/>
        <Button onClick={() => setOutput(randomUUIDs(count))}>{__.labels.generate}</Button>
      </Group>
      <CopyTextArea value={output}/>
    </Stack>
  );
};

export default UUIDGenerator;

