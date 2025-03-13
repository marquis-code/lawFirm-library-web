<template>
    <div class="bg-green-50 min-h-screen py-8">
      <div class="container mx-auto px-4">
        <!-- Search Bar -->
        <div class="mb-8 flex flex-col md:flex-row">
          <div class="relative w-full md:w-auto md:flex-none">
            <button @click="toggleKeywordDropdown" class="flex items-center justify-between w-full md:w-48 bg-white border border-gray-300 rounded-l px-4 py-3 text-left">
              <span>{{ selectedSearchType }}</span>
              <span><ChevronDownIcon class="h-5 w-5" /></span>
            </button>
            <div v-if="showKeywordDropdown" class="absolute z-10 w-full md:w-48 bg-white border border-gray-300 rounded-b mt-1 shadow-lg">
              <div v-for="option in searchOptions" :key="option" @click="selectSearchType(option)" class="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                {{ option }}
              </div>
            </div>
          </div>
          <input v-model="searchQuery" type="text" placeholder="Search" class="flex-grow border border-gray-300 px-4 py-3 focus:outline-none" />
          <button @click="search" class="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-r transition-colors">
            <SearchIcon class="h-5 w-5" />
          </button>
        </div>
        
        <!-- Search Results Header -->
        <h1 class="text-3xl font-serif text-green-800 mb-8">Search Results</h1>
        
        <!-- Results List -->
        <div class="space-y-6">
          <div v-for="(result, index) in searchResults" :key="index" class="bg-white rounded-lg shadow-md p-6">
            <div class="flex justify-between items-start">
              <div>
                <h2 class="text-xl font-serif text-green-800 mb-2">
                  <span class="font-normal text-gray-500 mr-2">({{ index + 1 }})</span>
                  <span class="font-normal mr-2">Title:</span>
                  <NuxtLink :to="`/book/${result.id}`" class="text-green-700 hover:underline">{{ result.title }}</NuxtLink>
                </h2>
                <p class="mb-2">
                  <span class="font-normal mr-2">Author:</span>
                  {{ result.author }}
                </p>
                <div class="mb-4">
                  <p class="font-normal mb-1">Brief Description:</p>
                  <p class="text-gray-700">{{ result.description }}</p>
                </div>
                <div class="pt-4 border-t border-gray-200 flex flex-wrap gap-4">
                  <p><span class="font-normal mr-2">Category:</span> {{ result.category }}</p>
                  <p><span class="font-normal mr-2">Year:</span> {{ result.year }}</p>
                  <p><span class="font-normal mr-2">Catalog No:</span> {{ result.catalogNo }}</p>
                </div>
              </div>
              <button class="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded transition-colors">
                View all
              </button>
            </div>
            <div class="flex justify-end mt-4">
              <button class="flex items-center text-green-700 hover:text-green-800">
                <ListIcon class="h-5 w-5 mr-1" />
                <span>Add to list</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { SearchIcon, ChevronDownIcon, ListIcon } from 'lucide-vue-next';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  
  // Search functionality
  const searchQuery = ref('');
  const searchOptions = ['Keyword', 'Title', 'Author', 'Subject'];
  const selectedSearchType = ref('Keyword');
  const showKeywordDropdown = ref(false);
  
  // Mock search results
  const searchResults = ref([
    {
      id: 1,
      title: 'The Law Crowner',
      author: 'Barr. Olatunji Adedeji',
      description: 'This comprehensive guide provides a clear and concise overview of contract law principles. From formation to performance.....',
      category: 'Books',
      year: '2023',
      catalogNo: 'IBN120653'
    },
    {
      id: 2,
      title: 'The Law Crowner',
      author: 'Barr. Olatunji Adedeji',
      description: 'This comprehensive guide provides a clear and concise overview of contract law principles. From formation to performance.....',
      category: 'Books',
      year: '2023',
      catalogNo: 'IBN120653'
    },
    {
      id: 3,
      title: 'The Law Crowner',
      author: 'Barr. Olatunji Adedeji',
      description: 'This comprehensive guide provides a clear and concise overview of contract law principles. From formation to performance.....',
      category: 'Books',
      year: '2023',
      catalogNo: 'IBN120653'
    }
  ]);
  
  const toggleKeywordDropdown = () => {
    showKeywordDropdown.value = !showKeywordDropdown.value;
  };
  
  const selectSearchType = (option: string) => {
    selectedSearchType.value = option;
    showKeywordDropdown.value = false;
  };
  
  const search = () => {
    selectedSearchType.value = option;
    showKeywordDropdown.value = false;
  };
  
  // const search = () => {
  //   // Perform search with current query and type
  //   console.log(`Searching for ${searchQuery.value} in ${selectedSearchType.value}`);
  //   // In a real app, this would call an API endpoint
  // };
  
  // Close dropdown when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    if (showKeywordDropdown.value) {
      showKeywordDropdown.value = false;
    }
  };
  
  onMounted(() => {
    // Get search parameters from URL
    const queryParam = route.query.q as string;
    const typeParam = route.query.type as string;
    
    if (queryParam) {
      searchQuery.value = queryParam;
    }
    
    if (typeParam) {
      const capitalizedType = typeParam.charAt(0).toUpperCase() + typeParam.slice(1);
      if (searchOptions.includes(capitalizedType)) {
        selectedSearchType.value = capitalizedType;
      }
    }
    
    document.addEventListener('click', handleClickOutside);
  });
  </script>