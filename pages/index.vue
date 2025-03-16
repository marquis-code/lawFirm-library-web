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
  
  