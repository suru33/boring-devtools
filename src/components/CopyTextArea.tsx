import React, { useState } from "react";
import { ActionIcon, CopyButton, Modal, Textarea, TextareaProps, Title, Tooltip } from "@mantine/core";
import { isEmpty } from "lodash";
import ComponentLabel from "./ComponentLabel";
import { iconCheck, iconCopy, iconView } from "../resources/icons";
import { numVals } from "../app-sx";
import { colors } from "../resources/colors";
import __ from "../commons/constants";

const CopyTextArea = (props: TextareaProps) => {

  const Lines = (props: { text: string }) => {
    const strings = props.text.split("\n");
    return (
      <>
        {
          strings.map((s, ix) =>
            <Title
              key={ix}
              align="center"
              order={1}
              sx={{ marginBottom: ix + 1 === strings.length ? 50 : 10 }}>
              {s.trim()}
            </Title>
          )
        }
      </>
    );
  };
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

  const [ modalOpened, setModalOpened ] = useState(false);
  const showButtons = () => !isEmpty(props.value);

  return (
    <>
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
        {showButtons() &&
          <>
            <div style={{ position: "absolute", top: "40px", right: "20px", zIndex: 100 }}>
              <CopyButton value={toString(props.value)} timeout={1500}>
                {({ copied, copy }) =>
                  <Tooltip label={copied ? __.labels.copied : __.labels.copy} withArrow position="right">
                    <ActionIcon
                      color={copied ? colors.teal : colors.gray}
                      onClick={copy}>
                      {copied ? iconCheck : iconCopy}
                    </ActionIcon>
                  </Tooltip>
                }
              </CopyButton>
            </div>
            <div style={{ position: "absolute", top: "70px", right: "20px", zIndex: 100 }}>
              <Tooltip label="View" withArrow position="right">
                <ActionIcon onClick={() => setModalOpened(true)}>{iconView}</ActionIcon>
              </Tooltip>
            </div>
          </>
        }
      </div>
      <Modal
        centered
        size="90%"
        overflow="inside"
        opened={modalOpened}
        overlayBlur={2}
        onClose={() => setModalOpened(false)}>
        <Lines text={toString(props.value)}/>
      </Modal>
    </>
  );
};
export default CopyTextArea;
