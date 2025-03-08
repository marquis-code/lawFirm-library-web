<template>
    <div>
      <!-- Header -->
      <div class="mb-6 flex justify-between">
        <h2 class="text-lg font-semibold">Create role</h2>
        <button 
          @click="goBack" 
          class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl transition-colors duration-200"
        >
          Previous page
        </button>
      </div>
  
      <!-- Create role form -->
      <div class="bg-white rounded-xl shadow p-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Left column - form fields -->
          <div class="md:col-span-2 space-y-6">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                id="name"
                v-model="roleName"
                type="text"
                class="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                id="description"
                v-model="roleDescription"
                rows="5"
                class="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              ></textarea>
            </div>
            
            <div>
              <button 
                @click="createRole" 
                class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl transition-colors duration-200"
              >
                Create role
              </button>
            </div>
          </div>
          
          <!-- Right column - permissions -->
          <div class="bg-gray-50 p-4 rounded-lg">
            <h3 class="font-medium mb-4">Admin</h3>
            <div class="space-y-2">
              <div class="flex items-center">
                <input 
                  id="update-admin" 
                  type="checkbox" 
                  v-model="permissions.updateAdmin"
                  class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label for="update-admin" class="ml-2 block text-sm text-gray-700">Update Admin</label>
              </div>
              <div class="flex items-center">
                <input 
                  id="delete-admin" 
                  type="checkbox" 
                  v-model="permissions.deleteAdmin"
                  class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label for="delete-admin" class="ml-2 block text-sm text-gray-700">Delete Admin</label>
              </div>
              <div class="flex items-center">
                <input 
                  id="block-admin" 
                  type="checkbox" 
                  v-model="permissions.blockAdmin"
                  class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label for="block-admin" class="ml-2 block text-sm text-gray-700">Block Admin</label>
              </div>
            </div>
            
            <h3 class="font-medium mt-6 mb-4">Roles</h3>
            <div class="space-y-2">
              <div class="flex items-center">
                <input 
                  id="delete-role" 
                  type="checkbox" 
                  v-model="permissions.deleteRole"
                  class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label for="delete-role" class="ml-2 block text-sm text-gray-700">Delete role</label>
              </div>
              <div class="flex items-center">
                <input 
                  id="update-role" 
                  type="checkbox" 
                  v-model="permissions.updateRole"
                  class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label for="update-role" class="ml-2 block text-sm text-gray-700">Update role</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'nuxt/app';
  
  const router = useRouter();
  const roleName = ref('');
  const roleDescription = ref('');
  const permissions = ref({
    updateAdmin: false,
    deleteAdmin: false,
    blockAdmin: false,
    deleteRole: false,
    updateRole: false,
  });
  
  const goBack = () => {
    router.back();
  };
  
  const createRole = () => {
    // In a real app, you would save the role here
    router.push('/roles');
  };

  definePageMeta({
      layout: 'dashboard'
  })
  </script>