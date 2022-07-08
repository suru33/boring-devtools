import { useEffect, useState } from "react";
import { Button, Checkbox, Group, NumberInput, Select, Textarea } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import ComponentLabel from "../../ComponentLabel";
import { defaultMargin, textAreaDefaultRows } from "../../../app-sx";
import { randomNumbers } from "../../../commons/utils.random";
import { EMPTY_STRING, MAX_OUTPUT_ITEMS, MIN_OUTPUT_ITEMS, OUTPUT_ITEMS } from "../../../commons/constants";
import ClipboardLabel from "../../ClipboardLabel";
import { range } from "../../../commons/utils.numbers";

const NumbersGenerator = () => {
  const [ min, setMin ] = useInputState(0);
  const [ max, setMax ] = useInputState(1000);
  const [ count, setCount ] = useInputState(OUTPUT_ITEMS);
  const [ floatValue, setFloatValue ] = useState(false);
  const [ output, setOutput ] = useState(EMPTY_STRING);
  const [ precision, setPrecision ] = useInputState("2");
  const [ minError, setMinError ] = useState(EMPTY_STRING);
  const [ generateDisabled, setGenerateDisabled ] = useInputState(false);

  const PRECISIONS = range(1, 15).map(i => ({ value: i.toString(), label: i.toString() }));

  useEffect(() => {
    if (min >= max) {
      setMinError("should be < max");
      setGenerateDisabled(true);
    } else {
      setMinError(EMPTY_STRING);
      setGenerateDisabled(false);
    }
  }, [ min, max ]);

  const generateOutput = () => {
    setOutput(randomNumbers(min, max, floatValue, count, parseInt(precision)));
  };

  return (
    <>
      <Group align="initial">
        <NumberInput
          label={<ComponentLabel text="Min"/>}
          value={min}
          error={minError}
          min={Number.MIN_SAFE_INTEGER}
          max={Number.MAX_SAFE_INTEGER}
          precision={floatValue ? parseInt(precision) : 0}
          step={1}
          onChange={setMin}/>
        <NumberInput
          label={<ComponentLabel text="Max"/>}
          value={max}
          min={Number.MIN_SAFE_INTEGER}
          max={Number.MAX_SAFE_INTEGER}
          precision={floatValue ? parseInt(precision) : 0}
          step={1}
          onChange={setMax}/>
        <Select
          label={<ComponentLabel text="Precision"/>}
          data={PRECISIONS}
          value={precision}
          disabled={!floatValue}
          onChange={setPrecision}/>
        <NumberInput
          label={<ComponentLabel text="How many?"/>}
          value={count}
          min={MIN_OUTPUT_ITEMS}
          max={MAX_OUTPUT_ITEMS}
          onChange={setCount}/>
      </Group>
      <Group sx={defaultMargin} align="center">
        <Checkbox checked={floatValue} label="Float values" onChange={e => setFloatValue(e.target.checked)}/>
        <Button onClick={generateOutput} disabled={generateDisabled}>Generate</Button>
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
export default NumbersGenerator;

