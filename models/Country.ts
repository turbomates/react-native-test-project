export interface Country {
  _id: string;
  ISO: string;
  preferredCurrency: {
    id: string;
    name: string;
  };
  priority: number;
  translations: {
    [lang: string]: string;
  };
  vatPercent: string;
}
