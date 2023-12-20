import { PriceElement } from "@/types/products";

export const getCountryCodeFromLocale = (locale: locale) => {
  return locale.split("-")[0];
};

export const getPriceDataByLocale = (
  locale: locale,
  prices: PriceElement[]
) => {

  return prices.find(
    (price) => price.country_code === getCountryCodeFromLocale(locale)
  );
};
