<template>
  <!--  -->
 <main class="bg-[#FDFCFC]">
  <div class="max-w-7xl mx-auto text-center py-32  px-10">
    <h2 data-aos="fade-up" class="text-3xl font-semibold text-[#1D2739]">Why choose us?</h2>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-20">
      <div v-for="(item, index) in 4" class="flex flex-col items-start justify-start items-start">
        <!-- <div class="w-4 h-4 bg-[#E26E6A] rounded-sm"></div> -->
        <div class="bg-[#D75626] w-10 h-10 text-white text-lg rounded-lg flex items-center justify-center">
                {{ index + 1 }}
              </div>
        <h3 data-aos="fade-up" class="mt-4 text-lg font-semibold text-[#1D2739]">Subheading one</h3>
        <p data-aos="fade-up" class="mt-2 text-[#1D2739] text-base lg:max-w-xs text-start">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.
        </p>
      </div>
      
      <!-- <div class="flex flex-col items-start justify-start items-start">
        <div class="w-4 h-4 bg-[#E26E6A] rounded-sm"></div>
        <h3 data-aos="fade-up" class="mt-4 text-lg font-semibold text-[#1D2739]">Subheading two</h3>
        <p data-aos="fade-up" class="mt-2 text-[#1D2739] text-base lg:max-w-xs text-start">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.
        </p>
      </div>
      
      <div class="flex flex-col items-start justify-start items-start">
        <div class="w-4 h-4 bg-[#E26E6A] rounded-sm"></div>
        <h3 data-aos="fade-up" class="mt-4 text-lg font-semibold text-[#1D2739]">Subheading three</h3>
        <p data-aos="fade-up" class="mt-2 text-[#1D2739] text-base lg:max-w-xs text-start">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.
        </p>
      </div>
      
      <div class="flex flex-col items-start justify-start items-start">
        <div class="w-4 h-4 bg-[#E26E6A] rounded-sm"></div>
        <h3 data-aos="fade-up" class="mt-4 text-lg font-semibold text-[#1D2739]">Subheading four</h3>
        <p data-aos="fade-up" class="mt-2 text-[#1D2739] text-base lg:max-w-xs text-start">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.
        </p>
      </div> -->
    </div>
  </div>
 </main>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
