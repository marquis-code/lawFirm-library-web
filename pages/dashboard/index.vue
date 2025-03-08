<template>
    <div>
      <!-- Stats cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow p-6 flex items-center justify-center">
          <div class="relative">
            <svg class="w-32 h-32">
              <circle
                cx="64"
                cy="64"
                r="54"
                fill="none"
                stroke="#e6e6e6"
                stroke-width="10"
              />
              <circle
                cx="64"
                cy="64"
                r="54"
                fill="none"
                stroke="#2e7d32"
                stroke-width="10"
                stroke-dasharray="339.3"
                :stroke-dashoffset="calculateOffset(2000, 3000)"
                transform="rotate(-90, 64, 64)"
                class="transition-all duration-1000 ease-out"
              />
            </svg>
            <div class="absolute inset-0 flex flex-col items-center justify-center">
              <div class="text-2xl font-bold text-green-700">2000</div>
              <div class="text-sm text-gray-600">Counselor</div>
            </div>
          </div>
        </div>
  
        <div class="bg-white rounded-xl shadow p-6 flex items-center justify-center">
          <div class="relative">
            <svg class="w-32 h-32">
              <circle
                cx="64"
                cy="64"
                r="54"
                fill="none"
                stroke="#e6e6e6"
                stroke-width="10"
              />
              <circle
                cx="64"
                cy="64"
                r="54"
                fill="none"
                stroke="#9c27b0"
                stroke-width="10"
                stroke-dasharray="339.3"
                :stroke-dashoffset="calculateOffset(2500, 3000)"
                transform="rotate(-90, 64, 64)"
                class="transition-all duration-1000 ease-out"
              />
            </svg>
            <div class="absolute inset-0 flex flex-col items-center justify-center">
              <div class="text-2xl font-bold text-purple-600">2500</div>
              <div class="text-sm text-gray-600">Advisor</div>
            </div>
          </div>
        </div>
  
        <div class="bg-white rounded-xl shadow p-6 flex items-center justify-center">
          <div class="relative">
            <svg class="w-32 h-32">
              <circle
                cx="64"
                cy="64"
                r="54"
                fill="none"
                stroke="#e6e6e6"
                stroke-width="10"
              />
              <circle
                cx="64"
                cy="64"
                r="54"
                fill="none"
                stroke="#2196f3"
                stroke-width="10"
                stroke-dasharray="339.3"
                :stroke-dashoffset="calculateOffset(3000, 3000)"
                transform="rotate(-90, 64, 64)"
                class="transition-all duration-1000 ease-out"
              />
            </svg>
            <div class="absolute inset-0 flex flex-col items-center justify-center">
              <div class="text-2xl font-bold text-blue-500">3000</div>
              <div class="text-sm text-gray-600">Users</div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Users table -->
      <div class="bg-white rounded-xl shadow overflow-hidden">
        <div class="p-4 flex items-center justify-between">
          <h2 class="text-lg font-semibold">All Users</h2>
          <div>
            <input
              type="text"
              placeholder="Search"
              class="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
  
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-100">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S/N</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roles</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone No</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(user, index) in users" :key="index" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.id }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ user.name }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.role }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.email }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.phone }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  
  // Mock data
  const users = ref([
    { id: 1, name: 'Ayo Olafioye', role: 'Student', email: 'ayoolafioye@gmail.com', phone: '08101675291' },
    { id: 2, name: 'Ayo Olafioye', role: 'Student', email: 'ayoolafioye@gmail.com', phone: '08101675291' },
    { id: 3, name: 'Ayo Olafioye', role: 'Student', email: 'ayoolafioye@gmail.com', phone: '08101675291' },
    { id: 4, name: 'Ayo Olafioye', role: 'Student', email: 'ayoolafioye@gmail.com', phone: '08101675291' },
    { id: 5, name: 'Ayo Olafioye', role: 'Student', email: 'ayoolafioye@gmail.com', phone: '08101675291' },
    { id: 6, name: 'Ayo Olafioye', role: 'Student', email: 'ayoolafioye@gmail.com', phone: '08101675291' },
    { id: 7, name: 'Ayo Olafioye', role: 'Student', email: 'ayoolafioye@gmail.com', phone: '08101675291' },
    { id: 8, name: 'Ayo Olafioye', role: 'Student', email: 'ayoolafioye@gmail.com', phone: '08101675291' },
  ]);
  
  // Calculate the offset for the circular progress
  const calculateOffset = (value: number, max: number) => {
    const circumference = 2 * Math.PI * 54; // 2πr
    const progressPercentage = (value / max);
    return circumference - (circumference * progressPercentage);
  };
  
  // Animation for the charts
  onMounted(() => {
    // The animation is handled by the transition-all class
  });

  definePageMeta({
      layout: 'dashboard'
  })
  </script>