import { user_api } from "@/api_factory/modules/user";

export const useGetBookById = () => {
  const loading = ref(false);
  const bookBetailsObj = ref({});
  const getBookById = async (id: any) => {
    loading.value = true;
    const res = (await user_api.$_view_book(id)) as any;
    if (res.type !== "ERROR") {
        bookBetailsObj.value = res.data.data;
    }
    return res.data;
  };

  return {
    getBookById,
    bookBetailsObj,
    loading,
  };
};
