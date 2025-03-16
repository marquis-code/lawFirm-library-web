// useLogin.ts
import { admin_api } from "@/api_factory/modules/admin";
import { useCustomToast } from "@/composables/core/useCustomToast";
import { useUser } from "@/composables/modules/auth/user";
import { ref } from "vue";

export const useLogin = () => {
  const { createUser } = useUser()
  const loading = ref(false);
  const router = useRouter()
  const { showToast } = useCustomToast();
  const login = async (payload: {
    type: "admin",
    email: string,
    password: string
  }) => {
    loading.value = true;
    const res = (await admin_api.$_login(payload)) as any;
    console.log(res, 'res here')
    if (res.type !== "ERROR") {
      createUser (res.data.data)
      showToast({
        title: "Success",
        message: "Login successful",
        toastType: "success",
        duration: 3000,
      });
      router.push('/admin/dashboard')
      // window.location.href = "/admin/dashboard"
    }
    loading.value = false;
  };

  return {
    login,
    loading,
  };
};
