import { GATEWAY_ENDPOINT } from "../axios.config";

export const admin_api = {
    $_login: (payload: any) => {
        const url = '/login';
        return GATEWAY_ENDPOINT.post(url, payload);
      },
      $_get_users: (metadata: { page: string | number, limit: string | number}) => {
        const url = `/auth/users?page=${metadata.page}&limit=${metadata.page}`;
        return GATEWAY_ENDPOINT.get(url);
      },
      $_add_user: (payload: any) => {
        const url = '/auth/users';
        return GATEWAY_ENDPOINT.post(url, payload);
      },
      $_update_user: (id: string | number, payload: any) => {
        const url = `/auth/users/${id}`;
        return GATEWAY_ENDPOINT.patch(url, payload);
      },
      $_get_book_categories: () => {
        const url = `/auth/categories`;
        return GATEWAY_ENDPOINT.get(url);
      },
      $_get_book_by_categry_id: (category_id: string | any, search?: string | any, metadata?: { page: string | number, limit: string | number}) => {
        const url = `/auth/books?page=${metadata?.page}&limit=${metadata?.limit}&category_id=${category_id}&search=${search}`
        return GATEWAY_ENDPOINT.get(url);
      },
      $_add_book: (payload: any) => {
        const url = `/auth/books`;
        return GATEWAY_ENDPOINT.post(url, payload);
      },
      $_update_book: (id: string | any, payload: any) => {
        const url = `/auth/books/${id}`;
        return GATEWAY_ENDPOINT.patch(url, payload);
      },
      $_add_client_file: (payload: any) => {
        const url = `/auth/client-files`;
        return GATEWAY_ENDPOINT.post(url, payload);
      },
      $_update_client_file: (id: string | any, payload: any) => {
        const url = `/auth/client-files/${id}`;
        return GATEWAY_ENDPOINT.patch(url, payload);
      },
      $_get_client_files: (metadata: { page: string | number, limit: string | number}) => {
        const url = `/auth/client-files?page=${metadata.page}&limit=${metadata.limit}`
        return GATEWAY_ENDPOINT.get(url);
      },
      $_get_admin_profile: () => {
        const url = '/auth/profile'
        return GATEWAY_ENDPOINT.get(url);
      },
      $_update_password: (payload: any) => {
        const url = '/auth/update-password'
        return GATEWAY_ENDPOINT.post(url, payload);
      },
      $_fetch_dashboard_data: () => {
        const url = '/auth/dashboard'
        return GATEWAY_ENDPOINT.get(url);
      },
      $_upload_file: (payload: any) => {
        const url = '/upload-file'
        return GATEWAY_ENDPOINT.post(url, payload);
      }
};
