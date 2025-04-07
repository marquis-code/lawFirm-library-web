<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Search Header -->
    <div class="bg-[#D6FEE8] py-6 px-4">
      <div class="container mx-auto max-w-5xl flex flex-col md:flex-row gap-3 items-center">
        <div class="relative w-full md:w-64">
          <button 
            @click="toggleKeywordDropdown" 
            class="flex items-center justify-between w-full bg-white border border-gray-300 rounded-md px-4 py-3 text-left"
          >
            <span>{{ selectedSearchType }}</span>
            <ChevronDownIcon class="h-5 w-5" />
          </button>
          
          <div 
            v-if="showKeywordDropdown" 
            class="absolute z-20 w-full bg-white border border-gray-300 rounded-b-md mt-1 shadow-lg"
          >
            <div 
              v-for="option in bookCategoriesList" 
              :key="option.uuid || option.id" 
              @click="selectSearchType(option)" 
              class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {{ option.name }}
            </div>
          </div>
        </div>
        
        <div class="relative flex-grow">
          <input 
            v-model="searchQuery" 
            @input="handleSearchInput"
            type="text" 
            placeholder="Search" 
            class="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none" 
          />
          
          <div v-if="loading" class="absolute right-14 top-1/2 transform -translate-y-1/2">
            <LoaderIcon class="h-5 w-5 text-green-700 animate-spin" />
          </div>
        </div>
        
        <button 
          @click="performSearch" 
          class="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-md transition-colors"
        >
          <SearchIcon class="h-5 w-5" />
        </button>
      </div>
    </div>
    
    <!-- Search Results -->
    <div class="container mx-auto max-w-5xl px-4 py-8">
      <h1 class="text-3xl font-serif text-green-800 mb-6">Search Results</h1>
      
      <div v-if="loading && !initialLoad" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
      </div>
      
      <div v-else-if="bookList.length === 0 && !initialLoad" class="text-center py-12">
        <p class="text-gray-600">No books found matching your search criteria.</p>
      </div>
      
      <div v-else>
        <!-- Book Results -->
        <div v-for="(book, index) in bookList" :key="book.id" class="mb-6">
          <div class="bg-white rounded-lg shadow-sm p-6">
            <div class="mb-4">
              <div class="flex justify-between items-start">
                <div>
                  <div class="flex items-start gap-2">
                    <span class="text-gray-600">({{ index + 1 }})</span>
                    <div>
                      <div class="font-medium">
                        <span class="text-gray-600">Title:</span> 
                        <span class="text-green-700">{{ book.title }}</span>
                      </div>
                      <div class="mt-1">
                        <span class="text-gray-600">Author:</span> {{ book.author }}
                      </div>
                      <div class="mt-2">
                        <span class="text-gray-600">Brief Description:</span>
                        <p class="mt-1 text-gray-800">{{ book.description }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <button @click="addToList(book)" class="text-green-700 hover:text-green-800">
                  <ListIcon class="h-6 w-6" />
                  <span class="text-xs block">Add to list</span>
                </button>
              </div>
            </div>
            
            <div class="border-t border-gray-200 pt-4 mt-4">
              <div class="flex flex-wrap justify-between items-center">
                <div class="flex flex-wrap gap-x-6 text-sm text-gray-600">
                  <span>Category: {{ book.category || 'Books' }}</span>
                  <span>Year: {{ book.year || '2023' }}</span>
                  <span>Catalog No: {{ book.catalog_no || 'IBN120653' }}</span>
                </div>
                <button 
                  @click="viewBookDetails(book, index)" 
                  class="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-md text-sm transition-colors"
                >
                  View all
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Book Details Modal with Flip Animation -->
    <Teleport to="body">
      <div 
        v-if="showBookDetails" 
        class="fixed inset-0 w-full bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        @click="closeBookDetails"
      >
        <div 
          class="relative w-[500px]"
          @click.stop
        >
          <!-- Flip Card Container -->
          <div 
            class="relative w-full transition-transform duration-700 transform-style-preserve-3d"
            :class="{ 'rotate-y-180': showDetailsBack }"
          >
            <!-- Front Side (Search Result) -->
            <div 
              class="absolute w-full bg-white rounded-lg shadow-lg p-6 backface-hidden"
              :class="{ 'invisible': showDetailsBack }"
            >
              <div class="flex justify-between items-start">
                <div>
                  <div class="flex items-start gap-2">
                    <span class="text-gray-600">({{ selectedBookIndex + 1 }})</span>
                    <div>
                      <div class="font-medium">
                        <span class="text-gray-600">Title:</span> 
                        <span class="text-green-700">{{ selectedBook.title }}</span>
                      </div>
                      <div class="mt-1">
                        <span class="text-gray-600">Author:</span> {{ selectedBook.author }}
                      </div>
                      <div class="mt-2">
                        <span class="text-gray-600">Brief Description:</span>
                        <p class="mt-1 text-gray-800">{{ selectedBook.description }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <button class="text-green-700 hover:text-green-800">
                  <ListIcon class="h-6 w-6" />
                  <span class="text-xs block">Add to list</span>
                </button>
              </div>
              
              <div class="border-t border-gray-200 pt-4 mt-4">
                <div class="flex flex-wrap justify-between items-center">
                  <div class="flex flex-wrap gap-x-6 text-sm text-gray-600">
                    <span>Category: {{ selectedBook.category || 'Books' }}</span>
                    <span>Year: {{ selectedBook.year || '2023' }}</span>
                    <span>Catalog No: {{ selectedBook.catalog_no || 'IBN120653' }}</span>
                  </div>
                  <button 
                    @click="flipToDetails" 
                    class="bg-green-700 hover:bg-green-800 mt-6 text-white px-4 py-2 rounded-md text-sm transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Back Side (Book Details) -->
            <div 
              class="absolute w-full bg-white rounded-lg shadow-lg p-6 backface-hidden rotate-y-180"
              :class="{ 'invisible': !showDetailsBack }"
            >
              <div class="flex flex-col md:flex-row gap-6">
                <div class="md:w-1/3">
                  <div class="text-2xl font-bold mb-2">{{ selectedBookIndex + 1 }}.</div>
                  <img 
                    :src="selectedBook.cover_image || '/placeholder.svg?height=300&width=200'" 
                    :alt="selectedBook.title"
                    class="w-full h-auto object-cover rounded-md shadow-md"
                  />
                </div>
                
                <div class="md:w-2/3">
                  <div class="flex justify-between items-start">
                    <div>
                      <div class="text-green-700 font-medium">Title: {{ selectedBook.title }}</div>
                      <div class="mt-2">Catalog No: {{ selectedBook.catalog_no || 'IBN120653' }}</div>
                      <div class="mt-2">Author: {{ selectedBook.author }}</div>
                      <div class="mt-2">Category: {{ selectedBook.category || 'Book' }}</div>
                      <div class="mt-2">Year: {{ selectedBook.year || '2023' }}</div>
                      <div class="mt-2">Availability: <span class="text-green-600">Available</span></div>
                      <div class="mt-2">Location: Third shelf</div>
                    </div>
                    <button class="text-green-700 hover:text-green-800">
                      <ListIcon class="h-6 w-6" />
                      <span class="text-xs block">Add to list</span>
                    </button>
                  </div>
                  
                  <div class="mt-6">
                    <h3 class="font-bold text-lg mb-2">Brief Description:</h3>
                    <p class="text-gray-800">
                      {{ selectedBook.description || 'No description available.' }}
                    </p>
                  </div>
                  
                  <div class="mt-6 text-right">
                    <button 
                      @click="flipToFront" 
                      class="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-md text-sm transition-colors"
                    >
                      Previous page
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Close Button -->
          <button 
            @click="closeBookDetails" 
            class="absolute -top-4 -right-4 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
          >
            <XIcon class="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>
      
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, onBeforeUnmount } from 'vue';
import { useFetchBookCataloges } from '@/composables/modules/home/useFetchBookCatalogue'
import { useRoute, useRouter } from '#app';
import { SearchIcon, ChevronDownIcon, Loader2 as LoaderIcon, List as ListIcon, X as XIcon } from 'lucide-vue-next';
import { useSearchBook } from '@/composables/modules/user/useSearchBook';
import { useFetchBookList } from "@/composables/modules/user/useGetList"
const { bookCategoriesList, loading: fetching } = useFetchBookCataloges()
import { useSaveList } from '@/composables/modules/user/useSaveList'

const route = useRoute();
const router = useRouter();
const { searchBook, bookList, loading } = useSearchBook();
const { saveList, loading: addingToList} = useSaveList()
const { } = useFetchBookList()

// Search state
const searchQuery = ref('');
const selectedSearchType = ref('Keyword');
const showKeywordDropdown = ref(false);
const initialLoad = ref(true);
const debounceTimer = ref<NodeJS.Timeout | null>(null);
const selectedCategory = ref({})

// Book details state
const showBookDetails = ref(false);
const showDetailsBack = ref(false);
const selectedBook = ref<any>({});
const selectedBookIndex = ref(0);

// Initialize search from route query params
onMounted(async () => {
  const query = route.query.q as string;
  const type = route.query.type as string;
  const categoryId = route.query.category_id as string;

  // Fix: Check if bookCategoriesList.value is an array before using map
  if (query) {
    searchQuery.value = query;
    if (type && Array.isArray(bookCategoriesList.value)) {
      const typeCapitalized = type.charAt(0).toUpperCase() + type.slice(1);
      const extractedNames = bookCategoriesList.value.map((item: any) => item.name);
      if (extractedNames.includes(typeCapitalized)) {
        selectedSearchType.value = typeCapitalized;
      }
    }
    
    await performSearch();
  }
  
  initialLoad.value = false;
});

// Handle search input with debounce
const handleSearchInput = () => {
  // Clear previous timer
  if (debounceTimer.value) {
    clearTimeout(debounceTimer.value);
  }
  
  // Set new timer (300ms debounce)
  debounceTimer.value = setTimeout(() => {
    updateRouteQuery();
  }, 300);
};

// Update route query params
const updateRouteQuery = () => {
  router.replace({
    query: {
      ...route.query,
      q: searchQuery.value,
      type: selectedSearchType.value.toLowerCase()
    }
  });
};

// Toggle keyword dropdown
const toggleKeywordDropdown = () => {
  showKeywordDropdown.value = !showKeywordDropdown.value;
};

// Select search type
const selectSearchType = (option: any) => {
  selectedCategory.value = option.uuid || option.id;
  selectedSearchType.value = option.name;
  showKeywordDropdown.value = false;
  updateRouteQuery();
};

watch(() => selectedCategory.value, async (data) => {
  console.log('watsg', selectedCategory.value)
  if(data){
    await searchBook({
    str: searchQuery.value,
    category_id: data
  });
  }
})

// Perform search
const performSearch = async () => {
  console.log(selectedCategory, 'ghjkl')
  if (!searchQuery.value) return;
  
  initialLoad.value = false;
  
  // Call the searchBook method with the correct parameters
  await searchBook({
    str: searchQuery.value,
    category_id: route.query.category_id
  });
};

// Add book to list
const addToList = async (book: any) => {
  // Implement add to list functionality
  console.log('Adding to list:', book);
  await saveList({
  book_id: book.uuid
})
  // Show a toast notification
  // alert('Added to list: ' + book.title);
};

// View book details
const viewBookDetails = (book: any, index?: number) => {
  selectedBook.value = book;
  selectedBookIndex.value = index !== undefined ? index : bookList.value.findIndex((b: any) => b.id === book.id);
  showBookDetails.value = true;
  showDetailsBack.value = false;
  
  // Prevent body scrolling
  document.body.style.overflow = 'hidden';
};

// Flip to details (back side)
const flipToDetails = () => {
  showDetailsBack.value = true;
};

// Flip to front
const flipToFront = () => {
  showDetailsBack.value = false;
};

// Close book details
const closeBookDetails = () => {
  showBookDetails.value = false;
  
  // Re-enable body scrolling
  document.body.style.overflow = '';
};

// Clean up on component unmount
onBeforeUnmount(() => {
  if (debounceTimer.value) {
    clearTimeout(debounceTimer.value);
  }
  
  // Re-enable body scrolling
  document.body.style.overflow = '';
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

.perspective-1000 {
  perspective: 1000px;
}

.transform-style-preserve-3d {
  transform-style: preserve-3d;
}

.backface-hidden {
  backface-visibility: hidden;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}

.invisible {
  visibility: hidden;
}
</style>