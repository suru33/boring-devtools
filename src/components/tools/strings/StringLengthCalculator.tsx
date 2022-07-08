import { Checkbox, Text, Textarea } from "@mantine/core";
import { defaultMargin, textAreaDefaultRows } from "../../../app-sx";
import { useInputState } from "@mantine/hooks";
import { EMPTY_STRING } from "../../../commons/constants";
import ComponentLabel from "../../ComponentLabel";

const StringLengthCalculator = () => {
  const [ input, setInput ] = useInputState(EMPTY_STRING);
  const [ length, setLength ] = useInputState(0);
  const [ strip, setStrip ] = useInputState(true);

  const onTextChange = (value: string) => {
    setInput(value);
    setLength(strip ? value.trim().length : value.length);
  };

  return (
    <>
      <Textarea
        spellCheck="false"
        minRows={textAreaDefaultRows}
        label={<ComponentLabel text="Input"/>}
        value={input}
        onChange={e => onTextChange(e.target.value)}>
      </Textarea>
      <Checkbox sx={defaultMargin} checked={strip} label="Strip" onChange={setStrip}/>
      <Text weight={700} sx={defaultMargin}>Length: <Text color="blue" inherit component="span">{length}</Text></Text>
    </>
  );
};

export default StringLengthCalculator;
