import { admin_api } from "@/api_factory/modules/admin";
import { useCustomToast } from "@/composables/core/useCustomToast";
import { ref } from "vue";

export const useUpdateBook = () => {
  const loading = ref(false);
  const { showToast } = useCustomToast();

  const updateBook = async (payload: {
    id: string;
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
      const { id, ...rest } = payload
      const res = await admin_api.$_update_book(id, rest) as any
      if (res.type !== "ERROR") {
        showToast({
          title: "Success",
          message: "Book was updated successfully!",
          toastType: "success",
          duration: 3000,
        });
      }
    } catch (error) {
      showToast({
        title: "Error",
        message: "There was an issue updating the book.",
        toastType: "error",
        duration: 3000,
      });
    } finally {
      loading.value = false;
    }
  };

  return {
    updateBook,
    loading,
  };
};
