// useLogin.ts
import { admin_api } from "@/api_factory/modules/admin";
import { useCustomToast } from "@/composables/core/useCustomToast";
import { ref } from "vue";

export const useAddUser = () => {
  const loading = ref(false);
  const { showToast } = useCustomToast();
  const payload = ref({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
  });

  const addUser = async () => {
    loading.value = true;
    const res = (await admin_api.$_add_user(payload.value)) as any;
    if (res.type !== "ERROR") {
      showToast({
        title: "Success",
        message: "User added successfully!",
        toastType: "success",
        duration: 3000,
      });
    }
    loading.value = false;
  };

  return {
    addUser,
    loading,
    payload,
  };
};
