import { home_api } from "@/api_factory/modules/home";

export const useFetchCatalogueCount = () => {
  const loading = ref(false);
  const catalogueCountObj = ref({});

  const getCatalogueCount = async () => {
    loading.value = true;
    const res = (await home_api.$_fetch_catalog_counts()) as any;
    if (res.type !== "ERROR") {
      catalogueCountObj.value = res.data.data;
    }
    return res.data;
  };

onMounted(() => {
    getCatalogueCount()
})

  return {
    getCatalogueCount,
    catalogueCountObj,
    loading,
  };
};
