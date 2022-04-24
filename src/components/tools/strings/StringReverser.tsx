import { ChangeEvent } from "react";
import { useInputState } from "@mantine/hooks";
import { SimpleGrid, Text, Textarea } from "@mantine/core";
import { defaultMargin, textAreaDefaultRowsBig } from "../../../app-sx";
import { EMPTY_STRING } from "../../../constants";
import { reverse } from "../../../utils/string-utils";
import ClipboardLabel from "../../ClipboardLabel";

const StringReverser = () => {
  const [ input, setInput ] = useInputState(EMPTY_STRING);
  const [ output, setOutput ] = useInputState(EMPTY_STRING);

  const onTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const s = e.target.value;
    setInput(s);
    setOutput(reverse(s));
  };

  return (
    <SimpleGrid cols={2} sx = {defaultMargin}>
      <Textarea
        spellCheck="false"
        minRows={textAreaDefaultRowsBig}
        label={<Text weight={700}>Input</Text>}
        value={input}
        onChange={onTextChange}/>
      <Textarea
        readOnly
        spellCheck="false"
        variant="filled"
        minRows={textAreaDefaultRowsBig}
        label={<ClipboardLabel label="Output" clipboardData={output}/>}
        value={output}/>
    </SimpleGrid>
  );
};

export default StringReverser;
    
