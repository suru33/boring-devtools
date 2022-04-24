import { IPv } from "../../../types";
import { useInputState } from "@mantine/hooks";
import { EMPTY_STRING } from "../../../constants";
import { randomIPs } from "../../../utils/random-utils";
import { Button, Group, NumberInput, Radio, RadioGroup, Text, Textarea } from "@mantine/core";
import { defaultMargin, textAreaDefaultRows } from "../../../app-sx";
import ClipboardLabel from "../../ClipboardLabel";

const IPAddressGenerator = () => {

  const [ version, setVersion ] = useInputState("v4");
  const [ count, setCount ] = useInputState(5);
  const [ output, setOutput ] = useInputState(EMPTY_STRING);

  const generateOutput = () => {
    const result = randomIPs(version as IPv, count);
    setOutput(result);
  };

  return (
    <>
      <RadioGroup
        label={<Text weight={700}>Select IP version</Text>}
        onChange={setVersion}
        value={version}>
        <Radio value="v4" label="IPv4"/>
        <Radio value="v6" label="IPv6"/>
      </RadioGroup>

      <Group align="end" sx={defaultMargin}>
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

export default IPAddressGenerator;
