import { useState } from "react";
import { Button, Group, MultiSelect, Select, Stack } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import ComponentLabel from "../../ComponentLabel";
import CopyTextArea from "../../CopyTextArea";
import HowMany, { useHowManyInputState } from "../../HowMany";
import { useEmptyStringInputState } from "../../../commons/utils.strings";
import { ToolProps } from "../../../commons/types";
import { allCountryCodes, CountryCode } from "../../../resources/countries";
import { countryDropdownOptions, generateAddress } from "../../../commons/utils.country";
import { defaultFakerLocale, fakerLocaleSelectData } from "../../../commons/faker.utils";
import __ from "../../../commons/constants";

const AddressGenerator = (props: ToolProps) => {

  const [ selectedCountries, setSelectedCountries ] = useState<CountryCode[]>([]);
  const [ count, setCount ] = useHowManyInputState(5);
  const [ output, setOutput ] = useEmptyStringInputState();
  const [ locale, setLocale ] = useInputState(defaultFakerLocale.value);

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
          onChange={setLocale}
          data={fakerLocaleSelectData}/>
        <HowMany value={count} onChange={setCount}/>
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

