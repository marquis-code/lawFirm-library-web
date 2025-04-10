import { user_api } from "@/api_factory/modules/user";
import { useCustomToast } from "@/composables/core/useCustomToast";

export const useSaveList = () => {
  const loading = ref(false);

  const saveList = async (payload: any) => {
    loading.value = true;
    const { showToast } = useCustomToast();
    const res = await user_api.$_save_list(payload) as any
    if (res.type !== "ERROR") {
        showToast({
            title: "Success",
            message: "Item was added to list successfully",
            toastType: "success",
            duration: 3000,
          });
    }
    return res.data;
  };

  return {
    saveList,
    loading,
  };
};
