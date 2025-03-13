<template>
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="bg-green-700 text-white py-6 px-8 rounded-lg mb-8">
        <h1 class="text-3xl font-serif">Law Reports</h1>
      </div>
      
      <!-- NWLR Info -->
      <div class="mb-8">
        <p class="text-lg">
          <span class="font-bold">Indexes of NWLR:</span> 
          Visit NWLR website to view full report. 
          <a href="https://nwlronline.com/" class="text-blue-600 hover:underline">https://nwlronline.com/</a>
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
      
      <!-- Law Reports List -->
      <div class="space-y-4">
        <div v-if="filteredReports.length > 0">
          <ul class="list-disc list-inside space-y-4 pl-4">
            <li v-for="(report, index) in filteredReports" :key="index" class="text-lg">
              {{ report.title }}
            </li>
          </ul>
        </div>
        <div v-else class="text-center py-8">
          <p class="text-gray-500 text-lg">No reports found starting with '{{ selectedLetter }}'</p>
        </div>
      </div>
      
      <!-- Pagination -->
      <div class="flex justify-end mt-8">
        <button class="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded transition-colors">
          Previous page
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  
  // Alphabet array for filter
  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  const selectedLetter = ref('A'); // Default selected letter
  
  // Mock data for law reports
  const lawReports = ref([
    { title: 'Abago v. State (2020) 15 NWLR (Pt. 1546) 1', letter: 'A' },
    { title: 'Abago v. Federal Republic of Nigeria (2019) 12 NWLR (Pt. 1540) 34', letter: 'A' },
    { title: 'Abago & Sons Ltd v. Minister of Justice (2018) 10 NWLR (Pt. 1535) 89', letter: 'A' },
    { title: 'Abago v. Lagos State (2017) 8 NWLR (Pt. 1530) 123', letter: 'A' },
    { title: 'Abago v. Commissioner of Police (2016) 5 NWLR (Pt. 1525) 210', letter: 'A' },
    { title: 'Abago v. Zenith Bank (2015) 3 NWLR (Pt. 1520) 45', letter: 'A' },
    { title: 'Abago v. University of Lagos (2014) 1 NWLR (Pt. 1515) 78', letter: 'A' },
    { title: 'Abago v. NNPC (2013) 18 NWLR (Pt. 1510) 156', letter: 'A' },
    { title: 'Abago v. INEC (2012) 15 NWLR (Pt. 1505) 234', letter: 'A' },
    { title: 'Abago v. CBN (2011) 12 NWLR (Pt. 1500) 321', letter: 'A' },
    { title: 'Abago v. FIRS (2010) 10 NWLR (Pt. 1495) 432', letter: 'A' },
    { title: 'Bello v. State (2020) 15 NWLR (Pt. 1546) 56', letter: 'B' },
    { title: 'Chukwu v. FRN (2019) 14 NWLR (Pt. 1542) 78', letter: 'C' },
    // Add more mock data for other letters
  ]);
  
  // Filter reports based on selected letter
  const filteredReports = computed(() => {
    return lawReports.value.filter(report => report.letter === selectedLetter.value);
  });
  
  // Function to filter by letter
  const filterByLetter = (letter: string) => {
    selectedLetter.value = letter;
  };
  
  // Set default letter on mount
  onMounted(() => {
    filterByLetter('A');
  });
  </script>