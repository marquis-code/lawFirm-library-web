import { admin_api } from "@/api_factory/modules/admin";
import { useCustomToast } from "@/composables/core/useCustomToast";
import { ref } from "vue";

export const useAddBook = () => {
  const loading = ref(false);
  const { showToast } = useCustomToast();

  const addBook = async (payload: {
    title: string;
    author: string;
    catalog_number: string;
    category_id: string;
    location: string;
    year: string;
    description: string;
  }) => {
    loading.value = true;
    try {
      const res = await admin_api.$_add_book(payload) as any
      if (res.type !== "ERROR") {
        showToast({
          title: "Success",
          message: "Book was added successfully!",
          toastType: "success",
          duration: 3000,
        });
      }
    } catch (error) {
      showToast({
        title: "Error",
        message: "There was an issue adding the book.",
        toastType: "error",
        duration: 3000,
      });
    } finally {
      loading.value = false;
    }
  };

  return {
    addBook,
    loading,
  };
};
