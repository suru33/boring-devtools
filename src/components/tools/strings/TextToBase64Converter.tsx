import { SimpleGrid, Textarea } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import ComponentLabel from "../../ComponentLabel";
import CopyTextArea from "../../CopyTextArea";
import { base64ToString, stringToBase64 } from "../../../commons/utils.strings";
import { textAreaDefaultRows } from "../../../app-sx";
import { EMPTY_STRING } from "../../../commons/constants";

const TextToBase64Converter = () => {
  const [ text, setText ] = useInputState(EMPTY_STRING);
  const [ base64, setBase64 ] = useInputState(EMPTY_STRING);
  const onTextChange = (value: string, inputFn: (_:string) => void, outputFn: (_:string) => void, type: "string" | "base64") => {
    inputFn(value);
    if(type === "string") {
      outputFn(stringToBase64(value));
    } else {
      outputFn(base64ToString(value));
    }
  };
  return (
    <SimpleGrid cols={2}>
      <CopyTextArea
        spellCheck="false"
        minRows={textAreaDefaultRows}
        label={<ComponentLabel text="Text"/>}
        value={text}
        onChange={e => onTextChange(e.target.value, setText, setBase64, "string")}/>
      <CopyTextArea
        spellCheck="false"
        minRows={textAreaDefaultRows}
        label={<ComponentLabel text="Base64"/>}
        value={base64}
        onChange={e => onTextChange(e.target.value, setBase64, setText, "base64")}/>
    </SimpleGrid>
  );
};
export default TextToBase64Converter;
