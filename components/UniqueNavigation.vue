<template>
    <nav class="fixed w-full top-0 px-3 lg:px-0 z-50 pt-4 pr-20">
      <div class="max-w-4xl bg-white/30 backdrop-blur-lg mt-5 rounded-3xl mx-auto  h-16 lg:h-20 px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between pt-5 items-center">
          <div class="flex items-center space-x-8">
            <NuxtLink to="/"><img src="@/assets/icons/logo.svg" alt="BlackCountry" class="h-10" /></NuxtLink>
          </div>
          <div class="hidden md:flex space-x-6">
            <a @click="handleNavigate('tenant')" href="#tenants" class="text-[#292929] font-medium">Tenants</a>
            <a @click="handleNavigate('agent')" href="#agents" class="text-[#292929] font-medium">Agents</a>
            <a @click="handleNavigate('service-provider')" href="#service-providers" class="text-[#292929] font-medium">Service Providers</a>
            <a @click="handleNavigate('about-us')" href="#about-us" class="text-[#292929] font-medium">About Us</a>
          </div>
          <div class="relative" ref="dropdownRef">
            <button @click="toggleDropdown"
              class="bg-[#326543] hidden lg:block text-white px-6 py-3 rounded-md hover:bg-green-800 focus:outline-none">
              Login
            </button>
            <button @click="openNav = true" class="lg:hidden">
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
              <a href="https://tenantblackcountry.vercel.app/login" @click="handleRedirect('tenant')" class="block px-4 cursor-pointer py-2 text-[#1D2739] border-b-[0.5px] border-gray-100 font-semibold flex justify-between items-center">
                <div class="flex items-center gap-x-2 text-sm">
                  <img src="@/assets/icons/user-type.svg" />
  
                  <span>Tenant</span>
                </div>
  
                <p>
                  <img src="@/assets/icons/more-caret.svg" />
                </p>
              </a>
              <a href="https://living.blackcountry.africa/agent/" @click="handleRedirect('agent')" class="block px-4 cursor-pointer py- pb-4 text-[#1D2739] border-b-[0.5px] border-gray-100 font-semibold flex justify-between items-center">
                <div class="flex items-center gap-x-2 text-sm">
                  <img src="@/assets/icons/user-type.svg" />
  
                  <span>Agent</span>
                </div>
  
                <p>
                  <img src="@/assets/icons/more-caret.svg" />
                </p>
              </a>
              <a href="https://living.blackcountry.africa/service-provider/" @click="handleRedirect('service-provider')" class="block px-4 cursor-pointer  text-[#1D2739] font-semibold flex justify-between items-center">
                <div class="flex items-center gap-x-2 text-sm">
                  <img src="@/assets/icons/user-type.svg" />
  
                  <span>Service Provider</span>
                </div>
  
                <p>
                  <img src="@/assets/icons/more-caret.svg" />
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  
    <SideNavigation @close="handleClose" v-if="openNav" />
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
  
  const handleRedirect = (item: any) => {
    if(item === 'tenant') {
      //  window.location.href = "https://tenantblackcountry.vercel.app/login/"
       isDropdownOpen.value = false
    }
  
    if(item === 'agent') {
      //  window.location.href = "https://blackcountry-agent.vercel.app/"
       isDropdownOpen.value = false
    }
  
    if(item === 'service-provider') {
      //  window.location.href = "https://blackcountry-serviceprovider.vercel.app/"
       isDropdownOpen.value = false
    }
    // router.push('/contact-us')
    // isDropdownOpen.value = false
  }
  
  const openNav = ref(false)
  
  const handleClose = () => {
    openNav.value = false
  }
  
  // Close dropdown when clicking outside
  onClickOutside(dropdownRef, () => {
    isDropdownOpen.value = false;
  });
  
  const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
  };
  
  const handleNavigate = (item: any) => {
    router.push('/')
  }
  </script>