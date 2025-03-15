// useLogin.ts
import { admin_api } from "@/api_factory/modules/admin";
import { useCustomToast } from "@/composables/core/useCustomToast";
import { ref } from "vue";

export const useUpdateBook = () => {
  const loading = ref(false);
  const { showToast } = useCustomToast();
  const payload = ref({
    title: "",
    author: "",
    catalog_number: "",
    category_id: "",
    location: "",
    year: "",
    description: "",
  });

  const updateBook = async (id: string | any) => {
    loading.value = true;
    const res = (await admin_api.$_update_book(id, payload.value)) as any;
    if (res.type !== "ERROR") {
      showToast({
        title: "Success",
        message: "Book was updated successfully!",
        toastType: "success",
        duration: 3000,
      });
    }
    loading.value = false;
  };

  return {
    updateBook,
    loading,
    payload,
  };
};
