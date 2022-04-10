import { useInputState } from "@mantine/hooks";
import { Button, Checkbox, Container, Group, NumberInput, Text, Textarea, TextInput } from "@mantine/core";
import { generateRandomStrings } from "../../../utils/string-utils";
import { asInputLabel, defaultMargin, verticalGroupIndent } from "../../../app-sx";

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
    const result = generateRandomStrings(length, upper, lower, numeric, symbols, extras ? pool : "", count);
    setOutput(result);
  };

  return (
    <Container fluid>
      <Text sx={asInputLabel} weight={700}>Character Set</Text>
      <Group direction="column" sx={verticalGroupIndent}>
        <Checkbox checked={upper} label="Uppercase alphabets" onChange={setUpper}/>
        <Checkbox checked={lower} label="Lowercase alphabets" onChange={setLower}/>
        <Checkbox checked={numeric} label="Digits" onChange={setNumeric}/>
        <Checkbox checked={symbols} label="Symbols (!@#$%^&*()[]=)" onChange={setSymbols}/>
        <Group>
          <Checkbox checked={extras} label="Extra characters" onChange={setExtras}/>
          <TextInput placeholder="add more characters" sx={{ width: 300 }} value={pool} onChange={setPool}/>
        </Group>
      </Group>
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
        minRows={20}
        label={<Text weight={700}>Output</Text>}
        value={output}
        onChange={setOutput}/>
    </Container>
  );
};

export default StringsGenerator;
    
