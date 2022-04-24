import { useInputState } from "@mantine/hooks";
import { EMPTY_STRING } from "../../../constants";
import { StringCase } from "../../../types";
import { Radio, RadioGroup, Text, Textarea } from "@mantine/core";
import { defaultMargin, textAreaDefaultRowsSmall } from "../../../app-sx";
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

  const onTextChanged = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const str = e.target.value;
    setInput(str);
    updateOutput(stringCase as StringCase, str);
  };

  return (
    <>
      <RadioGroup
        label={<Text weight={700}>Select string case</Text>}
        onChange={onStringCaseChanged}
        value={stringCase}>
        <Radio value="lower" label="Lower"/>
        <Radio value="upper" label="Upper"/>
        <Radio value="title" label="Title"/>
      </RadioGroup>

      <Textarea
        spellCheck="false"
        sx={defaultMargin}
        minRows={textAreaDefaultRowsSmall}
        label={<Text weight={700}>Input</Text>}
        value={input}
        onChange={onTextChanged}>
      </Textarea>

      <Textarea
        readOnly
        spellCheck="false"
        sx={defaultMargin}
        minRows={textAreaDefaultRowsSmall}
        variant="filled"
        label={<Text weight={700}>Output</Text>}
        value={output}>
      </Textarea>
    </>
  );
};

export default StringCaseConverter;
    
