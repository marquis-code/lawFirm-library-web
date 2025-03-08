<template>
    <div>
      <!-- Action buttons -->
      <div class="mb-6">
        <button 
          @click="goBack" 
          class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl transition-colors duration-200"
        >
          Previous
        </button>
      </div>
  
      <!-- Role selection form -->
      <div class="bg-white rounded-xl shadow p-6">
        <h2 class="text-lg font-semibold mb-4">Select one or more roles</h2>
        
        <div class="mb-4">
          <div class="relative">
            <select 
              v-model="selectedRole" 
              class="w-full p-3 border rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
              <option value="Student">Student</option>
              <option value="Level Advisor">Level Advisor</option>
              <option value="Counselor">Counselor</option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <ChevronDown class="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
        
<div class="pt-6">
    <button 
          @click="saveRole" 
          class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl transition-colors duration-200"
        >
          Save
        </button>
</div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'nuxt/app';
  import { ChevronDown } from 'lucide-vue-next';
  
  const router = useRouter();
  const selectedRole = ref('User');
  
  const goBack = () => {
    router.back();
  };
  
  const saveRole = () => {
    // In a real app, you would save the role here
    router.push('/dashboard/user');
  };

  definePageMeta({
      layout: 'dashboard'
  })
  </script>
