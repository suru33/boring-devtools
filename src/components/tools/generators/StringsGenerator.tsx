import { useInputState } from "@mantine/hooks";
import { Button, Checkbox, Group, NumberInput, Stack, Textarea, TextInput } from "@mantine/core";
import { randomStrings } from "../../../utils/random-utils";
import { defaultMargin, textAreaDefaultRows, verticalGroupIndent } from "../../../app-sx";
import { EMPTY_STRING } from "../../../constants";
import ClipboardLabel from "../../ClipboardLabel";
import ComponentLabel from "../../ComponentLabel";

const StringsGenerator = () => {
  const [ upper, setUpper ] = useInputState(true);
  const [ lower, setLower ] = useInputState(true);
  const [ numeric, setNumeric ] = useInputState(true);
  const [ symbols, setSymbols ] = useInputState(false);
  const [ extras, setExtras ] = useInputState(false);
  const [ pool, setPool ] = useInputState(EMPTY_STRING);
  const [ count, setCount ] = useInputState(5);
  const [ length, setLength ] = useInputState(20);
  const [ output, setOutput ] = useInputState(EMPTY_STRING);

  const generateOutput = () => {
    const result = randomStrings(length, upper, lower, numeric, symbols, extras ? pool : EMPTY_STRING, count);
    setOutput(result);
  };

  return (
    <>
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
      <Group sx={defaultMargin} align="end">
        <NumberInput
          label={<ComponentLabel text="Length"/>}
          value={length}
          min={1}
          max={100}
          onChange={setLength}/>
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
        value={output}/>
    </>
  );
};

export default StringsGenerator;

