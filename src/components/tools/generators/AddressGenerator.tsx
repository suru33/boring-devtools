import { useState } from "react";
import { Button, Group, MultiSelect, NumberInput, Select, Stack } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import ComponentLabel from "../../ComponentLabel";
import CopyTextArea from "../../CopyTextArea";
import { allCountryCodes, CountryCode, defaultLocale, fakerLocales } from "../../../resources/countries";
import { textAreaDefaultRows } from "../../../app-sx";
import { countryDropdownOptions, generateAddress } from "../../../commons/utils.country";
import { EMPTY_STRING, MAX_OUTPUT_ITEMS, MIN_OUTPUT_ITEMS } from "../../../commons/constants";

const AddressGenerator = () => {

  const [ selectedCountries, setSelectedCountries ] = useState<CountryCode[]>([]);
  const [ count, setCount ] = useInputState(1);
  const [ output, setOutput ] = useInputState(EMPTY_STRING);
  const [ locale, setLocale ] = useInputState(defaultLocale.value);

  const generateOutput = () => {
    const countries = selectedCountries.length > 0 ? selectedCountries : allCountryCodes;
    setOutput(generateAddress(countries, locale, count));
  };

  return(
    <Stack align="flex-start">
      <Group>
        <Select
          searchable
          clearable
          clearButtonLabel="Clear selection"
          nothingFound="Nothing found"
          label={<ComponentLabel text="Select locale" />}
          value={locale}
          onChange={setLocale}
          data={fakerLocales}/>
        <NumberInput
          label={<ComponentLabel text="How many?"/>}
          value={count}
          min={MIN_OUTPUT_ITEMS}
          max={MAX_OUTPUT_ITEMS}
          onChange={setCount}/>
      </Group>
      <MultiSelect
        searchable
        clearable
        clearButtonLabel="Clear selection"
        nothingFound="Nothing found"
        label={<ComponentLabel text="Select countries" />}
        value={selectedCountries}
        onChange={(v) => setSelectedCountries(v as CountryCode[])}
        data={countryDropdownOptions} />
      <Button onClick={generateOutput}>Generate</Button>
      <CopyTextArea
        readOnly
        spellCheck="false"
        minRows={textAreaDefaultRows}
        variant="filled"
        label={<ComponentLabel text="Output"/>}
        value={output}/>
    </Stack>
  );
};

export default AddressGenerator;

