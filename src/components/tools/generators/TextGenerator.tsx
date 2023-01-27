import { Button, Group, NumberInput, Select, Stack } from "@mantine/core";
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
  const [ slugCont, setSlugCount ] = useInputState(3);

  const typeSelectData = [
    { value: "words", label: __.labels.words },
    { value: "sentences", label: __.labels.sentences },
    { value: "paragraphs", label: __.labels.paragraphs },
    { value: "slug", label: __.labels.slug }
  ];

  return (
    <Stack>
      <Group align="end">
        <Select
          label={<ComponentLabel text={__.labels.textType}/>}
          data={typeSelectData}
          value={textType}
          onChange={v => setTextType(v as TextType | "words")}/>
        {
          textType === "slug" &&
            <NumberInput
              label={<ComponentLabel text={__.labels.wordsCount}/>}
              min={2}
              max={30}
              value={slugCont}
              onChange={setSlugCount}
            />
        }
        <HowMany value={count} onChange={setCount}/>
        <Button onClick={() => setOutput(randomText(textType, count, slugCont))}>
          {__.labels.generate}
        </Button>
      </Group>
      <CopyTextArea value={output}/>
    </Stack>
  );
};

export default TextGenerator;

