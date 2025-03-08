<template>
    <div>
      <!-- Knowledge Base Form -->
      <div class="bg-white rounded-xl shadow p-6 mb-8">
        <h2 class="text-lg font-semibold mb-4">New knowledge Base</h2>
        
        <div class="space-y-4">
          <div>
            <label for="client-name" class="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
            <input
              id="client-name"
              v-model="clientName"
              type="text"
              class="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div>
            <label for="file-name" class="block text-sm font-medium text-gray-700 mb-1">File Name</label>
            <input
              id="file-name"
              v-model="fileName"
              type="text"
              class="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div>
            <label for="published-date" class="block text-sm font-medium text-gray-700 mb-1">Published Date</label>
            <input
              id="published-date"
              v-model="publishedDate"
              type="date"
              class="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div>
            <button 
              @click="addFile" 
              class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl transition-colors duration-200"
            >
              Add File
            </button>
          </div>
        </div>
      </div>
  
      <!-- Knowledge Base Table -->
      <div class="bg-white rounded-xl shadow overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(item, index) in knowledgeBase" :key="index" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.id }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ item.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.category }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.type }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button 
                  @click="editKnowledgeBase(item.id)" 
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
  
  // Form data
  const clientName = ref('');
  const fileName = ref('');
  const publishedDate = ref('');
  
  // Mock data
  const knowledgeBase = ref([
    { id: 1, name: 'Admin', category: 'update,admin-create,admin-update,admin-delete,admin-block', type: 'Admin' },
    { id: 2, name: 'Student', category: 'update,admin-create,admin-update,admin-delete,admin-block', type: 'Student' },
    { id: 3, name: 'Level Advisor', category: 'update,admin-create,admin-update,admin-delete,admin-block', type: 'Level Advisor' },
    { id: 4, name: 'Counselor', category: 'update,admin-create,admin-update,admin-delete,admin-block', type: 'Counselor' },
    { id: 5, name: 'Counselor', category: 'update,admin-create,admin-update,admin-delete,admin-block', type: 'Counselor' },
    { id: 6, name: 'Counselor', category: 'update,admin-create,admin-update,admin-delete,admin-block', type: 'Counselor' },
    { id: 7, name: 'Counselor', category: 'update,admin-create,admin-update,admin-delete,admin-block', type: 'Counselor' },
  ]);
  
  const addFile = () => {
    // In a real app, you would add the file here
    clientName.value = '';
    fileName.value = '';
    publishedDate.value = '';
  };
  
  const editKnowledgeBase = (id: number) => {
    // In a real app, you would edit the knowledge base here
    console.log('Edit knowledge base', id);
  };

  definePageMeta({
      layout: 'dashboard'
  })
  </script>