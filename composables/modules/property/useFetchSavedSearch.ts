import { ref, onMounted, watch } from 'vue'
import { property_api } from '@/api_factory/modules/property'

export const useGetSavedSearch = () => {
    const loading = ref(false) // Loading state for general properties
    const propertiesList = ref([] as any) // Array to hold all properties
    const currentPage = ref(1)
    const perPage = ref(10000000)
    const totalPages = ref(1) // To store total pages

    const { $_fetch_saved_search } = property_api


    const getSavedSearch = async () => {
        loading.value = true

        // Pass page, perPage, and searchQuery to the API factory
        const res = await $_fetch_saved_search(currentPage.value, perPage.value) as any

        if (res.type !== 'ERROR') {
            propertiesList.value = res?.data?.result ?? [];
            totalPages.value = Math.ceil(res?.data?.metadata?.total / perPage.value) || 1; // Set total pages
            // Ensure currentPage and perPage are set correctly
        }
        loading.value = false
    }

    // Watch currentPage for pagination
    watch(currentPage, () => {
        getSavedSearch() // Fetch properties if no search query
    })


    onMounted(() => {
        getSavedSearch()
    })


    return {
        getSavedSearch,
        loading,
        propertiesList,
        currentPage,
        perPage,
        totalPages
    }
}
