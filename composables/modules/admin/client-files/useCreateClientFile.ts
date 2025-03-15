// useLogin.ts
import { admin_api } from "@/api_factory/modules/admin";
import { useCustomToast } from "@/composables/core/useCustomToast";
import { ref } from "vue";

export const useAddClientFile = () => {
  const loading = ref(false);
  const { showToast } = useCustomToast();
  const payload = ref({
    client_name: "",
    file_name: "",
    published_date: "",
    volume: "5",
    image: "",
    url: "",
    description: "",
  });

  const addClientFile = async () => {
    loading.value = true;
    const res = (await admin_api.$_add_client_file(payload.value)) as any;
    if (res.type !== "ERROR") {
      showToast({
        title: "Success",
        message: "Client File was added successfully!",
        toastType: "success",
        duration: 3000,
      });
    }
    loading.value = false;
  };

  return {
    addClientFile,
    loading,
    payload,
  };
};
