import { range } from "lodash";
import { chooseRandom } from "./utils.random";
import { allCountryCodes, CountryCode, getCountryName, getZipCodeFormat } from "../resources/countries";
import $faker, { defaultFakerLocale, setFakerLocale } from "./faker.utils";
import __ from "./constants";

export const countryDropdownOptions = allCountryCodes.map((code) => ({ value: code, label: getCountryName(code) }));
export const generateAddress = (countries: CountryCode[], locale = defaultFakerLocale.value, count: number): string => {
  setFakerLocale(locale);
  const address = (country: CountryCode) => [
    $faker.address.streetAddress(true),
    `${$faker.address.zipCode(getZipCodeFormat(country))}, ${$faker.address.city()}`,
    country === "US" ? `${$faker.address.state()}, ${getCountryName(country)}` : getCountryName(country)
  ].join(__.newLine);
  return range(count).map(() => address(chooseRandom(countries))).join(__.addressSeperator);
};
