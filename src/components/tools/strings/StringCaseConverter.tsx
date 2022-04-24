import { useInputState } from "@mantine/hooks";
import { EMPTY_STRING } from "../../../constants";
import { StringCase } from "../../../types";
import { Radio, RadioGroup, SimpleGrid, Text, Textarea, Tooltip } from "@mantine/core";
import { defaultMargin, defaultTooltipWidth, textAreaDefaultRows } from "../../../app-sx";
import { ChangeEvent } from "react";
import { changeCase } from "../../../utils/string-utils";

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

  const onInputChanged = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const str = e.target.value;
    setInput(str);
    updateOutput(stringCase as StringCase, str);
  };

  const radioLabel = (text: string, tooltipText: string) =>
    <Tooltip wrapLines width={defaultTooltipWidth} label={tooltipText}>
      <Text>{text}</Text>
    </Tooltip>;

  return (
    <>
      {/*https://lodash.com/docs/4.17.15#camelCase*/}
      <RadioGroup
        label={<Text weight={700}>Select string case</Text>}
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
          minRows={textAreaDefaultRows}
          label={<Text weight={700}>Input</Text>}
          value={input}
          onChange={onInputChanged}>
        </Textarea>
        <Textarea
          readOnly
          spellCheck="false"
          minRows={textAreaDefaultRows}
          variant="filled"
          label={<Text weight={700}>Output</Text>}
          value={output}>
        </Textarea>
      </SimpleGrid>
    </>
  );
};

export default StringCaseConverter;
    
