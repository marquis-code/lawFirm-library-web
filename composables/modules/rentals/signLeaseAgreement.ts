import { rental_api } from "@/api_factory/modules/rental";
import { useCustomToast } from '@/composables/core/useCustomToast'
const { showToast } = useCustomToast();
const loading = ref(false);

const payload = ref({
  leaseAgreement: "<html></html>", // optional
  leaseAgreementSigneeName: "Prince Ita", // optional
  leaseAgreementSignedAt: "2024-10-07", // optional,
  status: "signed", // signed | cancelled
});

export const useSignLeaseAgreement = () => {
  const signLeaseAgreement = async (id: any) => {
    loading.value = true;
    const res = (await rental_api.$_sign_lease_agreement(id, payload.value)) as any;

    if (res.type !== "ERROR") {
        showToast({
            title: "Success",
            message: "Lease agreement was signed successfully.",
            toastType: "success",
            duration: 3000
          });
          return res
    //   useRouter().push("/dashboard/");
    } else {
        console.log(res, 'res here')
        showToast({
            title: "Error",
            message: res?.data?.error,
            toastType: "error",
            duration: 3000
          }); 
    }
    loading.value = false;
  };

  const setPayload = (data: any) => {
    payload.value.leaseAgreement = data.leaseAgreement
    payload.value.leaseAgreementSigneeName = data.leaseAgreementSigneeName
    payload.value.leaseAgreementSignedAt = data.leaseAgreementSignedAt
    payload.value.status = 'signed'
  }

  return { signLeaseAgreement, loading, payload, setPayload };
};
