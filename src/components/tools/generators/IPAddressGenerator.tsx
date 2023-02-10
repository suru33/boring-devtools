import { Button, Group, Select, Stack } from "@mantine/core";
import ComponentLabel from "../../ComponentLabel";
import CopyTextArea from "../../CopyTextArea";
import HowMany from "../../HowMany";
import { useEmptyStringInputState } from "../../../commons/utils.strings";
import { IPv, ToolProps } from "../../../commons/types";
import { randomIPs } from "../../../commons/utils.random";
import { useToolPropHowManyStorage, useToolPropsStorage } from "../../../commons/utils.storage";
import { numVals } from "../../../app-sx";
import __ from "../../../commons/constants";

const IPAddressGenerator = (props: ToolProps) => {
  const defaultIPVersion: IPv = "v4";
  const [ version, setVersion ] = useToolPropsStorage<IPv>({ tid: props.id, key: "ipv", defaultValue: defaultIPVersion });
  const [ count, setCount ] = useToolPropHowManyStorage({ tid: props.id });
  const [ output, setOutput ] = useEmptyStringInputState();

  const selectData = [
    { value: "v4", label: __.labels.ipv4 },
    { value: "v6", label: __.labels.ipv6 }
  ];

  return (
    <Stack align="flex-start">
      <Group align="end">
        <Select
          label={<ComponentLabel text={__.labels.ipVersion}/>}
          data={selectData}
          value={version}
          onChange={v => setVersion((v || defaultIPVersion) as IPv)}/>
        <HowMany value={count} onChange={v => setCount(v || numVals.defaultOutputItems)}/>
        <Button onClick={() => setOutput(randomIPs(version, count))}>{__.labels.generate}</Button>
      </Group>
      <CopyTextArea value={output}/>
    </Stack>
  );
};

export default IPAddressGenerator;
