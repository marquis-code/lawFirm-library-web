import { admin_api } from "@/api_factory/modules/admin";

export const useGetBookCategories = () => {
  const loading = ref(false);
  const categories = ref([]);
  const getBookCategories = async () => {
    loading.value = true;
    const res = (await admin_api.$_get_book_categories()) as any;
    if (res.type !== "ERROR") {
      categories.value = res.data.data;
    }
    return res.data;
  };

  return {
    getBookCategories,
    categories,
    loading,
  };
};
