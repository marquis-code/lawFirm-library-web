<!-- <template>
<main>
  <div class="relative bg-[#FDFCFC]">
    <div class="relative pb-12 md:pt-20 min-h-[85vh] isolate max-w-7xl mx-auto">
      <div data-aos="fade-up" class="flex justify-center items-center">
        <img src="@/assets/img/hero.svg" alt="" class="absolute hidden lg:block top-14 inset-0 -z-10 object-cover">
      </div>
      <div data-aos="fade-up" class="flex justify-center items-center">
        <img src="@/assets/img/mobile-hero-bg.svg" alt="" class="absolute lg:hidden top-8 inset-0 -z-10 w-full object-cover">
      </div>
      <div class="max-w-7xl mx-auto px-4 pt-20  pb-12">
        <div class="relative z-10 max-w-3xl pt-16 lg:pt-0 mx-auto text-center">
          <h1 data-aos="fade-up" class="text-4xl md:text-7xl font-semibold leading-relaxed text-[#292929] mb-6">
            Live Together, Share Comfortably
          </h1>
          <p data-aos="fade-up" class="text-lg md:text-xl text-[#1D2739] mb-8">
            Find, Share, and Effortlessly Manage Your Ideal Home in One Place.
          </p>
       <div class="">
        <button data-aos="fade-up" @click="handleSignin"
            class="group bg-[#292929] text-white rounded-full inline-flex space-x-6 pl-10 py-1 px-1.5 items-center transition-colors">
            <p>Sign up for free</p>
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_12983_227128)">
                <rect width="44" height="44" rx="22" fill="#326543"/>
                <path d="M28.6666 22H15.3333" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M24.5 26.1667C24.5 26.1667 28.6667 23.098 28.6667 22C28.6667 20.902 24.5 17.8333 24.5 17.8333" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
              <defs>
                <clipPath id="clip0_12983_227128">
                  <rect width="44" height="44" rx="22" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </button>
       </div>
        </div>
      </div>
    </div>
  </div>

  <div class="max-w-7xl pt-20  mx-auto lg:px-6">

    <PropertiesList type="featured" :properties="computedList" />
  </div>
  <div id="tenants" class=" bg-[#FDFCFC]">
      <TenantSteps />

  </div>
  <div class="bg-white">
    <Renters id="agents" />
    <Agents id="service-providers" />
  </div>
  <div id="about-us"  class="space-y-32">
    <AboutUs id="about-us" />
   </div>
  <WhyChooseUs />
  <FaqQuestion />
  <GetInTouch />
  <FooterSection id="footer" />
</main>
</template>

<script setup lang="ts">
  import moment from "moment";
  import { useGetProperties } from "@/composables/modules/property/fetchProperties";
  const { propertiesList } = useGetProperties();
  const router = useRouter()

  const computedList = computed(() => {
    return propertiesList.value.slice(0, 8)
  })

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

<style scoped>
html {
  scroll-behavior: smooth;
}
</style> -->

