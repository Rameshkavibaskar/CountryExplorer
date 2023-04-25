/*************************************************
 * Country Explorer
 * @exports
 * CountryModels.ts
 * Created by Ramesh on 25/04/2023
 *************************************************/

export type Country = {
  name: string;
  flag: string;
  languages: Array<string>;
  currencies: Array<Currency>;
  timezones: Array<string>;
  capital: string;
  area: number;
  population: number;
  isFavorite: boolean;
};
export type Currency = {
  name: string;
  symbol: string;
};
export type CountryResponse = {
  flags: {
    svg: string;
  };
  name: {
    common: string;
  };
  currencies: {
    BBD: {
      name: string;
      symbol: string;
    };
  };
  capital: Array<string>;
  languages: {
    eng: string;
  };
  area: number;
  population: number;
  timezones: Array<string>;
};
