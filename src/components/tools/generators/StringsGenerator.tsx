import { Button, Checkbox, Group, NumberInput, Stack, TextInput } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import ComponentLabel from "../../ComponentLabel";
import CopyTextArea from "../../CopyTextArea";
import HowMany, { useHowManyInputState } from "../../HowMany";
import { useEmptyStringInputState } from "../../../commons/utils.strings";
import { randomStrings } from "../../../commons/utils.random";
import { textAreaDefaultRows, verticalGroupIndent } from "../../../app-sx";
import { EMPTY_STRING } from "../../../commons/constants";

const StringsGenerator = () => {
  const [ upper, setUpper ] = useInputState(true);
  const [ lower, setLower ] = useInputState(true);
  const [ numeric, setNumeric ] = useInputState(true);
  const [ symbols, setSymbols ] = useInputState(false);
  const [ extras, setExtras ] = useInputState(false);
  const [ pool, setPool ] = useEmptyStringInputState();
  const [ count, setCount ] = useHowManyInputState();
  const [ length, setLength ] = useInputState(20);
  const [ output, setOutput ] = useEmptyStringInputState();

  const generateOutput = () => {
    const result = randomStrings(length, upper, lower, numeric, symbols, extras ? pool : EMPTY_STRING, count);
    setOutput(result);
  };

  return (
    <Stack>
      <ComponentLabel text="Character Set"/>
      <Stack sx={verticalGroupIndent}>
        <Checkbox checked={upper} label="Uppercase alphabets" onChange={setUpper}/>
        <Checkbox checked={lower} label="Lowercase alphabets" onChange={setLower}/>
        <Checkbox checked={numeric} label="Digits" onChange={setNumeric}/>
        <Checkbox checked={symbols} label="Symbols (!@#$%^&*()[]=)" onChange={setSymbols}/>
        <Group>
          <Checkbox checked={extras} label="Extra characters" onChange={setExtras}/>
          <TextInput placeholder="add more characters" sx={{ width: 300 }} value={pool} onChange={setPool}/>
        </Group>
      </Stack>
      <Group align="end">
        <NumberInput
          label={<ComponentLabel text="Length"/>}
          value={length}
          min={1}
          max={100}
          onChange={setLength}/>
        <HowMany value={count} onChange={setCount} />
        <Button onClick={generateOutput}>Generate</Button>
      </Group>
      <CopyTextArea
        readOnly
        spellCheck="false"
        minRows={textAreaDefaultRows}
        variant="filled"
        label={<ComponentLabel text="Output" />}
        value={output} />
    </Stack>
  );
};

export default StringsGenerator;

