// useLogin.ts
import { admin_api } from "@/api_factory/modules/admin";
import { useCustomToast } from "@/composables/core/useCustomToast";
import { ref } from "vue";

export const useLogin = () => {
  const loading = ref(false);
  const { showToast } = useCustomToast();
  const payload = ref({
    email: "",
    password: ""
  })

  const login = async () => {
    loading.value = true;
    const res = (await admin_api.$_login(payload.value)) as any;
    if (res.type !== "ERROR") {
      showToast({
        title: "Success",
        message: "Login successful",
        toastType: "success",
        duration: 3000,
      });
    }
    loading.value = false;
  };

  return {
    login,
    loading,
    payload
  };
};
