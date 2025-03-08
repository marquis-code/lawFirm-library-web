<template>
    <nav class="bg-white shadow-sm py-3 px-4 md:px-8 lg:px-16 flex items-center justify-between">
      <div class="flex items-center">
        <img src="@/assets/img/logo.png" alt="Covenant University Logo" class="h-14" />
      </div>
      
      <div class="hidden md:flex items-center space-x-6 text-gray-800">
        <NuxtLink to="/" class="hover:text-purple-900 transition-colors duration-300">Home</NuxtLink>
        <NuxtLink to="/level-advisor" class="hover:text-purple-900 transition-colors duration-300">Level Advisor</NuxtLink>
        <NuxtLink to="/councelor" class="hover:text-purple-900 transition-colors duration-300">Councelor</NuxtLink>
        <NuxtLink to="/admin" class="hover:text-purple-900 transition-colors duration-300">Admin</NuxtLink>
        <NuxtLink to="/about-us" class="hover:text-purple-900 transition-colors duration-300">About Us</NuxtLink>
        <NuxtLink to="/contact-us" class="hover:text-purple-900 transition-colors duration-300">Contact Us</NuxtLink>
      </div>
      
      <div class="flex items-center space-x-4">
        <div @click="router.push('/ai-chat')" class="relative cursor-pointer">
          <div class="bg-[#470A34] rounded-full w-16 h-16 flex items-center justify-center">
            <span class="text-white text-2xl font-bold">AI</span>
          </div>
          <div class="absolute -bottom-1 right-0 bg-green-500 text-white text-xs px-2 py-1 rounded">
            Assistant
          </div>
        </div>
        
        <button @click="router.push('/login')" class="bg-[#470A34] text-white px-6 py-2.5 rounded hover:bg-[#470A34] transition-colors duration-300">
          Login
        </button>
        
        <button class="md:hidden" @click="toggleMobileMenu">
          <Icon name="lucide:menu" class="w-6 h-6 text-gray-800" />
        </button>
      </div>
      
      <!-- Mobile Menu -->
      <div v-if="mobileMenuOpen" class="fixed inset-0 bg-white z-50 md:hidden">
        <div class="flex justify-end p-4">
          <button @click="toggleMobileMenu">
            <Icon name="lucide:x" class="w-6 h-6 text-gray-800" />
          </button>
        </div>
        <div class="flex flex-col items-center space-y-6 p-8 text-gray-800">
          <NuxtLink to="/" class="text-lg" @click="toggleMobileMenu">Home</NuxtLink>
          <NuxtLink to="/level-advisor" class="text-lg" @click="toggleMobileMenu">Level Advisor</NuxtLink>
          <NuxtLink to="/councelor" class="text-lg" @click="toggleMobileMenu">Councelor</NuxtLink>
          <NuxtLink to="/admin" class="text-lg" @click="toggleMobileMenu">Admin</NuxtLink>
          <NuxtLink to="/about-us" class="text-lg" @click="toggleMobileMenu">About Us</NuxtLink>
          <NuxtLink to="/contact-us" class="text-lg" @click="toggleMobileMenu">Contact Us</NuxtLink>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const mobileMenuOpen = ref(false);
  
  const toggleMobileMenu = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value;
    
    if (mobileMenuOpen.value) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };
  const router = useRouter()
  </script>
  
  