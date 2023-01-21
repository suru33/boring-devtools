import { useState } from "react";
import { Button, Group, MultiSelect, Select, Stack } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import ComponentLabel from "../../ComponentLabel";
import CopyTextArea from "../../CopyTextArea";
import HowMany, { useHowManyInputState } from "../../HowMany";
import { useEmptyStringInputState } from "../../../commons/utils.strings";
import { allCountryCodes, CountryCode, defaultLocale, fakerLocales } from "../../../resources/countries";
import { textAreaDefaultRows } from "../../../app-sx";
import { countryDropdownOptions, generateAddress } from "../../../commons/utils.country";

const AddressGenerator = () => {

  const [ selectedCountries, setSelectedCountries ] = useState<CountryCode[]>([]);
  const [ count, setCount ] = useHowManyInputState(1);
  const [ output, setOutput ] = useEmptyStringInputState();
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
          clearButtonLabel="Clear selection"
          nothingFound="Nothing found"
          label={<ComponentLabel text="Select locale" />}
          value={locale}
          onChange={setLocale}
          data={fakerLocales}/>
        <HowMany value={count} onChange={setCount} />
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

