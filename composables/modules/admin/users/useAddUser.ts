import { admin_api } from "@/api_factory/modules/admin";
import { useCustomToast } from "@/composables/core/useCustomToast";
import { ref } from "vue";

// Define the user interface
interface UserData {
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  password: string;
}

export const useAddUser = () => {
  const loading = ref(false);
  const { showToast } = useCustomToast();

  const addUser = async (userData: UserData) => {
    loading.value = true;
    try {
      const res = (await admin_api.$_add_user(userData)) as any;
      if (res.type !== "ERROR") {
        showToast({
          title: "Success",
          message: "User added successfully!",
          toastType: "success",
          duration: 3000,
        });
        return res.data;
      } else {
        showToast({
          title: "Error",
          message: res.message || "Failed to add user",
          toastType: "error",
          duration: 5000,
        });
      }
    } catch (error: any) {
      showToast({
        title: "Error",
        message: error.message || "An unexpected error occurred",
        toastType: "error",
        duration: 5000,
      });
    } finally {
      loading.value = false;
    }
  };

  return {
    addUser,
    loading,
  };
};