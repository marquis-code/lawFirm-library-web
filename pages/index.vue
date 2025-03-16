<!-- <template>
    <div>

      <div class="relative">
        <div class="carousel-container relative h-[500px] overflow-hidden">
          <transition-group name="fade" tag="div" class="h-full">
            <div v-for="(image, index) in carouselImages" :key="index" v-show="currentImageIndex === index" class="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000" :style="{ backgroundImage: `url(${image})` }">
            </div>
          </transition-group>

          <div class="absolute inset-0 bg-black bg-opacity-50"></div>
          

          <div class="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1 class="text-4xl md:text-6xl font-serif text-white mb-4">Explore Our Extensive Legal Library.</h1>
            <p class="text-xl text-white mb-8 max-w-3xl">
              Discover a comprehensive collection of case law, statutes, and regulations.
            </p>
            

            <div class="w-full max-w-3xl flex flex-col md:flex-row">
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
          </div>
        </div>
      </div>

      <div class="bg-[#D6FEE8]">
        <Catalog />
      </div>  
    </div>
  </template>
  
  <script setup lang="ts">
  import { useSearchBook } from '@/composables/modules/user/useSearchBook'
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import store1 from '@/assets/img/book-store1.jpg'
  import store2 from '@/assets/img/book-store2.jpg'
  import store3 from '@/assets/img/book-store3.jpg'
  import { SearchIcon, ChevronDownIcon } from 'lucide-vue-next';
  const { searchBook, bookList, loading } = useSearchBook()
  
  // Carousel images
  const carouselImages = [
    store1, store2, store3
  ];
  const currentImageIndex = ref(0);
  let carouselInterval: number | null = null;
  
  // Search functionality
  const searchQuery = ref('');
  const searchOptions = ['Keywords', 'Title', 'Author', 'Subject'];
  const selectedSearchType = ref('Keywords');
  const showKeywordDropdown = ref(false);
  
  const toggleKeywordDropdown = () => {
    showKeywordDropdown.value = !showKeywordDropdown.value;
  };
  
  const selectSearchType = (option: string) => {
    selectedSearchType.value = option;
    showKeywordDropdown.value = false;
  };
  
  const search = () => {
    // Navigate to search results page with query parameters
    navigateTo({
      path: '/search',
      query: {
        type: selectedSearchType.value.toLowerCase(),
        q: searchQuery.value
      }
    });
  };
  
  // Close dropdown when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    if (showKeywordDropdown.value) {
      showKeywordDropdown.value = false;
    }
  };
  
  // Carousel functionality
  const startCarousel = () => {
    carouselInterval = window.setInterval(() => {
      currentImageIndex.value = (currentImageIndex.value + 1) % carouselImages.length;
    }, 5000);
  };
  
  onMounted(() => {
    document.addEventListener('click', handleClickOutside);
    startCarousel();
  });
  
  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
    if (carouselInterval) {
      clearInterval(carouselInterval);
    }
  });
  </script>
  
  <style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  </style> -->


  <template>
    <div>
      <!-- Hero Section with Carousel -->
      <div class="relative">
        <div class="carousel-container relative h-[500px] overflow-hidden">
          <transition-group name="fade" tag="div" class="h-full">
            <div 
              v-for="(image, index) in carouselImages" 
              :key="index" 
              v-show="currentImageIndex === index" 
              class="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000" 
              :style="{ backgroundImage: `url(${image})` }"
            >
            </div>
          </transition-group>
          
          <!-- Dark overlay -->
          <div class="absolute inset-0 bg-black bg-opacity-50"></div>
          
          <!-- Hero Content -->
          <div class="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1 class="text-4xl md:text-6xl font-serif text-white mb-4">
              Explore Our Extensive Legal Library.
            </h1>
            <p class="text-xl text-white mb-8 max-w-3xl">
              Discover a comprehensive collection of case law, statutes, and regulations.
            </p>
            
            <!-- Search Bar Component -->
            <SearchBar />
          </div>
        </div>
      </div>
  
      <div class="bg-[#D6FEE8]">
        <Catalog />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import SearchBar from '@/components/SearchBar.vue';
  import store1 from '@/assets/img/book-store1.jpg';
  import store2 from '@/assets/img/book-store2.jpg';
  import store3 from '@/assets/img/book-store3.jpg';
  
  // Carousel images
  const carouselImages = [
    store1, store2, store3
  ];
  const currentImageIndex = ref(0);
  let carouselInterval: number | null = null;
  
  // Carousel functionality
  const startCarousel = () => {
    carouselInterval = window.setInterval(() => {
      currentImageIndex.value = (currentImageIndex.value + 1) % carouselImages.length;
    }, 5000);
  };
  
  onMounted(() => {
    startCarousel();
  });
  
  onBeforeUnmount(() => {
    if (carouselInterval) {
      clearInterval(carouselInterval);
    }
  });
  </script>
  
  <style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  </style>
  
  