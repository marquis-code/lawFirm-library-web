// useLogin.ts
import { admin_api } from "@/api_factory/modules/admin";
import { useCustomToast } from "@/composables/core/useCustomToast";
import { ref } from "vue";

export const useUpdateUser = () => {
  const loading = ref(false);
  const { showToast } = useCustomToast();
  const payload = ref({
    firstname: "",
    lastname: "",
    phone: "",
  });

  const updateUser = async (id: string | any) => {
    loading.value = true;
    const res = (await admin_api.$_update_user(id, payload.value)) as any;
    if (res.type !== "ERROR") {
      showToast({
        title: "Success",
        message: "User updated successfully!",
        toastType: "success",
        duration: 3000,
      });
    }
    loading.value = false;
  };

  return {
    updateUser,
    loading,
    payload,
  };
};
