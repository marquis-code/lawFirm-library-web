<template>
    <nav class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-20">
          <!-- Logo -->
          <div class="flex items-center" v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0, transition: { duration: 800 } }">
            <a href="#" class="flex items-center gap-2">
              <div class="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                CR
              </div>
              <span class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ChurchRemit</span>
            </a>
          </div>
          
          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-8" v-motion :initial="{ opacity: 0, y: -20 }" :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }">
            <a href="#" class="text-gray-700 hover:text-blue-600 transition-colors font-medium">Home</a>
            <a href="#features" class="text-gray-700 hover:text-blue-600 transition-colors font-medium">Features</a>
            <a href="#" class="text-gray-700 hover:text-blue-600 transition-colors font-medium">About</a>
            <a href="#" class="text-gray-700 hover:text-blue-600 transition-colors font-medium">Contact</a>
          </div>
          
          <!-- CTA Button -->
          <div v-motion :initial="{ opacity: 0, x: 20 }" :enter="{ opacity: 1, x: 0, transition: { duration: 800 } }">
            <a 
              href="#waitlist" 
              class="hidden md:inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300">
              Join Waitlist
            </a>
            
            <!-- Mobile Menu Button -->
            <button 
              @click="toggleMobileMenu" 
              class="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <svg v-if="!mobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Mobile Menu -->
        <div 
          v-if="mobileMenuOpen" 
          class="md:hidden py-4 animate-fade-down"
        >
          <div class="flex flex-col space-y-4">
            <a href="#" class="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2">Home</a>
            <a href="#features" class="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2">Features</a>
            <a href="#" class="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2">About</a>
            <a href="#" class="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2">Contact</a>
            <a 
              href="#waitlist" 
              class="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 text-center"
            >
              Join Waitlist
            </a>
          </div>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const mobileMenuOpen = ref(false);
  
  const toggleMobileMenu = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value;
  };
  </script>
  
  <style scoped>
  .animate-fade-down {
    animation: fadeDown 0.3s ease-out forwards;
  }
  
  @keyframes fadeDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  </style>
  
  