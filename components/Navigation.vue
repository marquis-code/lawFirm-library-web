<template>
  <nav class="bg-white fixed w-full top-0 px-3 lg:px-0 z-50">
    <div class="max-w-4xl bg-[#EAEAEA66] mt-5 rounded-3xl mx-auto h-20 px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between pt-5 items-center">
        <div class="flex items-center space-x-8">
          <NuxtLink to="/"><img src="@/assets/icons/logo.svg" alt="BlackCountry" class="h-10" /></NuxtLink>
        </div>
        <div class="hidden md:flex space-x-6">
          <a href="#" class="text-[#292929] font-medium">Tenants</a>
          <a href="#" class="text-[#292929] font-medium">Agents</a>
          <a href="#" class="text-[#292929] font-medium">Service Providers</a>
          <a href="#" class="text-[#292929] font-medium">About Us</a>
        </div>
        <div class="relative" ref="dropdownRef">
          <button @click="toggleDropdown"
            class="bg-[#326543] hidden lg:block text-white px-6 py-3 rounded-md hover:bg-green-800 focus:outline-none">
            Login
          </button>
          <button class="lg:hidden">
            <svg width="30" height="31" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.33325 4.69743H16.6666" stroke="#292929" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round" />
              <path d="M3.33325 10.5308H16.6666" stroke="#292929" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round" />
              <path d="M3.33325 16.3641H16.6666" stroke="#292929" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>

          </button>
          <div v-if="isDropdownOpen" class="absolute right-0 mt-2 w-60 space-y-5 py-4 bg-white shadow-xl rounded-xl overflow-hidden">
            <div @click="handleRedirect" class="block px-4 cursor-pointer py-2 text-[#1D2739] border-b-[0.5px] border-gray-100 font-semibold flex justify-between items-center">
              <div class="flex items-center gap-x-2 text-sm">
                <img src="@/assets/icons/user-type.svg" />

                <span>Tenant</span>
              </div>

              <p>
                <img src="@/assets/icons/more-caret.svg" />
              </p>
            </div>
            <div @click="handleRedirect" class="block px-4 cursor-pointer py- pb-4 text-[#1D2739] border-b-[0.5px] border-gray-100 font-semibold flex justify-between items-center">
              <div class="flex items-center gap-x-2 text-sm">
                <img src="@/assets/icons/user-type.svg" />

                <span>Agent</span>
              </div>

              <p>
                <img src="@/assets/icons/more-caret.svg" />
              </p>
            </div>
            <div @click="handleRedirect" class="block px-4 cursor-pointer  text-[#1D2739] font-semibold flex justify-between items-center">
              <div class="flex items-center gap-x-2 text-sm">
                <img src="@/assets/icons/user-type.svg" />

                <span>Service Provider</span>
              </div>

              <p>
                <img src="@/assets/icons/more-caret.svg" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style>
/* Ensure smooth dropdown animation */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.dropdown-enter,
.dropdown-leave-to {
  opacity: 0;
}
</style>


<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'
const isDropdownOpen = ref(false);
const dropdownRef = ref(null);
const router = useRouter()

const handleRedirect = () => {
  router.push('/contact-us')
  isDropdownOpen.value = false
}

// Close dropdown when clicking outside
onClickOutside(dropdownRef, () => {
  isDropdownOpen.value = false;
});

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};
</script>