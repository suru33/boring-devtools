import { useInputState } from "@mantine/hooks";
import { Radio, SimpleGrid, Stack, Text, Textarea, Tooltip } from "@mantine/core";
import { StringCase } from "../../../commons/types";
import { EMPTY_STRING } from "../../../commons/constants";
import { defaultTooltipWidth, textAreaDefaultRows } from "../../../app-sx";
import { changeCase } from "../../../commons/utils.strings";
import ComponentLabel from "../../ComponentLabel";
import CopyTextArea from "../../CopyTextArea";

interface StringCaseRadio {
  case: StringCase,
  text: string,
  help: string,
  multiline?: boolean
}

const StringCaseConverter = () => {

  const allOptions: StringCaseRadio[] = [
    { case: "lower", text: "Lower", help: "Converts string, as a whole, to lower case" },
    { case: "upper", text: "Upper", help: "Converts string, as a whole, to upper case" },
    {
      case: "capitalize",
      text: "Capitalize",
      help: "Converts the first character of string to upper case and the remaining to lower case.",
      multiline: true
    },
    { case: "upper-first", text: "Upper first", help: "Converts the first character of string to upper case." },
    { case: "lower-first", text: "Lower first", help: "Converts the first character of string to lower case." },
    { case: "camel", text: "Camel", help: "Converts string to camel case." },
    { case: "kebab", text: "Kebab", help: "Converts string to kebab case." },
    { case: "snake", text: "Snake", help: "Converts string to snake case." },
    {
      case: "deburr",
      text: "Deburr",
      help: "Deburrs string by converting Latin-1 Supplement and Latin Extended-A letters to basic Latin letters and removing combining diacritical marks.",
      multiline: true
    }
  ];

  const [ stringCase, setStringCase ] = useInputState<StringCase>("lower");
  const [ input, setInput ] = useInputState(EMPTY_STRING);
  const [ output, setOutput ] = useInputState(EMPTY_STRING);

  const updateOutput = (stringCase: StringCase, s: string) => {
    setOutput(changeCase(stringCase, s));
  };

  const onStringCaseChanged = (stringCase: StringCase) => {
    setStringCase(stringCase);
    updateOutput(stringCase, input);
  };

  const onInputChanged = (value: string) => {
    setInput(value);
    updateOutput(stringCase as StringCase, value);
  };

  return (
    <Stack>
      <Radio.Group
        label={<ComponentLabel text="String case"/>}
        onChange={onStringCaseChanged}
        value={stringCase}>
        {
          allOptions.map((opt) => {
            const label = <Tooltip
              withArrow
              multiline={opt.multiline}
              label={opt.help}
              width={opt.multiline ? defaultTooltipWidth : "auto"}>
              <Text>{opt.text}</Text>
            </Tooltip>;
            return <Radio key={opt.case} value={opt.case} label={label}/>;
          })
        }
      </Radio.Group>

      <SimpleGrid cols={2}>
        <Textarea
          spellCheck="false"
          minRows={textAreaDefaultRows}
          label={<ComponentLabel text="Input"/>}
          value={input}
          onChange={e => onInputChanged(e.target.value)}/>
        <CopyTextArea
          readOnly
          spellCheck="false"
          minRows={textAreaDefaultRows}
          variant="filled"
          label={<ComponentLabel text="Output"/>}
          value={output}/>
      </SimpleGrid>
    </Stack>
  );
};
export default StringCaseConverter;
