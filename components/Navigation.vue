<template>
     <nav class="bg-[#292929] px-4 py-3 fixed w-full z-50">
        <div class="container mx-auto flex items-center justify-between">
          <NuxtLink to="/" class="flex items-center">
            <img src="@/assets/icons/logo-with-text.svg" alt="BlackCountry" class="" />
          </NuxtLink>
          <div class="hidden md:flex items-center space-x-8">
              <a @click="handleNavigate('tenant')" href="#tenants" class="text-[#F9FAFB] hover:text-gray-300">Tenants</a>
              <a @click="handleNavigate('agent')" href="#agents" class="text-[#F9FAFB] hover:text-gray-300">Agents</a>
              <a @click="handleNavigate('service-provider')" href="#service-providers" class="text-[#F9FAFB] hover:text-gray-300">Service providers</a>
              <a @click="handleNavigate('about-us')" href="#about-us" class="text-[#F9FAFB] hover:text-gray-300">About Us</a>
            </div>
          <!-- <div class="hidden md:flex items-center space-x-8">
            <a @click="handleNavigate('tenant')" href="#tenants"  to="#" class="text-[#F9FAFB] hover:text-gray-300">Tenants</a>
            <a  @click="handleNavigate('agent')" href="#agents" class="text-[#F9FAFB] hover:text-gray-300">Agents</a>
            <a @click="handleNavigate('service-provider')" href="#service-providers" class="text-[#F9FAFB] hover:text-gray-300">Service providers</a>
            <a @click="handleNavigate('about-us')" href="#about-us" class="text-[#F9FAFB] hover:text-gray-300">About Us</a>

          </div> -->
          <!-- <button class="bg-[#D75626] text-white px-6 py-3 rounded-md hover:bg-[#C25B3A] transition-colors">
            Login
          </button> -->
          <div class="relative" ref="dropdownRef">
          <button @click="toggleDropdown"
            class="bg-[#D75626] hidden lg:block text-white px-6 py-3 rounded-md focus:outline-none">
            Login
          </button>
          <button @click="openNav = true" class="lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="31" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 9.5H3M21 4.5H3M21 14.5H3M21 19.5H3"/></svg>
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
      </nav>

      <SideNavigation @close="handleClose" v-if="openNav" />
</template>


<script setup lang="ts">
  const steps = [
    {
      title: 'Find your ideal home and apply',
      description: 'Sign up or log in, search with filters, browse listings, schedule a tour, and submit your application.'
    },
    {
      title: 'Secure your lease',
      description: 'Review the approved lease agreement, sign it digitally, and get ready to move in'
    },
    {
      title: 'Make your first payment',
      description: 'Receive a payment notification, pay rent and the security deposit, and get instant confirmation.'
    },
    {
      title: 'Move in & manage your room',
      description: 'Pay rent, request maintenance, communicate with your property manager, and renew or move out.'
    }
  ]
  
  const agentSteps = [
    {
      title: 'Take the First Step',
      description: 'Show your interest by sending us an email. Help tenants find the perfect home, manage property viewings, and earn commissions for successful rentals.'
    },
    {
      title: 'Accept Invitation',
      description: 'Join the platform through invitation from the property manager'
    },
    {
      title: 'Manage Requests',
      description: 'Get properties assigned by property managers, Schedule available dates and times for property viewings'
    },
    {
      title: 'Invoice and payments',
      description: 'Conduct and assist potential tenants, Get paid for successfully renting out properties'
    }
  ]

  const serviceProviderSteps = [
    {
      title: 'Take the First Step',
      description: 'Show your interest by contacting us. Join our network and and provide reliable home services.'
    },
    {
      title: 'Accept Invitation',
      description: 'Review the approved lease agreement, sign it digitally, and get ready to move in'
    },
    {
      title: 'Manage Requests',
      description: 'Receive a payment notification, pay rent and the security deposit, and get instant confirmation.'
    },
    {
      title: 'Invoice and payments',
      description: 'Pay rent, request maintenance, communicate with your property manager, and renew or move out.'
    }
  ]

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

function handleNavigate(section) {
  // Navigate to the home page and scroll to the section
  router.push('/');  // Navigate to the home page
  nextTick(() => {  // Wait for the page to load
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  });
}
const handleSignin = () => {
    window.location.href = "https://tenantblackcountry.vercel.app/login"
  }

  // Add smooth scroll to top on mount
  onMounted(() => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
  </script>
  
  <style>
  .wavy-pattern {
    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='rgba(255,255,255,0.1)' fill-rule='evenodd'/%3E%3C/svg%3E");
  }

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