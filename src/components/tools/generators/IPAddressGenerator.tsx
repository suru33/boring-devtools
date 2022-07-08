import { IPv } from "../../../types";
import { useInputState } from "@mantine/hooks";
import { EMPTY_STRING, MAX_OUTPUT_ITEMS, MIN_OUTPUT_ITEMS, OUTPUT_ITEMS } from "../../../commons/constants";
import { randomIPs } from "../../../commons/utils.random";
import { Button, Group, NumberInput, Radio, RadioGroup, Textarea } from "@mantine/core";
import { defaultMargin, textAreaDefaultRows } from "../../../app-sx";
import ClipboardLabel from "../../ClipboardLabel";
import ComponentLabel from "../../ComponentLabel";

const IPAddressGenerator = () => {

  const [ version, setVersion ] = useInputState("v4");
  const [ count, setCount ] = useInputState(OUTPUT_ITEMS);
  const [ output, setOutput ] = useInputState(EMPTY_STRING);

  const generateOutput = () => {
    const result = randomIPs(version as IPv, count);
    setOutput(result);
  };

  return (
    <>
      <RadioGroup
        label={<ComponentLabel text="IP version?"/>}
        onChange={setVersion}
        value={version}>
        <Radio value="v4" label="IPv4"/>
        <Radio value="v6" label="IPv6"/>
      </RadioGroup>

      <Group align="end" sx={defaultMargin}>
        <NumberInput
          label={<ComponentLabel text="How many?"/>}
          value={count}
          min={MIN_OUTPUT_ITEMS}
          max={MAX_OUTPUT_ITEMS}
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
        value={output}/>
    </>
  );
};

export default IPAddressGenerator;
