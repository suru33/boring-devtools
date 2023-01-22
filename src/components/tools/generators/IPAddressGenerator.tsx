import { Button, Group, Select, Stack } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import ComponentLabel from "../../ComponentLabel";
import CopyTextArea from "../../CopyTextArea";
import HowMany, { useHowManyInputState } from "../../HowMany";
import { useEmptyStringInputState } from "../../../commons/utils.strings";
import { IPv, ToolProps } from "../../../commons/types";
import { randomIPs } from "../../../commons/utils.random";
import __ from "../../../commons/constants";

const IPAddressGenerator = (props: ToolProps) => {
  const [ version, setVersion ] = useInputState<IPv>("v4");
  const [ count, setCount ] = useHowManyInputState();
  const [ output, setOutput ] = useEmptyStringInputState();

  const selectData = [
    { value: "v4", label: __.labels.ipv4 },
    { value: "v6", label: __.labels.ipv6 }
  ];

  return (
    <Stack align="flex-start">
      <Select
        label={<ComponentLabel text={__.labels.ipVersion}/>}
        data={selectData}
        value={version}
        onChange={v => setVersion(v as IPv)}/>
      <Group align="end">
        <HowMany value={count} onChange={setCount}/>
        <Button onClick={() => setOutput(randomIPs(version, count))}>{__.labels.generate}</Button>
      </Group>
      <CopyTextArea value={output}/>
    </Stack>
  );
};

export default IPAddressGenerator;
