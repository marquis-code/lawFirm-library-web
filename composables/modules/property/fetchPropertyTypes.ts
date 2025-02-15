import { property_api } from '@/api_factory/modules/property'

export const useGetPropertyTypes = () => {
    const loading = ref(false)
    const propertyTypesList = ref([] as any)

    const { $_fetch_property_types } = property_api

    const getPropertyTypes = async () => {
        loading.value = true

        const res = await $_fetch_property_types() as any

        if (res.type !== 'ERROR') {
            propertyTypesList.value = res.data ?? []
        }
        loading.value = false
    }

    onMounted(() => {
        getPropertyTypes()
    })

    return { getPropertyTypes, loading, propertyTypesList }
}
