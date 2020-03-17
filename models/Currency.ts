export interface Currency {
  _id: string;
  exchangeRateToUSD: string;
  positionType: string;
  translations: {
    [lang: string]: string;
  };
}
