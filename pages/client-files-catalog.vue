<template>
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-start items-start my-8">
        <button @click="router.back()" class="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded transition-colors">
          Previous page
        </button>
      </div>
      <!-- {{route.query}} -->
      <!-- Header -->
      <div class="bg-green-700 text-white py-6 px-8 rounded-lg mb-8">
        <h1 class="text-3xl font-serif uppercase">Client Files</h1>
      </div>
      
      <!-- NWLR Info -->
      <div class="mb-8">
        <p class="text-lg">
          <span class="font-bold">Indexes of Client Files:</span> 
          <!-- Visit NWLR website to view full report. 
          <a href="https://nwlronline.com/" class="text-blue-600 hover:underline">https://nwlronline.com/</a> -->
        </p>
      </div>
      
      <hr class="my-8 border-gray-300" />
      
      <!-- Alphabetical Filter -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <div class="grid grid-cols-7 md:grid-cols-13 gap-2 text-center">
          <button 
            v-for="letter in alphabet" 
            :key="letter" 
            @click="filterByLetter(letter)"
            :class="[
              'py-2 px-3 rounded transition-colors',
              selectedLetter === letter 
                ? 'bg-green-700 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            ]"
          >
            {{ letter }}
          </button>
        </div>
      </div>
      
      <!-- Loading State -->
       <!-- {{bookCategoriesList}} -->
      <!-- <div v-if="loading" class="text-center py-8">
        <p class="text-gray-500 text-lg">Loading {{route.query.name === 'statues' ? 'Statutes' : route.query.name}}...</p>
      </div> -->
      
      <!-- Law Reports List -->
      <div class="space-y-4">
        <div v-if="bookCategoriesList && bookCategoriesList.length > 0" class="grid gap-4">
          <div v-for="(report, index) in bookCategoriesList" :key="index" class="p-4 rounded-lg space-y-2 shadow-md bg-white border border-gray-200">
            <h3 class="text-xl font-semibold text-gray-800">{{ report.title }}</h3>
            <p class="text-gray-600"><span class="font-medium">Author:</span> {{ report.author }}</p>
            <p class="text-gray-600"><span class="font-medium">Location:</span> {{ report.location }}</p>
            <p class="text-gray-600"><span class="font-medium">Year:</span> {{ report.year }}</p>
            <p class="text-gray-600"><span class="font-medium">Description:</span> {{ report.description }}</p>
          </div>
        </div>
        <div v-else class="text-gray-500 text-center py-4">
          No {{route.query.name === 'statues' ? 'Statutes' : route.query.name}} available.
        </div>
      </div>
  
      <!-- <div  class="space-y-4">
        <div v-if="bookCategoriesList && bookCategoriesList.length > 0">
          <ul class="list-disc list-inside space-y-4 pl-4">
            <li v-for="(report, index) in bookCategoriesList" :key="index" class="text-lg">
              {{ report.title }} -  {{ report.author }} - {{ report.location }} - {{ report.year }} - {{ report.description }}
            </li>
          </ul>
        </div>
      </div> -->
  
       <!-- <div v-else class="text-center py-8">
          <p class="text-gray-500 text-lg">No {{route.query.name}} found starting with '{{ selectedLetter }}'</p>
        </div> -->
      <!-- Pagination -->
      <!-- <div class="flex justify-end mt-8">
        <button @click="router.back()" class="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded transition-colors">
          Previous page
        </button>
      </div> -->
    </div>
  </template>
  
  <script setup lang="ts">
  import { useFetchClientFilesIndexAlphabetically } from "@/composables/modules/user/useFetchClientFilesAlphabetically";
  import { ref, computed, onMounted, watch } from 'vue';
  
  const route = useRoute();
  const { bookCategoriesList, loading, fetchIndexAlphabetically } = useFetchClientFilesIndexAlphabetically();
  
  const router = useRouter()
  
  // Get category ID from URL
  const categoryId = computed(() => {
    return route.query.categoryId as string || '';
  });
  
  // Alphabet array for filter
  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  const selectedLetter = ref('A'); // Default selected letter
  
  // Function to filter by letter and fetch data
  const filterByLetter = (letter: string) => {
    selectedLetter.value = letter;
  };
  
  // Watcher for changes in selected letter
  watch(selectedLetter, async (newLetter) => {
    if (categoryId.value) {
      await fetchIndexAlphabetically(newLetter);
    }
  });
  
  // Set default letter on mount and fetch initial data
  onMounted(async () => {
    if (categoryId.value) {
      await fetchIndexAlphabetically(selectedLetter.value);
    }
  });
  </script>