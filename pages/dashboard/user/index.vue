<template>
    <div>
      <!-- Action buttons -->
      <div class="mb-6 flex justify-between">
        <button 
          @click="editUser" 
          class="bg-[#369F42] hover:bg-green-700 text-white px-4 py-2 rounded-xl transition-colors duration-200"
        >
          Edit user
        </button>
        <div>
          <input
            type="text"
            placeholder="Search"
            class="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>
  
      <!-- Users table -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S/N</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roles</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone No</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(user, index) in users" :key="index" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.id }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ user.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.role }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.email }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.phone }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button 
                  @click="editUserItem(user.id)" 
                  class="text-green-600 hover:text-green-800 transition-colors duration-200"
                >
                  Edit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'nuxt/app';
  
  const router = useRouter();
  
  // Mock data
  const users = ref([
    { id: 1, name: 'Ayo Olafioye', role: 'Student', email: 'ayoolafioye@gmail.com', phone: '08101675291' },
    { id: 2, name: 'Ayo Olafioye', role: 'Level Advisor', email: 'ayoolafioye@gmail.com', phone: '08101675291' },
    { id: 3, name: 'Ayo Olafioye', role: 'Counselor', email: 'ayoolafioye@gmail.com', phone: '08101675291' },
    { id: 4, name: 'Ayo Olafioye', role: 'Student', email: 'ayoolafioye@gmail.com', phone: '08101675291' },
    { id: 5, name: 'Ayo Olafioye', role: 'Level Advisor', email: 'ayoolafioye@gmail.com', phone: '08101675291' },
    { id: 6, name: 'Ayo Olafioye', role: 'Counselor', email: 'ayoolafioye@gmail.com', phone: '08101675291' },
    { id: 7, name: 'Ayo Olafioye', role: 'Student', email: 'ayoolafioye@gmail.com', phone: '08101675291' },
    { id: 8, name: 'Ayo Olafioye', role: 'Level Advisor', email: 'ayoolafioye@gmail.com', phone: '08101675291' },
    { id: 9, name: 'Ayo Olafioye', role: 'Counselor', email: 'ayoolafioye@gmail.com', phone: '08101675291' },
  ]);
  
  const editUser = () => {
    router.push('/dashboard/user/edit');
  };
  
  const editUserItem = (id: number) => {
    router.push(`/dashboard/user/edit/${id}`);
  };

  definePageMeta({
      layout: 'dashboard'
  })
  </script>