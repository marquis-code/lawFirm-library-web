<!-- <template>
    <section class="flex flex-col lg:flex-row items-start lg:items-center justify-between container mx-auto px-6 lg:px-12 pt-32 py-16">
      <div class="lg:w-1/2 flex justify-center items-center space-y-5 flex-col">
       <div class=" flex justify-center items-center">
        <img src="@/assets/icons/about-us-tag.svg" />
       </div>
        <h1 class="text-xl lg:text-4xl font-semibold max-w-xs mx-auto flex justify-center items-center text-center text-[#1D2739] leading-tight">
          Your Perfect Shared Living <br class="hidden lg:block" /> Experience
        </h1>
      </div>
      <div class="lg:w-1/2 text-gray-700 mt-6 lg:mt-0">
        <p class="text-lg lg:text-base text-[#1D2739]  leading-relaxed">
          Mission statement Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Suspendisse varius enim in eros elementum tristique. Duis cursus, mi
          quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero erat.
        </p>
        <div class="flex flex-col sm:flex-row mt-6 space-y-4 sm:space-y-0 sm:space-x-12">
          <div>
            <h3 class="font-semibold text-[#1D2739] text-lg">Core value 1</h3>
            <p class="text-[#1D2739] lg:text-sm  text-base mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              varius enim in eros.
            </p>
          </div>
          <div>
            <h3 class="font-semibold text-[#1D2739] text-lg">Core value 2</h3>
            <p class="text-[#1D2739] lg:text-sm  text-base mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              varius enim in eros.
            </p>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  // No script logic required for this static UI component
  </script>
  
  <style scoped>
  </style>
   -->

   <!-- components/AboutSection.vue -->
<!-- <template>
  <section class="max-w-7xl mx-auto px-4 py-12 md:py-16">
    <div class="flex flex-col md:flex-row">

      <div class="md:w-1/3 mb-8 md:mb-0">
        <div class="inline-flex items-center space-x-2 mb-4 bg-red-50 px-3 py-2 rounded-md">
          <div class="w-2 h-2 rounded-full bg-red-600"></div>
          <span class="text-red-600 font-medium">About us</span>
        </div>
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
          Your Perfect Shared Living Experience
        </h2>
      </div>


      <div class="md:w-2/3 md:pl-8">

        <div class="mb-8">
          <p class="text-gray-600">
            Mission statement Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Suspendisse varius enim in eros elementum tristique. Duis cursus, 
            mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero erat.
          </p>
        </div>


        <div class="grid md:grid-cols-2 gap-8">
   
          <div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Core value 1</h3>
            <p class="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.
            </p>
          </div>


          <div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Core value 2</h3>
            <p class="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template> -->


<!-- components/AboutSection.vue -->
<template>
  <section class="max-w-7xl mx-auto px-4 py-12 md:py-16">
    <div class="flex flex-col md:flex-row">
      <!-- Left Column -->
      <div class="md:w-1/3 mb-8 md:mb-0 flex flex-col items-center md:items-start">
        <img src="@/assets/icons/about-us-tag.svg" />
        <h2 class="text-3xl md:text-4xl font-bold mt-6 text-[#1D2739]  leading-tight text-center md:text-left max-w-[400px] md:max-w-none">
          Your Perfect Shared Living Experience
        </h2>
      </div>

      <!-- Right Column -->
      <div class="md:w-2/3 md:pl-8">
        <!-- Mission Statement -->
        <div class="mb-12">
          <p class="text-gray-600 text-lg">
            Mission statement Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Suspendisse varius enim in eros elementum tristique. Duis cursus, 
            mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero erat.
          </p>
        </div>

        <!-- Core Values -->
        <div class="space-y-8 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">
          <!-- Core Value 1 -->
          <div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Core value 1</h3>
            <p class="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.
            </p>
          </div>

          <!-- Core Value 2 -->
          <div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Core value 2</h3>
            <p class="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// No props or additional logic needed for this component
</script>