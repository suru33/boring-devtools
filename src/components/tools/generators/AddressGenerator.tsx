import { Button, Group, MultiSelect, Select, Stack } from "@mantine/core";
import ComponentLabel from "../../ComponentLabel";
import CopyTextArea from "../../CopyTextArea";
import HowMany from "../../HowMany";
import { useEmptyStringInputState } from "../../../commons/utils.strings";
import { useToolPropHowManyStorage, useToolPropsStorage } from "../../../commons/utils.storage";
import { ToolProps } from "../../../commons/types";
import { allCountryCodes, CountryCode } from "../../../resources/countries";
import { countryDropdownOptions, generateAddress } from "../../../commons/utils.country";
import { defaultFakerLocale, fakerLocaleSelectData } from "../../../commons/faker.utils";
import __ from "../../../commons/constants";

const AddressGenerator = (props: ToolProps) => {
  const defaultCount = 5;
  const defaultSelectedCountries: CountryCode[] = [];
  const [ selectedCountries, setSelectedCountries ] = useToolPropsStorage<CountryCode[]>({
    tid: props.id,
    key: __.sk.selectedCountries,
    defaultValue: defaultSelectedCountries
  });
  const [ count, setCount ] = useToolPropHowManyStorage({ tid: props.id, defaultValue: defaultCount });
  const [ output, setOutput ] = useEmptyStringInputState();
  const [ locale, setLocale ] = useToolPropsStorage({
    tid: props.id,
    key: __.sk.locale,
    defaultValue: defaultFakerLocale.value
  });

  const generateOutput = () => {
    const countries = selectedCountries.length > 0 ? selectedCountries : allCountryCodes;
    setOutput(generateAddress(countries, locale, count));
  };

  return (
    <Stack align="flex-start">
      <Group>
        <Select
          searchable
          nothingFound={__.labels.nothingFound}
          label={<ComponentLabel text={__.labels.selectLocale}/>}
          value={locale}
          onChange={v => setLocale(v || defaultFakerLocale.value)}
          data={fakerLocaleSelectData}/>
        <HowMany value={count} onChange={v => setCount(v || defaultCount)}/>
      </Group>
      <MultiSelect
        sx={{ minWidth: 450 }}
        searchable
        clearable
        placeholder={__.labels.allCountriesSelected}
        nothingFound={__.labels.nothingFound}
        label={<ComponentLabel text={__.labels.selectCountries}/>}
        value={selectedCountries}
        onChange={(v) => setSelectedCountries(v as CountryCode[])}
        data={countryDropdownOptions}/>
      <Button onClick={generateOutput}>{__.labels.generate}</Button>
      <CopyTextArea value={output}/>
    </Stack>
  );
};

export default AddressGenerator;

