import { GATEWAY_ENDPOINT } from "../axios.config";

export const home_api = {
    $_fetch_catalog_counts: () => {
        const url = '/catalog-counts';
        return GATEWAY_ENDPOINT.get(url);
      },
      $_fetch_book_catalog: () => {
        const url = '/categories';
        return GATEWAY_ENDPOINT.get(url);
      },
};
