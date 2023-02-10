import { useEffect } from "react";
import { Button, Checkbox, Group, NumberInput, Select, Stack } from "@mantine/core";
import { range } from "lodash";
import ComponentLabel from "../../ComponentLabel";
import CopyTextArea from "../../CopyTextArea";
import HowMany from "../../HowMany";
import { useEmptyStringInputState } from "../../../commons/utils.strings";
import { ToolProps } from "../../../commons/types";
import { randomNumbers } from "../../../commons/utils.random";
import { useToolPropHowManyStorage, useToolPropsStorage } from "../../../commons/utils.storage";
import { numVals } from "../../../app-sx";
import __ from "../../../commons/constants";

const NumbersGenerator = (props: ToolProps) => {
  const defaultMin = 0;
  const defaultMax = 1000;
  const defaultPrecision = "2";
  const [ min, setMin ] = useToolPropsStorage({ tid: props.id, key: __.sk.min, defaultValue: defaultMin });
  const [ max, setMax ] = useToolPropsStorage({ tid: props.id, key: __.sk.max, defaultValue: defaultMax });
  const [ count, setCount ] = useToolPropHowManyStorage({ tid: props.id });
  const [ floatValue, setFloatValue ] = useToolPropsStorage({ tid: props.id, key: "float", defaultValue: false });
  const [ output, setOutput ] = useEmptyStringInputState();
  const [ precision, setPrecision ] = useToolPropsStorage({ tid: props.id, key: "precision", defaultValue: defaultPrecision });
  const [ minError, setMinError ] = useEmptyStringInputState();

  const precisionSelectValues =
    range(1, 15).map(i => ({ value: i.toString(), label: i.toString() }));

  useEffect(() => {
    setMinError(min > max ? __.errmsg.lessThanMax : __.emptyStr);
  }, [ min, max ]);

  const generateOutput = () => {
    setOutput(randomNumbers(min, max, floatValue, count, parseInt(precision)));
  };

  return (
    <Stack>
      <Group align="initial">
        <NumberInput
          label={<ComponentLabel text={__.labels.min}/>}
          value={min}
          error={minError}
          min={Number.MIN_SAFE_INTEGER}
          max={Number.MAX_SAFE_INTEGER}
          precision={floatValue ? parseInt(precision) : 0}
          step={1}
          onChange={v => setMin(v || defaultMin)}/>
        <NumberInput
          label={<ComponentLabel text={__.labels.max}/>}
          value={max}
          min={Number.MIN_SAFE_INTEGER}
          max={Number.MAX_SAFE_INTEGER}
          precision={floatValue ? parseInt(precision) : 0}
          step={1}
          onChange={v => setMax(v || defaultMax)}/>
        {
          floatValue &&
            <Select
              label={<ComponentLabel text={__.labels.precision}/>}
              data={precisionSelectValues}
              value={precision}
              onChange={v => setPrecision(v || defaultPrecision)}/>
        }
        <HowMany value={count} onChange={v => setCount(v|| numVals.defaultOutputItems)}/>
      </Group>
      <Group align="center">
        <Checkbox
          checked={floatValue}
          label={__.labels.floatValues}
          onChange={e => setFloatValue(e.target.checked)}/>
        <Button onClick={generateOutput} disabled={minError !== __.emptyStr}>{__.labels.generate}</Button>
      </Group>
      <CopyTextArea value={output}/>
    </Stack>
  );
};
export default NumbersGenerator;

