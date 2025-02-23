import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router'; // Import useRoute to access query parameters
import { property_api } from '@/api_factory/modules/property';
// import { debounce } from 'lodash';
import pkg from 'lodash'; // Import lodash as a default
const { debounce } = pkg; // Destructure debounce from lodash
import { useCustomToast } from '@/composables/core/useCustomToast';
import { useFilterProperty } from '@/composables/modules/property/useFilterListings';

const { showToast } = useCustomToast();

export const useGetProperties = () => {
  const route = useRoute(); // Access the route object

  const loadingProperties = ref(false); // Loading state for general properties
  const loadingSearch = ref(false); // Loading state for search operations
  const propertiesList = ref([] as any); // Array to hold all properties
  const searchResults = ref([] as any); // Array to hold search results
  const searchQuery = ref('');
  const segmentId = ref(route.query.tab || ''); // Segment ID obtained from the query parameter
  const currentPage = ref(1);
  const perPage = ref(10000000);
  const totalPages = ref(1); // To store total pages
  const sortBy = ref('all'); // To store the sort type
  const { properties } = useFilterProperty();

  const { $_fetch_properties } = property_api;

  // Sorting logic based on the "sortBy" ref
  const sortProperties = (properties) => {
    if (sortBy.value === 'newest') {
      return properties.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy.value === 'oldest') {
      return properties.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else if (sortBy.value === 'lowToHigh') {
      return properties.sort((a, b) => a.price - b.price);
    } else if (sortBy.value === 'highToLow') {
      return properties.sort((a, b) => b.price - a.price);
    } else {
      return properties; // Default sorting for 'all'
    }
  };

  const getProperties = async () => {
    loadingProperties.value = true;

    const res = await $_fetch_properties(currentPage.value, perPage.value, searchQuery.value, segmentId.value) as any;
    console.log(res, 'properties res here')
    if (res.type !== 'ERROR') {
      const properties = res?.data?.result ?? [];
      propertiesList.value = sortProperties(properties); // Sort the properties before setting them
      totalPages.value = Math.ceil(res?.data?.metadata?.total / perPage.value) || 1; // Set total pages
    }
    loadingProperties.value = false;
  };

  const searchProperties = async () => {
    loadingSearch.value = true; // Set loading state for search

    const res = await $_fetch_properties(1, perPage.value, searchQuery.value) as any; // Always start from page 1 for search
     console.log(res, 'search results here')
    if (res.status === 200) {
      const results = res?.data?.result ?? [];
      searchResults.value = sortProperties(results); // Sort search results before setting them
      console.log(searchResults.value, 'search resultes heres')

      if (results.length === 0) {
        showToast({
          title: 'No Results',
          message: 'No search result found',
          toastType: 'info',
          duration: 3000,
        });
      }
    }

    loadingSearch.value = false; // Reset loading state
  };

  const debouncedSearchProperties = debounce(searchProperties, 300);

  // Watchers
  watch(searchQuery, () => {
    currentPage.value = 1; // Reset to page 1 for new search
    debouncedSearchProperties(); // Call the debounced version
  });

  watch(() => route.query.tab, (newTab, oldTab) => {
    if (newTab !== oldTab) {
      segmentId.value = newTab || ''; // Update segmentId with the new tab value
      currentPage.value = 1; // Reset to page 1
      getProperties(); // Refetch properties
    }
  });

  watch(properties, (newVal) => {
    propertiesList.value = newVal;
  });

  watch(currentPage, () => {
    if (!searchQuery.value) {
      getProperties(); // Fetch properties if no search query
    }
  });

  watch(sortBy, () => {
    currentPage.value = 1; // Reset page for new sort
    if (!searchQuery.value) {
      getProperties(); // Refetch properties on sort change if no search
    } else {
      debouncedSearchProperties(); // Refetch search results on sort change
    }
  });

  onMounted(() => {
    segmentId.value = route.query.tab || ''; // Initialize segmentId from the query parameter
    getProperties();
  });

  const clearSearch = () => {
    searchQuery.value = '';
    searchResults.value = []; // Clear search results when search is cleared
  };

  return {
    getProperties,
    debouncedSearchProperties,
    loadingProperties,
    loadingSearch, // Expose loading state for search
    propertiesList,
    searchResults, // Expose search results
    searchQuery,
    segmentId,
    currentPage,
    perPage,
    totalPages,
    clearSearch,
    sortBy, // Expose sortBy for changing sort type from the component
  };
};
