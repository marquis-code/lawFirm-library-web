import { rental_api } from "@/api_factory/modules/rental";
import { useCustomToast } from "@/composables/core/useCustomToast";
import { useCheckout } from "@/composables/modules/banks/useCheckout";
import { useUser } from "@/composables/auth/user";
import { ref, computed } from "vue";

export const useInitializeRentPayment = () => {
  const { user } = useUser();
  const { showToast } = useCustomToast();
  const loading = ref(false);
const router = useRouter()
  const route = useRoute()
  const payload = ref({
    rentalApplicationId: "",
    rentAmount: "",
  });
  const responseObj = ref({});

  // Reactive references for checkout parameters
  const cust_id = computed(() => user.value?.email || "");
  const amount =  ref("");
  const currency = computed(() => "566");
  const transRef = ref(""); // Transaction reference from the API response

  // Pass transRef directly to useCheckout
  const { checkout, paymentResponse } = useCheckout({
    amount,
    cust_id,
    currency,
    transRef, // Pass transRef directly
  });

  const initializeRentPayment = async () => {
    loading.value = true;

    try {
      // Call the API to initialize rent payment
      const res = (await rental_api.$_initialize_rent_payment(payload.value)) as any;

      console.log(res, "API Response");
      loading.value = false;
      if (
        res.type !== "ERROR" &&
        typeof res.data?.trxReference === "string" &&
        res.data.trxReference.trim() !== ""
      ) {
        // Set the transaction reference
        transRef.value = res.data.trxReference;
        amount.value = res.data.amountSubUnit;
        loading.value = false;

        console.log(res?.data, "Transaction initialized successfully");

        // Proceed to checkout
       const response =  await checkout() as any
       console.log(response, 'res from checkout')

        // Update the response object for further use
        responseObj.value = res.data;
        // console.log(res, 'paymewnr res')
        if(res?.status == 201){
          router.push(`/dashboard/listings/${route?.query?.rentalId}/rental-applications/payment-success`);
          window.location.href = `/dashboard/listings/${route?.query?.rentalId}/rental-applications/payment-success`
        }
        // 

        // Uncomment if redirection is required
      } else {
        const errorMessage = res.data?.error || "Transaction reference is invalid.";
        console.error("API Error:", errorMessage);

        // Show error toast
        showToast({
          title: "Error",
          message: errorMessage,
          toastType: "error",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error initializing rent payment:", error);

      // Show generic error toast
      showToast({
        title: "Error",
        message: "Payment process was terminated",
        toastType: "error",
        duration: 3000,
      });
      loading.value = false;
    } finally {
      // Reset the loading state
      loading.value = false;
    }
  };

  // Function to set payload dynamically
  const setPayloadObj = (data: any) => {
    payload.value.rentAmount = Number(data.rentAmount);
    payload.value.rentalApplicationId = data.rentalApplicationId;
  };

  return { initializeRentPayment, loading, payload, responseObj, setPayloadObj };
};
