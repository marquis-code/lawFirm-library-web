<template>
    <div>
      <!-- Summary Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        <!-- Users Card -->
        <div class="bg-white rounded-lg shadow p-4">
          <div class="flex justify-between items-center mb-2">
            <h3 class="text-gray-700">Users</h3>
            <span class="text-green-500 font-medium">{{ totalUsers }}</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div class="bg-green-400 h-2.5 rounded-full" style="width: 70%"></div>
          </div>
        </div>
        
        <!-- Law Reports Card -->
        <div class="bg-white rounded-lg shadow p-4">
          <div class="flex justify-between items-center mb-2">
            <h3 class="text-gray-700">Law reports</h3>
            <span class="text-blue-500 font-medium">{{ totalLawReports }}</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div class="bg-blue-400 h-2.5 rounded-full" style="width: 60%"></div>
          </div>
        </div>
        
        <!-- Books Card -->
        <div class="bg-white rounded-lg shadow p-4">
          <div class="flex justify-between items-center mb-2">
            <h3 class="text-gray-700">Books</h3>
            <span class="text-purple-500 font-medium">{{ totalBooks }}</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div class="bg-purple-400 h-2.5 rounded-full" style="width: 80%"></div>
          </div>
        </div>
        
        <!-- Articles Card -->
        <div class="bg-white rounded-lg shadow p-4">
          <div class="flex justify-between items-center mb-2">
            <h3 class="text-gray-700">Articles</h3>
            <span class="text-cyan-500 font-medium">{{ totalArticles }}</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div class="bg-cyan-400 h-2.5 rounded-full" style="width: 40%"></div>
          </div>
        </div>
        
        <!-- Client Files Card -->
        <div class="bg-white rounded-lg shadow p-4">
          <div class="flex justify-between items-center mb-2">
            <h3 class="text-gray-700">Client files</h3>
            <span class="text-red-500 font-medium">{{ totalClientFiles }}</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div class="bg-red-400 h-2.5 rounded-full" style="width: 70%"></div>
          </div>
        </div>
        
        <!-- Statues Card -->
        <div class="bg-white rounded-lg shadow p-4">
          <div class="flex justify-between items-center mb-2">
            <h3 class="text-gray-700">Statues</h3>
            <span class="text-yellow-500 font-medium">{{ totalStatues }}</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div class="bg-yellow-400 h-2.5 rounded-full" style="width: 60%"></div>
          </div>
        </div>
      </div>
      
      <!-- Recent Records Table -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-xl font-medium text-green-700">Recent records</h2>
        </div>
        
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S/N</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catalog number</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(record, index) in recentRecords" :key="record.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ index + 1 }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ record.type }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ record.catalogNumber }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ record.author }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ record.description?.substring(0, 30) }}{{ record.description?.length > 30 ? '...' : '' }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ record.title }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ record.location }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    class="bg-green-700 hover:bg-green-800 text-white px-3 py-1 rounded text-xs"
                    @click="viewRecord(record)"
                  >
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { useLibraryStore } from '~/stores/library';
  
  const router = useRouter();
  const libraryStore = useLibraryStore();
  
  // Get data from store
  const totalUsers = computed(() => libraryStore.totalUsers);
  const totalLawReports = computed(() => libraryStore.totalLawReports);
  const totalBooks = computed(() => libraryStore.totalBooks);
  const totalArticles = computed(() => libraryStore.totalArticles);
  const totalClientFiles = computed(() => libraryStore.totalClientFiles);
  const totalStatues = computed(() => libraryStore.totalStatues);
  const recentRecords = computed(() => libraryStore.recentRecords);
  
  // View record
  const viewRecord = (record: any) => {
    // Navigate to the appropriate page based on record type
    switch (record.type) {
      case 'Books':
        router.push(`/dashboard/books?id=${record.id}`);
        break;
      case 'Law report':
        router.push(`/dashboard/law-reports?id=${record.id}`);
        break;
      case 'Articles':
        router.push(`/dashboard/articles?id=${record.id}`);
        break;
      case 'Client file':
        router.push(`/dashboard/client-files?id=${record.id}`);
        break;
      case 'Statues':
        router.push(`/dashboard/statues?id=${record.id}`);
        break;
    }
  };
  </script>