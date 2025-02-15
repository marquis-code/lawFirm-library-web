import { ref, onMounted } from 'vue';
import { property_api } from '@/api_factory/modules/property';

export const useGetCommonAreas = () => {
    const loading = ref(false);
    const commonAreasList = ref<any[]>([]);


    const { $_fetch_common_areas } = property_api;

    const getCommonAreas = async () => {
        loading.value = true;

        const res = await $_fetch_common_areas() as any;

        if (res.type !== 'ERROR') {
            commonAreasList.value = res?.data || [];
        }
        
        loading.value = false;
    };


    onMounted(() => {
        getCommonAreas();
    });

    return { 
        getCommonAreas, 
        loading, 
        commonAreasList
    };
};
