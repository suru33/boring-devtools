import { Button, Checkbox, Group, NumberInput, Text, Textarea, TextInput } from "@mantine/core";
import { useState } from "react";
import { generateRandomStrings } from "../../../utils/string-utils";

const StringsGenerator = () => {
  const [ upper, setUpper ] = useState(true);
  const [ lower, setLower ] = useState(true);
  const [ numeric, setNumeric ] = useState(true);
  const [ symbols, setSymbols ] = useState(false);
  const [ extras, setExtras ] = useState(false);
  const [ pool, setPool ] = useState("");
  const [ count, setCount ] = useState(1);
  const [ length, setLength ] = useState(20);
  const [ output, setOutput ] = useState("");

  const generateOutput = (_: any) => {
    const result = generateRandomStrings(length, upper, lower, numeric, symbols, extras ? pool : "", count);
    setOutput(result);
  };

  return (
    <div>
      <Text size={"lg"} weight={700}>Character Set:</Text>
      <Group direction="column" style={{ marginLeft: 25, marginTop: 15 }}>
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
          label="Symbols (!@#$%^&*()[])"
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
      <Group style={{ marginTop: 15 }}>
        <Text weight={700}>Length:</Text>
        <NumberInput value={length} min={1} max={100} onChange={(val) => setLength(val)}/>
        <Text weight={700}>Count: </Text>
        <NumberInput value={count} min={1} max={20} onChange={(val) => setCount(val)}/>
        <Button onClick={generateOutput}>Generate</Button>
      </Group>
      <Textarea
        style={{ marginTop: 15 }}
        minRows={20}
        label="Output"
        value={output}
        onChange={(e) => setOutput(e.currentTarget.value)}/>
    </div>
  );
};

export default StringsGenerator;
    
