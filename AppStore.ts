import { action, computed, flow, observable, toJS } from "mobx";

import { Response } from "./models/Response";
import { Currency } from "./models/Currency";
import { Country } from "./models/Country";
import { getItem, setItem } from "./utils/storage";

const storageKeys = {
  countries: "@AppStore:countries",
  currencies: "@AppStore:currencies",
  selectedCountryId: "@AppStore:selectedCountryId",
  selectedCurrencyId: "@AppStore:selectedCurrencyId",
  isCustomCurrency: "@AppStore:isCustomCurrency"
};

export class AppStore {
  @observable countries: Country[] = [];
  @observable currencies: Currency[] = [];

  @observable selectedCountryId: string = "";
  @observable selectedCurrencyId: string = "";

  @observable isCustomCurrency = false;

  @computed
  get countryOptions() {
    return this.countries
      .map(country => ({
        label: country.translations["en"],
        value: country._id
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }

  @computed
  get currencyOptions() {
    return this.currencies
      .map(currency => ({
        label: currency.translations["en"],
        value: currency._id
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }

  hydrate = flow(function*() {
    this.countries = yield getItem(storageKeys.countries, []);
    this.currencies = yield getItem(storageKeys.currencies, []);
    this.selectedCountryId = yield getItem(storageKeys.selectedCountryId, "");
    this.selectedCurrencyId = yield getItem(storageKeys.selectedCurrencyId, "");
    this.isCustomCurrency = yield getItem(storageKeys.isCustomCurrency, false);
  });

  async loadData() {
    this.fetchCountries();
    this.fetchCurrencies();
  }

  @action
  async fetchCountries() {
    const resp = await fetch("https://api.raino.app/countries");
    const data: Response<Country> = await resp.json();
    this.saveCountries(data.items);
  }

  @action
  async fetchCurrencies() {
    const resp = await fetch("https://api.raino.app/currencies");
    const data: Response<Currency> = await resp.json();
    this.saveCurrencies(data.items);
  }

  @action
  saveCountries(countries: Country[]) {
    this.countries = countries;
    setItem(storageKeys.countries, toJS(countries));
  }

  @action
  saveCurrencies(currencies: Currency[]) {
    this.currencies = currencies;
    setItem(storageKeys.currencies, toJS(currencies));
  }

  @action.bound
  selectCountryId(countryId: string) {
    this.selectedCountryId = countryId;
    setItem(storageKeys.selectedCountryId, toJS(this.selectedCountryId));

    if (!this.isCustomCurrency) {
      this.selectedCurrencyId = this.isCustomCurrency
        ? this.selectedCurrencyId
        : this.findCurrencyIdByCountry(countryId);
      setItem(storageKeys.selectedCurrencyId, toJS(this.selectedCurrencyId));
    }
  }

  @action.bound
  selectCurrencyId(currencyId: string) {
    this.selectedCurrencyId = currencyId;
    setItem(storageKeys.selectedCurrencyId, toJS(this.selectedCurrencyId));

    this.isCustomCurrency = true;
    setItem(storageKeys.isCustomCurrency, toJS(this.isCustomCurrency));
  }

  private findCurrencyIdByCountry(countryId: string): string {
    const country = this.countries.find(country => country._id === countryId);
    if (!country) return "";

    const currency = this.currencies.find(
      currency => currency._id === country.preferredCurrency.id
    );
    return currency ? currency._id : "";
  }
}
