import { admin_api } from "@/api_factory/modules/admin";

export const useFetchProfile = () => {
  const loading = ref(false);
  const adminProfileObj = ref({});

  const getAdminProfile = async () => {
    loading.value = true;
    const res = (await admin_api.$_get_admin_profile()) as any;
    if (res.type !== "ERROR") {
      adminProfileObj.value = res?.data?.data || {};
    }
    loading.value = false
  };

  const userObj = localStorage.getItem('user')as any
  const parsedObj = JSON.parse(userObj)

  if(Object.keys(parsedObj).length){
    getAdminProfile()
  }

  return {
    getAdminProfile,
    adminProfileObj,
    loading,
  };
};
