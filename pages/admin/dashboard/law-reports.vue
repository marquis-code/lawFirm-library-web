<template>
  <div>
    <!-- Add New Law Report Button -->
    <div class="mb-6">
      <button 
        @click="openAddModal" 
        class="flex items-center bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded transition-colors"
      >
        <PlusIcon class="h-5 w-5 mr-2" />
        Add New Law Report
      </button>
    </div>
    
    <!-- Law Reports Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-xl font-medium text-green-700">Recent records</h2>
      </div>
      
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S/N</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catalog number</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(report, index) in lawReports" :key="report.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ index + 1 }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ report.title }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ report.description?.substring(0, 30) }}{{ report.description?.length > 30 ? '...' : '' }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ report.author }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ report.catalogNumber }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ report.year }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ report.location }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button 
                  class="bg-green-700 hover:bg-green-800 text-white px-3 py-1 rounded text-xs"
                  @click="editReport(report)"
                >
                  Edit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- Add Law Report Modal -->
    <div v-if="showAddModal" class="fixed inset-0 z-50 flex items-center justify-center">
      <!-- Backdrop with blur effect -->
      <div 
        class="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        @click="showAddModal = false"
      ></div>
      
      <!-- Modal Content -->
      <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl z-10 relative">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-medium text-gray-800">Add New Law Report</h2>
            <button @click="showAddModal = false" class="text-gray-500 hover:text-gray-700">
              <XIcon class="h-6 w-6" />
            </button>
          </div>
          
          <form @submit.prevent="addReport" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input 
                  v-model="newReport.title" 
                  type="text" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Author</label>
                <input 
                  v-model="newReport.author" 
                  type="text" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea 
                v-model="newReport.description" 
                rows="3" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Catalog Number</label>
                <input 
                  v-model="newReport.catalogNumber" 
                  type="text" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <input 
                  v-model="newReport.year" 
                  type="number" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input 
                v-model="newReport.location" 
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            
            <div class="flex justify-end space-x-3 pt-4 border-t">
              <button 
                type="button" 
                @click="showAddModal = false" 
                class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                class="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800"
              >
                Add Law Report
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { PlusIcon, XIcon } from 'lucide-vue-next';

const { lawReports, addItem } = useLibrary();
const { openEditModal } = useModal();

// Add report modal
const showAddModal = ref(false);
const newReport = ref({
  title: '',
  author: '',
  description: '',
  catalogNumber: '',
  year: new Date().getFullYear(),
  location: '',
});

// Open add modal
const openAddModal = () => {
  newReport.value = {
    title: '',
    author: '',
    description: '',
    catalogNumber: '',
    year: new Date().getFullYear(),
    location: '',
  };
  showAddModal.value = true;
};

// Add report
const addReport = () => {
  addItem(newReport.value, 'law-report');
  showAddModal.value = false;
};

// Edit report
const editReport = (report: any) => {
  openEditModal(report, 'law-report');
};

definePageMeta({
    layout: 'dashboard'
})
</script>