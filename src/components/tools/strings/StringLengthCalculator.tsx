import { Checkbox, Stack, Text } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { uniq } from "lodash";
import InputTextArea from "../../InputTextArea";
import { ToolProps } from "../../../commons/types";
import { useEmptyStringInputState } from "../../../commons/utils.strings";
import { fontWeight } from "../../../app-sx";
import { colors } from "../../../resources/colors";
import __ from "../../../commons/constants";

const StringLengthCalculator = (props: ToolProps) => {
  const [ input, setInput ] = useEmptyStringInputState();
  const [ length, setLength ] = useInputState(0);
  const [ uniqueCharactersCount, setUniqueCharactersCount ] = useInputState(0);
  const [ strip, setStrip ] = useInputState(true);

  const onTextChange = (value: string) => {
    setInput(value);
    const output = strip ? value.trim() : value;
    setLength(output.length);
    setUniqueCharactersCount(uniq(output).length);
  };

  return (
    <Stack>
      <InputTextArea value={input} onChange={e => onTextChange(e.target.value)}/>
      <Checkbox checked={strip} label={__.labels.strip} onChange={setStrip}/>
      <Text weight={fontWeight.bold}>
        {__.labels.length} <Text span color={colors.blue}>{length}</Text>
        , {__.labels.uniqueChars} <Text span color={colors.blue}>{uniqueCharactersCount}</Text>
      </Text>
    </Stack>
  );
};

export default StringLengthCalculator;
