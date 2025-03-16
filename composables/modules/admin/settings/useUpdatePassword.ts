// useLogin.ts
import { admin_api } from "@/api_factory/modules/admin";
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
    const res = (await admin_api.$_update_password(
      payload.value
    )) as any;
    if (res.type !== "ERROR") {
      showToast({
        title: "Success",
        message: "Password was updated successfully!",
        toastType: "success",
        duration: 3000,
      });
      localStorage.clear()
      window.location.href = "/admin"
    }
    loading.value = false;
  };

  return {
    updatePassowrd,
    loading,
    payload,
  };
};
