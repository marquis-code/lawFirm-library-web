import { rental_api } from "@/api_factory/modules/rental";
import { useFetchProperty } from "@/composables/modules/property/fetchProperty";
const { propertyObj, loading } = useFetchProperty();
const route = useRoute() as any;

export const useGetRental = () => {
  const loadingRental = ref(false);
  const rentalObj = ref([] as any);
  const route = useRoute() as any;
  const { $_fetch_single_rental } = rental_api;

  const getRental = async (rentalId?: any) => {
    console.log(rentalId, 'property obj here')
    const route = useRoute() as any;
    
    loadingRental.value = true;
    try {
      const res = (await $_fetch_single_rental(route?.query?.rentalId)) as any;
      if (res.type !== "ERROR") {
        rentalObj.value = res?.data
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      loadingRental.value = false;
    }
  };

  watch(
    () => route,
    (newId, oldId) => {
        console.log(route?.query?.rentalId, 'updated route here 00000000', propertyObj)
        // fetchPolicyById();
        getRental();
    },
    { immediate: true } // Ensures the watcher runs immediately
);
  onMounted(() => {
    getRental();
  });

  return {
    getRental,
    loadingRental,
    rentalObj,
  };
};
