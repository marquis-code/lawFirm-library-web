<template>
  <div ref="searchRef" class="w-full max-w-3xl relative">
    <div class="flex flex-col md:flex-row">
      <!-- Search Type Dropdown -->
      <div class="relative w-full md:w-auto md:flex-none">
        <button 
          @click="toggleKeywordDropdown" 
          class="flex items-center justify-between w-full md:w-48 bg-white border border-gray-300 rounded-md px-4 py-4 text-left"
        >
          <span>{{ selectedSearchType }}</span>
          <ChevronDownIcon class="h-5 w-5" />
        </button>
        
        <div 
          v-if="showKeywordDropdown" 
          class="absolute z-[9999] w-full md:w-48 bg-white border border-gray-300 rounded-b-md mt-1 shadow-lg"
        >
          <div 
            v-for="option in bookCategoriesList" 
            :key="option.uuid" 
            @click="selectSearchType(option)" 
            class="px-4 py-4 hover:bg-gray-100 cursor-pointer"
          >
            {{ option.name }}
          </div>
        </div>
      </div>
      
      <!-- Search Input -->
      <div class="relative flex-grow">
        <input
          ref="inputRef"
          v-model="searchQuery"
          @input="handleSearchInput"
          type="text"
          placeholder="Search"
          class="w-full border border-gray-300 px-4 py-4 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        
        <!-- Loading Indicator -->
        <div v-if="loading" class="absolute right-14 top-1/2 transform -translate-y-1/2">
          <LoaderIcon class="h-5 w-5 text-green-700 animate-spin" />
        </div>
      </div>
      
      <!-- Search Button -->
      <button 
        @click="handleSearch" 
        class="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-md transition-colors"
      >
        <SearchIcon class="h-5 w-5" />
      </button>
    </div>
    
    <!-- Search Results Modal -->
    <div 
      v-if="showResults && searchQuery.length > 2" 
      class="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-start justify-center pt-20"
      @click.self="showResults = false"
    >
      <div class="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[70vh] overflow-hidden">
        <div class="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 class="font-medium text-lg">Search Results</h3>
          <button @click="showResults = false" class="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="overflow-y-auto max-h-[calc(70vh-4rem)]">
          <div v-if="loading && bookList.length === 0" class="flex items-center justify-center py-8">
            <LoaderIcon class="h-8 w-8 text-green-700 animate-spin mr-3" />
            <span class="text-lg">Searching...</span>
          </div>
          
          <template v-else-if="bookList.length > 0">
            <div 
              v-for="book in bookList" 
              :key="book.uuid" 
              @click="handleResultClick(book)" 
              class="px-6 py-4 hover:bg-gray-100 cursor-pointer border-b border-gray-100 transition-colors"
            >
              <div class="font-medium text-lg">{{ book.title }}</div>
              <div v-if="book.author" class="text-gray-600">{{ book.author }}</div>
            </div>
          </template>
          
          <div v-else-if="!loading && searchQuery.length > 2" class="px-6 py-8 text-gray-500 text-center text-lg">
            No results found for "{{ searchQuery }}"
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useFetchBookCataloges } from '@/composables/modules/home/useFetchBookCatalogue'
import { useRouter } from '#app';
import { SearchIcon, ChevronDownIcon, Loader2 as LoaderIcon } from 'lucide-vue-next';
import { useSearchBook } from '@/composables/modules/user/useSearchBook';

// Search functionality
const router = useRouter();
const searchRef = ref<HTMLElement | null>(null);
const inputRef = ref<HTMLInputElement | null>(null);
const searchQuery = ref('');
const selectedSearchType = ref('Keyword');
const showKeywordDropdown = ref(false);
const showResults = ref(false);
const debounceTimer = ref<NodeJS.Timeout | null>(null);
const { bookCategoriesList, loading: fetching } = useFetchBookCataloges()
const selectedCategory = ref('')

// Get search functionality from composable
const { searchBook, bookList, loading } = useSearchBook();

// Handle search input with debounce
const handleSearchInput = () => {
  // Clear previous timer
  if (debounceTimer.value) {
    clearTimeout(debounceTimer.value);
  }
  
  if (searchQuery.value.length > 2) {
    showResults.value = true;
    
    // Set new timer (300ms debounce)
    debounceTimer.value = setTimeout(() => {
      // Call the searchBook method with the correct parameters
      searchBook({
        str: searchQuery.value,
        category_id: selectedCategory.value
      });
    }, 300);
  } else {
    showResults.value = false;
  }
};

const toggleKeywordDropdown = () => {
  showKeywordDropdown.value = !showKeywordDropdown.value;
};

const selectSearchType = (option: string) => {
  console.log(option, 'option here')
  selectedCategory.value = option.uuid
  selectedSearchType.value = option?.name;
  showKeywordDropdown.value = false;
  if (inputRef.value) {
    inputRef.value.focus();
  }
  
  // Re-trigger search if there's a query
  if (searchQuery.value.length > 2) {
    handleSearchInput();
  }
};

const handleResultClick = (book: any) => {
  console.log(book, 'selected book')
  router.push({
    path: '/search',
    query: {
      keyword: selectedSearchType.value,
      type: selectedSearchType.value.toLowerCase(),
      q: searchQuery.value,
      category_id: book.category_id || ''
    }
  });
  showResults.value = false;
};

const handleSearch = () => {
  console.log(selectedCategory.value)
  if (searchQuery.value) {
    router.push({
      path: '/search',
      query: {
        keyword: selectedSearchType.value,
        type: selectedSearchType.value.toLowerCase(),
        q: searchQuery.value,
        category_id: selectedCategory.value
      }
    });
  }
};

// Close dropdowns when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  if (searchRef.value && !searchRef.value.contains(event.target as Node)) {
    showKeywordDropdown.value = false;
    // Don't close search results when clicking outside since it's now a modal with its own close button
    // and click.self handler
  }
};

// Add escape key handler to close modal
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && showResults.value) {
    showResults.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  document.addEventListener('keydown', handleKeyDown);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
  document.removeEventListener('keydown', handleKeyDown);
  if (debounceTimer.value) {
    clearTimeout(debounceTimer.value);
  }
});
</script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>