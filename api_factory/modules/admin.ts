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
      $_get_books: (
        categoryId?: string | null, 
        search?: string | null, 
        metadata?: { page?: string | number, limit?: string | number }
      ) => {
        // Create a URLSearchParams object for clean URL parameter handling
        const params = new URLSearchParams();
        
        // Only add parameters if they are defined and not empty
        if (metadata?.page) {
          params.append('page', metadata.page.toString());
        }
        
        if (metadata?.limit) {
          params.append('limit', metadata.limit.toString());
        }
        
        if (categoryId) {
          params.append('category_id', categoryId.toString());
        }
        
        if (search) {
          params.append('search', search);
        }
        
        // Construct the URL with the parameters
        const queryString = params.toString();
        const url = `/auth/books${queryString ? `?${queryString}` : ''}`;
        
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
