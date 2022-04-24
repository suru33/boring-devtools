import { useClipboard } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { ActionIcon, Group, Text, Tooltip } from "@mantine/core";
import { clipboardIcon } from "../resources/icons";
import { EMPTY_STRING } from "../constants";

const ClipboardLabel = (props: { label: string, clipboardData: string }) => {
  const clipboard = useClipboard({ timeout: 500 });

  const onClipboardClicked = () => {
    if(props.clipboardData === EMPTY_STRING) {
      showNotification({
        message: "Nothing to copy",
        autoClose: 2000,
        color: "orange"
      });
    } else {
      clipboard.copy(props.clipboardData);
      showNotification({
        message: `${props.label} text copied to clipboard!`,
        autoClose: 2000,
        color: "green"
      });
    }
  };

  return <Group spacing="xs">
    <Text weight={700}>{props.label}</Text>
    <Tooltip label={"Copy"}>
      <ActionIcon variant="hover" color="gray" onClick={() => onClipboardClicked()}>
        {clipboardIcon}
      </ActionIcon>
    </Tooltip>
  </Group>;
};

export default ClipboardLabel;