<template>
  <div class="min-h-screen bg-white">
    <section class="relative min-h-screen">
      <div class="absolute inset-0 bg-black/50 z-10"></div>
      <img 
        src="@/assets/img/new-hero.svg"
        alt="Hero background" 
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="relative z-20 container mx-auto px-4 pt-44">
        <div class="max-w-5xl">
          <h1 data-aos="fade-up" class="text-4xl sm:text-5xl md:text-[80px] font-bold leading-snug text-white mb-6">
            Live Together, Share Comfortably
          </h1>
          <p data-aos="fade-up" class="text-xl text-white mb-8">
            Find, Share, and Effortlessly Manage Your Ideal Home in One Place.
          </p>
          <!-- <button class="bg-[#D86D4B] text-white px-10 py-3 rounded-md hover:bg-[#C25B3A] transition-colors flex items-center gap-2">
            Sign up for free
            <span class="ml-2">→</span>
          </button> -->
          <button @click="handleSignin" data-aos="fade-up"
          class="group bg-[#292929] text-white rounded-full inline-flex space-x-6 pl-10 py-1 px-1.5 items-center transition-colors">
          <p>Sign up for free</p>
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_12983_227128)">
              <rect width="44" height="44" rx="22" fill="#D75626"/>
              <path d="M28.6666 22H15.3333" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M24.5 26.1667C24.5 26.1667 28.6667 23.098 28.6667 22C28.6667 20.902 24.5 17.8333 24.5 17.8333" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
              <clipPath id="clip0_12983_227128">
                <rect width="44" height="44" rx="22" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </button>
        </div>
      </div>
    </section>

    <div class="max-w-7xl pt-20  mx-auto lg:px-6">
  <!-- <p>Hello world</p> -->
      <PropertiesList type="featured" :properties="computedList" />
    </div>

   <section id="tenants">
    <div class="text-center pb-10 pt-20">
        <div class="inline-flex items-center gap-2 gap-x-6 px-3 py-1 rounded-lg">
          <img src="@/assets/icons/corporate.svg" alt="icon" class="w-10 h-10" />
          <h2 class="text-2xl font-semibold text-[#1D2739]">Tenants</h2>
        </div>
      </div>

    <section class="relative">
      <div class="absolute inset-0 bg-black/50 z-10"></div>
      <img 
        src="@/assets/img/new-tenants.svg"
        alt="Journey background" 
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="relative z-20 container flex justify-start  items-start flex-col mx-auto px-4 py-20">
        <div class="max-w-xl mb-12">
          <h2 data-aos="fade-up" class="text-4xl md:text-5xl font-bold text-white mb-8">
            Your journey to<br />a new home
          </h2>
          <div data-aos="fade-up" class="flex flex-col sm:flex-row gap-4">
            <button @click="handleSignin" class="bg-[#D75626] text-white px-10 py-3 rounded-lg transition-colors">
              Sign up for free
            </button>
            <a href="#footer" class="bg-white px-10 py-3 text-[#292929] rounded-lg  transition-colors">
              Download Our App
            </a>
          </div>
        </div>
        
        <div data-aos="fade-up" class="bg-black/50 backdrop-blur-sm -mb-10 mt-44 pb-20  rounded-2xl p-8 sm:p-10 md:p-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="(step, index) in steps" :key="index" class="text-white">
            <div class="bg-[#D75626] w-10 h-10 rounded-lg flex items-center justify-center mb-4">
              {{ index + 1 }}
            </div>
            <h3 class="text-xl text-white font-medium mb-3">{{ step.title }}</h3>
            <p class="text-white font-light text-sm">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>
   </section>

   <section id="agents">
    <div data-aos="fade-up" class="text-center pb-10 pt-32">
        <div class="inline-flex items-center gap-2 gap-x-6 px-3 py-1 rounded-lg">
          <img src="@/assets/icons/corporate.svg" alt="icon" class="w-10 h-10" />
          <h2 class="text-2xl font-semibold text-[#1D2739]">Agents</h2>
        </div>
      </div>

    <section class="relative min-h-screen">
      <div class="absolute inset-0 bg-black/50 z-10"></div>
      <img 
        src="@/assets/img/new-agents.svg"
        alt="Connect background" 
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="relative z-20 container mx-auto px-4 py-20">
        <div class="max-w-2xl -mb-10">
          <h2 data-aos="fade-up" class="text-4xl md:text-5xl font-bold text-white mb-4">
            Connect with renters effortlessly
          </h2>
          <h3 data-aos="fade-up" class="text-2xl text-white mb-4">
            Want to become an agent at BlacCountry?
          </h3>
          <p data-aos="fade-up" class="text-white leading-relaxed mb-8">
            Help tenants find the perfect shared living space by managing property viewings, providing expert guidance, and ensuring a smooth move-in process—all while earning commissions for successful rentals.
          </p>
          <button @click="router.push('/contact-us')" data-aos="fade-up" class="bg-[#D75626] text-white px-10 py-3 rounded-lg  transition-colors">
            Contact us
          </button>
        </div>

        <div data-aos="fade-up" class="bg-black/50 backdrop-blur-sm mt-44 -mb-16 rounded-2xl p-8 sm:p-10 md:p-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="(step, index) in  agentSteps" :key="index" class="text-white">
            <div class="bg-[#D75626] w-10 h-10 rounded-lg flex items-center justify-center mb-4">
              {{ index + 1 }}
            </div>
            <h3 class="text-xl text-white font-medium mb-3">{{ step.title }}</h3>
            <p class="text-white font-light text-sm">{{ step.description }}</p>
          </div>
        </div>
        <!-- <div class="bg-black/70 backdrop-blur-sm rounded-2xl p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="(step, index) in agentSteps" :key="index" class="text-white">
            <div class="bg-[#D86D4B] w-10 h-10 rounded-lg flex items-center justify-center mb-4">
              {{ index + 1 }}
            </div>
            <h3 class="text-xl font-semibold mb-3">{{ step.title }}</h3>
            <p class="text-gray-300">{{ step.description }}</p>
          </div>
        </div> -->
      </div>
    </section>
   </section>

   <section id="service-providers">
    <div data-aos="fade-up" class="text-center pb-10 pt-32">
        <div class="inline-flex items-center gap-2 gap-x-6 px-3 py-1 rounded-lg">
          <img src="@/assets/icons/corporate.svg" alt="icon" class="w-10 h-10" />
          <h2 class="text-2xl font-semibold text-[#1D2739]">Service Providers</h2>
        </div>
      </div>

    <section class="relative min-h-screen">
      <div class="absolute inset-0 bg-black/50 z-10"></div>
      <img 
        src="@/assets/img/new-service-provider.svg"
        alt="Connect background" 
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="relative z-20 container mx-auto px-4 py-20">
        <div data-aos="fade-up" class="max-w-2xl mb-12">
          <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
              Join our network of trusted Service Providers
          </h2>
          <h3 data-aos="fade-up" class="text-2xl text-white mb-4">
              Want to become a service provider at BlackCountry?
          </h3>
          <p data-aos="fade-up" class="text-white leading-relaxed mb-8">
              Offer your services to tenants in need of maintenance and home solutions. Manage requests, provide timely assistance, and ensure a well-maintained living space—all while growing your business.
          </p>
          <button @click="router.push('/contact-us')" data-aos="fade-up" class="bg-[#D75626] text-white px-10 py-3 rounded-md transition-colors">
            Contact us
          </button>
        </div>

        <div data-aos="fade-up" class="bg-black/50 backdrop-blur-sm mt-60 -mb-16  rounded-2xl p-8 sm:p-10 md:p-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="(step, index) in  serviceProviderSteps" :key="index" class="text-white">
            <div class="bg-[#D75626] w-10 h-10 rounded-lg flex items-center justify-center mb-4">
              {{ index + 1 }}
            </div>
            <h3 class="text-xl text-white font-medium mb-3">{{ step.title }}</h3>
            <p class="text-white font-light text-sm">{{ step.description }}</p>
          </div>
        </div>

      </div>
    </section>
   </section>

    <div id="about-us"  class="space-y-32">
  <AboutUs id="about-us" />
 </div>
<WhyChooseUs />
<FaqQuestion />
<GetInTouch />
<FooterSection id="footer" />
  </div>

<SideNavigation @close="handleClose" v-if="openNav" />
</template>

<script setup lang="ts">
import moment from "moment";
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'
const isDropdownOpen = ref(false);
const dropdownRef = ref(null);
const router = useRouter()
  import { useGetProperties } from "@/composables/modules/property/fetchProperties";
  const { propertiesList } = useGetProperties();
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


  // const router = useRouter()

  const computedList = computed(() => {
    return propertiesList.value.slice(0, 8)
  })

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