import { admin_api } from "@/api_factory/modules/admin";

export const useGetClientFiles = () => {
  const loading = ref(false);
  const clientFilesList = ref([]);
  const metadata = ref({
    page: 1,
    limit: 10,
  });

  const getClientFiles = async () => {
    loading.value = true;
    const res = (await admin_api.$_get_client_files(metadata.value)) as any;
    if (res.type !== "ERROR") {
      clientFilesList.value = res.data.data.rows;
    }
    loading.value = false
  };

  onMounted(() => {
    getClientFiles()
  })

  return {
    getClientFiles,
    clientFilesList,
    loading,
  };
};
