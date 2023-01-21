import * as _ from "lodash";
import { faker } from "@faker-js/faker";
import { chooseRandom } from "./utils.random";
import { allCountryCodes, CountryCode, defaultLocale, getCountryName, getZipCodeFormat } from "../resources/countries";

export const countryDropdownOptions = allCountryCodes.map((code) => ({ value: code, label: getCountryName(code) }));
export const generateAddress = (countries: CountryCode[], locale = defaultLocale.value, count:number): string => {
  faker.locale = locale;
  const address = (country: CountryCode) => [
    faker.address.streetAddress(true),
    `${faker.address.zipCode(getZipCodeFormat(country))}, ${faker.address.city()}`,
    country === "US" ? `${faker.address.state()}, ${getCountryName(country)}` : getCountryName(country)
  ].join("\n");
  return _.range(count).map(() => address(chooseRandom(countries))).join("\n--\n");
};
