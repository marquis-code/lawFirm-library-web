<!-- <template>
    <div ref="searchRef" class="w-full max-w-3xl relative">
      <div class="flex flex-col md:flex-row">

        <div class="relative w-full md:w-auto md:flex-none">
          <button 
            @click="toggleKeywordDropdown" 
            class="flex items-center justify-between w-full md:w-48 bg-white border border-gray-300 rounded-t-md md:rounded-t-none md:rounded-l-md px-4 py-3 text-left"
          >
            <span>{{ selectedSearchType }}</span>
            <ChevronDownIcon class="h-5 w-5" />
          </button>
          
          <div 
            v-if="showKeywordDropdown" 
            class="absolute z-20 w-full md:w-48 bg-white border border-gray-300 rounded-b-md mt-0 shadow-lg"
          >
            <div 
              v-for="option in searchOptions" 
              :key="option" 
              @click="selectSearchType(option)" 
              class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {{ option }}
            </div>
          </div>
        </div>
        
  
        <div class="relative flex-grow">
          <input
            ref="inputRef"
            v-model="searchQuery"
            @input="handleSearchInput"
            type="text"
            placeholder="Search"
            class="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          
    
          <div v-if="loading" class="absolute right-14 top-1/2 transform -translate-y-1/2">
            <LoaderIcon class="h-5 w-5 text-green-700 animate-spin" />
          </div>
        </div>
        

        <button 
          @click="handleSearch" 
          class="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-b-md md:rounded-b-none md:rounded-r-md transition-colors"
        >
          <SearchIcon class="h-5 w-5" />
        </button>
      </div>
      

      <div 
        v-if="showResults && searchQuery.length > 2" 
        class="absolute z-10 w-full bg-white border border-gray-300 rounded-b-md mt-1 shadow-lg max-h-60 overflow-y-auto"
      >
        <div v-if="loading && bookList.length === 0" class="flex items-center justify-center py-4">
          <LoaderIcon class="h-6 w-6 text-green-700 animate-spin mr-2" />
          <span>Searching...</span>
        </div>
        
        <template v-else-if="bookList.length > 0">
          <div 
            v-for="book in bookList" 
            :key="book.id" 
            @click="handleResultClick(book)" 
            class="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 transition-colors"
          >
            <div class="font-medium">{{ book.title }}</div>
            <div v-if="book.author" class="text-sm text-gray-600">{{ book.author }}</div>
          </div>
        </template>
        
        <div v-else-if="!loading && searchQuery.length > 2" class="px-4 py-3 text-gray-500">No results found</div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import { useRouter } from '#app';
  import { SearchIcon, ChevronDownIcon, Loader2 as LoaderIcon } from 'lucide-vue-next';
  import { useSearchBook } from '@/composables/modules/user/useSearchBook';
  
  // Search functionality
  const router = useRouter();
  const searchRef = ref<HTMLElement | null>(null);
  const inputRef = ref<HTMLInputElement | null>(null);
  const searchQuery = ref('');
  const searchOptions = ['Keywords', 'Title', 'Author', 'Subject'];
  const selectedSearchType = ref('Keywords');
  const showKeywordDropdown = ref(false);
  const showResults = ref(false);
  const debounceTimer = ref<NodeJS.Timeout | null>(null);
  
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
        // Determine category_id based on search type
        let categoryId = '';
        if (selectedSearchType.value === 'Subject') {
          categoryId = searchQuery.value;
        }
        
        // Call the searchBook method with the correct parameters
        searchBook({
          str: searchQuery.value,
          category_id: categoryId
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
    selectedSearchType.value = option;
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
    router.push({
      path: '/search',
      query: {
        type: selectedSearchType.value.toLowerCase(),
        q: searchQuery.value,
        category_id: book.category_id || ''
      }
    });
    showResults.value = false;
  };
  
  const handleSearch = () => {
    if (searchQuery.value) {
      router.push({
        path: '/search',
        query: {
          type: selectedSearchType.value.toLowerCase(),
          q: searchQuery.value
        }
      });
    }
  };
  
  // Close dropdowns when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    if (searchRef.value && !searchRef.value.contains(event.target as Node)) {
      showKeywordDropdown.value = false;
      showResults.value = false;
    }
  };
  
  onMounted(() => {
    document.addEventListener('click', handleClickOutside);
  });
  
  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
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
  
   -->


   <template>
    <div ref="searchRef" class="w-full max-w-3xl relative">
      <div class="flex flex-col md:flex-row">
        <!-- Search Type Dropdown -->
        <div class="relative w-full md:w-auto md:flex-none">
          <button 
            @click="toggleKeywordDropdown" 
            class="flex items-center justify-between w-full md:w-48 bg-white border border-gray-300 rounded-md px-4 py-3 text-left"
          >
            <span>{{ selectedSearchType }}</span>
            <ChevronDownIcon class="h-5 w-5" />
          </button>
          
          <div 
            v-if="showKeywordDropdown" 
            class="absolute z-20 w-full md:w-48 bg-white border border-gray-300 rounded-b-md mt-1 shadow-lg"
          >
            <div 
              v-for="option in searchOptions" 
              :key="option" 
              @click="selectSearchType(option)" 
              class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {{ option }}
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
            class="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
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
      
      <!-- Search Results Dropdown -->
      <div 
        v-if="showResults && searchQuery.length > 2" 
        class="absolute z-10 w-full bg-white border border-gray-300 rounded-b-md mt-1 shadow-lg max-h-60 overflow-y-auto"
      >
        <div v-if="loading && bookList.length === 0" class="flex items-center justify-center py-4">
          <LoaderIcon class="h-6 w-6 text-green-700 animate-spin mr-2" />
          <span>Searching...</span>
        </div>
        
        <template v-else-if="bookList.length > 0">
          <div 
            v-for="book in bookList" 
            :key="book.id" 
            @click="handleResultClick(book)" 
            class="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 transition-colors"
          >
            <div class="font-medium">{{ book.title }}</div>
            <div v-if="book.author" class="text-sm text-gray-600">{{ book.author }}</div>
          </div>
        </template>
        
        <div v-else-if="!loading && searchQuery.length > 2" class="px-4 py-3 text-gray-500">No results found</div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import { useRouter } from '#app';
  import { SearchIcon, ChevronDownIcon, Loader2 as LoaderIcon } from 'lucide-vue-next';
  import { useSearchBook } from '@/composables/modules/user/useSearchBook';
  
  // Search functionality
  const router = useRouter();
  const searchRef = ref<HTMLElement | null>(null);
  const inputRef = ref<HTMLInputElement | null>(null);
  const searchQuery = ref('');
  const searchOptions = ['Keyword', 'Title', 'Author', 'Subject'];
  const selectedSearchType = ref('Keyword');
  const showKeywordDropdown = ref(false);
  const showResults = ref(false);
  const debounceTimer = ref<NodeJS.Timeout | null>(null);
  
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
        // Determine category_id based on search type
        let categoryId = '';
        if (selectedSearchType.value === 'Subject') {
          categoryId = searchQuery.value;
        }
        
        // Call the searchBook method with the correct parameters
        searchBook({
          str: searchQuery.value,
          category_id: categoryId
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
    selectedSearchType.value = option;
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
    router.push({
      path: '/search',
      query: {
        type: selectedSearchType.value.toLowerCase(),
        q: searchQuery.value,
        category_id: book.category_id || ''
      }
    });
    showResults.value = false;
  };
  
  const handleSearch = () => {
    if (searchQuery.value) {
      router.push({
        path: '/search',
        query: {
          type: selectedSearchType.value.toLowerCase(),
          q: searchQuery.value
        }
      });
    }
  };
  
  // Close dropdowns when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    if (searchRef.value && !searchRef.value.contains(event.target as Node)) {
      showKeywordDropdown.value = false;
      showResults.value = false;
    }
  };
  
  onMounted(() => {
    document.addEventListener('click', handleClickOutside);
  });
  
  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
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
  
  