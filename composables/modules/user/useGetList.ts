import { user_api } from "@/api_factory/modules/user";

export const useFetchBookList = () => {
  const loading = ref(false);
  const booksList = ref([]);

  const fetchBookList = async () => {
    loading.value = true;
    const res = await user_api.$_get_list() as any
    console.log(res, 'res ')
    if (res.status === 200 || res.status === 201) {
        booksList.value = res.data.data;
        return res.data.data
    }
    loading.value = false
    // return res.data;
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
