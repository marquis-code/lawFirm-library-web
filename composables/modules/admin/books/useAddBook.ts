// useLogin.ts
import { admin_api } from "@/api_factory/modules/admin";
import { useCustomToast } from "@/composables/core/useCustomToast";
import { ref } from "vue";

export const useAddBook = () => {
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

  const addBook = async () => {
    loading.value = true;
    const res = (await admin_api.$_add_book(payload.value)) as any;
    if (res.type !== "ERROR") {
      showToast({
        title: "Success",
        message: "Book was added successfully!",
        toastType: "success",
        duration: 3000,
      });
    }
    loading.value = false;
  };

  return {
    addBook,
    loading,
    payload,
  };
};
