import { Button, Group, NumberInput, Select, Stack } from "@mantine/core";
import CopyTextArea from "../../CopyTextArea";
import HowMany from "../../HowMany";
import { TextType, ToolProps } from "../../../commons/types";
import ComponentLabel from "../../ComponentLabel";
import { useEmptyStringInputState } from "../../../commons/utils.strings";
import { randomText } from "../../../commons/utils.random";
import { useToolPropHowManyStorage, useToolPropsStorage } from "../../../commons/utils.storage";
import { numVals } from "../../../app-sx";
import __ from "../../../commons/constants";

const TextGenerator = (props: ToolProps) => {
  const defaultSlugCount = 3;
  const [ count, setCount ] = useToolPropHowManyStorage({ tid: props.id });
  const [ output, setOutput ] = useEmptyStringInputState();
  const [ textType, setTextType ] = useToolPropsStorage<TextType>({ tid: props.id, key: "type", defaultValue: "words" });
  const [ slugCont, setSlugCount ] = useToolPropsStorage({ tid: props.id, key: "slug-count", defaultValue: defaultSlugCount });

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
              onChange={v => setSlugCount(v || defaultSlugCount)}
            />
        }
        <HowMany value={count} onChange={v => setCount(v || numVals.defaultOutputItems)}/>
        <Button onClick={() => setOutput(randomText(textType, count, slugCont))}>
          {__.labels.generate}
        </Button>
      </Group>
      <CopyTextArea value={output}/>
    </Stack>
  );
};

export default TextGenerator;

