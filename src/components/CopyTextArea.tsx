import { ActionIcon, CopyButton, Textarea, TextareaProps, Tooltip } from "@mantine/core";
import { iconCheck, iconClipboard } from "../resources/icons";

const CopyTextArea = (props: TextareaProps) => {
  const toString = (s: string | ReadonlyArray<string> | number | undefined): string => {
    if (typeof s === "string") {
      return s;
    } else if (typeof s === "number") {
      return s.toString();
    } else if (typeof s === "undefined") {
      return "";
    } else {
      return s.join("\n");
    }
  };
  return (
    <div style={{ display: "inline-block", position: "relative", width: "100%" }}>
      <Textarea {...props} sx={{ display: "block" }}></Textarea>
      <div style={{ position: "absolute", top: "40px", right: "20px", zIndex: 100 }}>
        <CopyButton value={toString(props.value)} timeout={1500}>
          {({ copied, copy }) =>
            <Tooltip label={copied ? "Copied" : "Copy"} withArrow position="right">
              <ActionIcon color={copied ? "teal" : "gray"}
                onClick={copy}> {copied ? iconCheck : iconClipboard} </ActionIcon>
            </Tooltip>
          }
        </CopyButton>
      </div>
    </div>
  );
};
export default CopyTextArea;
