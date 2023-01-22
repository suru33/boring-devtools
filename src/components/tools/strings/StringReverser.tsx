import { useEffect, useState } from "react";
import { SimpleGrid, Stack, Text } from "@mantine/core";
import CopyTextArea from "../../CopyTextArea";
import InputTextArea from "../../InputTextArea";
import { ToolProps } from "../../../commons/types";
import { reverse, useEmptyStringInputState } from "../../../commons/utils.strings";
import { isEmpty } from "lodash";
import { fontWeight } from "../../../app-sx";
import { colors } from "../../../resources/colors";
import __ from "../../../commons/constants";

const StringReverser = (props: ToolProps) => {
  const initialStatus = { message: __.labels.inputEmpty as string, color: colors.gray };
  const [ input, setInput ] = useEmptyStringInputState();
  const [ output, setOutput ] = useEmptyStringInputState();
  const [ status, setStatus ] = useState(initialStatus);

  const onTextChange = (value: string) => {
    setInput(value);
    setOutput(reverse(value));
  };

  useEffect(() => {
    if (isEmpty(input)) {
      setStatus(initialStatus);
    } else if (input === output) {
      setStatus({ message: __.labels.palindrome, color: colors.darkgreen });
    } else {
      setStatus({ message: __.labels.notPalindrome, color: colors.red });
    }
  }, [ input, output ]);

  return (
    <Stack>
      <SimpleGrid cols={2}>
        <InputTextArea value={input} onChange={e => onTextChange(e.target.value)}/>
        <CopyTextArea value={output}/>
      </SimpleGrid>
      <Text weight={fontWeight.bold} color={status.color}>{status.message}</Text>
    </Stack>
  );
};

export default StringReverser;
