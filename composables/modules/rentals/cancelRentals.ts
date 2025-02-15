import { rental_api } from "@/api_factory/modules/rental";
import { useCustomToast } from '@/composables/core/useCustomToast'
const { showToast } = useCustomToast();

const loading = ref(false)
const router = useRouter()
const route = useRoute()

export const useCancelRental = () => {
	const cancelRental = async (id: string | number) => {
		loading.value = true
		const res = await rental_api.$_cancel_rental(id) as any

        if (res.type !== 'ERROR') {
			showToast({
				title: "Success",
				message: "Rental application was cancelled successfully!",
				toastType: "success",
				duration: 3000
			  });
			  router.push(`/dashboard/listings/${route.params.id}/rental-applications/cancellation-success`)
        } else {
			showToast({
				title: "Error",
				message: "Something went wrong while cancelling rental application.",
				toastType: "error",
				duration: 3000
			  });
		}
        loading.value = false
	}

	return { cancelRental, loading }
}
