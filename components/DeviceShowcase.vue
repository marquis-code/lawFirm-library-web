<template>
    <div class="relative w-full min-h-screen bg-gradient-to-b from-white via-purple-100 to-purple-300 flex items-center justify-center p-8">
      <div class="max-w-6xl w-full">
        <!-- Logo and Branding Section -->
        <div class="flex items-center justify-center mb-12">
          <div class="flex items-center space-x-4">
            <img 
              src="@/assets/img/logo.png" 
              alt="Covenant University Logo" 
              class="h-16 w-auto"
            />
          </div>
        </div>
  
        <!-- Device Mockups Container -->
        <div class="relative flex flex-col items-center">
          <!-- Mobile Devices -->
          <div class="flex items-end justify-center mb-16 relative z-10">
            <!-- Left Phone (Larger) -->
            <div class="transform translate-x-6">
            <!-- /  <div class="w-[280px] h-[580px] bg-white rounded-[3rem] shadow-xl overflow-hidden border-8 border-black relative"> -->
                <img 
                  src="@/assets/img/phone-mockup1.png" 
                  alt="Mobile App Interface" 
                  class="w-full h-full object-cover"
                />
              <!-- </div> -->
            </div>
  
            <!-- Right Phone (Smaller & Angled) -->
            <div class="transform -translate-x-6 translate-y-12">
              <!-- <div class="w-[240px] h-[500px] bg-white rounded-[2.5rem] shadow-xl overflow-hidden border-8 border-black relative transform rotate-6"> -->
                <img 
                  src="@/assets/img/phone-mockup1.png" 
                  alt="Mobile App Interface" 
                  class="w-full h-full object-cover"
                />
              <!-- </div> -->
            </div>
          </div>
  
          <!-- Browser Window Mockup -->
          <div class="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
            <!-- Browser Chrome -->
            <div class="bg-gray-100 px-4 py-2 flex items-center space-x-2 border-b">
              <div class="flex space-x-1">
                <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div class="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div class="flex-1 ml-4">
                <div class="bg-white px-3 py-1 rounded text-sm text-gray-600 max-w-md">
                  covenantuniversity.edu.ng
                </div>
              </div>
            </div>
            
            <!-- Browser Content -->
            <div class="relative">
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-08%20at%2016.47.55-8MN0MYgldpCHg8SvXsXKrCsVxAG5wC.png" 
                alt="Desktop Interface" 
                class="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  // Component logic can go here if needed
  </script>
  
  <style scoped>
  /* Custom styles for device mockups if needed */
  .device-shadow {
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }
  </style>
  
  