<template>
  <div>
    <!-- {{categories}} -->
     <!-- {{bookList}} -->
    <!-- Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      <!-- Users Card -->
      <div class="bg-white rounded-xl shadow p-4">
        <div class="flex justify-between items-center mb-2">
          <h3 class="text-gray-700">Users</h3>
          <span class="text-green-500 font-medium">{{ dashboardObj.users }}</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5 relative group">
          <div 
            class="bg-green-400 h-2.5 rounded-full" 
            :style="{ width: calculatePercentage('users') + '%' }"
          ></div>
          <div class="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full mb-2 p-2 bg-gray-800 text-white text-xs rounded shadow-lg whitespace-nowrap">
            {{ dashboardObj.users }} users ({{ calculatePercentage('users') }}% of target)
          </div>
        </div>
      </div>
      
      <!-- Law Reports Card -->
      <div class="bg-white rounded-xl shadow p-4">
        <div class="flex justify-between items-center mb-2">
          <h3 class="text-gray-700">Law reports</h3>
          <span class="text-blue-500 font-medium">{{ dashboardObj.lawReports }}</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5 relative group">
          <div 
            class="bg-blue-400 h-2.5 rounded-full" 
            :style="{ width: calculatePercentage('lawReports') + '%' }"
          ></div>
          <div class="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full mb-2 p-2 bg-gray-800 text-white text-xs rounded shadow-lg whitespace-nowrap">
            {{ dashboardObj.lawReports }} law reports ({{ calculatePercentage('lawReports') }}% of target)
          </div>
        </div>
      </div>
      
      <!-- Books Card -->
      <div class="bg-white rounded-xl shadow p-4">
        <div class="flex justify-between items-center mb-2">
          <h3 class="text-gray-700">Books</h3>
          <span class="text-purple-500 font-medium">{{ dashboardObj.books }}</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5 relative group">
          <div 
            class="bg-purple-400 h-2.5 rounded-full" 
            :style="{ width: calculatePercentage('books') + '%' }"
          ></div>
          <div class="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full mb-2 p-2 bg-gray-800 text-white text-xs rounded shadow-lg whitespace-nowrap">
            {{ dashboardObj.books }} books ({{ calculatePercentage('books') }}% of target)
          </div>
        </div>
      </div>
      
      <!-- Articles Card -->
      <div class="bg-white rounded-xl shadow p-4">
        <div class="flex justify-between items-center mb-2">
          <h3 class="text-gray-700">Articles</h3>
          <span class="text-cyan-500 font-medium">{{ dashboardObj.articles }}</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5 relative group">
          <div 
            class="bg-cyan-400 h-2.5 rounded-full" 
            :style="{ width: calculatePercentage('articles') + '%' }"
          ></div>
          <div class="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full mb-2 p-2 bg-gray-800 text-white text-xs rounded shadow-lg whitespace-nowrap">
            {{ dashboardObj.articles }} articles ({{ calculatePercentage('articles') }}% of target)
          </div>
        </div>
      </div>
      
      <!-- Client Files Card -->
      <div class="bg-white rounded-xl shadow p-4">
        <div class="flex justify-between items-center mb-2">
          <h3 class="text-gray-700">Client files</h3>
          <span class="text-red-500 font-medium">{{ dashboardObj.clientFiles }}</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5 relative group">
          <div 
            class="bg-red-400 h-2.5 rounded-full" 
            :style="{ width: calculatePercentage('clientFiles') + '%' }"
          ></div>
          <div class="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full mb-2 p-2 bg-gray-800 text-white text-xs rounded shadow-lg whitespace-nowrap">
            {{ dashboardObj.clientFiles }} client files ({{ calculatePercentage('clientFiles') }}% of target)
          </div>
        </div>
      </div>
      
      <!-- Statutes Card -->
      <div class="bg-white rounded-xl shadow p-4">
        <div class="flex justify-between items-center mb-2">
          <h3 class="text-gray-700">Statutes</h3>
          <span class="text-yellow-500 font-medium">{{ dashboardObj.statutes }}</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5 relative group">
          <div 
            class="bg-yellow-400 h-2.5 rounded-full" 
            :style="{ width: calculatePercentage('statutes') + '%' }"
          ></div>
          <div class="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full mb-2 p-2 bg-gray-800 text-white text-xs rounded shadow-lg whitespace-nowrap">
            {{ dashboardObj.statutes }} statutes ({{ calculatePercentage('statutes') }}% of target)
          </div>
        </div>
      </div>
    </div>
    
    <!-- Recent Records Table -->
    <div class="bg-white rounded-xl shadow overflow-hidden">
      <!-- <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-xl font-medium text-green-700">Recent records</h2>
      </div> -->
      <!-- {{bookList}} -->
      <BooksTable :bookList="bookList" :loading="fetchingBooks" />
      <!-- <div class="overflow-x-auto">
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
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGetBooks } from '@/composables/modules/admin/books/uesGetBooks'
import { useGetBookCategories } from '@/composables/modules/admin/books/useGetCategories'
import { computed } from 'vue';
import { useFetchDashboardStatsObj } from '@/composables/modules/admin/useFetchDashboard'
import { useRouter } from 'vue-router';
const { bookList, loading: fetchingBooks, filters, metadata} = useGetBooks()
const { categories, loading: fetchingCategories } = useGetBookCategories()

const router = useRouter();
const { dashboardObj, loading } = useFetchDashboardStatsObj();

// Target values for each category (you can adjust these based on your requirements)
const targets = {
  users: 10,
  lawReports: 20,
  books: 30,
  articles: 25,
  clientFiles: 15,
  statutes: 20
};

// Calculate percentage for progress bars
const calculatePercentage = (key: keyof typeof dashboardObj) => {
  if (!dashboardObj || dashboardObj[key] === undefined) return 0;
  
  const value = dashboardObj[key] as number;
  const target = targets[key as keyof typeof targets] || 100;
  
  // Calculate percentage with a maximum of 100%
  const percentage = Math.min(Math.round((value / target) * 100), 100);
  return percentage;
};

// For the recent records table
const { recentRecords } = useLibrary();

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

definePageMeta({
  layout: 'dashboard'
});
</script>

<style scoped>
/* Tooltip positioning */
.group:hover .group-hover\:opacity-100 {
  z-index: 10;
}
</style>