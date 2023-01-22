import { ActionIcon, CopyButton, Textarea, TextareaProps, Tooltip } from "@mantine/core";
import ComponentLabel from "./ComponentLabel";
import { iconCheck, iconClipboard } from "../resources/icons";
import { numVals } from "../app-sx";
import { colors } from "../resources/colors";
import __ from "../commons/constants";

const CopyTextArea = (props: TextareaProps) => {
  const toString = (s: string | ReadonlyArray<string> | number | undefined): string => {
    if (typeof s === "string") {
      return s;
    } else if (typeof s === "number") {
      return s.toString();
    } else if (typeof s === "undefined") {
      return "";
    } else {
      return s.join(__.newLine);
    }
  };
  return (
    <div style={{ display: "inline-block", position: "relative", width: "100%" }}>
      <Textarea
        {...props}
        sx={{ display: "block" }}
        variant={props.variant ? props.variant : "filled"}
        spellCheck={props.spellCheck ? props.spellCheck : false}
        readOnly={props.readOnly === undefined ? true : props.readOnly}
        minRows={props.minRows ? props.minRows : numVals.textAreaRows}
        label={props.label ? props.label : <ComponentLabel text={__.labels.output}/>}
      />
      <div style={{ position: "absolute", top: "40px", right: "20px", zIndex: 100 }}>
        <CopyButton value={toString(props.value)} timeout={1500}>
          {({ copied, copy }) =>
            <Tooltip label={copied ? __.labels.copied : __.labels.copy} withArrow position="right">
              <ActionIcon color={copied ? colors.teal : colors.gray}
                onClick={copy}> {copied ? iconCheck : iconClipboard} </ActionIcon>
            </Tooltip>
          }
        </CopyButton>
      </div>
    </div>
  );
};
export default CopyTextArea;
