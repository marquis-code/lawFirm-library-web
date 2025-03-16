import { admin_api } from "@/api_factory/modules/admin";
import { useCustomToast } from "@/composables/core/useCustomToast";
import { ref } from "vue";

// Define the user interface
interface UserData {
  id?: string;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
}

export const useUpdateUser = () => {
  const loading = ref(false);
  const { showToast } = useCustomToast();

  const updateUser = async (userData: UserData) => {
    loading.value = true;
    try {
      // Extract id from userData and use the rest as the payload
      const { id, ...payload } = userData;
      
      if (!id) {
        throw new Error("User ID is required for update");
      }
      
      const res = (await admin_api.$_update_user(id, payload)) as any;
      
      if (res.type !== "ERROR") {
        showToast({
          title: "Success",
          message: "User updated successfully!",
          toastType: "success",
          duration: 3000,
        });
        return res.data;
      } else {
        showToast({
          title: "Error",
          message: res.message || "Failed to update user",
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
    updateUser,
    loading,
  };
};