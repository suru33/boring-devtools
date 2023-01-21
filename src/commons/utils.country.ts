import { range } from "lodash";
import { faker } from "@faker-js/faker";
import { chooseRandom } from "./utils.random";
import { allCountryCodes, CountryCode, defaultLocale, getCountryName, getZipCodeFormat } from "../resources/countries";
import { NEW_LINE } from "./constants";

export const countryDropdownOptions = allCountryCodes.map((code) => ({ value: code, label: getCountryName(code) }));
export const generateAddress = (countries: CountryCode[], locale = defaultLocale.value, count: number): string => {
  faker.locale = locale;
  const address = (country: CountryCode) => [
    faker.address.streetAddress(true),
    `${faker.address.zipCode(getZipCodeFormat(country))}, ${faker.address.city()}`,
    country === "US" ? `${faker.address.state()}, ${getCountryName(country)}` : getCountryName(country)
  ].join(NEW_LINE);
  return range(count).map(() => address(chooseRandom(countries))).join(`${NEW_LINE}--${NEW_LINE}`);
};
