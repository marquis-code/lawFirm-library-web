// useLogin.ts
import { user_api } from "@/api_factory/modules/user";
import { useCustomToast } from "@/composables/core/useCustomToast";
import { useUser } from "@/composables/modules/auth/user";
import { ref } from "vue";

export const useLogin = () => {
  const { createUser } = useUser()
  const loading = ref(false);
  const { showToast } = useCustomToast();
  const router = useRouter()
  const login = async (payload: {
    type: "user",
    email: string,
    password: string
  }) => {
    loading.value = true;
    const res = (await user_api.$_user_login(payload)) as any;
    if (res.type !== "ERROR") {
      createUser (res.data.data)
      showToast({
        title: "Success",
        message: "Login successful",
        toastType: "success",
        duration: 3000,
      });
      // router.push('/')

      if(res.data.data.role === 'admin'){
        router.push('/admin/dashboard')
      } else {
        router.push('/')
      }
    }
    loading.value = false;
  };

  return {
    login,
    loading,
  };
};
