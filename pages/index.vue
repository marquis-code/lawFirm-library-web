<template>
<main>
  <div class="relative  bg-[#FDFCFC]">
    <!-- Navigation Bar -->
    <!-- <Navigation /> -->


    <div class="relative pt-20 min-h-screen isolate overflow-hidden container mx-auto">
      <div data-aos="fade-up" class="flex justify-center items-center">
        <img src="@/assets/img/hero.svg" alt="" class="absolute hidden lg:block top-8 inset-0 -z-10 -full h- object-cover">
      </div>
      <div data-aos="fade-up" class="flex justify-center items-center">
        <img src="@/assets/img/mobile-hero-bg.svg" alt="" class="absolute lg:hidden top-8 inset-0 -z-10 h-full w-full">
      </div>
      <!-- <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true">
        <div
          class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)">
        </div>
      </div> -->

      <div class="max-w-7xl mx-auto px-4 pt-10 pb-16 md:pb-24">
        <div class="relative z-10 max-w-3xl mx-auto text-center ">
          <h1 data-aos="fade-up"  class="text-4xl md:text-7xl font-semibold leading-relaxed text-[#292929] mb-6">
            Live Together, Share Comfortably
          </h1>
          <p data-aos="fade-up"  class="text-lg md:text-xl text-[#1D2739] mb-8">
            Find, Share, and Effortlessly Manage Your Ideal Home in One Place.
          </p>
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


  <div class="container mx-auto">
    <PropertiesList type="featured" :properties="computedList" />
  </div>
  <div class=" bg-[#F9FAFB]">
      <TenantSteps />
<!-- <ServiceProviderSection /> -->
  </div>
  <div class="pt-20 bg-white">
    <Renters id="tenants" />
    <Agents id="agents" />
  </div>
  <div id="about-us"  class="space-y-32">
    <AboutUs id="about-us" />
</div>
  <WhyChooseUs />
  <FaqQuestion />
  <GetInTouch />
  <FooterSection />
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
    window.location.href = "https://tenantblackcountry.vercel.app/"
  }
  </script>

  <style scoped>
  </style>
