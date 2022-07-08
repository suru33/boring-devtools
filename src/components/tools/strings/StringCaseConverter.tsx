import { useInputState } from "@mantine/hooks";
import { Radio, RadioGroup, SimpleGrid, Text, Textarea, Tooltip } from "@mantine/core";
import ClipboardLabel from "../../ClipboardLabel";
import { EMPTY_STRING } from "../../../commons/constants";
import { defaultMargin, defaultTooltipWidth, textAreaDefaultRowsBig } from "../../../app-sx";
import { StringCase } from "../../../types";
import { changeCase } from "../../../commons/utils.strings";
import ComponentLabel from "../../ComponentLabel";

const StringCaseConverter = () => {

  const [ stringCase, setStringCase ] = useInputState("lower");
  const [ input, setInput ] = useInputState(EMPTY_STRING);
  const [ output, setOutput ] = useInputState(EMPTY_STRING);

  const updateOutput = (stringCase: StringCase, s: string) => {
    setOutput(changeCase(stringCase, s));
  };

  const onStringCaseChanged = (stringCase: string) => {
    setStringCase(stringCase);
    updateOutput(stringCase as StringCase, input);
  };

  const onInputChanged = (value: string) => {
    setInput(value);
    updateOutput(stringCase as StringCase, value);
  };

  const radioLabel = (text: string, tooltipText: string) =>
    <Tooltip wrapLines width={defaultTooltipWidth} label={tooltipText}>
      <Text>{text}</Text>
    </Tooltip>;

  return (
    <>
      {/* https://lodash.com/docs/4.17.15#camelCase */}
      <RadioGroup
        label={<ComponentLabel text="String case"/>}
        onChange={onStringCaseChanged}
        value={stringCase}>
        <Radio value="lower"
          label={radioLabel("Lower", "Converts string, as a whole, to lower case")}/>
        <Radio value="upper"
          label={radioLabel("Upper", "Converts string, as a whole, to upper case")}/>
        <Radio value="capitalize"
          label={radioLabel("Capitalize", "Converts the first character of string to upper case and the remaining to lower case.")}/>
        <Radio value="upper-first"
          label={radioLabel("Upper first", "Converts the first character of string to upper case.")}/>
        <Radio value="lower-first"
          label={radioLabel("Lower first", "Converts the first character of string to lower case.")}/>
        <Radio value="camel"
          label={radioLabel("Camel", "Converts string to camel case.")}/>
        <Radio value="kebab"
          label={radioLabel("Kebab", "Converts string to kebab case.")}/>
        <Radio value="snake"
          label={radioLabel("Snake", "Converts string to snake case.")}/>
        <Radio value="deburr"
          label={radioLabel("Deburr", "Deburrs string by converting Latin-1 Supplement and Latin Extended-A letters to basic Latin letters and removing combining diacritical marks.")}/>
      </RadioGroup>

      <SimpleGrid sx={defaultMargin} cols={2}>
        <Textarea
          spellCheck="false"
          minRows={textAreaDefaultRowsBig}
          label={<ComponentLabel text="Input"/>}
          value={input}
          onChange={e => onInputChanged(e.target.value)}/>
        <Textarea
          readOnly
          spellCheck="false"
          minRows={textAreaDefaultRowsBig}
          variant="filled"
          label={<ClipboardLabel title="Output" clipboardData={output}/>}
          value={output}/>
      </SimpleGrid>
    </>
  );
};

export default StringCaseConverter;
