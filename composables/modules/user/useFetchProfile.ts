import { user_api } from "@/api_factory/modules/user";

export const useFetchProfile = () => {
  const loading = ref(false);
  const userProfileObj = ref({});

  const getUserProfile = async () => {
    loading.value = true;
    const res = (await user_api.$_fetch_user_profile()) as any;
    if (res.type !== "ERROR") {
      userProfileObj.value = res.data.data;
    }
    return res.data;
  };

// onMounted(() => {
//     getUserProfile()
// })

const userObj = localStorage.getItem('user')as any
const parsedObj = JSON.parse(userObj)

onMounted(() => {
  if(Object.keys(parsedObj).length){
    getUserProfile()
  }
})


  return {
    getUserProfile,
    userProfileObj,
    loading,
  };
};
