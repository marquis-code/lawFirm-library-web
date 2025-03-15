// useLogin.ts
import { user_api } from "@/api_factory/modules/user";
import { useCustomToast } from "@/composables/core/useCustomToast";
import { ref } from "vue";

export const useLogin = () => {
  const loading = ref(false);
  const { showToast } = useCustomToast();
  const payload = ref({
    type: "user",
    email: "",
    password: ""
  })

  const login = async () => {
    loading.value = true;
    const res = (await user_api.$_user_login(payload.value)) as any;
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
