import { ChangeEvent } from "react";
import { useInputState } from "@mantine/hooks";
import { Text, Textarea } from "@mantine/core";
import { defaultMargin, textAreaDefaultRows } from "../../../app-sx";
import { EMPTY_STRING } from "../../../constants";
import { reverse } from "../../../utils/string-utils";

const StringReverser = () => {
  const [ input, setInput ] = useInputState(EMPTY_STRING);
  const [ output, setOutput ] = useInputState(EMPTY_STRING);

  const onTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const s = e.target.value;
    setInput(s);
    setOutput(reverse(s));
  };

  return (
    <>
      <Textarea
        spellCheck="false"
        minRows={textAreaDefaultRows}
        label={<Text weight={700}>Input</Text>}
        value={input}
        onChange={onTextChange}>
      </Textarea>
      <Textarea
        readOnly
        sx = {defaultMargin}
        spellCheck="false"
        variant="filled"
        minRows={textAreaDefaultRows}
        label={<Text weight={700}>Output</Text>}
        value={output}>
      </Textarea>

    </>
  );
};

export default StringReverser;
    
