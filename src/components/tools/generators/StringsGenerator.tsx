import { Button, Checkbox, Group, NumberInput, Text, Textarea, TextInput } from "@mantine/core";
import { useState } from "react";
import { generateRandomStrings } from "../../../utils/string-utils";
import { asInputLabel, defaultMargin, verticalGroupIndent } from "../../../app-sx";

const StringsGenerator = () => {
  const defaultCount = 5;
  const defaultLength = 20;
  const [ upper, setUpper ] = useState(true);
  const [ lower, setLower ] = useState(true);
  const [ numeric, setNumeric ] = useState(true);
  const [ symbols, setSymbols ] = useState(false);
  const [ extras, setExtras ] = useState(false);
  const [ pool, setPool ] = useState("");
  const [ count, setCount ] = useState<number | undefined>(defaultCount);
  const [ length, setLength ] = useState<number | undefined>(defaultLength);
  const [ output, setOutput ] = useState("");

  const generateOutput = () => {
    const result = generateRandomStrings(length || defaultLength, upper, lower, numeric, symbols, extras ? pool : "", count || defaultCount);
    setOutput(result);
  };

  return (
    <div>
      <Text sx={asInputLabel} weight={700}>Character Set</Text>
      <Group direction="column" sx={verticalGroupIndent}>
        <Checkbox
          checked={upper}
          label="Uppercase alphabets"
          onChange={(e) => setUpper(e.currentTarget.checked)}/>
        <Checkbox
          checked={lower}
          label="Lowercase alphabets"
          onChange={(e) => setLower(e.currentTarget.checked)}/>
        <Checkbox
          checked={numeric}
          label="Digits"
          onChange={(e) => setNumeric(e.currentTarget.checked)}/>
        <Checkbox
          checked={symbols}
          label="Symbols (!@#$%^&*()[]=)"
          onChange={(e) => setSymbols(e.currentTarget.checked)}/>
        <Group>
          <Checkbox
            checked={extras}
            label="Extra characters"
            onChange={(e) => setExtras(e.currentTarget.checked)}/>
          <TextInput
            placeholder="add more characters"
            style={{ width: 300 }}
            value={pool}
            onChange={(e) => setPool(e.currentTarget.value)}/>
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
        <Button
          onClick={() => generateOutput()}>
          Generate
        </Button>
      </Group>
      <Textarea
        spellCheck="false"
        sx={defaultMargin}
        minRows={20}
        label={<Text weight={700}>Output</Text>}
        value={output}
        onChange={(e) => setOutput(e.currentTarget.value)}/>
    </div>
  );
};

export default StringsGenerator;
    
