<template>
    <section class="py-24 px-4 md:px-16 lg:px-24 bg-gradient-to-br from-white to-purple-50">
      <div class="max-w-6xl mx-auto">
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
          <!-- Tabs -->
          <div class="flex bg-[#470A34] text-white">
            <button 
              v-for="tab in tabs" 
              :key="tab.id"
              @click="activeTab = tab.id"
              class="flex-1 py-4 text-center text-lg font-medium border-r border-white last:border-r-0 transition-all duration-300"
              :class="activeTab === tab.id ? 'bg-[#470A34]' : 'hover:bg-[#470A34]'"
            >
              {{ tab.name }}
            </button>
          </div>
          
          <!-- Tab Content -->
          <div class="p-6">
            <TransitionGroup name="fade" mode="out-in">
              <!-- Students Tab -->
              <div v-if="activeTab === 'students'" key="students" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  v-for="(item, index) in 7" 
                  :key="`student-${index}`"
                  class="border-b border-gray-200 py-4 px-2 hover:bg-gray-50 transition-colors duration-300"
                >
                  <a href="#" class="flex items-center justify-between">
                    <span>Document and different files for processing admission</span>
                    <!-- <Icon name="lucide:chevron-right" class="w-5 h-5 text-gray-500" /> -->
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_297_244" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                    <rect width="24" height="24" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0_297_244)">
                    <path d="M12.6 12L8 7.4L9.4 6L15.4 12L9.4 18L8 16.6L12.6 12Z" fill="#1C1B1F"/>
                    </g>
                    </svg>

                  </a>
                </div>
              </div>
              
              <!-- Level Advisor Tab -->
              <div v-if="activeTab === 'advisor'" key="advisor" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  v-for="(item, index) in 7" 
                  :key="`advisor-${index}`"
                  class="border-b border-gray-200 py-4 px-2 hover:bg-gray-50 transition-colors duration-300"
                >
                  <a href="#" class="flex items-center justify-between">
                    <span>Document and different files for processing admission</span>
                    <!-- <Icon name="lucide:chevron-right" class="w-5 h-5 text-gray-500" /> -->
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_297_244" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                    <rect width="24" height="24" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0_297_244)">
                    <path d="M12.6 12L8 7.4L9.4 6L15.4 12L9.4 18L8 16.6L12.6 12Z" fill="#1C1B1F"/>
                    </g>
                    </svg>
                  </a>
                </div>
              </div>
              
              <!-- Counselor Tab -->
              <div v-if="activeTab === 'counselor'" key="counselor" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  v-for="(item, index) in 7" 
                  :key="`counselor-${index}`"
                  class="border-b border-gray-200 py-4 px-2 hover:bg-gray-50 transition-colors duration-300"
                >
                  <a href="#" class="flex items-center justify-between">
                    <span>Document and different files for processing admission</span>
                    <!-- <Icon name="lucide:chevron-right" class="w-5 h-5 text-gray-500" /> -->
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_297_244" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                    <rect width="24" height="24" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0_297_244)">
                    <path d="M12.6 12L8 7.4L9.4 6L15.4 12L9.4 18L8 16.6L12.6 12Z" fill="#1C1B1F"/>
                    </g>
                    </svg>
                  </a>
                </div>
              </div>
            </TransitionGroup>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const tabs = [
    { id: 'students', name: 'Students' },
    { id: 'advisor', name: 'Level advisor' },
    { id: 'counselor', name: 'Counselor' }
  ];
  
  const activeTab = ref('students');
  </script>
  
  <style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>
  
  