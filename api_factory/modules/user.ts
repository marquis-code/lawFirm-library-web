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
      $_get_index_alphabetically: (categoryId: string, order: string) => {
        const url  =  `/user/search?category_id=${categoryId}&order=${order}`
        return GATEWAY_ENDPOINT.get(url);
      },
      $_save_list: (payload: any) => {
        const url  =  `/user/save-list`
        return GATEWAY_ENDPOINT.post(url, payload);
      },
      $_get_list: () => {
        const url  =  `/user/get-list`
        return GATEWAY_ENDPOINT.get(url);
      },
      $_get_client_index_alphabetically: (order: string, categoryId?: string) => {
        const url  =  `/user/search-client?order=${order}`
        return GATEWAY_ENDPOINT.get(url);
      },
};
