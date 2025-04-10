<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="bg-white shadow-md">
      <div class="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
        <!-- Mobile Menu Button -->
        <!-- <div class="flex items-center justify-between w-full md:w-auto">
          <NuxtLink to="/" class="flex items-center">
            <img src="@/assets/icons/logo.svg" alt="Rocksmith Chambers Logo" class="h-12 mr-2" />
          </NuxtLink>
          <button @click="toggleMobileMenu" class="md:hidden">
            <MenuIcon v-if="!mobileMenuOpen" class="h-6 w-6 text-green-700" />
            <XIcon v-else class="h-6 w-6 text-green-700" />
          </button>
        </div> -->
        
        <!-- Navigation Links -->
        <nav :class="[mobileMenuOpen ? 'block' : 'hidden', 'md:flex md:items-center w-full md:w-auto mt-4 md:mt-0']">
          <ul class="flex flex-col md:flex-row md:space-x-8">
            <li>
              <NuxtLink to="/" class="block py-2 text-green-700 border-b-2 border-green-500 md:border-none">Home</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about" class="block py-2 text-green-700 hover:text-green-500">About us</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" class="block py-2 text-green-700 hover:text-green-500">Contact us</NuxtLink>
            </li>
          </ul>
        </nav>

        <div class="flex items-center justify-between w-full md:w-auto">
          <NuxtLink to="/" class="flex items-center">
            <img src="@/assets/icons/logo.svg" alt="Rocksmith Chambers Logo" class="h-12 mr-2" />
          </NuxtLink>
          <button @click="toggleMobileMenu" class="md:hidden">
            <MenuIcon v-if="!mobileMenuOpen" class="h-6 w-6 text-green-700" />
            <XIcon v-else class="h-6 w-6 text-green-700" />
          </button>
        </div>
        
        <!-- Login Button -->
         <!-- {{userProfileObj}} -->
    <div class="flex items-center gap-x-3">
      <!-- {{parsed}} -->
      <NuxtLink  v-if="Object.keys(parsed).length"  class="text-green-700 font-semibold" to="/book-list">
              Book List
          </NuxtLink>
        <NuxtLink v-if="!Object.keys(parsed).length"  to="/login" class="hidden md:block bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded transition-colors">
          Log in
        </NuxtLink>
        <div v-else class="h-12 w-12 rounded-full border-4 border-white bg-green-100 flex items-center justify-center shadow-lg">
            <span class="text-lg font-bold text-green-700">
                  {{ getInitials(userProfileObj?.firstname, userProfileObj?.lastname) || User }}
          </span>
        </div>
    </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-green-700 text-white py-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Logo and Address -->
          <div>
            <div class="flex items-center mb-4">
              <img src="@/assets/icons/logo.svg" alt="Rocksmith Chambers Logo" class="h-12 mr-2" />
            </div>
            <address class="not-italic">
              <p>12, Water Brooks off Jakande Road,</p>
              <p>Victoria Island,</p>
              <p>Lagos Island, 10001 Nigeria.</p>
            </address>
            
            <!-- Social Media Icons -->
            <div class="flex space-x-6 mt-6">
              <a href="#" class="text-white hover:text-green-200">
                <InstagramIcon class="h-6 w-6" />
              </a>
              <a href="#" class="text-white hover:text-green-200">
                <TwitterIcon class="h-6 w-6" />
              </a>
              <a href="#" class="text-white hover:text-green-200">
                <LinkedinIcon class="h-6 w-6" />
              </a>
              <a href="#" class="text-white hover:text-green-200">
                <SendIcon class="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <!-- Catalogs Links -->
          <div>
            <h3 class="text-xl mb-4">Catalogs</h3>
            <ul class="space-y-2">
              <li><NuxtLink to="/law-reports" class="hover:text-green-200">Law reports</NuxtLink></li>
              <li><NuxtLink to="/books" class="hover:text-green-200">Books</NuxtLink></li>
              <li><NuxtLink to="/client-file" class="hover:text-green-200">Client file</NuxtLink></li>
              <li><NuxtLink to="/articles" class="hover:text-green-200">Articles/Journals</NuxtLink></li>
              <li><NuxtLink to="/statues" class="hover:text-green-200">Statues</NuxtLink></li>
            </ul>
          </div>
          
          <!-- About Us Links -->
          <div>
            <h3 class="text-xl mb-4">About us</h3>
            <ul class="space-y-2">
              <li><NuxtLink to="/about" class="hover:text-green-200">Library</NuxtLink></li>
              <li><NuxtLink to="/contact" class="hover:text-green-200">Contact us</NuxtLink></li>
              <li><NuxtLink to="/privacy" class="hover:text-green-200">Privacy</NuxtLink></li>
              <li><NuxtLink to="/terms" class="hover:text-green-200">Terms</NuxtLink></li>
              <li><NuxtLink to="/careers" class="hover:text-green-200">Careers</NuxtLink></li>
            </ul>
          </div>
        </div>
        
        <!-- Copyright -->
        <div class="border-t border-green-600 mt-8 pt-8 text-center">
          <p>© 2024 Rocksmith Chamber Law Library. All rights reserved</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useFetchProfile } from '@/composables/modules/user/useFetchProfile';
import { MenuIcon, XIcon, InstagramIcon, TwitterIcon, LinkedinIcon, SendIcon } from 'lucide-vue-next';

const mobileMenuOpen = ref(false);
const { userProfileObj, loading } = useFetchProfile();
const userObj = window.localStorage.getItem('user') as any
const parsed = JSON.parse(userObj) as any

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

  // Helper functions
  const getInitials = (firstName?: string, lastName?: string): string => {
    if (!firstName && !lastName) return 'U';
    
    const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : '';
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : '';
    
    return `${firstInitial}${lastInitial}`;
  };
</script>