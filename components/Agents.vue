<template>
  <main class="container mx-auto lg:px-4">
    <div class="flex flex-col items-center px-4 lg:px-6">
    <div
      class=""
    >
      <img data-aos="fade-up" src="@/assets/icons/service-provider-tag.svg" />
    </div>
    <h1 data-aos="fade-up" class="text-2xl md:text-3xl font-bold pb-6 lg:pb-0 text-[#1D2739] text-center mt-4">
      Our Agents and Service Providers
    </h1>
    <div class="lg:hidden">
      <h2 data-aos="fade-up" class="text-2xl  font-medium lg:block text-[#1D2739]  mt-6">
        Want to become a service provider at BlackCountry?
            </h2>
            <p data-aos="fade-up" class="text-[#1D2739]  leading-relaxed text-lg max-w-lg mt-2">
              Offer your services to tenants in need of maintenance and home solutions. Manage requests, provide timely assistance, and ensure a well-maintained living space—all while growing your business.
            </p>
         <div class="pt-6">
          <button @click="router.push('/contact-us')" class="mt-4 w-full lg:w-auto bg-[#292929] text-white px-10 py-3.5 rounded-lg">
              Contact us
            </button>
         </div>
         <div data-aos="fade-up" class="pt-20">
          <img data-aos="fade-up" src="@/assets/img/agents.svg" alt="Agent" />
         </div>
    </div>
    </div>
    <div class="flex flex-col md:flex-row gap-x-20 items-center px-6 py-12 container mx-auto">

      <div class="space-y-4 flex-1">
        <div data-aos="fade-up" class="flex items-start p-6 bg-[#F9FAFB] rounded-2xl">
          <div class="flex-shrink-0 w-10 h-10 bg-[#326543] text-white rounded-lg flex items-center justify-center text-lg font-semibold">
            1
          </div>
          <div class="ml-4">
            <h3 data-aos="fade-up" class="text-lg font-semibold text-[#1D2739]">Take the First Step</h3>
            <p data-aos="fade-up" class="mt-1 text-[#1D2739] text-base">
              Show your interest by contacting us. Join our network and provide reliable home services.
            </p>
          </div>
        </div>

        <div data-aos="fade-up" class="flex items-start p-6 bg-[#F9FAFB] rounded-2xl">
          <div class="flex-shrink-0 w-10 h-10 bg-[#326543] text-white rounded-lg flex items-center justify-center text-lg font-semibold">
            2
          </div>
          <div class="ml-4">
            <h3 data-aos="fade-up" class="text-lg font-semibold text-[#1D2739]">Accept Invitation</h3>
            <p data-aos="fade-up" class="mt-1 text-[#1D2739] text-base">
              Join the platform through invitation from the property manager.
            </p>
          </div>
        </div>

        <div data-aos="fade-up" class="flex items-start p-6 bg-[#F9FAFB] rounded-2xl">
          <div class="flex-shrink-0 w-10 h-10 bg-[#326543] text-white rounded-lg flex items-center justify-center text-lg font-semibold">
            3
          </div>
          <div class="ml-4">
            <h3 data-aos="fade-up" class="text-lg font-semibold text-[#1D2739]">Manage Requests</h3>
            <p data-aos="fade-up" class="mt-1 text-[#1D2739] text-base">
              Handle requests and service appointments.
            </p>
          </div>
        </div>

        <div data-aos="fade-up" class="flex items-start p-6 bg-[#F9FAFB] rounded-2xl">
          <div class="flex-shrink-0 w-10 h-10 bg-[#326543] text-white rounded-lg flex items-center justify-center text-lg font-semibold">
            4
          </div>
          <div class="ml-4">
            <h3 data-aos="fade-up" class="text-lg font-semibold text-[#1D2739]">Invoice and payments</h3>
            <p data-aos="fade-up" class="mt-1 text-[#1D2739] text-base">
              Submit invoices and receive payments for services rendered.
            </p>
          </div>
        </div>
      </div>


      <div class="flex-1 hidden lg:block flex flex-col items-center md:items-start text-center md:text-left mt-10 md:mt-0">
        <div data-aos="fade-up" class="">
          <img data-aos="fade-up" src="@/assets/img/agents.svg" alt="Service Provider" class="w-full rounded-lg">
        </div>
        <h2 data-aos="fade-up" class="text-3xl max-w-lg text-[#1D2739] font-semibold mt-6">
          Want to become a service provider at <span class="font-bold">BlackCountry?</span>
        </h2>
        <p data-aos="fade-up" class="text-[#1D2739] leading-relaxed max-w-lg mt-2">
          Offer your services to tenants in need of maintenance and home solutions. Manage requests, provide timely assistance, and ensure a well-maintained living space—all while growing your business.
        </p>
        <button @click="router.push('/contact-us')" class="mt-4 bg-[#292929] text-white px-10 py-3 rounded-lg hover:bg-gray-800">
          Contact us
        </button>
      </div>
    </div>
  </main>
  </template>

  <script setup lang="ts">
  const router = useRouter()
  </script>

  <style scoped>
  </style>
