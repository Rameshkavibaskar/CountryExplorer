/*************************************************
 * Country Explorer
 * @exports
 * CountryService.ts
 * Created by Ramesh on 25/04/2023
 *************************************************/

import {Country, CountryResponse} from './CountryModel';
import {api} from './Api';

export const countryApi = api.injectEndpoints({
  endpoints: build => ({
    getCountry: build.query<Country[], void>({
      query: () => ({
        url: 'all?fields=name,flags,languages,currencies,timezones,capital,area,population',
      }),
      transformResponse: (response: any) =>
        response.map((country: CountryResponse) => ({
          name: country.name.common,
          flag: country.flags.svg,
          currencies: Object.values(country.currencies).map(
            ({name, symbol}) => ({name, symbol}),
          ),
          languages: Object.values(country.languages),
          timezones: country.timezones,
          capital: country.capital,
          area: country.area,
          population: country.population,
          isFavorite: false,
        })),
    }),
    searchCountry: build.query<Country[], string>({
      query: name => ({
        url: `name/${name}?fullText=true`,
      }),
      transformResponse: (response: any) =>
        response.map((country: CountryResponse) => ({
          name: country.name.common,
          flag: country.flags.svg,
          currencies: Object.values(country.currencies).map(
            ({name, symbol}) => ({name, symbol}),
          ),
          languages: Object.values(country.languages),
          timezones: country.timezones,
          capital: country.capital,
          area: country.area,
          population: country.population,
          isFavorite: false,
        })),
    }),
  }),
  overrideExisting: true,
});

export const {useLazyGetCountryQuery, useLazySearchCountryQuery} = countryApi;
