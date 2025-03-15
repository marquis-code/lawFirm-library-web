import { admin_api } from "@/api_factory/modules/admin";

export const useGetUsers = () => {
  const loading = ref(false);
  const users = ref([]);
  const metadata = ref({
    page: 1,
    limit: 10,
  });

  const getUsers = async () => {
    loading.value = true;
    const res = (await admin_api.$_get_users(metadata.value)) as any;
    if (res.type !== "ERROR") {
      users.value = res.data.data;
    }
    return res.data;
  };

  watch(() => metadata, () => {
    getUsers()
  }, { deep: true})

  return {
    getUsers,
    users,
    loading,
  };
};
