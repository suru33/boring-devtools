import { IPv } from "../../../commons/types";
import { useInputState } from "@mantine/hooks";
import { EMPTY_STRING, MAX_OUTPUT_ITEMS, MIN_OUTPUT_ITEMS, OUTPUT_ITEMS } from "../../../commons/constants";
import { randomIPs } from "../../../commons/utils.random";
import { Button, Group, NumberInput, Radio, Stack } from "@mantine/core";
import { textAreaDefaultRowsBig } from "../../../app-sx";
import ComponentLabel from "../../ComponentLabel";
import CopyTextArea from "../../CopyTextArea";

const IPAddressGenerator = () => {

  const [ version, setVersion ] = useInputState("v4");
  const [ count, setCount ] = useInputState(OUTPUT_ITEMS);
  const [ output, setOutput ] = useInputState(EMPTY_STRING);

  const generateOutput = () => {
    const result = randomIPs(version as IPv, count);
    setOutput(result);
  };

  return (
    <Stack>
      <Radio.Group
        label={<ComponentLabel text="IP version?"/>}
        onChange={setVersion}
        value={version}>
        <Radio value="v4" label="IPv4"/>
        <Radio value="v6" label="IPv6"/>
      </Radio.Group>
      <Group align="end">
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
        minRows={textAreaDefaultRowsBig}
        variant="filled"
        label={<ComponentLabel text="Output"/>}
        value={output}/>
    </Stack>
  );
};

export default IPAddressGenerator;
