import { useInputState } from "@mantine/hooks";
import { SimpleGrid, Textarea } from "@mantine/core";
import { defaultMargin, textAreaDefaultRowsBig } from "../../../app-sx";
import { EMPTY_STRING } from "../../../commons/constants";
import { reverse } from "../../../commons/utils.strings";
import ClipboardLabel from "../../ClipboardLabel";
import ComponentLabel from "../../ComponentLabel";

const StringReverser = () => {
  const [ input, setInput ] = useInputState(EMPTY_STRING);
  const [ output, setOutput ] = useInputState(EMPTY_STRING);

  const onTextChange = (value: string) => {
    setInput(value);
    setOutput(reverse(value));
  };

  return (
    <SimpleGrid cols={2} sx={defaultMargin}>
      <Textarea
        spellCheck="false"
        minRows={textAreaDefaultRowsBig}
        label={<ComponentLabel text="Input"/>}
        value={input}
        onChange={e => onTextChange(e.target.value)}/>
      <Textarea
        readOnly
        spellCheck="false"
        variant="filled"
        minRows={textAreaDefaultRowsBig}
        label={<ClipboardLabel title="Output" clipboardData={output}/>}
        value={output}/>
    </SimpleGrid>
  );
};

export default StringReverser;
