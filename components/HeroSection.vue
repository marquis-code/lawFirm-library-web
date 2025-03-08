<template>
    <section class="relative">
      <!-- Hero Image with Overlay -->
      <div class="relative h-[600px] overflow-hidden">
        <img 
          src="@/assets/img/hero.png" 
          alt="Students studying" 
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-black bg-opacity-50"></div>
        
        <!-- Hero Content -->
        <div class="absolute inset-0 flex flex-col justify-center px-4 md:px-16 lg:px-24">
          <div class="max-w-2xl">
            <h2 class="text-white text-xl md:text-2xl mb-2 font-light tracking-wider">
              CONVENANT UNIVERSITY
            </h2>
            <h1 class="text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Empowering Every Student To Realize Their Boldest Career Dreams.
            </h1>
          </div>
        </div>
      </div>
      
      <!-- Statistics Section -->
      <div class="relative mx-4 md:mx-16 rounded-xl lg:mx-24 -mt-20 z-10">
        <div class="bg-white rounded-xl shadow-lg p-6 py-10 md:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="flex items-center justify-center md:justify-start space-x-4">
            <!-- <Icon name="lucide:building" class="w-8 h-8 text-[#470A34]" /> -->
            <img src="@/assets/icons/departments.svg" class="w-8 h-8 text-[#470A34]"  />
            <div>
              <h3 class="text-[#470A34] text-xl font-bold">35,211+</h3>
              <p class="text-[#470A34]">Departments</p>
            </div>
          </div>
          
          <div class="flex items-center justify-center md:justify-start space-x-4">
            <!-- <Icon name="lucide:users" class="w-8 h-8 text-[#470A34]" /> -->
            <img src="@/assets/icons/students.svg" class="w-8 h-8 text-[#470A34]"  />
            <div>
              <h3 class="text-[#470A34] text-xl font-bold">35,211+</h3>
              <p class="text-[#470A34]">Students</p>
            </div>
          </div>
          
          <div class="flex items-center justify-center md:justify-start space-x-4">
            <!-- <Icon name="lucide:book-open" class="w-8 h-8 text-[#470A34]" /> -->
            <img src="@/assets/icons/courses.svg" class="w-8 h-8 text-[#470A34]"  />
            <div>
              <h3 class="text-[#470A34] text-xl font-bold">35,211+</h3>
              <p class="text-[#470A34]">Courses</p>
            </div>
          </div>
          
          <div class="flex items-center justify-center md:justify-start space-x-4">
            <!-- <Icon name="lucide:users" class="w-8 h-8 text-[#470A34]" /> -->
            <img src="@/assets/icons/counselors.svg" class="w-8 h-8 text-[#470A34]"  />
            <div>
              <h3 class="text-[#470A34] text-xl font-bold">35,211+</h3>
              <p class="text-[#470A34]">Counselors</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  // Hero section with statistics
  </script>
  
  <style scoped>
  .hero-text-shadow {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
  </style>
  
  