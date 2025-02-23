<!-- components/ServiceProviderSection.vue -->
<template>
    <section class="max-w-7xl mx-auto px-4 py-12 md:py-16">
      <div class="flex flex-col md:grid md:grid-cols-2 md:gap-12">
        <!-- Left Column - Steps -->
        <div class="order-2 md:order-1 space-y-6">
          <!-- Step 1 -->
          <div class="bg-gray-50 rounded-xl p-6">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-10 h-10 bg-green-800 text-white rounded-lg flex items-center justify-center font-semibold">
                1
              </div>
              <div>
                <h3 class="text-xl font-semibold mb-2">Take the First Step</h3>
                <p class="text-[#1D2739]">Show your interest by contacting us. Join our network and and provide reliable home services.</p>
              </div>
            </div>
          </div>
  
          <!-- Step 2 -->
          <div class="bg-gray-50 rounded-xl p-6">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-10 h-10 bg-green-800 text-white rounded-lg flex items-center justify-center font-semibold">
                2
              </div>
              <div>
                <h3 class="text-xl font-semibold mb-2">Accept Invitation</h3>
                <p class="text-[#1D2739]">Join the platform through invitation from the property manager</p>
              </div>
            </div>
          </div>
  
          <!-- Step 3 -->
          <div class="bg-gray-50 rounded-xl p-6">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-10 h-10 bg-green-800 text-white rounded-lg flex items-center justify-center font-semibold">
                3
              </div>
              <div>
                <h3 class="text-xl font-semibold mb-2">Manage Requests</h3>
                <p class="text-[#1D2739]">Handle requests and service appointments</p>
              </div>
            </div>
          </div>
  
          <!-- Step 4 -->
          <div class="bg-gray-50 rounded-xl p-6">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-10 h-10 bg-green-800 text-white rounded-lg flex items-center justify-center font-semibold">
                4
              </div>
              <div>
                <h3 class="text-xl font-semibold mb-2">Invoice and payments</h3>
                <p class="text-[#1D2739]">Submit invoices and receive payments for services rendered</p>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Right Column - Image and Text -->
        <div class="order-1 md:order-2 mb-8 md:mb-0 flex flex-col">
          <div class="mb-6">
            <h2 class="text-3xl font-bold mb-4">Want to become a service provider at BlackCountry?</h2>
            <p class="text-[#1D2739] mb-6">
              Offer your services to tenants in need of maintenance and home solutions. Manage requests, provide timely assistance, and ensure a well-maintained living space—all while growing your business.
            </p>
            <button class="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
              Contact us
            </button>
          </div>
          <div class="relative flex-grow">
            <img 
              src="@/assets/img/agents.svg" 
              alt="Service provider with tablet" 
              class="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  // No props or additional logic needed for this component
  </script>