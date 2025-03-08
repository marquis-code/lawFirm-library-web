<template>
  <div>
    <!-- Additional home page specific content could go here -->
    <!-- 
      Note: The main components (NavBar, HeroSection, QuickLinks, FooterSection) 
      are already included in app.vue, so they don't need to be repeated here
    -->
    
    <!-- You could add additional sections specific to the home page -->
    <section class="py-16 px-4 md:px-16 lg:px-24 bg-white">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold text-center mb-12 text-purple-900">Welcome to Covenant University</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div class="flex justify-center mb-4">
              <div class="bg-purple-100 p-3 rounded-full">
                <Icon name="lucide:book-open" class="w-8 h-8 text-purple-900" />
              </div>
            </div>
            <h3 class="text-xl font-semibold text-center mb-3">Academic Excellence</h3>
            <p class="text-gray-600 text-center">
              Discover our world-class academic programs designed to prepare you for success in your chosen field.
            </p>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div class="flex justify-center mb-4">
              <div class="bg-purple-100 p-3 rounded-full">
                <Icon name="lucide:users" class="w-8 h-8 text-purple-900" />
              </div>
            </div>
            <h3 class="text-xl font-semibold text-center mb-3">Student Community</h3>
            <p class="text-gray-600 text-center">
              Join a vibrant community of learners from diverse backgrounds, united by a passion for knowledge.
            </p>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div class="flex justify-center mb-4">
              <div class="bg-purple-100 p-3 rounded-full">
                <Icon name="lucide:globe" class="w-8 h-8 text-purple-900" />
              </div>
            </div>
            <h3 class="text-xl font-semibold text-center mb-3">Global Opportunities</h3>
            <p class="text-gray-600 text-center">
              Explore international partnerships and exchange programs that broaden your horizons.
            </p>
          </div>
        </div>
        
        <div class="mt-12 text-center">
          <button class="bg-purple-900 text-white px-8 py-3 rounded-md hover:bg-purple-800 transition-colors duration-300">
            Explore Programs
          </button>
        </div>
      </div>
    </section>
    
    <!-- News and Events Section -->
    <section class="py-16 px-4 md:px-16 lg:px-24 bg-gray-50">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold text-center mb-12 text-purple-900">Latest News & Events</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="i in 3" :key="i" class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <div class="h-48 bg-gray-200">
              <!-- <img src="/placeholder.svg?height=192&width=384" alt="News image" class="w-full h-full object-cover" /> -->
            </div>
            <div class="p-6">
              <div class="text-sm text-gray-500 mb-2">March {{ 5 + i }}, 2024</div>
              <h3 class="text-xl font-semibold mb-3">University Announces New Research Initiative</h3>
              <p class="text-gray-600 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
              </p>
              <a href="#" class="text-purple-900 font-medium hover:underline flex items-center">
                Read More
                <Icon name="lucide:arrow-right" class="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        </div>
        
        <div class="mt-12 text-center">
          <a href="#" class="text-purple-900 font-medium hover:underline flex items-center justify-center">
            View All News & Events
            <Icon name="lucide:arrow-right" class="w-4 h-4 ml-1" />
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Home page specific logic can go here
definePageMeta({
  title: 'Home - Covenant University',
  layout: 'home',
  description: 'Covenant University - Africa\'s No. 1 Private University'
});
</script>

<style scoped>
/* Home page specific styles can go here */
</style>