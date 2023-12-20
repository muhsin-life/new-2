import getProducts from "@/helpers/api/getProductsData";
import { BrandsProps } from "@/types/brands";
import { CategoryProps } from "@/types/categories";
import { ProductProps } from "@/types/products";
import { SearchSuggestionProps } from "@/types/searchSuggestions";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";
import { useRouter } from "next/router";

export const useProducts = (type_key: string, slug: string) => {
  const { locale } = useRouter();

  return useQuery({
    queryKey: ["get-products", slug],
    queryFn: async () =>
      (await getProducts(type_key, slug, locale as locale)) as ProductProps,
  });
};

export const useCategories = () => {
  const { locale } = useRouter();
  return useQuery({
    queryKey: ["get-categories"],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://prodapp.lifepharmacy.com/api/web/categories?lang=${locale}`
      );

      return data as CategoryProps;
    },
  });
};

export const useBrands = () => {
  const { locale } = useRouter();
  return useQuery({
    queryKey: ["get-brands"],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://prodapp.lifepharmacy.com/api/web/brands?lang=${locale}`
      );

      return data as BrandsProps;
    },
    enabled: false,
  });
};

export const useSearchSuggestion = (query: string) => {
  const { locale } = useRouter();
  return useQuery({
    queryKey: [`get-search-suggestions`, query],
    queryFn: async () => {
      const headers = {
        "X-Algolia-API-Key": "c54c5f0fc2e6bd0c3b97cfa5b3580705",
        "X-Algolia-Application-Id": "WHCXS2GWOG",
        "Content-Type": "application/json",
      };

      const requestBody = {
        requests: [
          {
            indexName: "products",
            params: `query=${query}`,
            hitsPerPage: 8,
          },
          {
            indexName: "products_query_suggestions",
            params: `query=${query}`,
          },

          {
            indexName: "brands",
            params: `query=${query}`,
            hitsPerPage: 10,
          },
          {
            indexName: "categories",
            params: `query=${query}`,
            hitsPerPage: 6,
          },
        ],
        strategy: "none",
      };

      var requestOptions: AxiosRequestConfig = {
        method: "POST",
        headers,
      };

      const { data } = await axios.post(
        `https://WHCXS2GWOG-dsn.algolia.net/1/indexes/*/queries?lang=${locale}`,
        JSON.stringify(requestBody),
        requestOptions
      );

      return data as SearchSuggestionProps;
    },
    enabled: false,
  });
};
