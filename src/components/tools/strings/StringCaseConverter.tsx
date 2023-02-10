import { ComponentPropsWithoutRef, forwardRef } from "react";
import { Group, Select, SimpleGrid, Stack, Text } from "@mantine/core";
import ComponentLabel from "../../ComponentLabel";
import CopyTextArea from "../../CopyTextArea";
import InputTextArea from "../../InputTextArea";
import { StringCase, ToolProps } from "../../../commons/types";
import { changeCase, useEmptyStringInputState } from "../../../commons/utils.strings";
import { useToolPropsStorage } from "../../../commons/utils.storage";
import __ from "../../../commons/constants";

const StringCaseConverter = (props: ToolProps) => {

  interface CaseSelectItemProps extends ComponentPropsWithoutRef<"div"> {
    value: StringCase;
    label: string;
    description: string;
  }

  const caseSelectItems: CaseSelectItemProps[] = [
    { value: "lower", label: "Lower", description: "Converts string, as a whole, to lower case" },
    { value: "upper", label: "Upper", description: "Converts string, as a whole, to upper case" },
    {
      value: "capitalize",
      label: "Capitalize",
      description: "Converts the first character of string to upper case and the remaining to lower case."
    },
    { value: "upper-first", label: "Upper first", description: "Converts the first character of string to upper case." },
    { value: "lower-first", label: "Lower first", description: "Converts the first character of string to lower case." },
    { value: "camel", label: "Camel", description: "Converts string to camel case." },
    { value: "kebab", label: "Kebab", description: "Converts string to kebab case." },
    { value: "snake", label: "Snake", description: "Converts string to snake case." },
    {
      value: "deburr",
      label: "Deburr",
      description: "Deburrs string by converting Latin-1 Supplement and Latin Extended-A letters to basic Latin letters and removing combining diacritical marks."
    }
  ];

  const StringCaseSelectItem = forwardRef<HTMLDivElement, CaseSelectItemProps>(
    ({ label, description, ...others }: CaseSelectItemProps, ref) =>
      <div ref={ref} {...others}>
        <Group noWrap>
          <div>
            <Text size="sm">{label}</Text>
            <Text size="xs" opacity={0.65}>{description}</Text>
          </div>
        </Group>
      </div>
  );

  StringCaseSelectItem.displayName = StringCaseSelectItem.name;

  const defaultStringCase: StringCase = "lower";

  const [ stringCase, setStringCase ] = useToolPropsStorage<StringCase>({
    tid: props.id,
    key: "str-case",
    defaultValue: defaultStringCase
  });
  const [ input, setInput ] = useEmptyStringInputState();
  const [ output, setOutput ] = useEmptyStringInputState();

  const updateOutput = (stringCase: StringCase, s: string) => {
    setOutput(changeCase(stringCase, s));
  };

  const onStringCaseChanged = (stringCase: StringCase) => {
    setStringCase(stringCase);
    updateOutput(stringCase, input);
  };

  const onInputChanged = (value: string) => {
    setInput(value);
    updateOutput(stringCase, value);
  };

  return (
    <Stack align="flex-start">
      <Select
        style={{ width: 350 }}
        label={<ComponentLabel text={__.labels.stringCase}/>}
        value={stringCase}
        itemComponent={StringCaseSelectItem}
        onChange={v => onStringCaseChanged((v || defaultStringCase) as StringCase )}
        data={caseSelectItems}/>

      <SimpleGrid cols={2} sx={{ width: "100%" }}>
        <InputTextArea value={input} onChange={e => onInputChanged(e.target.value)}/>
        <CopyTextArea value={output}/>
      </SimpleGrid>
    </Stack>
  );
};
export default StringCaseConverter;
