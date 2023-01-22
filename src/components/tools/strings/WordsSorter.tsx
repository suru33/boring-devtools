import { SimpleGrid } from "@mantine/core";
import CopyTextArea from "../../CopyTextArea";
import InputTextArea from "../../InputTextArea";
import { ToolProps } from "../../../commons/types";
import { sortLines, useEmptyStringInputState } from "../../../commons/utils.strings";

const WordsSorter = (props: ToolProps) => {
  const [ input, setInput ] = useEmptyStringInputState();
  const [ output, setOutput ] = useEmptyStringInputState();
  const onTextChange = (value: string) => {
    setInput(value);
    setOutput(sortLines(value));
  };
  return (
    <SimpleGrid cols={2}>
      <InputTextArea value={input} onChange={e => onTextChange(e.target.value)}/>
      <CopyTextArea value={output}/>
    </SimpleGrid>
  );
};

export default WordsSorter;
