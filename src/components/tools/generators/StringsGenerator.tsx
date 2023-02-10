import { Button, Checkbox, Group, NumberInput, Stack, TextInput } from "@mantine/core";
import ComponentLabel from "../../ComponentLabel";
import CopyTextArea from "../../CopyTextArea";
import HowMany from "../../HowMany";
import { useEmptyStringInputState } from "../../../commons/utils.strings";
import {
  useToolPropEmptyStringStorage,
  useToolPropHowManyStorage,
  useToolPropsStorage
} from "../../../commons/utils.storage";
import { randomStrings } from "../../../commons/utils.random";
import { ToolProps } from "../../../commons/types";
import { numVals, verticalGroupIndent } from "../../../app-sx";
import __ from "../../../commons/constants";

const StringsGenerator = (props: ToolProps) => {
  const defaultLength = 20;
  const [ upper, setUpper ] = useToolPropsStorage({ tid: props.id, key: "upper", defaultValue: true });
  const [ lower, setLower ] = useToolPropsStorage({ tid: props.id, key: "lower", defaultValue: true });
  const [ numeric, setNumeric ] = useToolPropsStorage({ tid: props.id, key: "numeric", defaultValue: true });
  const [ symbols, setSymbols ] = useToolPropsStorage({ tid: props.id, key: "symbols", defaultValue: false });
  const [ extras, setExtras ] = useToolPropsStorage({ tid: props.id, key: "extras", defaultValue: false });
  const [ pool, setPool ] = useToolPropEmptyStringStorage({ tid: props.id, key: "pool" });
  const [ count, setCount ] = useToolPropHowManyStorage({ tid: props.id });
  const [ length, setLength ] = useToolPropsStorage({ tid: props.id, key: __.sk.length, defaultValue: defaultLength });
  const [ output, setOutput ] = useEmptyStringInputState();

  const generateOutput = () => {
    const result = randomStrings(length, upper, lower, numeric, symbols, extras ? pool : __.emptyStr, count);
    setOutput(result);
  };

  return (
    <Stack>
      <ComponentLabel text={__.labels.charset}/>
      <Stack sx={verticalGroupIndent}>
        <Checkbox
          checked={upper}
          label={__.labels.charsets.uppercase}
          onChange={e => setUpper(e.currentTarget.checked)}/>
        <Checkbox
          checked={lower}
          label={__.labels.charsets.lowercase}
          onChange={e => setLower(e.currentTarget.checked)}/>
        <Checkbox
          checked={numeric}
          label={__.labels.charsets.digits}
          onChange={e => setNumeric(e.currentTarget.checked)}/>
        <Checkbox
          checked={symbols}
          label={__.labels.charsets.symbols}
          onChange={e => setSymbols(e.currentTarget.checked)}/>
        <Group>
          <Checkbox
            checked={extras}
            label={__.labels.charsets.extras}
            onChange={e => setExtras(e.currentTarget.checked)}/>
          <TextInput
            placeholder={__.labels.addMoreChars}
            sx={{ width: 300 }}
            value={pool}
            onChange={e => setPool(e.currentTarget.value)}/>
        </Group>
      </Stack>
      <Group align="end">
        <NumberInput
          label={<ComponentLabel text={__.labels.length}/>}
          value={length}
          min={1}
          max={100}
          onChange={v => setLength(v || defaultLength)}/>
        <HowMany value={count} onChange={v => setCount(v || numVals.defaultOutputItems)}/>
        <Button onClick={generateOutput}>{__.labels.generate}</Button>
      </Group>
      <CopyTextArea value={output}/>
    </Stack>
  );
};

export default StringsGenerator;

