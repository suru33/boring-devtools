import { Checkbox, Stack, Text, Textarea } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import ComponentLabel from "../../ComponentLabel";
import { textAreaDefaultRows } from "../../../app-sx";
import { uniqueCharacters } from "../../../commons/utils.strings";
import { EMPTY_STRING } from "../../../commons/constants";

const StringLengthCalculator = () => {
  const [ input, setInput ] = useInputState(EMPTY_STRING);
  const [ length, setLength ] = useInputState(0);
  const [ uniqueCharactersCount, setUniqueCharactersCount ] = useInputState(0);
  const [ strip, setStrip ] = useInputState(true);

  const onTextChange = (value: string) => {
    setInput(value);
    const output = strip ? value.trim() : value;
    setLength(output.length);
    setUniqueCharactersCount(uniqueCharacters(output).length);
  };

  return (
    <Stack>
      <Textarea
        spellCheck="false"
        minRows={textAreaDefaultRows}
        label={<ComponentLabel text="Input"/>}
        value={input}
        onChange={e => onTextChange(e.target.value)}>
      </Textarea>
      <Checkbox checked={strip} label="Strip" onChange={setStrip}/>
      <Text weight={700}>
        Length: <Text color="blue" inherit component="span">{length}</Text>
      </Text>
      <Text weight={700}>
        Unique Characters: <Text color="blue" inherit component="span">{uniqueCharactersCount}</Text>
      </Text>
    </Stack>
  );
};

export default StringLengthCalculator;
