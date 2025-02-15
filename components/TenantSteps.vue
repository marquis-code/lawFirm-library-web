<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      <div class="w-full">
       <div class="flex justify-center items-center">
       <img src="@/assets/icons/tenant-tag.svg" />
       </div>
        <h2 class="text-2xl lg:text-3xl font-semibold text-center text-[#1D2739] mt-4">Your journey to a new home</h2>
        
        <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-20">
          <div class="flex flex-col items-start justify-start text-start">
            <div class="bg-[#EBF0EC] text-[#326543] w-10 h-10 flex items-center justify-center text-lg font-bold rounded-lg">1</div>
            <h3 class="font-medium text-lg my-3">Find your ideal home and apply</h3>
            <p class="text-sm leading-relaxed text-[#1D2739]">Sign up or log in, search with filters, browse listings, schedule a tour, and submit your application.</p>
          </div>
          <div class="flex flex-col items-start justify-start text-start">
            <div class="bg-[#EBF0EC] text-[#326543] w-10 h-10 flex items-center justify-center text-lg font-bold rounded-lg">2</div>
            <h3 class="font-medium text-lg my-3">Secure your lease</h3>
            <p class="text-sm leading-relaxed text-[#1D2739]">Review the approved lease agreement, sign it digitally, and get ready to move in.</p>
          </div>
          <div class="flex flex-col items-start justify-start text-start">
            <div class="bg-[#EBF0EC] text-[#326543] w-10 h-10 flex items-center justify-center text-lg font-bold rounded-lg">3</div>
            <h3 class="font-medium text-lg my-3">Make your first payment</h3>
            <p class="text-sm leading-relaxed text-[#1D2739]">Receive a payment notification, pay rent and the security deposit, and get instant confirmation.</p>
          </div>
          <div class="flex flex-col items-start justify-start text-start">
            <div class="bg-[#EBF0EC] text-[#326543] w-10 h-10 flex items-center justify-center text-lg font-bold rounded-lg">4</div>
            <h3 class="font-medium text-lg my-3">Move in & manage your room</h3>
            <p class="text-sm leading-relaxed text-[#1D2739]">Pay rent, request maintenance, communicate with your property manager, and renew or move out.</p>
          </div>
        </div>
        
        <div class="flex flex-col md:flex-row pt-10 justify-center mt-8 space-y-4 md:space-y-0 md:space-x-4">
          <button @click="handleSignUp" class="bg-[#292929] text-white px-6 py-3.5 tetx-sm rounded-lg font-medium">Sign up for free</button>
          <button class="bg-[#EBE5E0] text-[#292929] px-6 py-3.5 tetx-sm rounded-lg font-medium">Download Our App</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const handleSignUp = () => {
    window.location.href = "https://tenantblackcountry.vercel.app/"
  }
  // Nuxt 3 Composition API Setup
  </script>
  
  <style>
  body {
    font-family: 'Inter', sans-serif;
  }
  </style>
  