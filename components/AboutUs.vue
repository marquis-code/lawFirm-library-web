<!-- components/AboutSection.vue -->
<template>
  <!--  -->
<main class="bg-[#FDFCFC] lg:pt-32">
  <section class="max-w-7xl mx-auto px-10 2xl:px-6 py-12 md:py-16">
    <div class="flex flex-col md:flex-row">
      <!-- Left Column -->
      <div class="md:w-2/3 mb-8 md:mb-0 flex flex-col items-center md:items-start">
        <img data-aos="fade-up" src="@/assets/icons/about-us-tag.svg" />
        <h2 data-aos="fade-up" class="text-3xl md:text-4xl font-bold mt-6 text-[#1D2739]  leading-tight text-center md:text-left max-w-[400px] md:max-w-none">
          Your Perfect Shared Living Experience
        </h2>
      </div>

      <!-- Right Column -->
      <div class="md:w-2/3 md:pl-8">
        <!-- Mission Statement -->
        <div class="mb-12">
          <p data-aos="fade-up" class="text-[#1D2739] text-lg">
            Mission statement Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Suspendisse varius enim in eros elementum tristique. Duis cursus, 
            mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero erat.
          </p>
        </div>

        <!-- Core Values -->
        <div class="space-y-8 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">
          <!-- Core Value 1 -->
          <div>
            <h3 data-aos="fade-up" class="text-xl font-semibold text-gray-900 mb-2">Core value 1</h3>
            <p data-aos="fade-up" class="text-[#1D2739]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.
            </p>
          </div>

          <!-- Core Value 2 -->
          <div>
            <h3 data-aos="fade-up" class="text-xl font-semibold text-gray-900 mb-2">Core value 2</h3>
            <p data-aos="fade-up" class="text-[#1D2739]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>
</template>

<script setup lang="ts">
// No props or additional logic needed for this component
</script>