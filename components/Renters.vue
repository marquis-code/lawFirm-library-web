<template>
  <div class="flex flex-col items-center px-6 py-12">
    <div
      class=""
    >
      <img src="@/assets/icons/agent-tag.svg" />
    </div>
    <h1 class="text-2xl md:text-3xl font-bold pb-6 lg:pb-0 text-[#1D2739] text-center mt-4">
      Connect with renters effortlessly
    </h1>
    <div class="lg:hidden">
      <h2 class="text-2xl  font-medium lg:block text-[#1D2739]  mt-6">
              Want to become an agent at BlacCountry?
            </h2>
            <p class="text-[#1D2739]  leading-relaxed text-lg max-w-lg mt-2">
              Help tenants find the perfect shared living space by managing property
              viewings, providing expert guidance, and ensuring a smooth move-in
              process—all while earning commissions for successful rentals.
            </p>
         <div class="pt-6">
          <button @click="router.push('/contact-us')" class="mt-4 w-full lg:w-auto bg-[#292929] text-white px-10 py-3.5 rounded-lg">
              Contact us
            </button>
         </div>
         <div class="pt-20">
          <img src="@/assets/img/renters.svg" alt="Agent" />
         </div>
    </div>
    <div class="flex flex-col md:flex-row mt-8 w-full">
      <div
        class="flex-1 flex hidden lg:block flex-col items-center md:items-start text-center md:text-left"
      >
        <img src="@/assets/img/renters.svg" alt="Agent" />
        <h2 class="text-4xl  max-w-lg text-[#1D2739] font-semibold mt-6">
          Want to become an agent at BlacCountry?
        </h2>
        <p class="text-[#1D2739] leading-relaxed max-w-lg mt-2">
          Help tenants find the perfect shared living space by managing property
          viewings, providing expert guidance, and ensuring a smooth move-in
          process—all while earning commissions for successful rentals.
        </p>
        <button @click="router.push('/contact-us')" class="mt-4 bg-[#292929] text-white px-10 py-3 rounded-lg">
          Contact us
        </button>
      </div>

      <div class="space-y-4 max-w-lg mx-auto">
        <div class="flex items-start p-6 bg-[#F9FAFB] rounded-2xl">
          <div class="flex-shrink-0 w-10 h-10 bg-[#326543] text-white rounded-lg flex items-center justify-center text-lg font-medium">
            1
          </div>
          <div class="ml-4">
            <h3 class="text-lg font-semibold text-[#1D2739]">Take the First Step</h3>
            <p class="mt-1 text-[#1D2739] text-base lg:text-sm">
              Show your interest by sending us an email. Help tenants find the perfect home, manage property viewings, and earn commissions for successful rentals.
            </p>
          </div>
        </div>
        
        <div class="flex items-start p-6 bg-[#F9FAFB] rounded-2xl">
          <div class="flex-shrink-0 w-10 h-10 bg-[#326543] text-white rounded-lg flex items-center justify-center text-lg font-medium">
            2
          </div>
          <div class="ml-4">
            <h3 class="text-lg font-semibold text-[#1D2739]">Accept Invitation</h3>
            <p class="mt-1 text-[#1D2739] text-base lg:text-sm">
              Join the platform through invitation from the property manager.
            </p>
          </div>
        </div>
        
        <div class="flex items-start p-6 bg-[#F9FAFB] rounded-2xl">
          <div class="flex-shrink-0 w-10 h-10 bg-[#326543] text-white rounded-lg flex items-center justify-center text-lg font-medium">
            3
          </div>
          <div class="ml-4">
            <h3 class="text-lg font-semibold text-[#1D2739]">Receive Property Assignments and set your availability</h3>
            <p class="mt-1 text-[#1D2739] text-base lg:text-sm">
              Get properties assigned by property managers, Schedule available dates and times for property viewings.
            </p>
          </div>
        </div>
        
        <div class="flex items-start p-6 bg-[#F9FAFB] rounded-2xl">
          <div class="flex-shrink-0 w-10 h-10 bg-[#326543] text-white rounded-lg flex items-center justify-center text-lg font-medium">
            4
          </div>
          <div class="ml-4">
            <h3 class="text-lg font-semibold text-[#1D2739]">Manage Tours and earn your commission</h3>
            <p class="mt-1 text-[#1D2739] text-base lg:text-sm">
              Conduct and assist potential tenants, Get paid for successfully renting out properties.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
</script>

<style></style>
