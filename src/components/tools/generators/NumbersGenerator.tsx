import { useEffect, useState } from "react";
import { Button, Checkbox, Group, NumberInput, Select, Stack } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { range } from "lodash";
import ComponentLabel from "../../ComponentLabel";
import CopyTextArea from "../../CopyTextArea";
import HowMany, { useHowManyInputState } from "../../HowMany";
import { useEmptyStringInputState } from "../../../commons/utils.strings";
import { ToolProps } from "../../../commons/types";
import { randomNumbers } from "../../../commons/utils.random";
import __ from "../../../commons/constants";

const NumbersGenerator = (props: ToolProps) => {
  const [ min, setMin ] = useInputState(0);
  const [ max, setMax ] = useInputState(1000);
  const [ count, setCount ] = useHowManyInputState();
  const [ floatValue, setFloatValue ] = useState(false);
  const [ output, setOutput ] = useEmptyStringInputState();
  const [ precision, setPrecision ] = useInputState("2");
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
          onChange={setMin}/>
        <NumberInput
          label={<ComponentLabel text={__.labels.max}/>}
          value={max}
          min={Number.MIN_SAFE_INTEGER}
          max={Number.MAX_SAFE_INTEGER}
          precision={floatValue ? parseInt(precision) : 0}
          step={1}
          onChange={setMax}/>
        {
          floatValue &&
            <Select
              label={<ComponentLabel text={__.labels.precision}/>}
              data={precisionSelectValues}
              value={precision}
              onChange={setPrecision}/>
        }
        <HowMany value={count} onChange={setCount}/>
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

