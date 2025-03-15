import { admin_api } from "@/api_factory/modules/admin";

export const useGetBookByCategory = () => {
  const loading = ref(false);
  const bookList = ref([]);
  const metadata = ref({
    page: 1,
    limit: 10
  })
  const filters = ref({
    searchTerm: ""
  })
  const getBookByCategoryId = async (id: any) => {
    loading.value = true;
    const res = (await admin_api.$_get_book_by_categry_id(id, filters.value.searchTerm,  metadata.value)) as any;
    if (res.type !== "ERROR") {
      bookList.value = res.data.data;
    }
    return res.data;
  };

  return {
    getBookByCategoryId,
    bookList,
    loading,
  };
};
