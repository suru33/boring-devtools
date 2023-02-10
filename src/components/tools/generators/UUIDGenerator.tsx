import { Button, Group, Stack } from "@mantine/core";
import CopyTextArea from "../../CopyTextArea";
import HowMany from "../../HowMany";
import { useEmptyStringInputState } from "../../../commons/utils.strings";
import { ToolProps } from "../../../commons/types";
import { randomUUIDs } from "../../../commons/utils.random";
import { useToolPropHowManyStorage } from "../../../commons/utils.storage";
import { numVals } from "../../../app-sx";
import __ from "../../../commons/constants";

const UUIDGenerator = (props: ToolProps) => {
  const [ count, setCount ] = useToolPropHowManyStorage({ tid: props.id });
  const [ output, setOutput ] = useEmptyStringInputState();

  return (
    <Stack>
      <Group align="end">
        <HowMany value={count} onChange={v => setCount(v || numVals.defaultOutputItems)}/>
        <Button onClick={() => setOutput(randomUUIDs(count))}>{__.labels.generate}</Button>
      </Group>
      <CopyTextArea value={output}/>
    </Stack>
  );
};

export default UUIDGenerator;

