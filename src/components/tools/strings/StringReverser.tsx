import { useInputState } from "@mantine/hooks";
import { SimpleGrid, Stack, Text, Textarea } from "@mantine/core";
import { defaultMargin, textAreaDefaultRows } from "../../../app-sx";
import { EMPTY_STRING } from "../../../commons/constants";
import { reverse } from "../../../commons/utils.strings";
import ComponentLabel from "../../ComponentLabel";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import CopyTextArea from "../../CopyTextArea";

const StringReverser = () => {
  const initialStatus = { message: "Input is empty", color: "grey" };
  const [ input, setInput ] = useInputState(EMPTY_STRING);
  const [ output, setOutput ] = useInputState(EMPTY_STRING);
  const [ status, setStatus ] = useState(initialStatus);

  const onTextChange = (value: string) => {
    setInput(value);
    setOutput(reverse(value));
  };

  useEffect(() => {
    if (isEmpty(input)) {
      setStatus(initialStatus);
    } else if (input === output) {
      setStatus({ message: "Palindrome string", color: "darkgreen" });
    } else {
      setStatus({ message: "Not a palindrome string", color: "red" });
    }
  }, [ input, output ]);

  return (
    <Stack>
      <SimpleGrid cols={2} sx={defaultMargin}>
        <Textarea
          spellCheck="false"
          minRows={textAreaDefaultRows}
          label={<ComponentLabel text="Input"/>}
          value={input}
          onChange={e => onTextChange(e.target.value)}/>
        <CopyTextArea
          readOnly
          spellCheck="false"
          variant="filled"
          minRows={textAreaDefaultRows}
          label={<ComponentLabel text="Output"/>}
          value={output}
        />
      </SimpleGrid>
      <Text weight={700} color={status.color}>{status.message}</Text>
    </Stack>
  );
};

export default StringReverser;
