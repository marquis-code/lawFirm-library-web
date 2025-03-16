import { admin_api } from "@/api_factory/modules/admin";

export const useFetchDashboardStatsObj = () => {
  const loading = ref(false);
  const dashboardObj = ref({});

  const getDashboardStatsObj = async () => {
    loading.value = true;
    const res = (await admin_api.$_fetch_dashboard_data()) as any;
    if (res.type !== "ERROR") {
      dashboardObj.value = res.data.data;
    }
    return res.data;
  };

onMounted(() => {
    getDashboardStatsObj()
})

  return {
    getDashboardStatsObj,
    dashboardObj,
    loading,
  };
};
