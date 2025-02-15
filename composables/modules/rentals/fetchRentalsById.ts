import { rental_api } from '@/api_factory/modules/rental'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const rentalObj = ref<Record<string, any>>({})

export const useFetchRental = () => {
    const loading = ref(false)
    const error = ref<string | null>(null)
    const route = useRoute() // Access the current route

    const { $_fetch_single_rental } = rental_api

    // Get the property ID from the route parameter
    const queryId = ref(route.query.rentalId as string || '')

    const getRental = async () => {
        if (!queryId.value) {
            error.value = 'No property ID available to fetch'
            return
        }

        loading.value = true
        error.value = null // Reset error state
        try {
            const res = await $_fetch_single_rental(queryId.value) as any
            rentalObj.value = res.data
        } catch (e) {
            error.value = 'An unexpected error occurred'
        } finally {
            loading.value = false
        }
    }

    onMounted(() => {
        getRental()
    })

    return { rentalObj, loading, error, getRental }
}
