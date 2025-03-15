// useLogin.ts
import { user_api } from "@/api_factory/modules/user";
import { useCustomToast } from "@/composables/core/useCustomToast";
import { ref } from "vue";

export const useUpdatePassword = () => {
  const loading = ref(false);
  const { showToast } = useCustomToast();
  const payload = ref({
    current_password: "",
    new_password: "",
  });

  const updatePassowrd = async () => {
    loading.value = true;
    const res = (await user_api.$_update_password(
      payload.value
    )) as any;
    if (res.type !== "ERROR") {
      showToast({
        title: "Success",
        message: "Password was  updated successfully!",
        toastType: "success",
        duration: 3000,
      });
    }
    loading.value = false;
  };

  return {
    updatePassowrd,
    loading,
    payload,
  };
};
