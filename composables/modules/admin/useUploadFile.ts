// useLogin.ts
import { admin_api } from "@/api_factory/modules/admin";
import { useCustomToast } from "@/composables/core/useCustomToast";
import { ref } from "vue";

export const useUploadFile = () => {
  const loading = ref(false);
  const { showToast } = useCustomToast();

  const uplaodFile = async (payload: any) => {
    loading.value = true;
    const res = (await admin_api.$_upload_file(
      payload.value
    )) as any;
    if (res.type !== "ERROR") {
      showToast({
        title: "Success",
        message: "File was uploaded successfully!",
        toastType: "success",
        duration: 3000,
      });
    }
    loading.value = false;
  };

  return {
    uplaodFile,
    loading,
  };
};
