import { ref, watch } from 'vue';
import { admin_api } from "@/api_factory/modules/admin";

export const useGetBooks = () => {
  const loading = ref(false);
  const bookList = ref([]);
  const metadata = ref({
    page: 1,
    limit: 10
  });
  const filters = ref({
    searchTerm: "",
    categoryId: null as string | null
  });

  // Function to fetch books with optional parameters
  const getBooks = async (categoryId?: string | null) => {
    loading.value = true;
    
    // If categoryId is provided, update the filters
    if (categoryId !== undefined) {
      filters.value.categoryId = categoryId;
    }
    
    try {
      const res = await admin_api.$_get_books(
        filters.value.categoryId, 
        filters.value.searchTerm, 
        metadata.value
      ) as any
      
      if (res.type !== "ERROR") {
        bookList.value = res?.data?.data?.rows || [];
      }
      loading.value = false;
      return res.data;
    } catch (error) {
      loading.value = false;
      console.error("Error fetching books:", error);
      return { data: [] };
    }
  };

  onMounted(() => {
    getBooks()
  })


  return {
    getBooks,
    bookList,
    loading,
    filters,
    metadata
  };
};