import { Textarea, TextareaProps } from "@mantine/core";
import ComponentLabel from "./ComponentLabel";
import { numVals } from "../app-sx";
import __ from "../commons/constants";

const InputTextArea = (props: TextareaProps) =>
  <Textarea
    {...props}
    spellCheck={props.spellCheck ? props.spellCheck : false}
    minRows={props.minRows ? props.minRows : numVals.textAreaRows}
    label={props.label ? props.label : <ComponentLabel text={__.labels.input}/>}
  />;
export default InputTextArea;
