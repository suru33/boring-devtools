import { SimpleGrid, Textarea } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import ComponentLabel from "../../ComponentLabel";
import CopyTextArea from "../../CopyTextArea";
import { sortLines } from "../../../commons/utils.strings";
import { textAreaDefaultRows } from "../../../app-sx";
import { EMPTY_STRING } from "../../../commons/constants";

const WordsSorter = () => {
  const [ input, setInput ] = useInputState(EMPTY_STRING);
  const [ output, setOutput ] = useInputState(EMPTY_STRING);
  const onTextChange = (value: string) => {
    setInput(value);
    setOutput(sortLines(value));
  };
  return (
    <SimpleGrid cols={2}>
      <Textarea
        spellCheck="false"
        minRows={textAreaDefaultRows}
        label={<ComponentLabel text="Input"/>}
        value={input}
        onChange={e => onTextChange(e.target.value)}/>
      <CopyTextArea
        readOnly
        spellCheck="false"
        variant="filled"
        minRows={textAreaDefaultRows}
        label={<ComponentLabel text="Output"/>}
        value={output}
      />
    </SimpleGrid>
  );
};

export default WordsSorter;
