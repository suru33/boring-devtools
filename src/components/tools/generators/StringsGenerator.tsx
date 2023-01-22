import { Button, Checkbox, Group, NumberInput, Stack, TextInput } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import ComponentLabel from "../../ComponentLabel";
import CopyTextArea from "../../CopyTextArea";
import HowMany, { useHowManyInputState } from "../../HowMany";
import { useEmptyStringInputState } from "../../../commons/utils.strings";
import { randomStrings } from "../../../commons/utils.random";
import { ToolProps } from "../../../commons/types";
import { verticalGroupIndent } from "../../../app-sx";
import __ from "../../../commons/constants";

const StringsGenerator = (props: ToolProps) => {
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
    const result = randomStrings(length, upper, lower, numeric, symbols, extras ? pool : __.emptyStr, count);
    setOutput(result);
  };

  return (
    <Stack>
      <ComponentLabel text={__.labels.charset}/>
      <Stack sx={verticalGroupIndent}>
        <Checkbox checked={upper} label={__.labels.charsets.uppercase} onChange={setUpper}/>
        <Checkbox checked={lower} label={__.labels.charsets.lowercase} onChange={setLower}/>
        <Checkbox checked={numeric} label={__.labels.charsets.digits} onChange={setNumeric}/>
        <Checkbox checked={symbols} label={__.labels.charsets.symbols} onChange={setSymbols}/>
        <Group>
          <Checkbox checked={extras} label={__.labels.charsets.extras} onChange={setExtras}/>
          <TextInput placeholder={__.labels.addMoreChars} sx={{ width: 300 }} value={pool} onChange={setPool}/>
        </Group>
      </Stack>
      <Group align="end">
        <NumberInput
          label={<ComponentLabel text={__.labels.length}/>}
          value={length}
          min={1}
          max={100}
          onChange={setLength}/>
        <HowMany value={count} onChange={setCount}/>
        <Button onClick={generateOutput}>{__.labels.generate}</Button>
      </Group>
      <CopyTextArea value={output}/>
    </Stack>
  );
};

export default StringsGenerator;

