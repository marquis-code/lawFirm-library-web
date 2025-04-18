import { user_api } from "@/api_factory/modules/user";

export const useFetchIndexAlphabetically = () => {
  const loading = ref(false);
  const bookCategoriesList = ref({});

  const fetchIndexAlphabetically = async (categoryId: string, order: string) => {
    loading.value = true;
    const res = await user_api.$_get_index_alphabetically(categoryId, order) as any
    if (res.type !== "ERROR") {
      bookCategoriesList.value = res?.data?.data?.rows;
      return res?.data?.data?.rows;
    }
    loading.value = false
  };


  return {
    fetchIndexAlphabetically,
    bookCategoriesList,
    loading,
  };
};
