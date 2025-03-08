<template>
    <div>
      <!-- Action buttons -->
      <div class="mb-6">
        <button 
          @click="addNewRole" 
          class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl transition-colors duration-200"
        >
          Add New Roles
        </button>
      </div>
  
      <!-- Roles table -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S/N</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permission</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(role, index) in roles" :key="index" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ role.id }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ role.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ role.description }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ role.permission }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button 
                  @click="editRole(role.id)" 
                  class="text-green-600 hover:text-green-800 transition-colors duration-200 bg-green-100 px-3 py-1 rounded-xl"
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
  const roles = ref([
    { id: 1, name: 'Admin', description: 'Admin', permission: 'update,admin-create,admin-update,admin-delete,admin-block' },
    { id: 2, name: 'Student', description: 'Student', permission: 'update,admin-create,admin-update,admin-delete,admin-block' },
    { id: 3, name: 'Level Advisor', description: 'Level Advisor', permission: 'update,admin-create,admin-update,admin-delete,admin-block' },
    { id: 4, name: 'Counselor', description: 'Counselor', permission: 'update,admin-create,admin-update,admin-delete,admin-block' },
  ]);
  
  const addNewRole = () => {
    router.push('/dashboard/roles/create');
  };
  
  const editRole = (id: number) => {
    router.push(`/dashboard/roles/edit/${id}`);
  };

  definePageMeta({
      layout: 'dashboard'
  })
  </script>