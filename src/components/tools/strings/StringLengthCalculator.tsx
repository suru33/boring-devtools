import { ChangeEvent } from "react";
import { Checkbox, Text, Textarea } from "@mantine/core";
import { defaultMargin, textAreaDefaultRows } from "../../../app-sx";
import { useInputState } from "@mantine/hooks";
import { EMPTY_STRING } from "../../../constants";
import ComponentLabel from "../../ComponentLabel";

const StringLengthCalculator = () => {
  const [ input, setInput ] = useInputState(EMPTY_STRING);
  const [ length, setLength ] = useInputState(0);
  const [ strip, setStrip ] = useInputState(true);

  const onTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const s = e.target.value;
    setInput(s);
    setLength(strip ? s.trim().length : s.length);
  };

  return (
    <>
      <Textarea
        spellCheck="false"
        minRows={textAreaDefaultRows}
        label={<ComponentLabel text="Input"/>}
        value={input}
        onChange={onTextChange}>
      </Textarea>
      <Checkbox sx={defaultMargin} checked={strip} label="Strip" onChange={setStrip}/>
      <Text weight={700} sx={defaultMargin}>Length: <Text color="blue" inherit component="span">{length}</Text></Text>
    </>
  );
};

export default StringLengthCalculator;
    
