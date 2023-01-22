import { Button, Group, Select, Stack } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import CopyTextArea from "../../CopyTextArea";
import HowMany, { useHowManyInputState } from "../../HowMany";
import { TextType, ToolProps } from "../../../commons/types";
import ComponentLabel from "../../ComponentLabel";
import { useEmptyStringInputState } from "../../../commons/utils.strings";
import { randomText } from "../../../commons/utils.random";
import __ from "../../../commons/constants";

const TextGenerator = (props: ToolProps) => {
  const [ count, setCount ] = useHowManyInputState();
  const [ output, setOutput ] = useEmptyStringInputState();
  const [ textType, setTextType ] = useInputState<TextType>("words");

  const typeSelectData = [
    { value: "words", label: __.labels.words },
    { value: "sentences", label: __.labels.sentences },
    { value: "paragraphs", label: __.labels.paragraphs }
  ];

  return (
    <Stack>
      <Group align="end">
        <Select
          label={<ComponentLabel text={__.labels.textType}/>}
          data={typeSelectData}
          value={textType}
          onChange={v => setTextType(v as TextType | "words")}/>
        <HowMany value={count} onChange={setCount}/>
        <Button onClick={() => setOutput(randomText(textType, count))}>{__.labels.generate}</Button>
      </Group>
      <CopyTextArea value={output}/>
    </Stack>
  );
};

export default TextGenerator;

