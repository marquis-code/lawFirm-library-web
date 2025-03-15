import { user_api } from "@/api_factory/modules/user";

export const useSearchBook = () => {
  const loading = ref(false);
  const bookList = ref([]);
  const filters = ref({
    category_id: '',
    str: ''
  })
  const searchBook = async (id: any) => {
    loading.value = true;
    const res = (await user_api.$_search_book(filters.value)) as any;
    if (res.type !== "ERROR") {
      bookList.value = res.data.data;
    }
    return res.data;
  };

  return {
    searchBook,
    bookList,
    loading,
  };
};
