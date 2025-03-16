import { GATEWAY_ENDPOINT } from "../axios.config";

export const user_api = {
    $_user_login: (payload: any) => {
        const url = '/login';
        return GATEWAY_ENDPOINT.post(url, payload);
      },
      $_fetch_user_profile: () => {
        const url = '/user/profile';
        return GATEWAY_ENDPOINT.get(url);
      },
      $_search_book: (filters: any) => {
        const url  =  `/user/search?str=${filters.str}&category_id=${filters.category_id}`
        return GATEWAY_ENDPOINT.get(url);
      },
      $_view_book: (bookId: any) => {
        const url  =  `/user/book/${bookId}`
        return GATEWAY_ENDPOINT.get(url);
      },
      $_update_password: (payload: any) => {
        const url = '/user/update-password'
        return GATEWAY_ENDPOINT.post(url, payload);
      },
};
