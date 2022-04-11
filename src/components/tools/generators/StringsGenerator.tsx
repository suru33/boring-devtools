import { useInputState } from "@mantine/hooks";
import { Button, Checkbox, Group, NumberInput, Stack, Text, Textarea, TextInput } from "@mantine/core";
import { randomStrings } from "../../../utils/random-utils";
import { asInputLabel, defaultMargin, textAreaDefaultRows, verticalGroupIndent } from "../../../app-sx";

const StringsGenerator = () => {
  const [ upper, setUpper ] = useInputState(true);
  const [ lower, setLower ] = useInputState(true);
  const [ numeric, setNumeric ] = useInputState(true);
  const [ symbols, setSymbols ] = useInputState(false);
  const [ extras, setExtras ] = useInputState(false);
  const [ pool, setPool ] = useInputState("");
  const [ count, setCount ] = useInputState(5);
  const [ length, setLength ] = useInputState(20);
  const [ output, setOutput ] = useInputState("");

  const generateOutput = () => {
    const result = randomStrings(length, upper, lower, numeric, symbols, extras ? pool : "", count);
    setOutput(result);
  };

  return (
    <>
      <Text sx={asInputLabel} weight={700}>Character Set</Text>
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
          label={<Text weight={700}>Length</Text>}
          value={length}
          min={1}
          max={100}
          onChange={setLength}/>
        <NumberInput
          label={<Text weight={700}>Count</Text>}
          value={count}
          min={1}
          max={20}
          onChange={setCount}/>
        <Button onClick={() => generateOutput()}>Generate</Button>
      </Group>
      <Textarea
        spellCheck="false"
        sx={defaultMargin}
        minRows={textAreaDefaultRows}
        variant="filled"
        label={<Text weight={700}>Output</Text>}
        value={output}
        onChange={setOutput}>
      </Textarea>
    </>
  );
};

export default StringsGenerator;
    
