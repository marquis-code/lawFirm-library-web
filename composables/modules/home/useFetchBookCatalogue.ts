import { home_api } from "@/api_factory/modules/home";

export const useFetchBookCategories = () => {
  const loading = ref(false);
  const bookCategoriesList = ref({});

  const getBookCategories = async () => {
    loading.value = true;
    const res = (await home_api.$_fetch_book_catalog()) as any;
    if (res.type !== "ERROR") {
      bookCategoriesList.value = res.data.data;
    }
    return res.data;
  };

onMounted(() => {
    getBookCategories()
})

  return {
    getBookCategories,
    bookCategoriesList,
    loading,
  };
};
