import { user_api } from "@/api_factory/modules/user";

export const useFetchBookList = () => {
  const loading = ref(false);
  const booksList = ref([]);

  const fetchBookList = async () => {
    loading.value = true;
    const res = await user_api.$_get_list() as any
    if (res.type !== "ERROR") {
        booksList.value = res.data.data;
    }
    return res.data;
  };

  onMounted(() => {
    fetchBookList()
  })

  return {
    fetchBookList,
    booksList,
    loading,
  };
};
