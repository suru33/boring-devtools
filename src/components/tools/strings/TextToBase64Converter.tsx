import { SimpleGrid } from "@mantine/core";
import ComponentLabel from "../../ComponentLabel";
import CopyTextArea from "../../CopyTextArea";
import { Base64Conv, ToolProps } from "../../../commons/types";
import { base64ToString, stringToBase64, useEmptyStringInputState } from "../../../commons/utils.strings";
import __ from "../../../commons/constants";

const TextToBase64Converter = (props: ToolProps) => {
  const [ text, setText ] = useEmptyStringInputState();
  const [ base64, setBase64 ] = useEmptyStringInputState();
  const onTextChange = (value: string, inputFn: (_: string) => void, outputFn: (_: string) => void, type: Base64Conv) => {
    inputFn(value);
    if (type === "text") {
      outputFn(stringToBase64(value));
    } else {
      outputFn(base64ToString(value));
    }
  };
  return (
    <SimpleGrid cols={2}>
      <CopyTextArea
        variant="default"
        readOnly={false}
        label={<ComponentLabel text={__.labels.text}/>}
        value={text}
        onChange={e => onTextChange(e.target.value, setText, setBase64, "text")}/>
      <CopyTextArea
        readOnly={false}
        variant="default"
        label={<ComponentLabel text={__.labels.base64}/>}
        value={base64}
        onChange={e => onTextChange(e.target.value, setBase64, setText, "base64")}/>
    </SimpleGrid>
  );
};
export default TextToBase64Converter;
