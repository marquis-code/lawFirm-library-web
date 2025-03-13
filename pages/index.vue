<template>
    <div>
      <!-- Hero Section with Carousel -->
      <div class="relative">
        <div class="carousel-container relative h-[500px] overflow-hidden">
          <transition-group name="fade" tag="div" class="h-full">
            <div v-for="(image, index) in carouselImages" :key="index" v-show="currentImageIndex === index" class="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000" :style="{ backgroundImage: `url(${image})` }">
            </div>
          </transition-group>
          <!-- Dark overlay -->
          <div class="absolute inset-0 bg-black bg-opacity-50"></div>
          
          <!-- Hero Content -->
          <div class="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1 class="text-4xl md:text-6xl font-serif text-white mb-4">Explore Our Extensive Legal Library.</h1>
            <p class="text-xl text-white mb-8 max-w-3xl">
              Discover a comprehensive collection of case law, statutes, and regulations.
            </p>
            
            <!-- Search Bar -->
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
  
      <!-- Catalogs Section -->
      <div class="py-16 px-4 bg-green-50">
        <h2 class="text-4xl font-serif text-green-800 text-center mb-16">Our Catalogs.</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <!-- Books -->
          <div class="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105">
            <div class="h-48 overflow-hidden">
              <img src="@/assets/img/catalogue1.png" alt="Books" class="w-full h-full object-cover" />
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-serif text-gray-900 mb-2">Books <span class="font-normal">(1200+)</span></h3>
              <p class="text-gray-700 mb-4">
                Delve into a world of legal information, including statutes, case law, and scholarly articles, to support your legal analysis.
              </p>
              <button class="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded transition-colors">
                View
              </button>
            </div>
          </div>
          
          <!-- Law Reports -->
          <div class="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105 md:col-span-2 lg:col-span-1">
            <div class="h-48 overflow-hidden">
              <img src="@/assets/img/catalogue1.png" alt="Law Reports" class="w-full h-full object-cover" />
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-serif text-gray-900 mb-2">Law Reports <span class="font-normal">(4000+)</span></h3>
              <p class="text-gray-700 mb-4">
                Delve into a world of legal information, including statutes, case law, and scholarly articles, to support your legal analysis.
              </p>
              <button class="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded transition-colors">
                View
              </button>
            </div>
          </div>
          
          <!-- Statutes -->
          <div class="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105">
            <div class="h-48 overflow-hidden">
              <img src="@/assets/img/catalogue1.png" alt="Statutes" class="w-full h-full object-cover" />
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-serif text-gray-900 mb-2">Statutes <span class="font-normal">(2,000+)</span></h3>
              <p class="text-gray-700 mb-4">
                Delve into a world of legal information, including statutes, case law, and scholarly articles, to support your legal analysis.
              </p>
              <button class="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded transition-colors">
                View
              </button>
            </div>
          </div>
          
          <!-- Articles/Journals -->
          <div class="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105">
            <div class="h-48 overflow-hidden">
              <img src="@/assets/img/catalogue1.png" alt="Articles and Journals" class="w-full h-full object-cover" />
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-serif text-gray-900 mb-2">Articles/Journals <span class="font-normal">(4200+)</span></h3>
              <p class="text-gray-700 mb-4">
                Delve into a world of legal information, including statutes, case law, and scholarly articles, to support your legal analysis.
              </p>
              <button class="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded transition-colors">
                View
              </button>
            </div>
          </div>
          
          <!-- Client Files -->
          <div class="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105">
            <div class="h-48 overflow-hidden">
              <img src="@/assets/img/catalogue1.png" alt="Client Files" class="w-full h-full object-cover" />
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-serif text-gray-900 mb-2">Client Files <span class="font-normal">(2500+)</span></h3>
              <p class="text-gray-700 mb-4">
                Delve into a world of legal information, including statutes, case law, and scholarly articles, to support your legal analysis.
              </p>
              <button class="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded transition-colors">
                View
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import store1 from '@/assets/img/book-store1.jpg'
  import store2 from '@/assets/img/book-store2.jpg'
  import store3 from '@/assets/img/book-store3.jpg'
  import { SearchIcon, ChevronDownIcon } from 'lucide-vue-next';
  
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
  </style>